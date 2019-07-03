<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

    import clubsRoutes from "@/components/dashboard/records/clubs/routes.vue"
    import teamsRoutes from "@/components/dashboard/records/teams/routes.vue"
    import matchdetailsRoutes from "@/components/dashboard/records/matchdetails/routes.vue"
    import playersRoutes from "@/components/dashboard/records/players/routes.vue"
    import playeragreementRoutes from "@/components/dashboard/records/agreements/routes.vue"
    

    export default {
        children: [
            {
                path: 'clubs',
                component: clubsRoutes,
                children: clubsRoutes.children
            },
            {
                path: 'teams',
                component: teamsRoutes,
                children: teamsRoutes.children
            },
            {
                path: 'matchdetails',
                component: matchdetailsRoutes,
                children: matchdetailsRoutes.children
            },
            {
                path: 'players',
                component: playersRoutes,
                children: playersRoutes.children
            },
            {
                path: 'agreements',
                component: playeragreementRoutes,
                children: playeragreementRoutes.children
            },
        ],
    }
</script>