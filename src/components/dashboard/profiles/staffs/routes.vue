<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import staffsNew from "@/components/dashboard/profiles/staffs/staffs-new"
  import staffsView from "@/components/dashboard/profiles/staffs/staffs-view"
  import staffsEdit from "@/components/dashboard/profiles/staffs/staffs-edit"
  import staffsSearch from "@/components/dashboard/profiles/staffs/staffs-search"

  export default {
    children: [
      { path: '', component: staffsSearch, name:"staffs-search"},
      { path: 'new', component: staffsNew, name:"staffs-new"},
      { path: ':id', component: staffsView, name:"staffs-view"},
      { path: ':id/edit', component: staffsEdit, name:"staffs-edit"},
    ],
  }
</script>
