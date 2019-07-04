<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import performancesSearch from "@/components/dashboard/reports/performances/performances-search"

  export default {
    children: [
      { path: '', component: performancesSearch, name:"performances-search"},
    ],
  }
</script>
