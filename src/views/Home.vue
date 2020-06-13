<template>
  <div class="container">
    <span v-if="user">こんにちは {{user.email }}さん</span>
    <span v-else>ログインしていません</span>
  </div>
</template>

<script>
// @ is an alias to /src
import { authService } from "../service/AuthService"

export default {
  name: "Home",
  data() {
    return {
      user: null
    };
  },
  created() {
    authService.onStateChanged(user => {
      this.user = user;
    });
  },
  components: {}
};
</script>
