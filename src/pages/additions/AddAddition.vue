<template>
  <base-layout>
    <base-card :title="$t('addAddition.titleLabel')">
      <form class="ion-padding" @submit.prevent="submitForm">
        <ion-item>
          <ion-label>{{ $t('addAddition.form.typeLabel') }}</ion-label>
          <ion-select v-model="type" :cancel-text="$t('addAddition.form.cancelText')" :ok-text="$t('addAddition.form.okText')">
            <ion-select-option value="size">{{ $t('addAddition.form.sizeLabel') }}</ion-select-option>
            <ion-select-option value="addition">{{ $t('addAddition.form.additionLabel') }}</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">{{ $t('addAddition.form.nameLabel') }}</ion-label>
          <ion-input type="text" v-model.trim="name" required/>
        </ion-item>

        <ion-button class="ion-margin-top" type="submit" expand="block">{{ $t('addAddition.form.submitButton') }}</ion-button>
      </form>
    </base-card>
  </base-layout>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import BaseCard from "@/components/base/BaseCard.vue";
import { IonButton, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/vue";

export default {
  components: { IonItem, IonButton, IonLabel, IonInput, BaseCard, IonSelect, IonSelectOption },
  setup() {
    const store = useStore();
    const router = useRouter();

    const name = ref('');
    const type = ref('size');
    const error = ref(null);

    const submitForm = async () => {
      try {
        await store.dispatch('addAddition', {
          type: type.value,
          name: name.value
        });
        name.value = '';
        await router.replace('/additions');
      } catch (err) {
        error.value = err.message || 'Error';
      }
    };

    return {
      name,
      type,
      error,
      submitForm
    };
  }
};
</script>

<style scoped>
ion-item {
  --background: rgba(255, 255, 255, 0.1);
}
</style>