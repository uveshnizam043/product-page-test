import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: () => ({ name: 'product', params: { slug: 'fall-limited-edition-sneakers' } })
    },
    {
      path: '/shop/product/:slug',
      name: 'product',
      component: () => import('./views/Product.vue')
    },
    {
      path: '/404',
      name: 'PageNotExist',
      component: () => import('./views/NotFound.vue'),
    },
    {
      path: "/:catchAll(.*)", 
      redirect: () => ({ name: 'PageNotExist'})
    },
  ],
})

export default router;