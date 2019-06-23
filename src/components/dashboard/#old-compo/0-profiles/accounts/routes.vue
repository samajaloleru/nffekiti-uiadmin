<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import accountsNew from "@/components/dashboard/records/accounts/accounts-new"
  import accountsView from "@/components/dashboard/records/accounts/accounts-view"
  import accountsEdit from "@/components/dashboard/records/accounts/accounts-edit"
  import accountsSearch from "@/components/dashboard/records/accounts/accounts-search"

  export default {
    children: [
      { path: '', component: accountsSearch, name:"accounts-search"},
      { path: 'new', component: accountsNew, name:"accounts-new"},
      { path: ':id', component: accountsView, name:"accounts-view"},
      { path: ':id/edit', component: accountsEdit, name:"accounts-edit"},
    ],
  }
</script>
