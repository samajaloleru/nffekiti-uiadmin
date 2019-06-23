<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import servicesNew from "@/components/dashboard/maintenance/services/services-new"
  import servicesView from "@/components/dashboard/maintenance/services/services-view"
  import servicesEdit from "@/components/dashboard/maintenance/services/services-edit"
  import servicesSearch from "@/components/dashboard/maintenance/services/services-search"

  export default {
    children: [
      { path: '', component: servicesSearch, name:"services-search"},
      { path: 'new', component: servicesNew, name:"services-new"},
      { path: ':id', component: servicesView, name:"services-view"},
      { path: ':id/edit', component: servicesEdit, name:"services-edit"},
    ],
  }
</script>