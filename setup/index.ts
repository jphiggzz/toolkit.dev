#!/usr/bin/env node

import { log, logStep, logError } from "./utils";

import {
  createEnvFile,
  installDependencies,
  runMigrations,
  startDockerServices,
} from "./steps";

// Main setup function
async function main(): Promise<void> {
  log("🚀 Dental.AI Setup Script", "bright");
  log(
          "This script will help you set up the Dental.AI project for development.\n",
    "cyan",
  );

  try {
    // Step 1: Create .env.local
    logStep("Step 1/4", "Creating environment configuration...");
    createEnvFile();

    // Step 2: Install dependencies
    logStep("Step 2/4", "Installing project dependencies...");
    installDependencies();

    logStep("Step 3/4", "Starting Docker services...");
    startDockerServices();

    // Step 3: Setup database
    logStep("Step 4/4", "Running database migrations...");
    runMigrations();
  } catch (error) {
    logError("Setup failed: " + (error as Error).message);
  }
}

// Run the setup
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    if (error instanceof Error && error.name === "ExitPromptError") {
      log(
        "\n👋 Setup cancelled. You can run the setup again anytime with: pnpm dev:setup",
        "yellow",
      );
      process.exit(0);
    } else {
      logError("Setup failed: " + (error as Error).message);
      process.exit(1);
    }
  });
}
