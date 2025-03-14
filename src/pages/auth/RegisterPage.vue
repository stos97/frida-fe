<template>
  <base-layout :show-header="false">
    <base-card>

      <base-spinner v-if="isLoading"></base-spinner>
      <p v-if="!!error">{{ error }}</p>
      <form class="ion-padding" @submit.prevent="submitForm">

          <ion-item>
              <ion-label position="floating">{{ $t('register.form.emailLabel') }}</ion-label>
              <ion-input class="ion-margin-top" type="email" v-model.trim="email.val" required/>
              <p v-if="!email.isValid">{{ $t('register.form.emailErrorMessage') }}</p>

          </ion-item>

          <ion-item>
              <ion-label position="floating">{{ $t('register.form.nameLabel') }}</ion-label>
              <ion-input class="ion-margin-top" type="text" v-model.trim="name.val" required/>
              <p v-if="!name.isValid">{{ $t('register.form.nameErrorMessage') }}</p>
          </ion-item>

          <ion-item>
              <ion-label position="floating">{{ $t('register.form.phoneLabel') }}</ion-label>
              <ion-input class="ion-margin-top" type="tel" v-model.trim="phone.val" required/>
              <p v-if="!phone.isValid">{{ $t('register.form.phoneErrorMessage') }}</p>
          </ion-item>

          <ion-item>
              <ion-label position="floating">{{ $t('register.form.passwordLabel') }}</ion-label>
              <ion-input class="ion-margin-top" type="password" v-model="password.val" required/>
              <p v-if="!password.isValid">{{ $t('register.form.passwordErrorMessage') }}</p>
          </ion-item>

          <ion-item>
              <ion-label position="floating">{{ $t('register.form.passwordConfirmationLabel') }}</ion-label>
              <ion-input class="ion-margin-top" type="password" v-model="passwordConfirmation.val" required/>
              <p v-if="!passwordConfirmation.isValid">{{ $t('register.form.passwordConfirmationErrorMessage') }}</p>
          </ion-item>
          <p v-if="!formIsValid">{{ $t('register.form.errorMessage') }}</p>

          <ion-button type="submit" expand="block">{{ $t('register.form.submitButton') }}</ion-button>
          <ion-button router-link="/login" fill="outline" expand="block">{{ $t('register.loginButton') }}</ion-button>
      </form>
    </base-card>
  </base-layout>
</template>

<script>
import {ref, reactive} from 'vue';
import {IonButton, IonInput, IonItem, IonLabel} from '@ionic/vue';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import BaseLayout from "@/components/base/BaseLayout.vue";

export default {
  components: {BaseLayout, IonInput, IonLabel, IonItem, IonButton},

  setup() {
    const store = useStore();
    const router = useRouter();

    const name = reactive({
      val: '',
      isValid: true
    });

    const email = reactive({
      val: '',
      isValid: true
    });

    const password = reactive({
      val: '',
      isValid: true
    });

    const passwordConfirmation = reactive({
      val: '',
      isValid: true
    });

    const phone = reactive({
      val: '',
      isValid: true
    });

    const formIsValid = ref(true);
    const isLoading = ref(false);
    const error = ref(null);

    const validateForm = () => {
      formIsValid.value = true;

      if (email.val === '' || !email.val.includes('@')) {
        formIsValid.value = false;
        email.isValid = false;
      }

      if (password.val.length < 6) {
        formIsValid.value = false;
        password.isValid = false;
      }

      if (password.val !== passwordConfirmation.val) {
        formIsValid.value = false;
        passwordConfirmation.isValid = false;
      }

      if (name.val === '') {
        formIsValid.value = false;
        name.isValid = false;
      }

      if (phone.val === '') {
        formIsValid.value = false;
        phone.isValid = false;
      }
    };

    const submitForm = async () => {
      validateForm();
      if (!formIsValid.value) {
        return;
      }

      isLoading.value = true;
      try {
        await store.dispatch('register', {
          email: email.val,
          name: name.val,
          password: password.val,
          passwordConfirmation: passwordConfirmation.val,
          phone: phone.val,
        });

        await router.replace('/user');
      } catch (err) {
        error.value = err.message || 'Registration Fail!';
      } finally {
        isLoading.value = false;
      }
    };

    return {
      name,
      email,
      password,
      passwordConfirmation,
      phone,
      formIsValid,
      isLoading,
      error,
      submitForm
    };
  }
}
</script>

<style scoped>
ion-item {
  --background: rgba(255, 255, 255, 0.1);
}
</style>
