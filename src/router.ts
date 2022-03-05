import { RestifyRouter } from '@tunframework/tun-rest-router'

interface Product {
  id: string
  code: string
  name: string
}

const products: Partial<Product>[] = [
  { id: 'a', code: 'a', name: 'A' },
  { id: 'b', code: 'b', name: 'B' },
  { id: 'c', code: 'c', name: 'C' }
]

export const router = new RestifyRouter()
  .get('/product/list', async (ctx, next) => {
    return products
  })
  .get('/product/:id', async (ctx, next) => {
    return products.find((o) => o.id === ctx.req.slugs.id) || {}
  })
  .post('/product/:id', async (ctx, next) => {
    let id = ctx.req.slugs.id
    let obj: Partial<Product> = {}
    if (id === 'new') {
      obj = {
        ...ctx.req.body,
        id: String(Date.now())
      }
      products.push(obj)
    } else {
      const oldIndex = products.findIndex((o) => o.id === id)
      if (oldIndex > -1) {
        obj = ctx.req.body
        products.splice(oldIndex, 1, obj)
      }
    }
    return obj
  })
  .put('/product/{id}', async (ctx, next) => {
    let id = ctx.req.slugs.id
    let obj: Partial<Product> = {}
    const oldIndex = products.findIndex((o) => o.id === id)
    if (oldIndex > -1) {
      obj = ctx.req.body
      products.splice(oldIndex, 1, obj)
    }
    return obj
  })
  .delete('/product/:id', async (ctx, next) => {
    let id = ctx.req.slugs.id
    let obj: Partial<Product> = {}
    const oldIndex = products.findIndex((o) => o.id === id)
    if (oldIndex > -1) {
      obj = products[oldIndex]
      products.splice(oldIndex, 1)
    }
    return obj
  })
