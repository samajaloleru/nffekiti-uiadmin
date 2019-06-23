<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import trialbalanceNew from "@/components/dashboard/reports/trialbalance/trialbalance-new"
  import trialbalanceView from "@/components/dashboard/reports/trialbalance/trialbalance-view"
  import trialbalanceEdit from "@/components/dashboard/reports/trialbalance/trialbalance-edit"
  import trialbalanceSearch from "@/components/dashboard/reports/trialbalance/trialbalance-search"

  export default {
    children: [
      { path: '', component: trialbalanceSearch, name:"trialbalance-search"},
      { path: 'new', component: trialbalanceNew, name:"trialbalance-new"},
      { path: ':id', component: trialbalanceView, name:"trialbalance-view"},
      { path: ':id/edit', component: trialbalanceEdit, name:"trialbalance-edit"},
    ],
  }
</script>
