<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

    import profilesRoutes from "@/components/dashboard/reports/profiles/routes.vue"
    import attendancesRoutes from "@/components/dashboard/reports/attendances/routes.vue"
    import clubsRoutes from "@/components/dashboard/reports/clubs/routes.vue"
    import matchRoutes from "@/components/dashboard/reports/match/routes.vue"
    import playerRoutes from "@/components/dashboard/reports/player/routes.vue"
    import leagueRoutes from "@/components/dashboard/reports/league/routes.vue"
    import birthdaysRoutes from "@/components/dashboard/reports/birthdays/routes.vue"
    import performanceRoutes from "@/components/dashboard/reports/performance/routes.vue"

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
                path: 'match',
                component: matchRoutes,
                children: matchRoutes.children
            },
            {
                path: 'player',
                component: playerRoutes,
                children: playerRoutes.children
            },
            {
                path: 'league',
                component: leagueRoutes,
                children: leagueRoutes.children
            },
            {
                path: 'birthdays',
                component: birthdaysRoutes,
                children: birthdaysRoutes.children
            },
            {
                path: 'performance',
                component: performanceRoutes,
                children: performanceRoutes.children
            },
        ],
    }
</script>