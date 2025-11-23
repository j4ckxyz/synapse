# Project Overview

This is a web application called Synapse, a Git-style conversation forking chat application where you can branch conversations at any point and explore different paths with AI.

## Technologies Used

*   **Frontend:**
    *   **Framework:** React with Vite
    *   **Routing:** TanStack Router (file-based routing)
    *   **UI Components:**
        *   shadcn/ui (a collection of re-usable components)
        *   Radix UI (for accessible and unstyled UI primitives)
        *   Tailwind CSS (for styling)
    *   **State Management:** TanStack Query (for data fetching and caching)
    *   **Authentication:** Clerk
*   **Backend:**
    *   **Platform:** Convex (a serverless platform with a real-time database)
*   **AI:**
    *   `@ai-sdk/anthropic`
    *   `@ai-sdk/openai`
    *   `@ai-sdk/react`
*   **Linting & Formatting:** Biome
*   **Testing:** Vitest

## Architecture

The application is structured as a monorepo with the frontend and backend code in the same repository.

*   **Frontend:** The frontend code is located in the `src` directory. It uses a file-based routing system with TanStack Router, where each file in the `src/routes` directory corresponds to a route. The UI is built with shadcn/ui and Tailwind CSS.
*   **Backend:** The backend is powered by Convex. The schema for the database is defined in `convex/schema.ts`. The backend logic is implemented in TypeScript files in the `convex` directory.
*   **Authentication:** User authentication is handled by Clerk.

## Data Model

The application's data is stored in a Convex database with the following schema:

*   **`conversations` table:** Stores information about each conversation, including the user who owns it, the title, and the ID of the root node.
*   **`nodes` table:** Stores the individual nodes of the conversation trees. Each node has a `conversationId` to link it to a conversation, a `parentId` to create the tree structure, the user's prompt, and the assistant's response.

# Building and Running

*   **Install dependencies:**
    ```bash
    npm install
    ```
*   **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.
*   **Build for production:**
    ```bash
    npm run build
    ```
*   **Run tests:**
    ```bash
    npm run test
    ```

# Development Conventions

*   **Code Style:** The project uses Biome for code formatting and linting.
*   **Commits:** The project uses husky and lint-staged to run linting and formatting checks before each commit.
*   **Branching:** The application is designed around the concept of "conversation forking," which is similar to Git branching. This allows users to explore different conversation paths.
