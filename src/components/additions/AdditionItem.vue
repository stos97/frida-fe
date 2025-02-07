<template>
  <ion-item>
    <slot name="title">
      <ion-label>{{ addition.name }}</ion-label>
    </slot>
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
import {ref} from 'vue';
import {IonItem, IonLabel, IonButtons, IonButton, IonIcon} from "@ionic/vue";
import {trash} from 'ionicons/icons';

export default {
  props: ['addition'],
  emits: ['delete-addition'],
  components: {
    IonItem, IonLabel, IonButtons, IonButton, IonIcon
  },
  setup(props, {emit}) {
    const trashIcon = ref(trash);

    const handleDelete = () => {
      emit('delete-addition', props.addition.id);
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
