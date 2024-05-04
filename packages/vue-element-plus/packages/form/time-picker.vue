<script lang="ts">
import { connect } from "@rule-editor/vue";
import { ElTimePicker } from "element-plus";
import { defineComponent, h } from "vue";
export default defineComponent({
  name: "RuleTimePicker",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    config: {
      type: Object,
      default: () => ({}),
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    validate: {
      type: Function,
      default: (v: string) => true,
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, ctx) {
    let customClass = props.config.class || "";
    if (props.readonly || props.config.readonly) {
      customClass += " readonly";
      customClass.trim();
    }
    const defaultProps = {
      placeholder: "选择",
      readonly: props.readonly,
      disabled: props.disabled,
    };
    const RuleTimePicker = connect(
      ElTimePicker,
      { change: "change" },
      { ...defaultProps, ...props.config, class: customClass }
    );

    function handleChange(value: any) {
      ctx.emit("update:modelValue", value);
      ctx.emit("change", value);
    }

    return () => {
      return h(RuleTimePicker, {
        modelValue: props.modelValue,
        ['onUpdate:modelValue']: handleChange
      });
    };
  },
});
</script>

<style></style>
