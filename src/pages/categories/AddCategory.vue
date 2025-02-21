<template>
  <base-layout>
    <base-card :title="$t('addCategory.titleLabel')">
      <form class="ion-padding" @submit.prevent="submitForm">
          <ion-item>
              <ion-label position="stacked">{{ $t('addCategory.form.nameLabel') }}</ion-label>
              <ion-input type="text" v-model.trim="name" required/>
          </ion-item>

          <ion-button type="submit" expand="block">{{ $t('addCategory.form.submitButton') }}</ion-button>
      </form>
    </base-card>
  </base-layout>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from "@ionic/vue";

export default {
  components: {
    IonList,
    IonItem,
    IonIcon,
    IonToolbar,
    IonHeader,
    IonContent,
    IonButtons,
    IonButton,
    IonLabel,
    IonInput,
    IonTitle
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const name = ref('');
    const error = ref(null);

    const submitForm = async () => {
      try {
        await store.dispatch('addCategory', {
          name: name.value,
        });
        name.value = '';
        await router.replace('/categories');
      } catch (err) {
        error.value = err.message || 'Error';
      }
    };

    return {
      name,
      error,
      submitForm
    };
  }
};
</script>

<style scoped>
ion-item {
  --background: rgba(255,255,255, 0.1);
}
</style>