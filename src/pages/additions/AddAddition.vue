<template>
  <base-layout>
    <base-card title="Dodaj dodatak">
      <form class="ion-padding" @submit.prevent="submitForm">
        <ion-item>
          <ion-label>Tip</ion-label>
          <ion-select aria-label="Favorite Fruit" v-model="type">
            <ion-select-option value="size">Velicina</ion-select-option>
            <ion-select-option value="addition">Dodatak</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
            <ion-label>Naziv</ion-label>
            <ion-input type="text" v-model.trim="name" required/>
        </ion-item>

        <ion-button class="ion-margin-top" type="submit" expand="block">Dodaj</ion-button>
      </form>
    </base-card>
  </base-layout>
</template>
<script>
import BaseCard from "@/components/base/BaseCard.vue";
import {IonButton, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption} from "@ionic/vue";

export default {
  components: {IonItem, IonButton, IonLabel, IonInput, BaseCard, IonSelect, IonSelectOption},
  data() {
    return {
      name: '',
      type: 'size',
      error: null,
    }
  },
  methods: {
    async submitForm() {
      try {
        await this.$store.dispatch('addAddition', {
          type: this.type,
          name: this.name
        })
        this.name = '';
        this.$router.push('/additions');
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
}
</style>