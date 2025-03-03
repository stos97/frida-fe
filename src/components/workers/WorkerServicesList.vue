<template>
  <base-spinner v-if="isLoading"></base-spinner>
  <base-card v-for="(listOfWorkerServices, name) in workerServices" :key="name" :title="name">
    <ion-grid>
      <ion-row>
        <ion-col size="7">{{ $t('workerServices.table.name') }}</ion-col>
        <ion-col>{{ $t('workerServices.table.price') }}</ion-col>
        <ion-col size="2"></ion-col>
      </ion-row>
    </ion-grid>
    <worker-service-item
        v-for="workerService in listOfWorkerServices"
        :key="workerService.id"
        :service="workerService.service"
        :additions="workerService.additions"
        :price="workerService.price"
        :minutes-needed="workerService.minutesNeeded"
        @delete-worker-service="deleteWorkerService"
    >

    </worker-service-item>
  </base-card>
</template>

<script>
import BaseCard from "@/components/base/BaseCard.vue";
import WorkerServiceItem from "@/components/workers/WorkerServiceItem.vue";
import {IonGrid, IonCol, IonRow} from "@ionic/vue";
import {computed, ref} from "vue";
import BaseSpinner from "@/components/base/BaseSpinner.vue";
import {useStore} from "vuex";

export default {
  components: {BaseSpinner, WorkerServiceItem, BaseCard, IonGrid, IonCol, IonRow},
  props: ['workerServices'],
  setup() {
    const isLoading = ref(false);
    const store = useStore();
    const worker = computed(() => store.getters.currentWorker);

    const deleteWorkerService = async (id) => {
      isLoading.value = true;

      try {
        await store.dispatch('deleteWorkerService', {
          workerId: worker.value.id,
          serviceId: id,
        });
      } catch (err) {

      } finally {
        isLoading.value = false;
      }
    }

    return {
      deleteWorkerService,
      isLoading,
    };
  }
}
</script>
