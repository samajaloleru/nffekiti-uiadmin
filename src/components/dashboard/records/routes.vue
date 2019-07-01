<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

    import clubsRoutes from "@/components/dashboard/records/clubs/routes.vue"
    // import teamlistRoutes from "@/components/dashboard/records/teamlist/routes.vue"
    // import matchdetailsRoutes from "@/components/dashboard/records/matchdetails/routes.vue"
    // import playerlicensesRoutes from "@/components/dashboard/records/playerlicenses/routes.vue"
    // import playeragreementRoutes from "@/components/dashboard/records/playeragreement/routes.vue"
    

    export default {
        children: [
            {
                path: 'clubs',
                component: clubsRoutes,
                children: clubsRoutes.children
            },
            // {
            //     path: 'teamlist',
            //     component: teamlistRoutes,
            //     children: teamlistRoutes.children
            // },
            // {
            //     path: 'matchdetails',
            //     component: matchdetailsRoutes,
            //     children: matchdetailsRoutes.children
            // },
            // {
            //     path: 'playerlicenses',
            //     component: playerlicensesRoutes,
            //     children: playerlicensesRoutes.children
            // },
            // {
            //     path: 'playeragreement',
            //     component: playeragreementRoutes,
            //     children: playeragreementRoutes.children
            // },
        ],
    }
</script>