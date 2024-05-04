<script lang="ts">
import { connect } from "@rule-editor/vue";
import { ElCascader } from 'element-plus'
import type { CascaderNode } from 'element-plus'
import { defineComponent, h, ref } from "vue";
import type { PropType } from 'vue'
import type { CascaderOption } from '@rule-editor/core'

type CascaderNodeValue = string | number | undefined;

export default defineComponent({
  name: "RuleCascader",
  props: {
    options: {
      type: Array as PropType<CascaderOption[]>,
      default: () => []
    },
    modelValue: {
      type: [Array, String, Number, Boolean, Object],
      default: undefined,
    },
    config: {
      type: Object,
      default: () => ({})
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "change", "focus"],
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
    const RuleCascader = connect(
      ElCascader,
      { change: "change" },
      { ...defaultProps, ...props.config, class: customClass }
    );


    const casderRef = ref<InstanceType<typeof ElCascader>>()

    function handleChange() {
      const nodes: CascaderNode[] = casderRef.value?.getCheckedNodes(false) || []
      if (props.config.props.multiple) {
        let label: string[] = []
        let value: CascaderNodeValue[] = []
        nodes.forEach((item: CascaderNode) => {
          label.push(item.label)
          value.push(item.value)
        })
        ctx.emit("update:modelValue", value);
        ctx.emit("change", value, label);
      } else {
        const node = nodes[0] || {}
        ctx.emit("update:modelValue", node.value);
        ctx.emit("change", node.value, node.label);
      }
    }

    function handleFocus() {
      ctx.emit('focus')
    }

    return () => {
      return h(RuleCascader, {
        ref: casderRef,
        onChange: handleChange,
        onFocus: handleFocus,
        modelValue: props.modelValue,
      });
    };
  },
});
</script>

<style></style>
