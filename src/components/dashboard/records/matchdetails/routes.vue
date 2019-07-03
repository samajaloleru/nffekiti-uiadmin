<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import matchdetailsNew from "@/components/dashboard/records/matchdetails/matchdetails-new"
  import matchdetailsView from "@/components/dashboard/records/matchdetails/matchdetails-view"
  import matchdetailsEdit from "@/components/dashboard/records/matchdetails/matchdetails-edit"
  import matchdetailsSearch from "@/components/dashboard/records/matchdetails/matchdetails-search"

  export default {
    children: [
      { path: '', component: matchdetailsSearch, name:"matchdetails-search"},
      { path: 'new', component: matchdetailsNew, name:"matchdetails-new"},
      { path: ':id', component: matchdetailsView, name:"matchdetails-view"},
      { path: ':id/edit', component: matchdetailsEdit, name:"matchdetails-edit"},
    ],
  }
</script>
