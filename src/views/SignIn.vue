<template>
  <div>
    <pm-page-title title="サインイン"></pm-page-title>
    <section class="section">
      <form class="container">
        <!-- メールアドレスの入力欄としてテキストフィールドコンポーネントを使用 -->
        <pm-text-field type="email" placeholder="メールアドレス" icon="envelope" v-model="email"></pm-text-field>
        <!-- パスワードの入力欄としてテキストフィールドコンポーネントを使用 -->
        <pm-text-field type="password" placeholder="パスワード" icon="lock" v-model="password"></pm-text-field>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" @click.prevent="signIn">サインイン</button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import pmPageTitle from "../components/PageTitle";
// アイコンコンポーネントをインポート
import pmTextField from "../components/TextField";
import { authService } from "../service/AuthService";

export default {
  name: "sign_in",
  // アイコンコンポーネントを追加
  components: { pmPageTitle, pmTextField },
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    signIn() {
      authService
        .signIn(this.email, this.password)
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>
