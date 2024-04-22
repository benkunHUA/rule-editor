<script lang="ts">
import { defineComponent, h } from "vue";
import DeleteBtn from "./delete-btn.vue";
export default defineComponent({
  name: "RuleItem",
  components: {
    DeleteBtn,
  },
  props: {
    ruleNode: {
      type: Object,
      default: () => ({}),
    },
    renderContent: {
      type: Function,
      default: () => [],
    },
    singleChild: {
      type: Boolean,
      default: false,
    },
    setReleationPosition: {
      type: Function,
      default: () => {},
    },
  },
  setup(props: any) {
    const { ruleNode, setReleationPosition } = props;
    const readonly = props.ruleNode.rule.readonly;
    const disabled = props.ruleNode.rule.disabled;
    return () => {
      return h(
        "div",
        { class: props.singleChild ? "rule-item single-child" : "rule-item" },
        readonly || disabled
          ? [...props.renderContent(h, ruleNode)]
          : [
              h(DeleteBtn, { ruleNode, setReleationPosition }),
              ...props.renderContent(h, ruleNode),
            ]
      );
    };
  },
});
</script>

<style>
</style>