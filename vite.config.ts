import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import dts from 'vite-plugin-dts'
import CopyPlugin from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({}), vueJsx(), Components({
    // allow auto load markdown components under `./src/components/`
    extensions: ['vue', 'md'],
    // allow auto import and register components used in markdown
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    resolvers: [
      ElementPlusResolver({
        importStyle: 'sass',
      }),
    ],
    dts: 'src/types/components.d.ts',
  }), dts({
    skipDiagnostics: true,
    outputDir: './customForm'
  }), CopyPlugin({
    targets: [
      { src: './package.json', dest: './customForm' },
    ]
  }) as PluginOption],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.vue', '.js', '.ts', '.json', '.html', '.css', '.scss', '.sass', '.tsx', '.jsx']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/style/element-var.scss" as *;`,
        javascriptEnabled: true
      }
    }
  },
  server: {
    host: true,
    port: 9888,
    proxy: {
      '/api': {
        target: 'http://172.17.254.4',
        changeOrigin: true
      },
      '/fileservice': {
        target: 'http://172.17.254.4',
        changeOrigin: true
      }
    }
  },
  build: {
    lib: {
      entry: 'src/main.lib.ts',
      // 组件库名字
      name: 'customForm',
      fileName: 'customForm', //fileName: (format) => `tmes.${format}.js`,
      // 输出格式
      formats: ['es']
    },
    outDir: './customForm/dist',
    emptyOutDir: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'vue',
        'element-plus',
        '@element-plus/icons-vue',
        'vue-types',
        'jquery',
        '@vueuse/core',
        'vue-types',
        'vuedraggable',
        'axios'
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          jquery: '$',
          'element-plus': 'ElementPlus'
        }
      }
    }
  }	 
})
