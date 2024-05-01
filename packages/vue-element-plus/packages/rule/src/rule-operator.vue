<template>
  <div class="comp rule-operator">
    <el-select 
      size="small" 
      :clearable="false"
      :readonly="readonly"
      :disabled="disabled"
      v-model="props.itemComp.value"  
      @change="handleChange"
    >
      <el-option 
        v-for="item in operators"
        :key="item.value"
        :label="item.label" 
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import type { OperateOptionType } from '@ben/rule-editor-core'
import { ChangeKey } from '@ben/rule-editor-vue'
const props = defineProps({
  itemComp: {
    type: Object,
    default: () => ({})
  },
  ruleItem: {
    type: Object,
    default: () => ({})
  }
})

const onChange = inject(ChangeKey) as (t: string, v: any) => void

const operators = computed(() => {
  if (!props.ruleItem.indicator) {
    return []
  }
  return props.ruleItem.indicator.operators
})
const readonly = props.itemComp.rule.readonly;
const disabled = props.itemComp.rule.disabled;

const handleChange = (val: number)=>{
  const option = operators.value.find((o: OperateOptionType) => o.value === val)
  props.ruleItem.handleOperateChange(option)
  props.itemComp.setLabel(option.label)
  props.itemComp.setValue(option.value)
  onChange('operator', option)
}
</script>

<style>

</style>