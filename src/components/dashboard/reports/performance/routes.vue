<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import performanceSearch from "@/components/dashboard/reports/performance/performance-search"

  export default {
    children: [
      { path: '', component: performanceSearch, name:"performance-search"},
    ],
  }
</script>
