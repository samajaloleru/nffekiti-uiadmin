<template id="">
  <section>
    <div class="">
      <table class="fixed w-80 black" style="min-width:900px">
        <thead class="f7">
          <slot name="tableHead" ></slot>
        </thead>
        <tbody class="f7">
          <slot name="tableBody" ></slot>
        </tbody>
      </table>
    </div>
  </section>
</template>

