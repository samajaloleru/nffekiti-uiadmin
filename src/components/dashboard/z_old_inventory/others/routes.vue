<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import othersNew from "@/components/dashboard/inventory/others/others-new"
  import othersView from "@/components/dashboard/inventory/others/others-view"
  import othersEdit from "@/components/dashboard/inventory/others/others-edit"
  import othersSearch from "@/components/dashboard/inventory/others/others-search"

  export default {
    children: [
      { path: '', component: othersSearch, name:"others-search"},
      { path: 'new', component: othersNew, name:"others-new"},
      { path: ':id', component: othersView, name:"others-view"},
      { path: ':id/edit', component: othersEdit, name:"others-edit"},
    ],
  }
</script>
