<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import clubsRoutes from "@/components/dashboard/maintenance/clubs/routes.vue"
  import venuesRoutes from "@/components/dashboard/maintenance/venues/routes.vue"
  import leaguesRoutes from "@/components/dashboard/maintenance/leagues/routes.vue"
  import matchvenuesRoutes from "@/components/dashboard/maintenance/matchvenues/routes.vue"
  
  export default {
    children: [
        {
            path: 'clubs',
            component: clubsRoutes,
            children: clubsRoutes.children
        },
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
        {
            path: 'matchvenues',
            component: matchvenuesRoutes,
            children: matchvenuesRoutes.children
        },
    ],
  }
</script>