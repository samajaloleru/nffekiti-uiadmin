<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import blogsRoutes from "@/components/dashboard/marketing/blogs/routes.vue"
  import mediagalleryRoutes from "@/components/dashboard/marketing/mediagallery/routes.vue"
  import newsletterRoutes from "@/components/dashboard/marketing/newsletter/routes.vue"

  export default {
    children: [
        {
          path: 'blogs',
          component: blogsRoutes,
          children: blogsRoutes.children
        },
        {
          path: 'mediagallery',
          component: mediagalleryRoutes,
          children: mediagalleryRoutes.children
        },
        {
          path: 'newsletter',
          component: newsletterRoutes,
          children: newsletterRoutes.children
        },
    ],
  }
</script>