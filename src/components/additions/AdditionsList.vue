<template>
  <base-card v-for="(listOfAdditions, type) in additions" :key="type" :title="type">
    <addition-item
        v-for="addition in listOfAdditions"
        :key="addition.id"
        :addition="addition"
        @delete-addition="deleteAddition"
    ></addition-item>
  </base-card>
</template>
<script>
import AdditionItem from "@/components/additions/AdditionItem.vue";

export default {
  props: ['additions'],
  components: {AdditionItem},
  methods: {
    async deleteAddition(id) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('deleteAddition', {
          id
        });
        this.isLoading = false;
      } catch (err) {
        this.error = err.message || 'Fail to delete addition!';
      }
      this.isLoading = false;
    }
  }
}
</script>