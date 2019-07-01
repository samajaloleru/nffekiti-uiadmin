<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import attendancesSearch from "@/components/dashboard/reports/attendances/attendances-search"

  export default {
    children: [
      { path: '', component: attendancesSearch, name:"attendances-search"},
    ],
  }
</script>
