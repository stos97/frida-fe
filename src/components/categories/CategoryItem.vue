<template>
  <ion-item>
    <ion-label>
      {{ category.name }}
    </ion-label>
    <ion-buttons>
      <ion-button
          slot="end"
          color="danger"
          @click="handleDelete(category)"
      >
        <ion-icon :icon="trash"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-item>
</template>
<script>
import {IonButton, IonIcon, IonItem, IonLabel, IonButtons} from "@ionic/vue";
import {trash} from "ionicons/icons";

export default {
  components: {IonIcon, IonButton, IonItem, IonLabel, IonButtons},
  props: ['category'],
  emits: ['delete-category'],
  data() {
    return {
      trash
    }
  },
  methods: {
    handleDelete(category) {
      this.$emit('delete-category', category.id);
    }
  }
}
</script>

<style scoped>

ion-item {
  --background: rgba(255,255,255, 0.1);
  --border-style: none;
}

</style>
