import { TunApplication } from '@tunframework/tun'
import { bodyparser } from '@tunframework/tun-bodyparser'
import { RestifyRouter } from '@tunframework/tun-rest-router'
import { AddressInfo } from 'node:net'

const app = new TunApplication()
app.use(bodyparser())

const router = new RestifyRouter()
  .get('/', async (ctx, next) => `Hi, world!`)
  .post('/', async (ctx, next) => JSON.stringify(ctx.req.body))
  .put('/{id}', async (ctx, next) => `${ctx.req.slugs.id}`)
  .delete('/:id', async (ctx, next) => `${ctx.req.slugs.id}`)

app.use(router.routes())
app.use(router.allowedMethods())
const server = app.listen({ host: '127.0.0.1', port: 3000 })

server.on('listening', async () => {
  let addr = (server.address() || {}) as AddressInfo
  console.log(`listening: http://${addr.address}:${addr.port}`)
})
