<template>
  <base-layout>
    <base-spinner v-if="isLoading"></base-spinner>
    <ion-title class="ion-padding ion-text-center"> {{ worker.name }}</ion-title>
    <worker-services-list :workerServices="workerServices"></worker-services-list>
  </base-layout>
</template>

<script>

import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {useStore} from 'vuex';
import {IonTitle} from "@ionic/vue";
import WorkerServicesList from "@/components/workers/WorkerServicesList.vue";

export default {
  components: {WorkerServicesList, IonTitle},
  props: ['worker'],
  setup() {
    const store = useStore();

    const route = useRoute();
    const isLoading = ref(false);
    const error = ref(null);

    const workerId = route.params.id;
    const worker = computed(() => store.getters.currentWorker);

    const workerServices = computed(() => store.getters.workerServices);

    const getWorkerServices = async () => {
      isLoading.value = true;

      try {
        await store.dispatch('getWorkerServices', {
          id: workerId
        });
      } catch (err) {
        error.value = err.message || 'Failed to fetch worker services';
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(async () => {
      await getWorkerServices();
    })

    return {
      isLoading,
      worker,
      workerServices,
    }
  }
}
</script>
