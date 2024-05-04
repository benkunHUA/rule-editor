<script lang="ts">
import { connect } from "@rule-editor/vue";
import { ElInput } from "element-plus";
import { defineComponent, h } from "vue";
export default defineComponent({
  name: "RuleInput",
  props: {
    modelValue: {
      type: String,
      default: '',
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
    },
    validate: {
      type: Function,
      default: (v: string) => true
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, ctx) {
    let customClass = props.config.class || ''
    if (props.readonly || props.config.readonly) {
      customClass += ' readonly'
      customClass.trim()
    }
    const defaultProps = {
      placeholder: '请输入',
      readonly: props.readonly,
      disabled: props.disabled,
    }
    const RuleInput = connect(
      ElInput,
      { change: 'input' },
      { ...defaultProps, ...props.config, class: customClass }
    );

    // 返回对应精度的数值
    function fixedNumber(number: string, precision: number) {
      if (number === '' || number === '-0') {
        return number
      }
      if (isNaN(Number(number))) {
        return number
      }
      let strNumber = number + ''
      let decimals = strNumber.split('.')[1]
      if (!decimals || decimals.length <= precision) {
        return number
      }
      return Number(number).toFixed(precision)
    }

    function handleChange(value: any) {
      if (!props.validate(value)) {
        return
      }
      // 处理精度
      if (props.config.type === 'number' && props.config.precision !== null) {
        value = fixedNumber(value, props.config.precision)
      }
      ctx.emit('update:modelValue', value)
      ctx.emit('change', value)
    }

    return () => {
      return h(RuleInput, { onChange: handleChange, modelValue: props.modelValue });
    };
  },
});
</script>


<style></style>