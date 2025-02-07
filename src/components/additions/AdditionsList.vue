<template>
  <base-card v-for="(listOfAdditions, type) in additions" :key="type" :title="type">
    <addition-item
        v-for="addition in listOfAdditions"
        :key="addition.id"
        :addition="addition"
        @delete-addition="deleteAddition"
    ></addition-item>
  </base-card>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import AdditionItem from "@/components/additions/AdditionItem.vue";

export default {
  components: {
    AdditionItem
  },
  props: ['additions'],
  setup() {
    const store = useStore();
    const isLoading = ref(false);
    const error = ref(null);

    const deleteAddition = async (id) => {
      isLoading.value = true;
      try {
        await store.dispatch('deleteAddition', { id });
        isLoading.value = false;
      } catch (err) {
        error.value = err.message || 'Fail to delete addition!';
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      error,
      deleteAddition
    };
  }
};
</script>