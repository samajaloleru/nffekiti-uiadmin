<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import classlistRoutes from "@/components/dashboard/reports/classlist/routes.vue"
  import accountstatementRoutes from "@/components/dashboard/reports/accountstatement/routes.vue"
  import trialbalanceRoutes from "@/components/dashboard/reports/trialbalance/routes.vue"
  import profitlossRoutes from "@/components/dashboard/reports/profitloss/routes.vue"

  export default {
    children: [
        {
          path: 'classlist',
          component: classlistRoutes,
          children: classlistRoutes.children
        },
        {
          path: 'accountstatement',
          component: accountstatementRoutes,
          children: accountstatementRoutes.children
        },
        {
          path: 'trialbalance',
          component: trialbalanceRoutes,
          children: trialbalanceRoutes.children
        },
        {
          path: 'profitloss',
          component: profitlossRoutes,
          children: profitlossRoutes.children
        },
    ],
  }
</script></script>