<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import matchesSearch from "@/components/dashboard/reports/matches/matches-search"

  export default {
    children: [
      { path: '', component: matchesSearch, name:"matches-search"},
    ],
  }
</script>
