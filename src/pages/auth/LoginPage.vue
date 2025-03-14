<template>
  <base-layout :show-header="false" >
    <base-card>
      <base-spinner v-if="isLoading"></base-spinner>
      <p v-if="!!error">{{ error }}</p>
      <form class="ion-padding" @submit.prevent="submitForm">
        <ion-item>
          <ion-label position="floating">{{ $t('login.form.emailLabel') }}</ion-label>
          <ion-input class="ion-margin-top" type="email" v-model="email" required/>
        </ion-item>

        <ion-item>
          <ion-label position="floating">{{ $t('login.form.passwordLabel') }}</ion-label>
          <ion-input class="ion-margin-top" type="password" v-model="password" required/>
        </ion-item>
        <p v-if="!formIsValid">{{ $t('login.form.errorMessage') }}</p>

        <ion-button class="ion-margin-top" type="submit" expand="block">{{ $t('login.form.submitButton') }}</ion-button>
        <ion-button router-link="/register" fill="outline" expand="block">{{ $t('login.registerButton') }}</ion-button>
      </form>
    </base-card>
  </base-layout>
</template>

<script>
import {ref} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {IonItem, IonLabel, IonInput, IonButton} from "@ionic/vue";
import BaseLayout from "@/components/base/BaseLayout.vue";
import BaseCard from "@/components/base/BaseCard.vue";

export default {
  components: {
    BaseCard,
    BaseLayout,
    IonLabel,
    IonInput,
    IonItem,
    IonButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const formIsValid = ref(true);
    const isLoading = ref(false);
    const error = ref(null);

    const validateForm = () => {
      formIsValid.value = true;
      if (email.value === '' || !email.value.includes('@') || password.value.length < 6) {
        formIsValid.value = false;
      }
    };

    const submitForm = async () => {
      validateForm();
      if (!formIsValid.value) {
        return;
      }

      isLoading.value = true;
      try {
        await store.dispatch('login', {
          email: email.value,
          password: password.value,
        });

        await router.replace('/' + store.getters.user.role);
      } catch (err) {
        error.value = err.message || 'Invalid Credentials!';
      }

      isLoading.value = false;
    };

    return {
      email,
      password,
      formIsValid,
      isLoading,
      error,
      submitForm,
    };
  },
};
</script>

<style scoped>
ion-item {
  --background: rgba(255, 255, 255, 0.1);
}
</style>
