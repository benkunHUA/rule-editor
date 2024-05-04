## 安装方式

```shell
enpm install @rule-editor/vue-ency
```

## 使用方式

```vue
<template>
  <rule-builder
    :data="values"
    :indicators="indicators"
  >
  </rule-builder>
</template>

<script setup lang="ts">
import { RuleBuilder, Indicator, Form } from "@rule-editor/vue-ency";

let values = {
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

</script>

<style>

</style>
```

[文档地址](https://air.dev.ennew.com/rule-builder-press)