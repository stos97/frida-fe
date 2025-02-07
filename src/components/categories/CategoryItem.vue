<template>
  <ion-item>
    <ion-label>
      {{ category.name }}
    </ion-label>
    <ion-buttons>
      <ion-button
          slot="end"
          color="danger"
          @click="handleDelete"
      >
        <ion-icon :icon="trashIcon"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-item>
</template>

<script>
import { ref } from 'vue';
import { IonButton, IonIcon, IonItem, IonLabel, IonButtons } from "@ionic/vue";
import { trash } from "ionicons/icons";

export default {
  components: { IonIcon, IonButton, IonItem, IonLabel, IonButtons },
  props: ['category'],
  emits: ['delete-category'],
  setup(props, { emit }) {
    const trashIcon = ref(trash);

    const handleDelete = () => {
      emit('delete-category', props.category.id);
    };

    return {
      trashIcon,
      handleDelete
    };
  }
};
</script>

<style scoped>
ion-item {
  --background: rgba(255, 255, 255, 0.1);
  --border-style: none;
}
</style>