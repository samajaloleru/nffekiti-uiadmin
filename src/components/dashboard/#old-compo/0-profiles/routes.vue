<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import profilesRoutes from "@/components/dashboard/records/profiles/routes.vue"
  import accountsRoutes from "@/components/dashboard/records/accounts/routes.vue"
  import journalRoutes from "@/components/dashboard/records/journal/routes.vue"
  

  export default {
    children: [
        {
          path: 'profiles',
          component: profilesRoutes,
          children: profilesRoutes.children
        },
        {
          path: 'accounts',
          component: accountsRoutes,
          children: accountsRoutes.children
        },
        {
          path: 'journal',
          component: journalRoutes,
          children: journalRoutes.children
        },
    ],
  }
</script>