<template id="">
  <section>
    <div class="overflow-auto">
      <table class="w-100 black" style="min-width:900px; max-height:75vh">
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

