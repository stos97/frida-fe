<template>
  <base-card v-for="(listOfWorkerServices, name) in workerServices" :key="name" :title="name">
    <ion-item>
      <ion-label slot="start">{{$t('workerServices.table.name')}}</ion-label>
      <ion-label slot="end">{{$t('workerServices.table.price')}}</ion-label>
    </ion-item>
    <worker-service-item
        v-for="workerService in listOfWorkerServices"
        :key="workerService.id"
        :service="workerService.service"
        :additions="workerService.additions"
        :price="workerService.price"
        :minutes-needed="workerService.minutesNeeded"
    >

    </worker-service-item>
  </base-card>
</template>

<script>
import BaseCard from "@/components/base/BaseCard.vue";
import WorkerServiceItem from "@/components/workers/WorkerServiceItem.vue";
import {IonItem, IonLabel} from "@ionic/vue";

export default {
  components: {IonLabel, IonItem, WorkerServiceItem, BaseCard},
  props: ['workerServices'],
}
</script>

<style scoped>
ion-item {
  --background: rgba(255, 255, 255, 0.1);
  --border-style: none;
}

</style>
