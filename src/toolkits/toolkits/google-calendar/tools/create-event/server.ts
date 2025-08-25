import { type createEventTool } from "./base";
import type { ServerToolConfig } from "@/toolkits/types";
import type { calendar_v3 } from "googleapis";
import { getUserTimezone } from "../../lib";

export const googleCalendarCreateEventToolConfigServer = (
  calendar: calendar_v3.Calendar,
): ServerToolConfig<
  typeof createEventTool.inputSchema.shape,
  typeof createEventTool.outputSchema.shape
> => {
  return {
    callback: async ({ title, startDateTime, endDateTime }) => {
      // Get user's primary calendar timezone
      const userTimeZone = await getUserTimezone(calendar);

      // Build the event object with user's timezone
      // The input timestamps are already in RFC3339 format from the find-availability tool
      const eventResource: calendar_v3.Schema$Event = {
        summary: title,
        start: {
          dateTime: startDateTime,
          timeZone: userTimeZone,
        },
        end: {
          dateTime: endDateTime,
          timeZone: userTimeZone,
        },
      };

      try {
        const response = await calendar.events.insert({
          calendarId: "primary",
          requestBody: eventResource,
        });

        return {
          event: response.data,
        };
      } catch (error) {
        console.error("[CreateEvent] Error creating event:", error);
        
        // Check for authentication errors
        if (error instanceof Error && error.message.includes("invalid authentication")) {
          throw new Error(
            "Authentication failed. Please disconnect and reconnect your Google Calendar to refresh your access token."
          );
        }
        
        // Check for expired token errors
        if (error instanceof Error && error.message.includes("invalid_grant")) {
          throw new Error(
            "Your Google Calendar access has expired. Please disconnect and reconnect your Google Calendar."
          );
        }
        
        throw new Error(
          `Failed to create event: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    },
  };
};
