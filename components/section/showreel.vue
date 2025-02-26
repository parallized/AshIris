<script setup lang="ts"></script>

<template>
  <section class="showreel">
    <div class="content">
      <div class="w-[34%] flex flex-col pt-[30vh] h-full py-8">
        <h1 class="text-[50px] tracking-wider">技术画廊</h1>
        <h2 class="text-[22px] tracking-wide opacity-60 z-[0]">
          自由意味着责任，或许多数人都惧怕自由。
        </h2>
      </div>

      <div class="image-container">
        <img src="~/assets/image/curve.webp" >
        <div class="mask"/>
      </div>
    </div>

    <ShowreelGrid/>
  </section>
</template>

<style scoped lang="scss">
.showreel {
  @apply bg-black min-h-[100vh] pb-[30vh] w-full text-white;

  .content {
    @apply z-[0] max-w-[1440px] h-full mx-auto flex relative;
  }

  .image-container {
    @apply right-0 relative w-[66%] z-[-1];

    .mask {
      @apply inset-0 absolute z-[1] bg-gradient-to-r from-black to-transparent;
    }
  }
}
</style>
