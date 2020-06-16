<template>
  <div>
    <pm-page-title title="ブックマークの登録"></pm-page-title>
    <section class="section">
      <form class="container">
        <pm-text-field
          placeholder="タイトル"
          v-model="title"
          :error="titleError"
          @change="validateTitle"
        ></pm-text-field>
        <pm-text-field
          type="url"
          placeholder="URL"
          v-model="url"
          @change="validateUrl"
          :error="urlError"
        ></pm-text-field>
        <pm-text-field
          placeholder="コメント"
          v-model="comment"
          :error="commentError"
          @change="validateComment"
        ></pm-text-field>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" @click.prevent="addBookmark">登録する</button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import pmPageTitle from "../components/PageTitle";
import pmTextField from "../components/TextField";
import { userBookmarkService } from "../service/UserBookmarkService";
import { userService } from "../service/UserService";

export default {
  name: "bookmark_new",
  components: {
    pmPageTitle,
    pmTextField
  },
  data() {
    return {
      title: null,
      url: null,
      comment: null,
      titleError: null,
      urlError: null,
      commentError: null
    };
  },
  methods: {
    async addBookmark() {
      this.validate();
      const error = this.titleError || this.urlError || this.commentError;

      if (error) {
        alert("入力値が不正です。");
        return;
      }

      const user = await userService.getCurrentUser();

      const userBookmark = await userBookmarkService.getBookmark(
        user,
        this.url
      );
      if (userBookmark != null) {
        alert("すでに登録されているURLです。");
        return;
      }

      const form = {
        title: this.title,
        url: this.url,
        comment: this.comment
      };
      try {
        await userBookmarkService.addBookmark(user, form);
        this.$router.push({ name: "home" });
      } catch (e) {
        alert(e.message);
      }
    },
    validateTitle(title) {
      this.titleError = null;
      //   最初にnullで初期化している
      if (!this.title) {
        this.titleError = "タイトルは必須です";
      } else if (title.length > 50) {
        this.titleError = "タイトルは50文字までです";
      }
    },

    validateUrl(url) {
      this.urlError = null;
      //   最初にnullで初期化している
      if (!url) {
        this.urlError = "URLは必須です";
      }
    },
    validateComment(comment) {
      this.commentError =
        comment && comment.length > 150 ? "コメントは150文字までです" : null;
    },
    validate() {
      this.validateTitle(this.title);
      this.validateUrl(this.url);
      this.validateComment(this.comment);
    }
  }
};
</script>

<style>
</style>
