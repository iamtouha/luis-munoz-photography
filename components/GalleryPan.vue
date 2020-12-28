<template>
  <div class="relative">
    <div class="grid sm:grid-cols-2 grid-cols-1 gap-5 mt-3 mb-10">
      <transition-group
        name="slide"
        tag="div"
        class="grid gap-5 auto-rows-min grid-cols-1"
      >
        <div
          v-for="img in columns[0]"
          :key="img.url"
          class="relative image-wrapper"
        >
          <img
            style="width:100%"
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
      </transition-group>
      <transition-group
        name="slide"
        tag="div"
        class="grid gap-5 auto-rows-min grid-cols-1"
      >
        <div
          v-for="img in columns[1]"
          :key="img.url"
          class="relative image-wrapper"
        >
          <img
            style="width:100%"
            :srcset="img.srcset"
            sizes="(min-width:650px) 100vw, 50vw"
            :src="img.formats.small.url"
            alt=""
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
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "GalleryPan",
  props: {
    files: Array
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    columns() {
      const { columns } = this.files
        .map(file => {
          const { small, medium, large } = file.formats;
          file.srcset = `
                ${small.url} 500w,
                ${medium.url} 750w,
                ${large.url} 1000w,
          `;

          return file;
        })
        .reduce(
          (acc, photo) => {
            if (acc.col1 <= acc.col2) {
              acc.columns[0].push(photo);
              acc.col1 += photo.height / photo.width;
            } else {
              acc.columns[1].push(photo);
              acc.col2 += photo.height / photo.width;
            }
            return acc;
          },
          {
            col1: 0,
            col2: 0,
            columns: [[], []]
          }
        );
      return columns;
    }
  }
};
</script>

<style lang="sass">
.image-wrapper
    background-color: #eee
    min-height:300px

.slide-leave-active,
.slide-enter-active
  transition: .3s
.slide-enter,
.slide-leave-to
  transform: translateY(30px)
  opacity:0
</style>
