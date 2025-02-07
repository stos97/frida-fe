<template>
  <ion-page>
    <ion-content>
      <base-spinner v-if="isLoading"></base-spinner>
      <p v-if="!!error">{{ error }}</p>
      <form class="ion-padding" @submit.prevent="submitForm">
        <ion-list>
          <ion-item>
            <ion-label>
              <ion-label>Email</ion-label>
              <ion-input type="email" v-model="email" required/>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label class="ion-padding-top">
              <ion-label>Sifra</ion-label>
              <ion-input type="password" v-model="password" required/>
            </ion-label>
          </ion-item>
          <p v-if="!formIsValid">Forma nije ok</p>

          <ion-button type="submit" expand="block">Prijavi se</ion-button>
          <ion-button router-link="/register" fill="outline" expand="block">Registruj se</ion-button>
        </ion-list>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import {ref} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {IonPage, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton} from "@ionic/vue";

export default {
  components: {
    IonPage,
    IonContent,
    IonList,
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

        router.replace('/' + store.getters.user.role);
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
