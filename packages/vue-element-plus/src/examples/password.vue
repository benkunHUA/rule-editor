<template>
  <div class="example">
    <h3>自定义密码类型</h3>
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

class Password extends Indicator.text {
  constructor(props: any) {
    super(props)
    this.formMap = {
      input: new Form.input({
        showPassword: true
      })
    }
  }
}

const indicators = [
  new Password({
    id: 100,
    name: '密码字段',
  }),
  new Indicator.text({
    id: 200,
    name: '密码字段2',
    formMap: {
      input: {
        showPassword: true,
      }
    }
  }),
]
</script>

<style>

</style>