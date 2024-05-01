<template>
  <div class="example">
    <h3>兼容第一版</h3>
    <rule-builder
      :data="values"
      :dataSource="dataSource"
      :dataTypeProps="dataTypeProps"
    >
    </rule-builder>
  </div>
</template>

<script setup lang="ts">
import { RuleBuilder } from "../../packages/rule/index";

let values = {
  relation: '||',
  group: []
}

const dataSource = [
  { label: '枚举字段', value: 1, dataType: 1 },
  { label: '文本字段', value: 2, dataType: 2 },
  { label: '整数字段', value: 3, dataType: 3 },
  { label: '小数字段', value: 9, dataType: 9 },
]

const dataTypeProps = {
  int: {
    value: 3, // int类型对应的编码
    precision: 0, // 精度，接受非负整数，小数点后保留多少位，不传就不限制小数位数
    step: 1, // 步长，不传默认是1
  },
  decimal: {
    value: 9,
    precision: 3,
    step: 2,
  }
}

</script>

<style>

</style>