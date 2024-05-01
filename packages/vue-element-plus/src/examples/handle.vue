<template>
  <div class="example">
    <h3>句柄操作</h3>
    <rule-builder ref="ruleRef"></rule-builder>
    <button @click="handleClick">设置</button>
    <button @click="getValue">获取</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RuleBuilder from "../../packages/rule/src/index.vue";
import { Indicator, Form } from "@ben/rule-editor-core";

const ruleRef = ref<InstanceType<typeof RuleBuilder>>()
let values = {
  relation: '||',
  group: []
}

const indicators = [
  new Indicator.enum({
    id: 1,
    name: '枚举字段',
  }),
  new Indicator.text({
    id: 2,
    name: '文本字段',
  }),
  new Indicator.int({
    id: 3,
    name: '整数字段',
  }),
  new Indicator.decimal({
    id: 31,
    name: '小数字段',
  }),
  new Indicator.time({
    id: 4,
    name: '时间字段',
  }),
  new Indicator.date({
    id: 5,
    name: '日期字段',
  }),
  new Indicator.dateTime({
    id: 6,
    name: '日期时间字段',
  }),
]

function getValue() {
  return ruleRef?.value?.getValue()
}

function handleClick() {
  ruleRef.value && ruleRef.value.setIndicators(indicators)
  ruleRef.value && ruleRef.value.setValue({
    relation: '||',
    group: [
      {
        item: [
          {
            label: '枚举字段',
            value: 1,
          },
          {
            label: null,
            value: null
          },
          {
            label: null,
            value: null
          }
        ]
      },
    ]
  })
}
</script>

<style>

</style>