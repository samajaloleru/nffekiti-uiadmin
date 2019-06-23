<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import usersNew from "@/components/dashboard/security/users/users-new"
  import usersView from "@/components/dashboard/security/users/users-view"
  import usersEdit from "@/components/dashboard/security/users/users-edit"
  import usersSearch from "@/components/dashboard/security/users/users-search"

  export default {
    children: [
      { path: '', component: usersSearch, name:"users-search"},
      { path: 'new', component: usersNew, name:"users-new"},
      { path: ':id', component: usersView, name:"users-view"},
      { path: ':id/edit', component: usersEdit, name:"users-edit"},
    ],
  }
</script>