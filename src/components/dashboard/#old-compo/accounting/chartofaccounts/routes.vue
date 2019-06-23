<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import chartofaccountsNew from "@/components/dashboard/maintenance/chartofaccounts/chartofaccounts-new"
  import chartofaccountsView from "@/components/dashboard/maintenance/chartofaccounts/chartofaccounts-view"
  import chartofaccountsEdit from "@/components/dashboard/maintenance/chartofaccounts/chartofaccounts-edit"
  import chartofaccountsSearch from "@/components/dashboard/maintenance/chartofaccounts/chartofaccounts-search"

  export default {
    children: [
      { path: '', component: chartofaccountsSearch, name:"chartofaccounts-search"},
      { path: 'new', component: chartofaccountsNew, name:"chartofaccounts-new"},
      { path: ':id', component: chartofaccountsView, name:"chartofaccounts-view"},
      { path: ':id/edit', component: chartofaccountsEdit, name:"chartofaccounts-edit"},
    ],
  }
</script>