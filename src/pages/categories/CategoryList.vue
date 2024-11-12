<template>
  <base-layout>
    <base-spinner v-if="isLoading"></base-spinner>
    <p v-if="!!error">{{ error }}</p>
    <div v-else>
      <h2 class="ion-padding-start">Kategorije</h2>
      <category-item v-for="category in categories" :key="category.id" :category="category" @delete-category="deleteCategory"></category-item>
    </div>
  </base-layout>
</template>

<script>

import {IonList, IonButton, IonLabel, IonTitle} from "@ionic/vue";
import CategoryItem from "@/components/categories/CategoryItem.vue";

export default {
  components: {CategoryItem, IonList, IonButton, IonLabel, IonTitle},
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
    async deleteCategory(id) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("deleteCategory", {
          id
        });
        this.isLoading = false;
      } catch (err) {
        this.error = err.message || 'Invalid Credentials!';
      }
      this.isLoading = false;
    }
  }
}
</script>
