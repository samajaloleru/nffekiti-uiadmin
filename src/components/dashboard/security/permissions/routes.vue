<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import permissionsNew from "@/components/dashboard/security/permissions/permissions-new"
  import permissionsView from "@/components/dashboard/security/permissions/permissions-view"
  import permissionsEdit from "@/components/dashboard/security/permissions/permissions-edit"
  import permissionsSearch from "@/components/dashboard/security/permissions/permissions-search"

  export default {
    children: [
      { path: '', component: permissionsSearch, name:"permissions-search"},
      { path: 'new', component: permissionsNew, name:"permissions-new"},
      { path: ':id', component: permissionsView, name:"permissions-view"},
      { path: ':id/edit', component: permissionsEdit, name:"permissions-edit"},
    ],
  }
</script>