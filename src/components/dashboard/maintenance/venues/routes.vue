<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import venuesNew from "@/components/dashboard/maintenance/venues/venues-new"
  import venuesView from "@/components/dashboard/maintenance/venues/venues-view"
  import venuesEdit from "@/components/dashboard/maintenance/venues/venues-edit"
  import venuesSearch from "@/components/dashboard/maintenance/venues/venues-search"

  export default {
    children: [
      { path: '', component: venuesSearch, name:"venues-search"},
      { path: 'new', component: venuesNew, name:"venues-new"},
      { path: ':id', component: venuesView, name:"venues-view"},
      { path: ':id/edit', component: venuesEdit, name:"venues-edit"},
    ],
  }
</script>