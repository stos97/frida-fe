<template>
  <ion-item>
    <ion-label>
      {{ category.name }}
    </ion-label>
    <ion-button
        slot="end"
        color="danger"
        @click="handleDelete(category)"
    >
      <ion-icon :icon="trash"></ion-icon>
    </ion-button>
  </ion-item>
</template>
<script>
import {IonButton, IonIcon, IonItem, IonLabel} from "@ionic/vue";
import {trash} from "ionicons/icons";

export default {
  components: {IonIcon, IonButton, IonItem, IonLabel},
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