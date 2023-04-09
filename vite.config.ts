import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteTips } from 'vite-plugin-tips'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		react(),
		eslintPlugin(),
		tsConfigPaths(),
		ViteTips()
	],
	publicDir: 'public'
})
