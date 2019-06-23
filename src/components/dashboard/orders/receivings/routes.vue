<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import receivingsNew from "@/components/dashboard/orders/receivings/receivings-new"
  import receivingsView from "@/components/dashboard/orders/receivings/receivings-view"
  import receivingsEdit from "@/components/dashboard/orders/receivings/receivings-edit"
  import receivingsSearch from "@/components/dashboard/orders/receivings/receivings-search"

  export default {
    children: [
      { path: '', component: receivingsSearch, name:"receivings-search"},
      { path: 'new', component: receivingsNew, name:"receivings-new"},
      { path: ':id', component: receivingsView, name:"receivings-view"},
      { path: ':id/edit', component: receivingsEdit, name:"receivings-edit"},
    ],
  }
</script>
