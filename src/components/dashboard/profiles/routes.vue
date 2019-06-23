<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import playersRoutes from "@/components/dashboard/profiles/players/routes.vue"
  import suppliersRoutes from "@/components/dashboard/profiles/suppliers/routes.vue"
  import staffsRoutes from "@/components/dashboard/profiles/staffs/routes.vue"
  import documentsRoutes from "@/components/dashboard/profiles/documents/routes.vue"
  import settingsRoutes from "@/components/dashboard/profiles/settings/routes.vue"
  

  export default {
    children: [
      {
        path: 'players',
        component: playersRoutes,
        children: playersRoutes.children
      },
      {
        path: 'staffs',
        component: staffsRoutes,
        children: staffsRoutes.children
      },
      {
        path: 'suppliers',
        component: suppliersRoutes,
        children: suppliersRoutes.children
      },
      {
        path: 'documents',
        component: documentsRoutes,
        children: documentsRoutes.children
      },
      {
        path: 'settings',
        component: settingsRoutes,
        children: settingsRoutes.children
      },
    ],
  }
</script>