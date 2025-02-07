<template>
  <base-layout>
    <template v-slot:fab-button>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button router-link="/categories/add">
          <ion-icon :icon="addIcon"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </template>
    <base-spinner v-if="isLoading"></base-spinner>
    <p v-if="!!error">{{ error }}</p>
    <div v-else>
      <ion-title class="ion-padding ion-text-center">Kategorije</ion-title>
      <base-card>
        <categories-list :categories="categories"></categories-list>
      </base-card>
    </div>
  </base-layout>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { IonTitle, IonIcon, IonFab, IonFabButton } from "@ionic/vue";
import CategoryItem from "@/components/categories/CategoryItem.vue";
import CategoriesList from "@/components/categories/CategoriesList.vue";
import { add } from 'ionicons/icons';
import { useStore } from 'vuex';

export default {
  components: {
    CategoriesList,
    CategoryItem,
    IonIcon,
    IonTitle,
    IonFab,
    IonFabButton,
  },
  setup() {
    const store = useStore();
    const isLoading = ref(false);
    const error = ref(null);
    const addIcon = ref(add);

    const categories = computed(() => store.getters.categories);

    const getAllCategories = async () => {
      isLoading.value = true;
      try {
        await store.dispatch("getAllCategories");
      } catch (err) {
        error.value = err.message || 'Fail to load categories!';
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(async () => {
      await getAllCategories();
    });

    return {
      isLoading,
      error,
      categories,
      addIcon,
      getAllCategories,
    };
  }
}
</script>
