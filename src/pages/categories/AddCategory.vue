<template>
  <base-layout>
    <base-card title="Dodaj kategoriju">
      <form class="ion-padding" @submit.prevent="submitForm">
          <ion-item>
            <ion-label>
              <ion-label>Naziv</ion-label>
              <ion-input type="text" v-model.trim="name" required/>
            </ion-label>
          </ion-item>

          <ion-button type="submit" expand="block">Dodaj</ion-button>
      </form>
    </base-card>
  </base-layout>
</template>
<script>
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput, IonItem,
  IonLabel, IonList,
  IonTitle,
  IonToolbar
} from "@ionic/vue";

export default {
  components: {
    IonList,
    IonItem,
    IonIcon,
    IonToolbar,
    IonHeader,
    IonContent,
    IonButtons,
    IonButton,
    IonLabel,
    IonInput,
    IonTitle
  },
  data() {
    return {
      name: '',
      error: null,
    };
  },
  methods: {
    async submitForm() {
      try {
        await this.$store.dispatch('addCategory', {
          name: this.name,
        })
        this.name = '';
        this.$router.push('/categories');
      } catch (err) {
        this.error = err.message || 'Error';
      }
    }
  }
}
</script>

<style scoped>
ion-item {
  --background: rgba(255,255,255, 0.1);
  --border-style: 1px solid black;
}
</style>