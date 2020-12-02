<template>
  <v-container class="pb-10">
    <v-card flat>
      <v-card-title class="pb-0 px-0">
        <span class="gallery-title">
          {{ gallery.title_en }}
        </span>

        <v-spacer />
        <v-text-field
          v-model="text"
          style="max-width:250px;"
          class="gallery-search"
          dense
          color="black"
          hide-details
        >
          <template v-slot:append>
            <v-icon>mdi-magnify</v-icon>
          </template>
        </v-text-field>
        <v-switch
          v-model="radio"
          class="gallery-switch mt-0 mb-1 ml-2"
          dense
          color="black"
          hide-details
          inset
        ></v-switch>
      </v-card-title>
      <v-divider />
      <v-card-text class="black--text px-0">
        {{ gallery.description_en }}
      </v-card-text>
    </v-card>

    <v-row v-if="photoColumns.length" class="ma-0">
      <v-col
        class="pa-0"
        v-for="(col, i) in photoColumns"
        :cols="photoColumns.length > 1 ? '6' : '12'"
        :key="i + 'a'"
      >
        <v-row class="pa-1 ma-0" v-for="photo in col" :key="photo.grid_url">
          <transition name="scroll-y-reverse-transition">
            <v-img
              v-show="loaded"
              :src="photo.grid_url"
              :lazy-src="photo.formats.thumbnail.url"
              style="max-width:100%;"
            ></v-img>
          </transition>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-for="folder in folderPhotoColumns" :key="folder.name" class="ma-0">
      <v-col cols="12">
        <v-divider class="my-10" />
        <p class="gallery-title">
          {{ folder.name }}
        </p>
      </v-col>
      <v-col
        class="pa-0"
        v-for="(col, i) in folder.columns"
        :cols="folder.columns.length > 1 ? '6' : '12'"
        :key="i + 'b'"
      >
        <v-row class="pa-1 ma-0" v-for="photo in col" :key="photo.grid_url">
          <transition name="scroll-y-reverse-transition">
            <v-img
              v-show="loaded"
              :src="photo.grid_url"
              :lazy-src="photo.formats.thumbnail.url"
              style="max-width:100%;"
            ></v-img>
          </transition>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
const query = gql`
  query($slug: String!) {
    galleries(where: { slug: $slug }) {
      id
      title_en
      title_esp
      description_en
      description_esp
      files {
        photo {
          width
          height
          formats
        }
        tags
        caption_en
        caption_esp
      }
      folders {
        name
        files {
          photo {
            width
            height
            formats
          }
          tags
          caption_en
          caption_esp
        }
      }
    }
  }
`;
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
  data: () => ({
    gallery: {
      photos: []
    },
    loaded: false,
    text: "",
    radio: true
  }),
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
    },
    baseUrl() {
      return process.env.BASE_URL;
    }
  },
  mounted() {
    setTimeout(() => {
      this.loaded = true;
    }, 100);
  },
  methods: {
    getPhotoColumns(files) {
      const mobile = this.$vuetify.breakpoint.smAndDown;
      let photos = [];
      if (mobile) {
        photos = files.map(file => {
          const { formats, width, height } = file.photo;
          return {
            formats,
            grid_url: formats.medium.url,
            width,
            height
          };
        });
        return [photos];
      }
      photos = files.map(file => {
        const { formats, width, height } = file.photo;
        return {
          formats,
          grid_url: formats.large.url,
          width,
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
<style>
.gallery-title {
  font-size: 16px;
  font-weight: 700;
}
.gallery-search .v-input__slot::before {
  display: none;
}
.gallery-switch .v-input--switch__thumb {
  background: white !important;
}
</style>
