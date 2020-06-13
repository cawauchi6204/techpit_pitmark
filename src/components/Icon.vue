<template>
  <span class="icon">
    <i :class="['fas', nameClass]"></i>
  </span>
</template>

<script>
export default {
  name: "pm-icon",
  props: { name: String },
  computed: {
    nameClass() {
      return `fa-${this.name}`;
    }
  }
};
</script>
