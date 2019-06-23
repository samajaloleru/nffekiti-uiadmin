<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import permissionsRoutes from "@/components/dashboard/security/permissions/routes.vue"
  import databaseRoutes from "@/components/dashboard/security/database/routes.vue"
  import rolesRoutes from "@/components/dashboard/security/roles/routes.vue"
  import usersRoutes from "@/components/dashboard/security/users/routes.vue"

  export default {
    children: [
        {
          path: 'database',
          component: databaseRoutes,
          children: databaseRoutes.children
        },
        {
          path: 'permissions',
          component: permissionsRoutes,
          children: permissionsRoutes.children
        },
        {
          path: 'roles',
          component: rolesRoutes,
          children: rolesRoutes.children
        },
        {
          path: 'users',
          component: usersRoutes,
          children: usersRoutes.children
        },
    ],
  }
</script>