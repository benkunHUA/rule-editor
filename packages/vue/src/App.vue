<template>
  <rule-provide :rule="ruleNode">
    <rule-group
      :ruleNode="ruleNode.root"
      :renderContent="renderContent"
    ></rule-group>
  </rule-provide>
</template>

<script lang="ts">
import { Rule } from '@ben/rule-editor-core'
import RuleGroup from '../packages/rule/src/rule-group.vue'
import RuleProvide from '../packages/rule/src/rule-provide.vue'
import { values, dataSource } from './mock/ruleData'

export default {
  components: {
    RuleGroup,
    RuleProvide
  },
  data() {
    return {
      ruleNode: new Rule({ data: values, dataSource })
      // ruleNode: { root: {} }
    }
  },
  methods: {
    renderContent(h: any, data: any) {
      return [
        h('div', { class: 'comp' }, '字段'),
        h('input', { class: 'comp' }, '字段'),
        h('input', { class: 'comp' }, '字段'),
      ]
    }
  }
}
</script>

<style lang="scss">
@import '../packages/rule/src/style.scss';
 .rule-provide {
    width: 900px;
    > .rule-group {
      &::after {
        display: none;
      }
    }
  }
</style>
