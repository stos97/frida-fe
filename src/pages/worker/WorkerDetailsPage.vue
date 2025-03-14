<template>
  <base-layout>
    <base-spinner v-if="isLoading"></base-spinner>
    <ion-title class="ion-padding ion-text-center"> {{ worker.name }}</ion-title>
    <worker-services-list :workerServices="workerServices"></worker-services-list>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button :router-link="addUrl">
        <ion-icon :icon="addIcon"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </base-layout>
</template>

<script>

import {useRoute} from "vue-router";
import {computed, onMounted, ref, watchEffect} from "vue";
import {useStore} from 'vuex';
import {IonFab, IonFabButton, IonIcon, IonTitle} from "@ionic/vue";
import WorkerServicesList from "@/components/workers/WorkerServicesList.vue";
import {add} from "ionicons/icons";

export default {
  components: {IonFabButton, IonFab, IonIcon, WorkerServicesList, IonTitle},
  props: ['worker'],
  setup() {
    const store = useStore();
    const route = useRoute();

    const isLoading = ref(false);
    const error = ref(null);
    const addIcon = ref(add);
    const workerId = route.params.id;
    const worker = computed(() => store.getters.currentWorker);
    const workerServices = computed(() => store.getters.workerServices);
    const addUrl = computed(() => '/worker/' + workerId + '/service/add');

    const getWorkerServices = async () => {
      isLoading.value = true;

      try {
        await store.dispatch('getWorkerServices', {
          id: route.params.id
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

    watchEffect(async () => {
      const regex = /^\/workers\/\d+\/details$/;
      if (regex.test(route.path)) {
        await getWorkerServices();
      }
    });

    return {
      isLoading,
      worker,
      workerServices,
      addIcon,
      addUrl
    }
  }
}
</script>
