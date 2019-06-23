<template id="">
  <section>
    <div class="mt2">
      <table class="bg-light-gray w-100 black">
        <thead class="tl f5">
          <slot name="tableHead" ></slot>
        </thead>
        <tbody>
          <slot name="tableBody" ></slot>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script type="text/javascript">
  export default {
  }
</script>
<style media="screen">

</style>
