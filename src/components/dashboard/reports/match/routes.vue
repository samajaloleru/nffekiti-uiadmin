<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import matchSearch from "@/components/dashboard/reports/match/match-search"

  export default {
    children: [
      { path: '', component: matchSearch, name:"match-search"},
    ],
  }
</script>
