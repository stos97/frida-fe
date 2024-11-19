<template>
    <ion-item>
      <ion-label>{{ addition.name }}</ion-label>
      <ion-buttons>
        <ion-button
            slot="end"
            color="danger"
            @click="handleDelete"
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
  props: ['addition'],
  emits: ['delete-addition'],
  components: {
    IonItem, IonLabel, IonButtons, IonButton, IonIcon},
  data() {
    return {
      trash
    }
  },
  methods: {
    handleDelete() {
      this.$emit('delete-addition', this.addition.id)
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