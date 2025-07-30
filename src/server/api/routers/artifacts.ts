import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import type { ArtifactType } from "@prisma/client";

// Input validation schemas
const createArtifactSchema = z.object({
  chatId: z.string().uuid(),
  messageId: z.string().uuid().optional(),
  type: z.enum(["document", "code", "image", "sheet", "chart", "diagram"]),
  title: z.string().min(1).max(200),
  content: z.string(),
  metadata: z.record(z.any()).optional(),
});

const updateArtifactSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  content: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

const getArtifactSchema = z.object({
  id: z.string().uuid(),
});

const getArtifactsByChatSchema = z.object({
  chatId: z.string().uuid(),
});

const deleteArtifactSchema = z.object({
  id: z.string().uuid(),
});

export const artifactsRouter = createTRPCRouter({
  // Create a new artifact
  create: protectedProcedure
    .input(createArtifactSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;

      // Verify the user owns the chat
      const chat = await db.chat.findFirst({
        where: {
          id: input.chatId,
          userId: session.user.id,
        },
      });

      if (!chat) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Chat not found or you don't have permission to access it",
        });
      }

      // If messageId is provided, verify it belongs to the chat
      if (input.messageId) {
        const message = await db.message.findFirst({
          where: {
            id: input.messageId,
            chatId: input.chatId,
          },
        });

        if (!message) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Message not found in the specified chat",
          });
        }
      }

      // Create the artifact
      const artifact = await db.artifact.create({
        data: {
          chatId: input.chatId,
          messageId: input.messageId,
          type: input.type,
          title: input.title,
          content: input.content,
          metadata: input.metadata,
        },
        include: {
          chat: {
            select: {
              id: true,
              title: true,
            },
          },
          message: {
            select: {
              id: true,
              role: true,
            },
          },
        },
      });

      return artifact;
    }),

  // Get a specific artifact by ID
  get: protectedProcedure
    .input(getArtifactSchema)
    .query(async ({ ctx, input }) => {
      const { db, session } = ctx;

      const artifact = await db.artifact.findFirst({
        where: {
          id: input.id,
          chat: {
            userId: session.user.id,
          },
        },
        include: {
          chat: {
            select: {
              id: true,
              title: true,
            },
          },
          message: {
            select: {
              id: true,
              role: true,
            },
          },
        },
      });

      if (!artifact) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Artifact not found or you don't have permission to access it",
        });
      }

      return artifact;
    }),

  // Get all artifacts for a specific chat
  getByChatId: protectedProcedure
    .input(getArtifactsByChatSchema)
    .query(async ({ ctx, input }) => {
      const { db, session } = ctx;

      // Verify the user owns the chat
      const chat = await db.chat.findFirst({
        where: {
          id: input.chatId,
          userId: session.user.id,
        },
      });

      if (!chat) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Chat not found or you don't have permission to access it",
        });
      }

      const artifacts = await db.artifact.findMany({
        where: {
          chatId: input.chatId,
        },
        include: {
          chat: {
            select: {
              id: true,
              title: true,
            },
          },
          message: {
            select: {
              id: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return artifacts;
    }),

  // Update an existing artifact
  update: protectedProcedure
    .input(updateArtifactSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;
      const { id, ...updates } = input;

      // Verify the user owns the artifact through the chat
      const existingArtifact = await db.artifact.findFirst({
        where: {
          id,
          chat: {
            userId: session.user.id,
          },
        },
      });

      if (!existingArtifact) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Artifact not found or you don't have permission to update it",
        });
      }

      // Update the artifact
      const artifact = await db.artifact.update({
        where: { id },
        data: {
          ...updates,
          updatedAt: new Date(),
        },
        include: {
          chat: {
            select: {
              id: true,
              title: true,
            },
          },
          message: {
            select: {
              id: true,
              role: true,
            },
          },
        },
      });

      return artifact;
    }),

  // Delete an artifact
  delete: protectedProcedure
    .input(deleteArtifactSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;

      // Verify the user owns the artifact through the chat
      const existingArtifact = await db.artifact.findFirst({
        where: {
          id: input.id,
          chat: {
            userId: session.user.id,
          },
        },
      });

      if (!existingArtifact) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Artifact not found or you don't have permission to delete it",
        });
      }

      // Delete the artifact
      await db.artifact.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),

  // Get artifacts by type for a user (across all chats)
  getByType: protectedProcedure
    .input(z.object({
      type: z.enum(["document", "code", "image", "sheet", "chart", "diagram"]),
      limit: z.number().min(1).max(100).default(20),
      offset: z.number().min(0).default(0),
    }))
    .query(async ({ ctx, input }) => {
      const { db, session } = ctx;

      const artifacts = await db.artifact.findMany({
        where: {
          type: input.type,
          chat: {
            userId: session.user.id,
          },
        },
        include: {
          chat: {
            select: {
              id: true,
              title: true,
            },
          },
          message: {
            select: {
              id: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });

      return artifacts;
    }),
});