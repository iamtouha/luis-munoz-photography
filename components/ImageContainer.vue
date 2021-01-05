<template>
  <div
    :style="{
      'padding-bottom': `${(100 * img.height) / img.width}%`,
      'background-image': `url(${img.formats.thumbnail.url})`
    }"
    class="relative image-wrapper"
  >
    <img
      class="absolute top-0 left-0 right-0"
      :srcset="img.srcset"
      sizes="(min-width:650px) 100vw, 50vw"
      :src="img.formats.small.url"
    />
    <div
      style="background: rgba(0,0,0,0.4)"
      class="absolute bottom-0 flex justify-between left-0 w-full h-8 text-white px-2"
    >
      <span class="text-xs py-2">
        {{ img.caption }}
      </span>
      <button class="focus:outline-none">
        <img src="/icons/plus-on-picures.svg" alt="Plus" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageContainer",
  props: {
    img: Object
  },
  data: () => ({
    //
  })
};
</script>

<style lang="sass">
.image-wrapper
  background-repeat: no-repeat
  background-size:  cover
</style>
