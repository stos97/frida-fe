<template>
  <base-card
      v-for="(listOfServices, categoryName) in services"
      :key="categoryName"
      :title="categoryName"
  >
    <service-item
        @delete-service="deleteService"
        v-for="service in listOfServices"
        :key="service.id"
        :service="service"
    ></service-item>
  </base-card>
</template>

<script>
import { ref} from 'vue';
import { useStore } from 'vuex';
import ServiceItem from "@/components/services/ServiceItem.vue";

export default {
  components: { ServiceItem },
  props: ['services'],
  setup() {
    const store = useStore();
    const isLoading = ref(false);
    const error = ref(null);

    const deleteService = async (id) => {
      isLoading.value = true;
      try {
        await store.dispatch('deleteService', { id });
        isLoading.value = false;
      } catch (err) {
        error.value = err.message || 'Fail to delete service!';
        isLoading.value = false;
      }
    };

    return {
      deleteService,
      isLoading,
      error
    };
  }
}
</script>
