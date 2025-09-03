import { google } from "googleapis";
import { db } from "@/server/db";

/**
 * Refreshes a Google OAuth access token using the refresh token
 * @param userId - The user ID
 * @param provider - The OAuth provider (should be "google")
 * @returns The new access token or null if refresh failed
 */
export async function refreshGoogleAccessToken(
  userId: string,
  provider: string = "google"
): Promise<string | null> {
  try {
    // Get the account with refresh token
    const account = await db.account.findFirst({
      where: {
        userId,
        provider,
      },
    });

    if (!account?.refresh_token) {
      console.error("No refresh token found for Google account");
      return null;
    }

    // Create OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.AUTH_GOOGLE_ID,
      process.env.AUTH_GOOGLE_SECRET
    );

    // Set the refresh token
    oauth2Client.setCredentials({
      refresh_token: account.refresh_token,
    });

    // Refresh the access token
    const { credentials } = await oauth2Client.refreshAccessToken();

    if (!credentials.access_token) {
      console.error("Failed to refresh access token");
      return null;
    }

    // Update the account with new tokens
    await db.account.update({
      where: {
        id: account.id,
      },
      data: {
        access_token: credentials.access_token,
        expires_at: credentials.expiry_date 
          ? Math.floor(credentials.expiry_date / 1000) 
          : null,
        refresh_token: credentials.refresh_token || account.refresh_token,
      },
    });

    return credentials.access_token;
  } catch (error) {
    console.error("Error refreshing Google access token:", error);
    return null;
  }
}

/**
 * Checks if a token is expired or about to expire (within 5 minutes)
 * @param expiresAt - Token expiration timestamp in seconds
 * @returns True if token is expired or about to expire
 */
export function isTokenExpired(expiresAt: number | null): boolean {
  if (!expiresAt) return true;
  
  const now = Math.floor(Date.now() / 1000);
  const bufferTime = 5 * 60; // 5 minutes buffer
  
  return now >= (expiresAt - bufferTime);
}


