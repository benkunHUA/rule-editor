<template>
  <div class="example">
    <h3>值校验</h3>
    <rule-builder
      :data="values"
      :indicators="indicators"
    ></rule-builder>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RuleBuilder from "../../packages/rule/src/index.vue";
import { Indicator, Form } from "@ben/rule-editor-core";

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
    validate: validate
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

function validate(value: string): boolean {
  return value !== 'aaa'
}
</script>

<style>

</style>