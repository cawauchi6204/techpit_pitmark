<template>
  <div>
    <pm-page-title title="サインアップ"></pm-page-title>
    <section class="section">
      <form class="container">
        <!-- メールアドレスの入力欄としてテキストフィールドコンポーネントを使用 -->
        <pm-text-field type="email" placeholder="メールアドレス" icon="envelope" v-model="email"></pm-text-field>
        <!-- パスワードの入力欄としてテキストフィールドコンポーネントを使用 -->
        <pm-text-field type="password" placeholder="パスワード" icon="lock" v-model="password"></pm-text-field>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" @click.prevent="signUp">サインアップ</button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { authService } from "../service/AuthService";
import pmPageTitle from "../components/PageTitle";
// アイコンコンポーネントをインポート
import pmTextField from "../components/TextField";
import { userService } from "../service/UserService";

export default {
  name: "sign_up",
  data() {
    return {
      email: null,
      password: null
    };
  },
  components: { pmPageTitle, pmTextField },
  methods: {
    signUp() {
      authService
        .createUser(this.email, this.password)
        .then(credential => {
          return userService.createUser(credential.user);
        })
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          alert(error.messsage);
        });
    }
  }
};
// viewはnameをつけないといけない
</script>
