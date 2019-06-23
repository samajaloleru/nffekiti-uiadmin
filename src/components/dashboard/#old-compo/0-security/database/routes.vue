<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import database from "@/components/dashboard/security/database/database"
  export default {
    children: [
      { path: '', component: database, name:"database"},
    ],
  }
</script>