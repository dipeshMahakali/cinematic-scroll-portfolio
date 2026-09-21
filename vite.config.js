
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function activeTheoryPlugin() {
  return {
    name: 'activetheory-path-resolver',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url || '/'
        const pathname = rawUrl.split('?')[0]

        // Handle contact API endpoint
        if (pathname === '/api/contact' && req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', async () => {
            try {
              req.body = JSON.parse(body || '{}')
            } catch (e) {
              req.body = {}
            }
            const mockRes = {
              status(code) {
                res.statusCode = code
                return this
              },
              json(data) {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
              }
            }
            try {
              const handler = (await import('./api/contact.js')).default
              await handler(req, mockRes)
            } catch (err) {
              console.error('Contact API error:', err)
              mockRes.status(500).json({ error: 'Server error: ' + err.message })
            }
          })
          return
        }

        // Route rewrites for dev server
        if (pathname.startsWith('/ActiveTheory/assets/')) {
          req.url = req.url.replace('/ActiveTheory/assets/', '/assets/')
        } else if (pathname.startsWith('/ActiveTheory/images/')) {
          req.url = req.url.replace('/ActiveTheory/images/', '/assets/images/')
        } else if (pathname.startsWith('/ActiveTheory/fonts/')) {
          req.url = req.url.replace('/ActiveTheory/fonts/', '/assets/fonts/')
        } else if (pathname.startsWith('/ActiveTheory/data/')) {
          req.url = req.url.replace('/ActiveTheory/data/', '/assets/data/')
        } else if (pathname.startsWith('/ActiveTheory/geometry/')) {
          req.url = req.url.replace('/ActiveTheory/geometry/', '/assets/geometry/')
        } else if (pathname.startsWith('/ActiveTheory/shaders/')) {
          req.url = req.url.replace('/ActiveTheory/shaders/', '/assets/shaders/')
        } else if (pathname.startsWith('/ActiveTheory/videos/')) {
          req.url = req.url.replace('/ActiveTheory/videos/', '/assets/videos/')
        } else if (pathname.startsWith('/ActiveTheory/js/')) {
          req.url = req.url.replace('/ActiveTheory/js/', '/assets/js/')
        } else if (/^\/(images|fonts|fx|geometry|shaders|videos|video|data|js|music|cms)\//.test(pathname)) {
          req.url = '/assets' + req.url
        }

        // Set proper MIME types
        if (pathname.endsWith('.vs')) {
          res.setHeader('Content-Type', 'text/plain')
        } else if (pathname.endsWith('.ktx')) {
          res.setHeader('Content-Type', 'image/ktx')
        } else if (pathname.endsWith('.ktx2')) {
          res.setHeader('Content-Type', 'image/ktx2')
        } else if (pathname.endsWith('.wasm')) {
          res.setHeader('Content-Type', 'application/wasm')
        } else if (pathname.endsWith('.bin')) {
          res.setHeader('Content-Type', 'application/octet-stream')
        } else if (pathname.endsWith('.cube')) {
          res.setHeader('Content-Type', 'text/plain')
        }

        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url || '/'
        const pathname = rawUrl.split('?')[0]

        if (pathname === '/api/contact' && req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', async () => {
            try {
              req.body = JSON.parse(body || '{}')
            } catch (e) {
              req.body = {}
            }
            const mockRes = {
              status(code) {
                res.statusCode = code
                return this
              },
              json(data) {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
              }
            }
            try {
              const handler = (await import('./api/contact.js')).default
              await handler(req, mockRes)
            } catch (err) {
              console.error('Contact API error:', err)
              mockRes.status(500).json({ error: 'Server error: ' + err.message })
            }
          })
          return
        }

        next()
      })
    },
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      if (!fs.existsSync(distDir)) return

      const activeTheoryDir = path.join(distDir, 'ActiveTheory')
      if (!fs.existsSync(activeTheoryDir)) {
        fs.mkdirSync(activeTheoryDir, { recursive: true })
      }

      const targets = ['assets', 'images', 'fonts', 'geometry', 'shaders', 'videos', 'video', 'data', 'fx', 'js', 'music', 'cms']
      for (const target of targets) {
        // Create dist/ActiveTheory/{target} symlink
        const atTarget = path.join(activeTheoryDir, target)
        const relativeDest = target === 'assets' ? '../assets' : `../assets/${target}`
        if (!fs.existsSync(atTarget)) {
          try {
            fs.symlinkSync(relativeDest, atTarget, 'dir')
          } catch (e) {
            console.warn(`Could not symlink ${atTarget}:`, e.message)
          }
        }

        // Create dist/{target} symlink for root requests
        if (target !== 'assets') {
          const rootTarget = path.join(distDir, target)
          if (!fs.existsSync(rootTarget)) {
            try {
              fs.symlinkSync(`assets/${target}`, rootTarget, 'dir')
            } catch (e) {
              console.warn(`Could not symlink ${rootTarget}:`, e.message)
            }
          }
        }
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [activeTheoryPlugin()],
  assetsInclude: [
    '**/*.ktx',
    '**/*.ktx2',
    '**/*.vs',
    '**/*.json',
    '**/*.woff',
    '**/*.woff2',
    '**/*.otf',
    '**/*.ttf',
    '**/*.bin',
    '**/*.cube',
    '**/*.wasm',
    '**/*.mp3',
    '**/*.webm',
    '**/*.mp4'
  ],
  server: {
    port: 5173,
    host: '127.0.0.1'
  },
  preview: {
    port: 4173,
    host: '127.0.0.1'
  }
})
