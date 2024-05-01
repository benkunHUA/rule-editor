<template>
  <el-time-picker
    v-model="value"
    :readonly="props.readonly || props.config.readonly"
    :disabled="props.disabled || props.config.disabled"
    :editable="props.config.editable"
    :clearable="props.config.clearable"
    :size="props.config.size"
    :placeholder="props.config.placeholder"
    :startPlaceholder="props.config.startPlaceholder"
    :endPlaceholder="props.config.endPlaceholder"
    :isRange="props.config.isRange"
    :align="props.config.align"
    :popperClass="props.config.popperClass"
    :rangeSeparator="props.config.rangeSeparator"
    :format="props.config.format"
    :value-format="props.config.valueFormat"
    :defaultValue="props.config.defaultValue"
    :name="props.config.name"
    :clearIcon="props.config.clearIcon"
    :disabledHours="props.config.disabledHours"
    :disabledMinutes="props.config.disabledMinutes"
    :disabledSeconds="props.config.disabledSeconds"
    :start="props.config.start"
    :end="props.config.end"
    :step="props.config.step"
    :minTime="props.config.minTime"
    :maxTime="props.config.maxTime"
    :minuteInterval="props.config.minuteInterval"
    :secondIntervel="props.config.secondIntervel"
    :class="{readonly: props.readonly || props.config.readonly}"
    @change="handleChange"
  ></el-time-picker>
</template>

<script lang="ts">
export default {
  name: 'RTimePicker'
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { ElTimePicker } from 'element-plus'
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