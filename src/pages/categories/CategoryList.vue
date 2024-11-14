<template>
  <base-layout>
    <template v-slot:fab-button>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="toggleModal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </template>
    <base-spinner v-if="isLoading"></base-spinner>
    <p v-if="!!error">{{ error }}</p>
    <div v-else>
      <ion-title class="ion-padding">Kategorije</ion-title>
      <category-item v-for="category in categories" :key="category.id" :category="category"
                     @delete-category="deleteCategory"></category-item>
    </div>

    <CreateCategoryModal @close="toggleModal" :is-modal-open="isModalOpen"></CreateCategoryModal>
  </base-layout>
</template>

<script>

import { IonTitle, IonIcon, IonFab, IonFabButton} from "@ionic/vue";
import CategoryItem from "@/components/categories/CategoryItem.vue";
import {add} from 'ionicons/icons';
import CreateCategoryModal from "@/components/modals/CreateCategoryModal.vue";

export default {
  components: {CreateCategoryModal, CategoryItem, IonIcon, IonTitle, IonFab, IonFabButton},
  data() {
    return {
      isLoading: false,
      error: null,
      add,
      isModalOpen: false,
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
    mounted() {
      this.presentingElement = this.$refs.page.$el;
    },
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
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
  }
}
</script>
