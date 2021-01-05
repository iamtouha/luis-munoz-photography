<template>
  <div class="relative">
    <p v-show="name">{{ name }}</p>
    <div
      v-show="files.length"
      class="grid sm:grid-cols-2 grid-cols-1 gap-5 mt-3 mb-10"
    >
      <transition-group
        name="slide"
        tag="div"
        class="grid gap-5 auto-rows-min grid-cols-1"
      >
        <image-container v-for="img in columns[0]" :key="img.url" :img="img" />
      </transition-group>
      <transition-group
        name="slide"
        tag="div"
        class="grid gap-5 auto-rows-min grid-cols-1"
      >
        <image-container v-for="img in columns[1]" :key="img.url" :img="img" />
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "GalleryPan",
  props: {
    files: {
      type: Array,
      default: []
    },
    name: String
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
  background-repeat: no-repeat
  background-size:  cover

.slide-leave-active,
.slide-enter-active
  transition: .3s
.slide-enter,
.slide-leave-to
  transform: translateY(30px)
  opacity:0
</style>
