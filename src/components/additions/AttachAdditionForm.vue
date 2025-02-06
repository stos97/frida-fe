<template>
  <form @submit.prevent="submitForm">
    <ion-item>
      <ion-label>Dodatak</ion-label>
      <ion-select slot="end" v-model="additionId" @click="getAllAdditions">
        <ion-select-option
            v-for="addition in additions"
            :key="addition.id"
            :value="addition.id"
        >{{addition.name}}</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-button class="ion-margin-top" type="submit" expand="block">Dodaj</ion-button>
  </form>
</template>
<script>
import {IonButton, IonItem, IonLabel, IonSelect, IonSelectOption} from "@ionic/vue";

export default {
  emits: ['attach-addition'],
  props: ['serviceId'],
  components: {IonButton, IonItem, IonLabel, IonSelect, IonSelectOption},
  computed: {
    additions() {
      return this.$store.getters.additions;
    }
  },
  data() {
    return {
      additionId: null,
    };
  },
  methods: {
    async getAllAdditions() {
      // this.isLoading = true;
      try {
        await this.$store.dispatch('getAllAdditions', {
          service_id: this.serviceId
        });
        // this.isLoading = false;
      } catch (err) {
        this.error = err.message || 'Fail to fetch additions!';
      }
      // this.isLoading = false;
    },
    submitForm() {
      const addition = this.additions.find(addition => addition.id === this.additionId);

      this.$emit('attach-addition', addition);
      this.additionId = null;
    },
  },
  mounted() {
    this.getAllAdditions();
  }
}
</script>

<style scoped>

ion-item {
  --background: rgba(255,255,255, 0.1);
  --border-style: none;
}
</style>