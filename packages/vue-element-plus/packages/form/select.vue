<template>
  <el-select
    :model-value="props.modelValue"
    :multiple="props.config.multiple || false"
    :disabled="props.disabled || props.config.disabled || false"
    :readonly="props.readonly || props.config.readonly || false"
    :value-key="props.config.valueKey || 'value'"
    :clearable="props.config.clearable || true"
    :multiple-limit="props.config.multipleLimit || 0"
    :autocomplete="props.config.autocomplete || 'off'"
    :placeholder="props.config.placeholder || '请选择'"
    :allow-create="props.config.allowCreate || false"
    :filter-method="props.config.filterMethod || undefined"
    :remote="props.config.remote || false"
    :remote-method="props.config.remote ? handleRemote : undefined"
    :dropdown-visible-always="props.config.dropdownVisibleAlways || false"
    :loading-text="props.config.loadingText || '加载中'"
    :no-match-text="props.config.noMatchText || '无匹配结果'"
    :no-data-text="props.config.noDataText || '无结果'"
    :popper-class="props.config.popperClass || ''"
    :scrollbar-list-class="props.config.scrollbarListClass || ''"
    :reserve-keyword="props.config.reserveKeyword || false"
    :default-first-option="props.config.defaultFirstOption || false"
    :popper-append-to-body="props.config.popperAppendToBody || true"
    :append-to="props.config.appendTo || undefined"
    :fit-input-width="props.config.fitInputWidth || false"
    :text-ellipsis="props.config.textEllipsis || true"
    :max-token-width="props.config.maxTokenWidth || '100'"
    :max-token-count="props.config.maxTokenCount || 1"
    :display="props.config.display || false"
    :display-more-text="props.config.displayMoreText || '更多'"
    :reserve-keyword-when-options-change="props.config.reserveKeywordWhenOptionsChange || false"
    :token-tooltip-style="props.config.tokenTooltipStyle || ''"
    :class="{readonly: props.readonly || props.config.readonly}"
    @change="handleChange"
    @focus="handleFocus"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script lang="ts">
export default {
  name: 'RSelect'
}
</script>
<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus'
import type { DataItemType } from '@ben/rule-editor-core'
import type { PropType } from 'vue'
const props = defineProps({
  options: {
    type: Array as PropType<DataItemType[]>,
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

const emits = defineEmits(['update:modelValue', 'change', 'focus', 'remote'])

function handleChange(value: any) {
  emits('update:modelValue', value)
  emits('change', value)
}

function handleFocus() {
  emits('focus')
}

function handleRemote(keyword: string) {
  emits('remote', keyword)
}
</script>

<style>

</style>