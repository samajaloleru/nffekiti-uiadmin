<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import venuesRoutes from "@/components/dashboard/maintenance/venues/routes.vue"
  import leaguesRoutes from "@/components/dashboard/maintenance/leagues/routes.vue"
  
  export default {
    children: [
        {
          path: 'venues',
          component: venuesRoutes,
          children: venuesRoutes.children
        },
        {
          path: 'leagues',
          component: leaguesRoutes,
          children: leaguesRoutes.children
        },
    ],
  }
</script>