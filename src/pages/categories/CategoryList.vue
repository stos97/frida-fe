<template>
  <base-layout>
    <base-spinner v-if="isLoading"></base-spinner>
    <p v-if="!!error">{{ error }}</p>
    <div v-else>
      <h2 class="ion-padding-start">Kategorije</h2>
      <ion-list>
        <ion-item v-for="category in categories" :key="category.id">
          <ion-label>
            {{ category.name }}
          </ion-label>

          <ion-button
              slot="end"
              color="danger"
              @click="deleteCategory(category)"
          >
            Obrisi
          </ion-button>
        </ion-item>
      </ion-list>
    </div>
  </base-layout>
</template>

<script>

import {IonItem, IonList, IonButton, IonLabel, IonTitle} from "@ionic/vue";

export default {
  components: {IonItem, IonList, IonButton, IonLabel, IonTitle},
  data() {
    return {
      isLoading: false,
      error: null,
    }
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    }
  },
  created() {
    this.getAllCategories()
  },
  methods: {
    async getAllCategories() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("getAllCategories")
        this.isLoading = false;
      } catch (err) {
        this.error = err.message || 'Invalid Credentials!';
      }
      this.isLoading = false;
    },
    async deleteCategory(category) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("deleteCategory", {
          id: category.id
        })
        this.isLoading = false;
      } catch (err) {
        this.error = err.message || 'Invalid Credentials!';
      }
      this.isLoading = false;
    }
  }
}
</script>
