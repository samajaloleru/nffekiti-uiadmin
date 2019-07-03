<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import leagueSearch from "@/components/dashboard/reports/league/league-search"

  export default {
    children: [
      { path: '', component: leagueSearch, name:"league-search"},
    ],
  }
</script>
