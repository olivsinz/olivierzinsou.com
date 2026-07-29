const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home.vue'),
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../pages/BlogList.vue'),
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: () => import('../pages/BlogPost.vue'),
  },
]

export default routes
