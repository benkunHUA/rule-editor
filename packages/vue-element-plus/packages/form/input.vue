<template>
  <el-input 
    :model-value="props.modelValue" 
    :type="props.config.type || 'text'"
    :maxlength="props.config.maxlength"
    :minlength="props.config.minlength"
    :showWordLimit="props.config.showWordLimit || false"
    :placeholder="props.config.placeholder || '请输入'"
    :clearable="props.config.type === 'number' ? false : !!props.config.clearable"
    :showPassword="props.config.showPassword || false"
    :disabled="props.disabled || props.config.disabled || false"
    :prefixIcon="props.config.prefixIcon"
    :suffixIcon="props.config.suffixIcon"
    :prefixText="props.config.prefixText"
    :suffixText="props.config.suffixText"
    :rows="props.config.rows || 2"
    :autosize="props.config.autosize"
    :autocomplete="props.config.autocomplete || 'off'"
    :name="props.config.name"
    :readonly="props.readonly || props.config.readonly || false"
    :readonlyWithBgcolor="props.config.readonlyWithBgcolor || false"
    :readonlyHover="props.config.readonlyHover || false"
    :max="props.config.max"
    :min="props.config.min"
    :step="props.config.step"
    :resize="props.config.resize"
    :autofocus="props.config.autofocus || false"
    :form="props.config.form"
    :label="props.config.label"
    :tabindex="props.config.tabindex"
    :textalign="props.config.textalign"
    :validateEvent="props.config.validateEvent || true"
    :inputStyle="props.config.inputStyle"
    :class="{readonly: props.readonly || props.config.readonly}"
    @input="handleChange"
  ></el-input>
</template>

<script lang="ts">
export default {
  name: 'RInput'
}
</script>
<script setup lang="ts">
import { ElInput } from 'element-plus'
const props = defineProps({
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
})

const emits = defineEmits(['update:modelValue', 'change'])

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
  if (!props.validate(value)){
    return
  }
  // 处理精度
  if (props.config.type === 'number' && props.config.precision !== null) {
    value = fixedNumber(value, props.config.precision)
  }
  emits('update:modelValue', value)
  emits('change', value)
}
</script>

<style>

</style>