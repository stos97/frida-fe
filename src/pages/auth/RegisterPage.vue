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
              <ion-input type="email" v-model.trim="email.val" required/>
              <p v-if="!email.isValid">Email nije dobar</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label>
              <ion-label>Ime</ion-label>
              <ion-input type="text" v-model.trim="name.val" required/>
              <p v-if="!name.isValid">Ime nije dobro</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label>
              <ion-label>Telefon</ion-label>
              <ion-input type="tel" v-model.trim="phone.val" required/>
              <p v-if="!phone.isValid">Telefon nije dobar</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label class="ion-padding-top">
              <ion-label>Sifra</ion-label>
              <ion-input type="password" v-model="password.val" required/>
              <p v-if="!password.isValid">Sifra mora da bude najmanje 6 karaktera</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label class="ion-padding-top">
              <ion-label>Sifra ponovljeno</ion-label>
              <ion-input type="password" v-model="passwordConfirmation.val" required/>
              <p v-if="!passwordConfirmation.isValid">Sifre se ne podudaraju</p>
            </ion-label>
          </ion-item>
          <p v-if="!formIsValid">Forma nije ok, ispravite polja</p>

          <ion-button type="submit" expand="block">Registruj se</ion-button>
          <ion-button router-link="/login" fill="outline" expand="block">Prijavi se</ion-button>
        </ion-list>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref, reactive } from 'vue';
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonPage, IonContent } from '@ionic/vue';

export default {
  components: { IonInput, IonLabel, IonList, IonItem, IonButton, IonPage, IonContent },

  setup() {
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
        await this.$store.dispatch('register', {
          email: email.val,
          name: name.val,
          password: password.val,
          passwordConfirmation: passwordConfirmation.val,
          phone: phone.val,
        });

        this.$router.replace('/user');
      } catch (err) {
        error.value = err.message || 'Registration Fail!';
      }

      isLoading.value = false;
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
