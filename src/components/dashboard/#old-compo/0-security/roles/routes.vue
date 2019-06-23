<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import rolesNew from "@/components/dashboard/security/roles/roles-new"
  import rolesView from "@/components/dashboard/security/roles/roles-view"
  import rolesEdit from "@/components/dashboard/security/roles/roles-edit"
  import rolesSearch from "@/components/dashboard/security/roles/roles-search"

  export default {
    children: [
      { path: '', component: rolesSearch, name:"roles-search"},
      { path: 'new', component: rolesNew, name:"roles-new"},
      { path: ':id', component: rolesView, name:"roles-view"},
      { path: ':id/edit', component: rolesEdit, name:"roles-edit"},
    ],
  }
</script>