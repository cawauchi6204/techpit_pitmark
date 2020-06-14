<template>
  <div id="app">
    <!-- ナビゲーションバーコンポーネントの使用。sign-out-clicked イベントに signOut メソッドを指定 -->
    <pm-nav-bar
      :user="user"
      :menu-expanded="menuExpanded"
      @sign-out-clicked="signOut"
      @menu-clicked="switchMenuState"
    ></pm-nav-bar>
    <main>
      <router-view />
    </main>
  </div>
</template>


<script>
// ナビゲーションバーコンポーネントをインポート
import pmNavBar from "./components/NavBar";
import { authService } from "./service/AuthService";

export default {
  name: "app",
  // ナビゲーションバーコンポーネントの使用を宣言
  components: { pmNavBar },
  data() {
    return {
      user: null,
      menuExpanded: false
    };
  },
  created() {
    authService.onStateChanged(user => {
      this.user = user;
    });
    this.$router.beforeEach((to, from, next) => {
      this.menuExpanded = false;
      next();
    });
  },
  methods: {
    async signOut() {
      await authService.signOut();
      this.$router.push({ name: "Home" });
    },
    switchMenuState(currentState) {
      this.menuExpanded = !currentState;
    }
  }
};
</script>
