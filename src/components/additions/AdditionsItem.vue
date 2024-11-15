<template>
    <ion-item v-for="addition in additions" :key="addition.id">
      <ion-label>{{ addition.name }}</ion-label>
      <ion-buttons>
        <ion-button
            slot="end"
            color="danger"
            @click="handleDelete(addition)"
        >
          <ion-icon :icon="trash"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-item>
</template>
<script>
import {IonItem, IonLabel, IonButtons, IonButton, IonIcon} from "@ionic/vue";
import {trash} from 'ionicons/icons';

export default {
  props: ['additions', 'type'],
  emits: ['delete-addition'],
  components: {
    IonItem, IonLabel, IonButtons, IonButton, IonIcon},
  data() {
    return {
      trash
    }
  },
  methods: {
    handleDelete(addition) {
      this.$emit('delete-addition', addition.id)
    }
  },
}
</script>

<style scoped>

ion-item {
  --background: rgba(255,255,255, 0.1);
  --border-style: none;
}

</style>