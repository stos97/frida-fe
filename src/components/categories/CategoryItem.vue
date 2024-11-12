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
      Obrisi
    </ion-button>
  </ion-item>
</template>
<script>
import {IonButton, IonItem, IonLabel} from "@ionic/vue";

export default {
  components: {IonButton, IonItem, IonLabel},
  props: ['category'],
  emits: ['delete-category'],
  methods: {
    handleDelete(category) {
      this.$emit('delete-category', category.id);
    }
  }
}
</script>