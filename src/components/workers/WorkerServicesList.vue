<template>
  <base-card v-for="(listOfWorkerServices, name) in workerServices" :key="name" :title="name">
      <ion-grid>
        <ion-row>
          <ion-col size="7">{{$t('workerServices.table.name')}}</ion-col>
          <ion-col>{{$t('workerServices.table.price')}}</ion-col>
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
    >

    </worker-service-item>
  </base-card>
</template>

<script>
import BaseCard from "@/components/base/BaseCard.vue";
import WorkerServiceItem from "@/components/workers/WorkerServiceItem.vue";
import {IonGrid, IonCol, IonRow} from "@ionic/vue";

export default {
  components: {WorkerServiceItem, BaseCard, IonGrid, IonCol, IonRow},
  props: ['workerServices'],
}
</script>
