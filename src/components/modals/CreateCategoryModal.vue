<template>
  <ion-modal :is-open="isModalOpen">
    <ion-header>
      <ion-toolbar>
        <ion-title>Dodaj kategoriju</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal()">
            <ion-icon :icon="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      Modal content
    </ion-content>
  </ion-modal>
</template>
<script>
import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar} from "@ionic/vue";
import {close} from 'ionicons/icons';

export default {
  components: {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar},
  emits: ['close'],
  props: ['isModalOpen'],
  data() {
    return {
      close
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>

