<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import playerSearch from "@/components/dashboard/reports/player/player-search"

  export default {
    children: [
      { path: '', component: playerSearch, name:"player-search"},
    ],
  }
</script>
