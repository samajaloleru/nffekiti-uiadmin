<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import chartofaccountsRoutes from "@/components/dashboard/maintenance/chartofaccounts/routes.vue"
  import printersRoutes from "@/components/dashboard/maintenance/printers/routes.vue"
  import servicesRoutes from "@/components/dashboard/maintenance/services/routes.vue"

  export default {
    children: [
        {
          path: 'chartofaccounts',
          component: chartofaccountsRoutes,
          children: chartofaccountsRoutes.children
        },
        {
          path: 'printers',
          component: printersRoutes,
          children: printersRoutes.children
        },
        {
          path: 'services',
          component: servicesRoutes,
          children: servicesRoutes.children
        },
       
    ],
  }
</script>