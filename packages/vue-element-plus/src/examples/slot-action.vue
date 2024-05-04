<template>
  <div class="example">
    <h3>自定义新建按钮</h3>
    <rule-builder :data="values" :indicators="indicators">
      <template v-slot:actionItem="props">
        <button class="btn btn-primary" @click="props.addFn">新建项</button>
      </template>
      <template v-slot:actionGroup="props">
        <button
          v-if="props.deep <= 1"
          class="btn btn-primary"
          @click="props.addFn"
        >
          新建组
        </button>
      </template>
    </rule-builder>
  </div>
</template>

<script setup lang="ts">
import { RuleBuilder } from "../../packages/rule/index";
import { Indicator } from "@rule-editor/core";

let values = {
  relation: "||",
  group: [
    {
      item: [
        {
          label: "枚举字段",
          value: 1,
        },
        {
          label: null,
          value: null,
        },
        {
          label: null,
          value: null,
        },
      ],
    },
    {
      relation: "&&",
      group: [
        {
          item: [
            {
              label: "文本字段",
              value: 2,
            },
            {
              label: null,
              value: null,
            },
            {
              label: null,
              value: null,
            },
          ],
        },
        {
          item: [
            {
              label: "整数字段",
              value: 3,
            },
            {
              label: null,
              value: null,
            },
            {
              label: null,
              value: null,
            },
          ],
        },
      ],
    },
  ],
};

const indicators = [
  new Indicator.enum({
    id: 1,
    name: "枚举字段",
  }),
  new Indicator.text({
    id: 2,
    name: "文本字段",
  }),
  new Indicator.int({
    id: 3,
    name: "整数字段",
  }),
  new Indicator.decimal({
    id: 31,
    name: "小数字段",
  }),
  new Indicator.time({
    id: 4,
    name: "时间字段",
  }),
  new Indicator.date({
    id: 5,
    name: "日期字段",
  }),
  new Indicator.dateTime({
    id: 6,
    name: "日期时间字段",
  }),
];
</script>

<style></style>
