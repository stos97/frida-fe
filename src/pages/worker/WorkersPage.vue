<template>
  <base-layout page-title="Home Page">
    <ion-title class="ion-padding ion-text-center">{{ $t('workers.titleLabel') }}</ion-title>
    <base-spinner v-if="isLoading"></base-spinner>
    <workers-list :workers="workers"></workers-list>
  </base-layout>
</template>

<script>

import {useStore} from 'vuex';
import {computed, onMounted, ref} from "vue";
import WorkersList from "@/components/workers/WorkersList.vue";
import {IonTitle} from "@ionic/vue";

export default {
  components: {WorkersList, IonTitle},

  setup() {
    const store = useStore();
    const isLoading = ref(false);
    const error = ref(null);

    const workers = computed(() => store.getters.workers);

    const getAllWorkers = async () => {
      isLoading.value = true;

      try {
        await store.dispatch('getAllWorkers');
      } catch (err) {
        error.value = err.message || 'Failed to fetch workers!';
      } finally {
        isLoading.value = false;
      }
    }

    onMounted(async () => {
      await getAllWorkers();
    })

    return {
      isLoading,
      workers
    }
  }
}
</script>