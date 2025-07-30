'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { api } from '@/trpc/react';
import type { ArtifactWithRelations, CreateArtifactInput, UpdateArtifactInput } from '@/lib/types/artifacts';

interface ArtifactContextValue {
  // State
  activeArtifact: ArtifactWithRelations | null;
  isArtifactPanelOpen: boolean;
  artifacts: ArtifactWithRelations[];
  isLoading: boolean;
  error: string | null;

  // Actions
  openArtifact: (artifact: ArtifactWithRelations) => void;
  closeArtifact: () => void;
  createArtifact: (input: CreateArtifactInput) => Promise<ArtifactWithRelations | null>;
  updateArtifact: (id: string, updates: UpdateArtifactInput) => Promise<ArtifactWithRelations | null>;
  deleteArtifact: (id: string) => Promise<boolean>;
  loadArtifactsForChat: (chatId: string) => void;
  clearError: () => void;
}

const ArtifactContext = createContext<ArtifactContextValue | null>(null);

interface ArtifactProviderProps {
  children: React.ReactNode;
  chatId?: string; // Optional chat ID to auto-load artifacts
}

export function ArtifactProvider({ children, chatId }: ArtifactProviderProps) {
  const [activeArtifact, setActiveArtifact] = useState<ArtifactWithRelations | null>(null);
  const [isArtifactPanelOpen, setIsArtifactPanelOpen] = useState(false);
  const [artifacts, setArtifacts] = useState<ArtifactWithRelations[]>([]);
  const [error, setError] = useState<string | null>(null);

  // tRPC mutations and queries
  const createArtifactMutation = api.artifacts.create.useMutation();
  const updateArtifactMutation = api.artifacts.update.useMutation();
  const deleteArtifactMutation = api.artifacts.delete.useMutation();
  
  const {
    data: chatArtifacts,
    isLoading,
    refetch: refetchArtifacts,
  } = api.artifacts.getByChatId.useQuery(
    { chatId: chatId! },
    { enabled: !!chatId }
  );

  // Update artifacts when query data changes
  useEffect(() => {
    if (chatArtifacts) {
      setArtifacts(chatArtifacts);
    }
  }, [chatArtifacts]);

  const openArtifact = useCallback((artifact: ArtifactWithRelations) => {
    setActiveArtifact(artifact);
    setIsArtifactPanelOpen(true);
  }, []);

  const closeArtifact = useCallback(() => {
    setIsArtifactPanelOpen(false);
    // Keep the artifact in state for potential re-opening
  }, []);

  const createArtifact = useCallback(async (input: CreateArtifactInput): Promise<ArtifactWithRelations | null> => {
    try {
      setError(null);
      const newArtifact = await createArtifactMutation.mutateAsync(input);
      
      // Add to local state
      setArtifacts(prev => [newArtifact, ...prev]);
      
      // Open the newly created artifact
      openArtifact(newArtifact);
      
      return newArtifact;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create artifact';
      setError(errorMessage);
      return null;
    }
  }, [createArtifactMutation, openArtifact]);

  const updateArtifact = useCallback(async (id: string, updates: UpdateArtifactInput): Promise<ArtifactWithRelations | null> => {
    try {
      setError(null);
      const updatedArtifact = await updateArtifactMutation.mutateAsync({ id, ...updates });
      
      // Update local state
      setArtifacts(prev => prev.map(artifact => 
        artifact.id === id ? updatedArtifact : artifact
      ));
      
      // Update active artifact if it's the one being updated
      if (activeArtifact?.id === id) {
        setActiveArtifact(updatedArtifact);
      }
      
      return updatedArtifact;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update artifact';
      setError(errorMessage);
      return null;
    }
  }, [updateArtifactMutation, activeArtifact]);

  const deleteArtifact = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      await deleteArtifactMutation.mutateAsync({ id });
      
      // Remove from local state
      setArtifacts(prev => prev.filter(artifact => artifact.id !== id));
      
      // Close artifact panel if the deleted artifact was active
      if (activeArtifact?.id === id) {
        setActiveArtifact(null);
        setIsArtifactPanelOpen(false);
      }
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete artifact';
      setError(errorMessage);
      return false;
    }
  }, [deleteArtifactMutation, activeArtifact]);

  const loadArtifactsForChat = useCallback((newChatId: string) => {
    if (newChatId !== chatId) {
      refetchArtifacts();
    }
  }, [chatId, refetchArtifacts]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const contextValue: ArtifactContextValue = {
    // State
    activeArtifact,
    isArtifactPanelOpen,
    artifacts,
    isLoading,
    error,

    // Actions
    openArtifact,
    closeArtifact,
    createArtifact,
    updateArtifact,
    deleteArtifact,
    loadArtifactsForChat,
    clearError,
  };

  return (
    <ArtifactContext.Provider value={contextValue}>
      {children}
    </ArtifactContext.Provider>
  );
}

export function useArtifacts() {
  const context = useContext(ArtifactContext);
  if (!context) {
    throw new Error('useArtifacts must be used within an ArtifactProvider');
  }
  return context;
}