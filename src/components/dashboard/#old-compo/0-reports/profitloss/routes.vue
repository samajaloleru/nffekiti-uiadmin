<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import profitlossNew from "@/components/dashboard/reports/profitloss/profitloss-new"
  import profitlossView from "@/components/dashboard/reports/profitloss/profitloss-view"
  import profitlossEdit from "@/components/dashboard/reports/profitloss/profitloss-edit"
  import profitlossSearch from "@/components/dashboard/reports/profitloss/profitloss-search"

  export default {
    children: [
      { path: '', component: profitlossSearch, name:"profitloss-search"},
      { path: 'new', component: profitlossNew, name:"profitloss-new"},
      { path: ':id', component: profitlossView, name:"profitloss-view"},
      { path: ':id/edit', component: profitlossEdit, name:"profitloss-edit"},
    ],
  }
</script>
