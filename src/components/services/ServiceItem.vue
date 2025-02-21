<template>
  <ion-item>
    <ion-label @click="toggleDetails">{{ service.name }}</ion-label>
    <ion-buttons>
      <ion-button
          color="danger"
          @click="handleDelete"
      >
        <ion-icon :icon="trashIcon"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-item>
  <base-card v-if="showDetails">
    <ion-card-title>{{ $t('additions.titleLabel') }}</ion-card-title>
    <addition-item
        @delete-addition="detachAddition"
        v-for="addition in service.additions"
        :key="addition.id"
        :addition="addition"
    >
    </addition-item>
    <attach-addition-form v-if="showForm" :service-id="service.id" @attach-addition="attachAddition"></attach-addition-form>
    <div class="add-button">
      <ion-buttons>
        <ion-button
            class="ion-text-center"
            @click="openForm"
        >
          <ion-icon :icon="addCircleOutlineIcon"></ion-icon>
        </ion-button>
      </ion-buttons>
    </div>
  </base-card>
</template>

<script>
import { ref } from 'vue';
import {
  IonButton,
  IonButtons,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { trash, addCircleOutline } from 'ionicons/icons';
import AdditionItem from "@/components/additions/AdditionItem.vue";
import AttachAdditionForm from "@/components/additions/AttachAdditionForm.vue";
import {useStore} from "vuex";

export default {
  props: ['service'],
  emits: ['delete-service'],
  components: {
    AttachAdditionForm,
    AdditionItem,
    IonIcon, IonButton, IonButtons, IonCardTitle, IonItem, IonLabel
  },
  setup(props, { emit }) {
    const store = useStore();

    const trashIcon = trash;
    const addCircleOutlineIcon = addCircleOutline;

    const showDetails = ref(false);
    const showForm = ref(false);
    const error = ref(null);

    const handleDelete = () => {
      emit('delete-service', props.service.id);
    };

    const toggleDetails = () => {
      showDetails.value = !showDetails.value;
    };

    const openForm = () => {
      showForm.value = true;
    };

    const detachAddition = async (id) => {
      const filteredAdditions = props.service.additions.filter(addition => addition.id !== id);
      try {
        await store.dispatch('detachAdditionFromService', {
          id: props.service.id,
          additions: filteredAdditions,
        });
      } catch (err) {
        error.value = err.message || 'Fail to detach addition!';
      }
    };

    const attachAddition = async (addition) => {
      try {
        await store.dispatch('attachAdditionFromService', {
          id: props.service.id,
          addition: addition,
        });
        showForm.value = false;
      } catch (err) {
        error.value = err.message || 'Fail to attach addition!';
      }
    };

    return {
      trashIcon: trashIcon,
      addCircleOutlineIcon: addCircleOutlineIcon,
      showDetails,
      showForm,
      error,
      handleDelete,
      toggleDetails,
      openForm,
      detachAddition,
      attachAddition
    };
  }
}
</script>

<style scoped>
ion-item {
  --background: rgba(255,255,255, 0.1);
  --border-style: none;
}

ion-card {
  background: rgba(255,255,255, 0.1);
  border-radius: 10px;
}

.add-button {
  display: flex;
  justify-content: center; /* Horizontally center */
}
</style>
