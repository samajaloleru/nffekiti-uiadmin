<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import classlistNew from "@/components/dashboard/reports/classlist/classlist-new"
  import classlistView from "@/components/dashboard/reports/classlist/classlist-view"
  import classlistEdit from "@/components/dashboard/reports/classlist/classlist-edit"
  import classlistSearch from "@/components/dashboard/reports/classlist/classlist-search"

  export default {
    children: [
      { path: '', component: classlistSearch, name:"classlist-search"},
      { path: 'new', component: classlistNew, name:"classlist-new"},
      { path: ':id', component: classlistView, name:"classlist-view"},
      { path: ':id/edit', component: classlistEdit, name:"classlist-edit"},
    ],
  }
</script>
