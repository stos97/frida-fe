<template>
  <base-card v-for="worker in workers" :key="worker.id">
    <worker-item :worker="worker"></worker-item>
  </base-card>
</template>

<script>


import WorkerItem from "@/components/workers/WorkerItem.vue";

export default {
  components: {WorkerItem},
  props: ['workers'],
  setup() {
    return {

    }
  }
}

</script>
