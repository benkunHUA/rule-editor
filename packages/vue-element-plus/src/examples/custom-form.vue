<script lang="ts">
import { connect } from "@ben/rule-editor-vue";
import { ElInput } from "element-plus";
import { defineComponent, h } from "vue";
export default defineComponent({
  name: "CustomForm",
  setup() {
    const newInput = connect(
      ElInput,
      { change: "input" },
      { placeholder: "请输入" }
    );
    return () => {
      return h(newInput, { placeholder: '请输入2'});
    };
  },
});
</script>


<style>
</style>