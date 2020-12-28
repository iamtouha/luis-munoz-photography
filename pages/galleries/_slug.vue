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
    <gallery-pan :folders="gallery.folders" :files="gallery.files" />
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
    const gallery = resp.data.galleries[0];

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
  @apply mr-0 ml-auto outline-none w-32 sm:w-52
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
