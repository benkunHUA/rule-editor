<template>
  <el-date-picker
    v-model="value"
    :readonly="props.readonly || props.config.readonly"
    :disabled="props.disabled || props.config.disabled"
    :editable="props.config.editable"
    :clearable="props.config.clearable"
    :size="props.config.size"
    :placeholder="props.config.placeholder"
    :startPlaceholder="props.config.startPlaceholder"
    :endPlaceholder="props.config.endPlaceholder"
    :type="props.config.type"
    :format="props.config.format"
    :popperClass="props.config.popperClass"
    :rangeSeparator="props.config.rangeSeparator"
    :defaultValue="props.config.defaultValue"
    :defaultTime="props.config.defaultTime"
    :valueFormat="props.config.valueFormat"
    :name="props.config.name"
    :unlinkPanels="props.config.unlinkPanels"
    :prefixIcon="props.config.prefixIcon"
    :clearIcon="props.config.clearIcon"
    :validateEvent="props.config.validateEvent"
    :disabledDate="props.config.disabledDate"
    :shortcuts="props.config.shortcuts"
    :cellClassName="props.config.cellClassName"
    :class="{readonly: props.readonly || props.config.readonly}"
    @change="handleChange"
  ></el-date-picker>
</template>

<script lang="ts">
export default {
  name: 'RDatePicker'
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { ElDatePicker } from 'element-plus'
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
  }
})

const value = ref<string>(props.modelValue)

const emits = defineEmits(['update:modelValue', 'change'])

function handleChange(value: any) {
  emits('update:modelValue', value)
  emits('change', value)
}
</script>

<style>

</style>