<script lang="ts">
import { defineComponent, h } from "vue";
import { ElSelect, ElOption } from "element-plus";
import { connect } from "@ben/rule-editor-vue";
import type { DataItemType } from "@ben/rule-editor-core";
import type { PropType } from "vue";
export default defineComponent({
  name: "RuleSelect",
  props: {
    options: {
      type: Array as PropType<DataItemType[]>,
      default: () => [],
    },
    modelValue: {
      type: [Array, String, Number, Boolean, Object],
      default: undefined,
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
  },
  emits: ["update:modelValue", "change", "focus", "remote"],
  setup(props, ctx) {
    let customClass = props.config.class || "";
    if (props.readonly || props.config.readonly) {
      customClass += " readonly";
      customClass.trim();
    }
    const defaultProps = {
      placeholder: "请输入",
      readonly: props.readonly,
      disabled: props.disabled,
    };
    const RuleSelect = connect(
      ElSelect,
      { change: "change" },
      { ...defaultProps, ...props.config, class: customClass }
    );

    function handleChange(value: any) {
      console.log(value)
      ctx.emit("update:modelValue", value);
      ctx.emit("change", value);
    }

    function handleFocus() {
      ctx.emit("focus");
    }

    function handleRemote(keyword: string) {
      if (!props.config.remote) {
        return;
      }
      ctx.emit("remote", keyword);
    }

    return () => {
      return h(
        RuleSelect,
        {
          onChange: handleChange,
          onFocus: handleFocus,
          remoteMethod: handleRemote,
          modelValue: props.modelValue,
        },
        () => props.options.map((o) =>
          h(ElOption, { key: o.value, label: o.label, value: o.value })
        )
      );
    };
  },
});
</script>

<style></style>
