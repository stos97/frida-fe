<template>
    <ion-item>
      <ion-label @click="toggleDetails">{{ service.name }}</ion-label>
      <ion-buttons>
        <ion-button
            color="danger"
            @click="handleDelete"
        >
          <ion-icon :icon="trash"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-item>
  <base-card
      v-if="showDetails"
  >
    <ion-card-title>Dodaci</ion-card-title>
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
          <ion-icon :icon="addCircleOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </div>
  </base-card>
</template>

<script>
import {
  IonButton,
  IonButtons,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import {trash, addCircleOutline} from 'ionicons/icons';
import AdditionItem from "@/components/additions/AdditionItem.vue";
import AttachAdditionForm from "@/components/additions/AttachAdditionForm.vue";

export default {
  props: ['service'],
  emits: ['delete-service'],
  components: {
    AttachAdditionForm,
    AdditionItem,
    IonIcon, IonButton, IonButtons, IonCardTitle, IonItem, IonLabel
  },
  data() {
    return {
      trash,
      addCircleOutline,
      showDetails: false,
      showForm: false,
    }
  },
  methods: {
    handleDelete() {
      this.$emit('delete-service', this.service.id);
    },
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
    openForm() {
      this.showForm = true;
    },
    async detachAddition(id) {
      const filteredAdditions = this.service.additions.filter(addition => addition.id !== id);
      try {
        await this.$store.dispatch('detachAdditionFromService', {
          id: this.service.id,
          additions: filteredAdditions,
        });
      } catch (err) {
        this.error = err.message || 'Fail to detach addition!';
      }
    },
    async attachAddition(addition) {
      try {
        await this.$store.dispatch('attachAdditionFromService', {
          id: this.service.id,
          addition: addition,
        });
        this.showForm = false;
      } catch (err) {
        this.error = err.message || 'Fail to detach addition!';
      }
    }
  },
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
