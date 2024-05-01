<template>
  <div class="example">
    <h3>获取值选项</h3>
    <rule-builder
      :data="values"
      :indicators="indicators"
    >
    </rule-builder>
  </div>
</template>

<script setup lang="ts">
import { RuleBuilder } from "../../packages/rule/index";
import { Indicator, Form } from "@ben/rule-editor-core";

let values = {
  relation: '||',
  group: []
}

const indicators = [
  new Indicator.enum({
    id: 1,
    name: '枚举字段1',
    optionMethod: getOption
  }),
  new Indicator.enum({
    id: 2,
    name: '枚举字段2',
    optionMethod: getOption,
    optionTrigger: 'fieldChange'
  }),
]

function getOption(data: any, resolve: any) {
  if (data.item && data.item[0].value === 1) {
    resolve([
      {
        value: "option1",
        label: "选项1",
      },{
        value: "option2",
        label: "选项2",
      },{
        value: "option3",
        label: "选项3",
      },
    ])
  }
  if (data?.value === 2) {
    resolve([
      {
        value: "option2",
        label: "选项2",
      },
    ])
  }
  
}
</script>

<style>

</style>