<template>
  <div class="example">
    <h3>自定义值表单</h3>
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
import { connect } from "@rule-editor/vue";
import { ElInput } from "element-plus";

let values = {
  relation: '||',
  group: []
}

const newInput = connect(
  ElInput,
  { change: "input" },
  { placeholder: "请输入自定义" }
);

class NewText extends Indicator.text {
  constructor(props: any) {
    super(props)
    this.operators = [
      { label: '等于', value: 2, form: newInput },
      { label: '不等于', value: 3, form: newInput },
    ]
  }
}

const indicators = [
  new NewText({
    id: 1,
    name: '文本字段1',
    validate: validate
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

function validate(value: string): boolean {
  return value !== 'aaa'
}

</script>

<style>

</style>