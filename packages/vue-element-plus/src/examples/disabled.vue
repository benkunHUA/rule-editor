<template>
  <div class="example">
    <h3>只读禁用</h3>
    <rule-builder
      :data="values"
      :indicators="indicators"
      :disabled="true"
    >
    </rule-builder>
  </div>
</template>

<script setup lang="ts">
import { RuleBuilder } from "../../packages/rule/index";
import { Indicator } from "@ben/rule-editor-core";

let values = {
  relation: '||',
  group: [
    {
      item: [
        {
          label: '字段1(枚举)',
          value: 1,
          dataType: 1
        },
        {
          label: '等于',
          value: 2
        },
        {
          label: '选项1',
          value: '1'
        }
      ]
    },
    {
      item: [
        {
          label: '字段4(时间)',
          value: 4,
          dataType: 4
        },
        {
          label: '等于',
          value: 2
        },
        {
          label: '12:12;12',
          value: '12:12;12',
        }
      ]
    },
  ]
}

const indicators = [
  new Indicator.enum({
    id: 1,
    name: '枚举字段',
    data: { label: '枚举字段', value: 1, dataType: 1 },
  }),
  new Indicator.text({
    id: 2,
    name: '文本字段',
    data: { label: '文本字段', value: 2, dataType: 2 },
  }),
  new Indicator.int({
    id: 3,
    name: '整数字段',
    data: { label: '整数字段', value: 3, dataType: 3 },
  }),
  new Indicator.time({
    id: 4,
    name: '时间字段',
    data: { label: '时间字段', value: 4, dataType: 4 },
  }),
  new Indicator.date({
    id: 5,
    name: '日期字段',
    data: { label: '日期字段', value: 5, dataType: 5 },
  }),
  new Indicator.dateTime({
    id: 6,
    name: '日期时间字段',
    data: { label: '日期时间字段', value: 6, dataType: 6 },
  }),
]
</script>

<style>

</style>