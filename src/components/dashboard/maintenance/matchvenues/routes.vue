<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import matchvenuesNew from "@/components/dashboard/maintenance/matchvenues/matchvenues-new"
  import matchvenuesView from "@/components/dashboard/maintenance/matchvenues/matchvenues-view"
  import matchvenuesEdit from "@/components/dashboard/maintenance/matchvenues/matchvenues-edit"
  import matchvenuesSearch from "@/components/dashboard/maintenance/matchvenues/matchvenues-search"

  export default {
    children: [
      { path: '', component: matchvenuesSearch, name:"matchvenues-search"},
      { path: 'new', component: matchvenuesNew, name:"matchvenues-new"},
      { path: ':id', component: matchvenuesView, name:"matchvenues-view"},
      { path: ':id/edit', component: matchvenuesEdit, name:"matchvenues-edit"},
    ],
  }
</script>
