<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

    import profilesRoutes from "@/components/dashboard/reports/profiles/routes.vue"
    import attendancesRoutes from "@/components/dashboard/reports/attendances/routes.vue"
    import birthdaysRoutes from "@/components/dashboard/reports/birthdays/routes.vue"

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
                path: 'birthdays',
                component: birthdaysRoutes,
                children: birthdaysRoutes.children
            },
        ],
    }
</script>