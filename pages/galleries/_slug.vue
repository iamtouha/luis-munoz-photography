<template>
  <div class="page-wrapper">
    <div class="flex">
      <h4 class="gallery-title">{{ gallery.title_en }}</h4>
      <input type="text" ref="searchBox" class="search-box" v-model="search" />
      <img
        class="search-icon"
        src="/icons/loupe-search.svg"
        alt="search"
        @click="focusOnSearch"
      />
      <toggle-btn v-model="toggle" />
    </div>
    <hr class="mb-3 mt-1" />
    <p class="text-sm">
      {{ gallery.description_en }}
    </p>
    <div class="flex py-2 mt-2 relative">
      <button
        class="folderview-button folder-click"
        @click="folderDropdown = !folderDropdown"
      >
        <img
          class="mr-2 folder-click"
          :src="
            folderDropdown
              ? '/icons/folder-open.svg'
              : '/icons/folder-closed.svg'
          "
          alt="Folder"
        />
        <span class="text-sm folder-click">
          230/10
        </span>
      </button>
      <transition name="slide" style="display:contents;">
        <ul
          v-show="folderDropdown"
          v-click-outside="folderDdownConfig"
          class="folder-dropdown z-10 bg-white"
        >
          <li>
            <button class="focus:outline-none mr-2">
              <img class="w-3.5 h-3.5" src="/icons/check-all-blank.svg" />
            </button>
            folder-1
            <span class="flex-grow mt-3 mb-1.5 mx-1"></span>
            <span class="text-sm">
              3
            </span>
          </li>
        </ul>
      </transition>
      <img
        class="ml-4 px-2 cursor-pointer mr-auto"
        src="/icons/details-view.svg"
      />

      <button class="focus:outline-none mr-1 px-2 ml-auto">
        <img src="/icons/add_to_downloads.svg" />
      </button>
      <button
        class="focus:outline-none mx-1 px-2 bg-blue-300 text-white rounded text-sm"
      >
        10
      </button>
      <button class="focus:outline-none mx-1 px-2">
        <img src="/icons/share.svg" />
      </button>
      <button
        :disabled="!gallery.allowDownload"
        class="focus:outline-none ml-1 pl-1"
      >
        <img
          :src="
            gallery.allowDownload
              ? '/icons/download-cloud.svg'
              : '/icons/download-cloud-disabled.svg'
          "
        />
      </button>
    </div>
    <client-only>
      <div v-show="photoColumns.length" class="flex flex-row space-x-3">
        <transition-group
          appear
          name="slide"
          v-for="(col, i) in photoColumns"
          :key="i"
          tag="div"
          style="flex-basis:0"
          class="flex flex-col flex-grow space-y-3"
        >
          <div v-for="img in col" :key="img.grid_url" class="relative">
            <img class="w-full min-h-15" :src="img.grid_url" />
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
    </client-only>
  </div>
</template>

<script>
import query from "~/assets/queries/gallery.gql";

export default {
  name: "Gallery",
  async asyncData({ app, params }) {
    const provider = app.apolloProvider.defaultClient;
    const resp = await provider
      .query({
        query,
        variables: {
          slug: params.slug
        }
      })
      .catch(console.log);
    return {
      gallery: resp.data.galleries[0]
    };
  },
  data() {
    return {
      gallery: {
        photos: [],
        files: []
      },
      folderDdownConfig: {
        handler: this.hideFolderDropdown,
        middleware: ({ target }) =>
          !target.className.split(" ").includes("folder-click"),
        events: ["click"],
        isActive: true
      },
      toggle: false,
      folderDropdown: false,
      loaded: false,
      search: "",
      radio: true
    };
  },
  computed: {
    photoColumns() {
      if (!this.gallery.files.length) return [];
      return this.getPhotoColumns(this.gallery.files);
    },
    folderPhotoColumns() {
      if (this.gallery.files.length) return [];
      return this.gallery.folders.map(folder => {
        return {
          name: folder.name,
          columns: this.getPhotoColumns(folder.files)
        };
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.loaded = true;
    }, 100);
  },
  head() {
    return {
      title: this.gallery.title_en
    };
  },
  methods: {
    focusOnSearch() {
      this.$refs.searchBox?.focus();
    },
    hideFolderDropdown() {
      this.folderDropdown = false;
    },
    getPhotoColumns(files) {
      const mobile = process.client && document?.documentElement.clientWidth;
      let photos = [];
      if (mobile <= 800) {
        photos = files.map(file => {
          const { formats, width, height, caption } = file;
          return {
            formats,
            grid_url: formats.small.url,
            width,
            height,
            caption
          };
        });
        return [photos];
      }
      photos = files.map(file => {
        const { formats, width, height, caption } = file;
        return {
          formats,
          grid_url: formats.large.url,
          width,
          caption,
          height
        };
      });
      const { columns } = photos.reduce(
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
.gallery-title
  @apply text-base font-bold mr-auto ml-0

.search-icon
  @apply cursor-pointer mr-3

.search-box
  @apply mr-0 ml-auto outline-none
  transition: border .3s ease-in-out
  border-bottom: 1px solid rgba(#000, 0)
  &:focus
    border-bottom: 1px solid #3e3e3e

.folderview-button
  @apply focus:outline-none flex
.folder-dropdown
  @apply absolute top-8 shadow-md p-4
  min-width:250px
  li
    @apply p-2 flex
    span.flex-grow
      border-bottom: 1px dashed #aaa

.slide-leave-active,
.slide-enter-active
  transition: .3s
.slide-enter,
.slide-leave-to
  transform: translateY(30px)
  opacity:0
</style>
