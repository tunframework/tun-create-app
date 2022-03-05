import { TunApplication } from '@tunframework/tun'
import { bodyparser } from '@tunframework/tun-bodyparser'
import type { AddressInfo } from 'node:net'
import { router } from './router.js'
import { statics } from '@tunframework/tun-statics'
import { resolve } from 'node:path'

const app = new TunApplication()
app.use(bodyparser())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(
  statics({
    dir: resolve(process.cwd(), 'statics'),
    prefix: '/',
    cache: true,
    allowUnknownMimeWithExts: true
  })
)
// custom handle 404
app.use(async (ctx, next) => {
  if (!ctx.res.status || ctx.res.status === 404) {
    if (ctx.req.accepts('html')) {
      ctx.body = `<div style="color: red;">
      Oops, the page ${ctx.req.path} your are looking for is not found!
      </div>`
      // return str directly not work now since ctx.res.status is 404(not found)(currently)
    }
  }
})

const server = app.listen({ host: '127.0.0.1', port: 3000 })
server.on('listening', async () => {
  let addr = (server.address() || {}) as AddressInfo
  console.log(`listening: http://${addr.address}:${addr.port}`)
})
