<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="ad in promoAds"
              :key="ad.id"
              :src="ad.imageSrc"
            >
              <div class="card-link">
                <v-btn text dark :to="'/ad/' + ad.id">
                  <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                  >
                    <div class="text-h4">
                      {{ ad.title }}
                    </div>
                  </v-row>
                </v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex
          xs12
          sm6
          md4
          v-for="ad of ads"
          :key="ad.id"
          class=""
        >
          <v-card
            class="mx-auto"
            max-width="350"
          >
            <v-img
              :src="ad.imageSrc"
              height="200px"
            ></v-img>
            <v-card-title>{{ ad.title }}</v-card-title>
            <v-card-subtitle>{{ ad.description }}</v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text :to="'/ad/' + ad.id"> Open </v-btn>
              <app-buy-modal :ad="ad"></app-buy-modal>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs-12 class="text-center pt-5">
          <v-progress-circular
            :size="120"
            :width="10"
            color="indigo lighten-2"
            indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    promoAds () {
      return this.$store.getters.promoAds
    },
    ads () {
      return this.$store.getters.ads
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped>
.card-link {
  position: absolute;
  top: 50%;
  left: 50%;
  background: rgba(0, 0, 0, .3);
  transform: translate(-50%, -50%);
  padding: 10px 10px;
  border-radius: 5px;
}
</style>
