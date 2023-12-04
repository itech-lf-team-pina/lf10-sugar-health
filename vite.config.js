/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            // eslint-disable-next-line no-undef
            '@/': `${path.resolve(__dirname, 'src')}/`
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
    }

})
