<template>
  <base-card
      v-for="(listOfServices, categoryName) in services"
      :key="categoryName"
      :title="categoryName"
  >
    <service-item
        @delete-service="deleteService"
        v-for="service in listOfServices"
        :key="service.id"
        :name="service.name"
        :id="service.id"
    ></service-item>
  </base-card>
</template>
<script>
import ServiceItem from "@/components/services/ServiceItem.vue";

export default {
  components: {ServiceItem},
  props: ['services', 'title'],
  methods: {
    async deleteService(id) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('deleteService', {
          id
        });
        this.isLoading = false;
      } catch (err) {
        this.error = err.message || 'Fail to delete service!';
      }
      this.isLoading = false;
    }
  }
}
</script>