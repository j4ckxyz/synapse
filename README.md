# Synapse

A Git-style conversation forking chat application where you can branch conversations at any point and explore different paths with AI. Fully client-side with bring-your-own API key support.

## Features

- 🔑 **Bring Your Own API Key** - Use your own API keys from multiple providers
- 🌐 **Multiple AI Providers** - Supports OpenAI, OpenRouter, Google Gemini, Claude, Grok, Groq, and custom OpenAI-compatible APIs
- 🌲 **Conversation Branching** - Fork conversations at any point to explore different paths
- 💾 **Local Storage** - All data stored locally in your browser
- 🚀 **Serverless** - Deployed on Cloudflare Pages with edge functions
- 🎨 **Modern UI** - Built with React, TailwindCSS, and Radix UI

## Supported AI Providers

- **OpenAI** - GPT-4, GPT-3.5, and other OpenAI models
- **OpenRouter** - Access to multiple AI models through one API
- **Google Gemini** - Google's latest AI models
- **Anthropic (Claude)** - Claude 3 Opus, Sonnet, and Haiku
- **xAI (Grok)** - Grok and Grok Vision models
- **Groq** - Fast inference for open-source models
- **Custom** - Any OpenAI-compatible API endpoint

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- An API key from one of the supported providers

### Local Development

1. Clone the repository:

```bash
git clone <repository-url>
cd synapse
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

5. Configure your API provider:
   - Click on the API Provider dropdown
   - Select your preferred provider
   - Enter your API key
   - Select a model
   - Start chatting!

### Getting API Keys

- **OpenAI**: https://platform.openai.com/api-keys
- **OpenRouter**: https://openrouter.ai/keys
- **Google Gemini**: https://aistudio.google.com/app/api-keys
- **Anthropic**: https://console.anthropic.com/settings/keys
- **xAI (Grok)**: https://console.x.ai/
- **Groq**: https://console.groq.com/keys

## Deployment to Cloudflare Pages

1. Build the project:

```bash
npm run build
```

2. Deploy to Cloudflare Pages:
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Create a new project
   - Connect your Git repository
   - Set build settings:
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Root directory**: `/`
   - Deploy!

### Environment Variables

No environment variables are required! All API keys are stored locally in your browser's localStorage.

## Using Custom OpenAI-Compatible APIs

If you have an OpenAI-compatible API endpoint (like LocalAI, LM Studio, or others):

1. Select "Custom (OpenAI-compatible)" as your provider
2. Enter your base URL (e.g., `https://api.example.com/v1`)
3. Enter your API key
4. Manually enter the model name
5. Start chatting!

## Privacy & Security

- **Your API keys never leave your browser** - They're stored in localStorage and sent directly to the AI provider
- **No server-side storage** - Conversations are stored locally in your browser
- **End-to-end encryption** - All API calls go directly from your browser to the AI provider via Cloudflare Functions
- **Open source** - Review the code to see exactly how your data is handled

## Tech Stack

- **Frontend**: React 19, TypeScript, TailwindCSS
- **Routing**: TanStack Router
- **AI SDK**: Vercel AI SDK
- **Deployment**: Cloudflare Pages + Functions
- **UI Components**: Radix UI
- **Markdown**: React Markdown with syntax highlighting

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Preview production build locally
- `npm run lint` - Lint code with Biome
- `npm run format` - Format code with Biome
- `npm run check` - Run type checking and linting

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
