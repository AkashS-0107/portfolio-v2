import { defineConfig } from 'vite';
import type { Plugin, ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite Dev Server Plugin to handle POST /api/chat locally during npm run dev
function chatApiDevPlugin(): Plugin {
  return {
    name: 'chat-api-dev-plugin',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/chat', async (req, res) => {
        try {
          // Use Vite's ssrLoadModule to safely load serverless endpoint through Vite module graph
          const chatApiHandlerModule = await server.ssrLoadModule('./api/chat.ts');
          const chatApiHandler = chatApiHandlerModule.default;
          await chatApiHandler(req, res);
        } catch (err: unknown) {
          console.error('Vite Dev API Error:', err);
          const nodeRes = res as { headersSent?: boolean; statusCode?: number; setHeader?: (k: string, v: string) => void; end?: (data?: string) => void };
          if (!nodeRes.headersSent && typeof nodeRes.setHeader === 'function' && typeof nodeRes.end === 'function') {
            nodeRes.statusCode = 500;
            nodeRes.setHeader('Content-Type', 'application/json');
            nodeRes.end(JSON.stringify({ error: 'Internal Dev Server Error' }));
          }
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), chatApiDevPlugin()],
});
