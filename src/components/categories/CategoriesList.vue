<template>
  <category-item
      v-for="category in categories"
      :key="category.id"
      :category="category"
      @delete-category="deleteCategory"
  ></category-item>
</template>

<script>
import { ref } from 'vue';
import CategoryItem from "@/components/categories/CategoryItem.vue";
import { useStore } from 'vuex';

export default {
  components: { CategoryItem },
  props: ['categories'],
  setup() {
    const store = useStore();
    const isLoading = ref(false);
    const error = ref(null);

    const deleteCategory = async (id) => {
      isLoading.value = true;
      try {
        await store.dispatch('deleteCategory', { id });
      } catch (err) {
        error.value = err.message || 'Fail to delete category!';
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      error,
      deleteCategory
    };
  },
};
</script>