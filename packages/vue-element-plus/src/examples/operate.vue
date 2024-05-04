<template>
  <div class="example">
    <h3>自定义操作符选项</h3>
    <rule-builder
      :data="values"
      :indicators="indicators"
    >
    </rule-builder>
  </div>
</template>

<script setup lang="ts">
import { RuleBuilder } from "../../packages/rule/index";
import { Indicator, Form } from "@rule-editor/core";

let values = {
  relation: '||',
  group: []
}

class NewText extends Indicator.text {
  constructor(props: any) {
    super(props)
    this.operators = [
      { label: '等于', value: 2, form: 'input' },
      { label: '不等于', value: 3, form: 'input' },
    ]
  }
}

const indicators = [
  new NewText({
    id: 1,
    name: '文本字段1',
  }),
  new Indicator.text({
    id: 2,
    name: '文本字段2',
    operators: [
      { label: '等于', value: 2, form: 'input' },
      { label: '不等于', value: 3, form: 'input' },
    ]
  }),
]

</script>

<style>

</style>