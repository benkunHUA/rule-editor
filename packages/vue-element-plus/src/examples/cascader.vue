<template>
  <div class="example">
    <h3>级联选择器</h3>
    <rule-builder
      :data="values"
      :indicators="indicators"
    >
    </rule-builder>
  </div>
</template>

<script setup lang="ts">
import { RuleBuilder } from "../../packages/rule/index";
import { Indicator, Form, formType } from "@ben/rule-editor-core";

let values = {
  relation: '||',
  group: []
}

class CascaderEnum extends Indicator.enum {
  constructor(props: any) {
    super(props)
    this.formMap = {
      cascader: new Form.cascader({
        props: { multiple: true }
      })
    }
    this.operators = [
      { label: '等于', value: 2, form: formType.cascader },
      { label: '不等于', value: 3, form: 'cascader' },
    ]
  }
}

const indicators = [
  new CascaderEnum({
    id: 100,
    name: '层联字段值',
    data: { dataType: 100 },
    optionMethod: getCascaderOption
  })
]

function getCascaderOption(data: any, resolve: any) {
  resolve([
    {
      value: "hebeisheng",
      label: "河北省",
      children: [
        {
          value: "guangyang",
          label: "广阳区",
        },
        {
          value: "anciqu",
          label: "安次区",
        },
        {
          value: "bazhoushi",
          label: "霸州市",
        },
      ],
    },
  ])
}
</script>

<style>

</style>