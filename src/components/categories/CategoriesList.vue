<template>
  <category-item
      v-for="category in categories"
      :key="category.id"
      :category="category"
      @delete-category="deleteCategory"
  ></category-item>
</template>
<script>
import CategoryItem from "@/components/categories/CategoryItem.vue";
export default {
  props: ['categories'],
  components: {CategoryItem},
  methods: {
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