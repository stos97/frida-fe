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
      <form class="ion-padding" @submit.prevent="submitForm">
        <ion-list>
          <ion-item>
            <ion-label>
              <ion-label>Naziv</ion-label>
              <ion-input type="text" v-model.trim="name" required/>
            </ion-label>
          </ion-item>

          <ion-button type="submit" expand="block">Dodaj</ion-button>
        </ion-list>
      </form>
    </ion-content>
  </ion-modal>
</template>
<script>
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput, IonItem, IonLabel, IonList,
  IonModal,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import {close} from 'ionicons/icons';

export default {
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonModal,
    IonTitle,
    IonToolbar
  },
  emits: ['close'],
  props: ['isModalOpen'],
  data() {
    return {
      close,
      name: '',
      error: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async submitForm() {
      try {
        await this.$store.dispatch('addCategory', {
          name: this.name,
        })
        this.name = '';
        this.$emit('close');
      } catch (err) {
        this.error = err.message || 'Error';
      }
    }
  }
}
</script>

