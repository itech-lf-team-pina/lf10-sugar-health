/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {BootstrapVueNextResolver} from 'unplugin-vue-components/resolvers'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [BootstrapVueNextResolver()],
        }),

    ],
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
