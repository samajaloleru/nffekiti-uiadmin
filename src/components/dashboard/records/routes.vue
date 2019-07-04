<template>
  <router-view></router-view>
</template>

<script type="text/javascript">
    
    import teamsRoutes from "@/components/dashboard/records/teams/routes.vue"
    import playersRoutes from "@/components/dashboard/records/players/routes.vue"
    import profilesRoutes from "@/components/dashboard/records/profiles/routes.vue"
    import playeragreementRoutes from "@/components/dashboard/records/agreements/routes.vue"

    export default {
        children: [
            {
                path: 'teams',
                component: teamsRoutes,
                children: teamsRoutes.children
            },
            {
                path: 'players',
                component: playersRoutes,
                children: playersRoutes.children
            },
            {
                path: 'profiles',
                component: profilesRoutes,
                children: profilesRoutes.children
            },
            {
                path: 'agreements',
                component: playeragreementRoutes,
                children: playeragreementRoutes.children
            },
        ],
    }
</script>