<template>
  <base-layout>
    <template v-slot:fab-button>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button router-link="/categories/add">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </template>
    <base-spinner v-if="isLoading"></base-spinner>
    <p v-if="!!error">{{ error }}</p>
    <div v-else>
      <ion-title class="ion-padding ion-text-center">Kategorije</ion-title>
      <base-card>
      <category-item v-for="category in categories" :key="category.id" :category="category"
                     @delete-category="deleteCategory"></category-item>
      </base-card>
    </div>
  </base-layout>
</template>

<script>

import { IonTitle, IonIcon, IonFab, IonFabButton} from "@ionic/vue";
import CategoryItem from "@/components/categories/CategoryItem.vue";
import {add} from 'ionicons/icons';

export default {
  components: {CategoryItem, IonIcon, IonTitle, IonFab, IonFabButton},
  data() {
    return {
      isLoading: false,
      error: null,
      add,
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
        this.error = err.message || 'Fail to load categories!';
      }
      this.isLoading = false;
    },
    async deleteCategory(id) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("deleteCategory", {
          id
        });
        this.isLoading = false;
      } catch (err) {
        this.error = err.message || 'Fail to delete category!';
      }
      this.isLoading = false;
    },
  }
}
</script>
