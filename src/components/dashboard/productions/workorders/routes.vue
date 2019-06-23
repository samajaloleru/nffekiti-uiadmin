<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import workordersNew from "@/components/dashboard/productions/workorders/workorders-new"
  import workordersView from "@/components/dashboard/productions/workorders/workorders-view"
  import workordersEdit from "@/components/dashboard/productions/workorders/workorders-edit"
  import workordersSearch from "@/components/dashboard/productions/workorders/workorders-search"

  export default {
    children: [
      { path: '', component: workordersSearch, name:"workorders-search"},
      { path: 'new', component: workordersNew, name:"workorders-new"},
      { path: ':id', component: workordersView, name:"workorders-view"},
      { path: ':id/edit', component: workordersEdit, name:"workorders-edit"},
    ],
  }
</script>
