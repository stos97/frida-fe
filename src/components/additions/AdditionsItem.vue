<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{type}}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-list>
        <ion-item v-for="addition in additions" :key="addition.id">
          <ion-label>{{ addition.name }}</ion-label>
          <!--              <ion-buttons>-->
          <!--                <ion-button-->
          <!--                    slot="end"-->
          <!--                    color="danger"-->
          <!--                    @click="handleDelete(service)"-->
          <!--                >-->
          <!--                  <ion-icon :icon="trash"></ion-icon>-->
          <!--                </ion-button>-->
          <!--              </ion-buttons>-->
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>
<script>
import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList} from "@ionic/vue";

export default {
  props: ['additions', 'type'],
  components: {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList},
}
</script>