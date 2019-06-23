<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import printersNew from "@/components/dashboard/maintenance/printers/printers-new"
  import printersView from "@/components/dashboard/maintenance/printers/printers-view"
  import printersEdit from "@/components/dashboard/maintenance/printers/printers-edit"
  import printersSearch from "@/components/dashboard/maintenance/printers/printers-search"

  export default {
    children: [
      { path: '', component: printersSearch, name:"printers-search"},
      { path: 'new', component: printersNew, name:"printers-new"},
      { path: ':id', component: printersView, name:"printers-view"},
      { path: ':id/edit', component: printersEdit, name:"printers-edit"},
    ],
  }
</script>