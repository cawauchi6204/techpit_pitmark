<template>
  <div class="field">
    <!-- ラベルの文字列が指定されたときだけ表示します -->
    <label class="label" v-if="label">{{ label }}</label>
    <!-- icon が指定されたときだけ必要なクラスを設定します -->
    <p class="control" :class="{ 'has-icons-left': icon }">
      <input
        class="input"
        :class="{ 'is-danger': error }"
        :type="type"
        :placeholder="placeholder"
        @change="onChanged"
        v-model="innerValue"
      />
      <!-- アイコンが指定されたときだけ表示します -->
      <pm-icon v-if="icon" class="is-small is-left" :name="icon"></pm-icon>
    </p>
    <p class="help is-danger" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import pmIcon from "./Icon";

export default {
  name: "pm-text-field",
  components: { pmIcon },
  props: {
    type: {
      type: String,
      validator(val) {
        return ["text", "email", "password", "search", "url"].includes(val);
      }
    },
    placeholder: String,
    value: String,
    icon: String,
    label:String,
    // エラーメッセージ
    error: String
  },
  computed: {
    innerValue: {
      get() {
        return this.value;
      },
      set(val) {
        if (this.value !== val) {
          this.$emit("input", val);
        }
      }
    }
  },
  methods: {
    onChanged(e) {
      this.$emit("change", e.target.value);
    }
  }
};
</script>
