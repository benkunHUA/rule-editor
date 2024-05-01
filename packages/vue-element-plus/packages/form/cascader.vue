<template>
  <el-cascader
    ref="casderRef"
    v-model="value"
    :options="props.options"
    :props="props.config.props"
    :placeholder="props.config.placeholder"
    :disabled="props.readonly || props.disabled || props.config.disabled"
    :showDisabled="props.config.showDisabled"
    :clearable="props.config.clearable"
    :showAllLevels="props.config.showAllLevels"
    :separator="props.config.separator"
    :filterable="props.config.filterable"
    :filterMethod="props.config.filterMethod"
    :debounce="props.config.debounce"
    :beforeFilter="props.config.beforeFilter"
    :popperClass="props.config.popperClass"
    :teleported="props.config.teleported"
    :popperAppendToBody="props.config.popperAppendToBody"
    :class="{readonly: props.readonly || props.config.readonly}"
    @change="handleChange"
    @focus="handleFocus"
  >
  </el-cascader>
</template>
<script lang="ts">
export default {
  name: 'RCascader'
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { ElCascader } from 'element-plus'
import type { CascaderNode } from 'element-plus'
import type { CascaderOption } from '@ben/rule-editor-core'
import type { PropType } from 'vue'

type CascaderNodeValue = string | number | undefined;

const props = defineProps({
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
})

const emits = defineEmits(['update:modelValue', 'change', 'focus'])
const casderRef = ref<InstanceType<typeof ElCascader>>()
const value = ref<any>(props.modelValue)

function handleChange() {
  const nodes: CascaderNode[] = casderRef.value?.getCheckedNodes(false) || []
  if (props.config.props.multiple) {
    let label: string[] = []
    let value: CascaderNodeValue[] = []
    nodes.forEach((item: CascaderNode) => {
      label.push(item.label)
      value.push(item.value)
    })
    emits('update:modelValue', value)
    emits('change', value, label)
  } else {
    const node = nodes[0] || {}
    emits('update:modelValue', node.value)
    emits('change', node.value, node.label)
  }
}

function handleFocus() {
  emits('focus')
}
</script>

<style>

</style>