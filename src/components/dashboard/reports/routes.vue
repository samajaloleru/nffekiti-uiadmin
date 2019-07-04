<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

    import profilesRoutes from "@/components/dashboard/reports/profiles/routes.vue"
    import attendancesRoutes from "@/components/dashboard/reports/attendances/routes.vue"

    import clubsRoutes from "@/components/dashboard/reports/clubs/routes.vue"
    import matchesRoutes from "@/components/dashboard/reports/matches/routes.vue"
    import playersRoutes from "@/components/dashboard/reports/players/routes.vue"
    import leaguesRoutes from "@/components/dashboard/reports/leagues/routes.vue"
    import birthdaysRoutes from "@/components/dashboard/reports/birthdays/routes.vue"
    import performancesRoutes from "@/components/dashboard/reports/performances/routes.vue"

    export default {
        children: [ 
            {
                path: 'profiles',
                component: profilesRoutes,
                children: profilesRoutes.children
            },
            {
                path: 'attendances',
                component: attendancesRoutes,
                children: attendancesRoutes.children
            },
            {
                path: 'clubs',
                component: clubsRoutes,
                children: clubsRoutes.children
            },
            {
                path: 'matches',
                component: matchesRoutes,
                children: matchesRoutes.children
            },
            {
                path: 'players',
                component: playersRoutes,
                children: playersRoutes.children
            },
            {
                path: 'leagues',
                component: leaguesRoutes,
                children: leaguesRoutes.children
            },
            {
                path: 'birthdays',
                component: birthdaysRoutes,
                children: birthdaysRoutes.children
            },
            {
                path: 'performances',
                component: performancesRoutes,
                children: performancesRoutes.children
            },
        ],
    }
</script>