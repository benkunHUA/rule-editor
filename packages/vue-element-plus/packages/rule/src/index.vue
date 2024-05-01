<template>
  <div
    :class="[
      'rule-builder',
      `delete-${layoutConfig.delete}`,
      `relation-${layoutConfig.relation}`,
      {
        disabled: readonly || disabled
      }
    ]"
  >
    <rule-group
      :deep="1"
      :ruleNode="ruleNode.root"
      :renderContent="renderContent"
      :visible="props.visible"
    ></rule-group>
  </div>
</template>
<script lang="ts">
export default {
  name: 'RuleBuilder',
}
</script>
<script lang="ts" setup>
import { reactive, provide, computed, getCurrentInstance } from 'vue'
import type { ComponentInternalInstance } from 'vue'
import { Rule, RuleComp, RuleItem } from '@ben/rule-editor-core'
import type { NodeDataType, IndicatorType } from '@ben/rule-editor-core'
import { RuleGroup, RuleSoltsKey, ChangeKey } from '@ben/rule-editor-vue'
import RuleField from './rule-field.vue'
import RuleOperator from './rule-operator.vue'
import RuleValue from './rule-value.vue'

const props = defineProps([
  'data', 
  'indicators',
  'props',
  'layout',
  'deep',
  'readonly',
  'disabled',
  'visible'
])

const emit = defineEmits<{
  change: [type: string, data: any]
}>()

const ruleNode = reactive(new Rule({
  data: props.data,
  indicators: props.indicators,
  props: props.props,
  deep: props.deep,
  readonly: props.readonly || false,
  disabled: props.disabled || false,
}))

const instance = getCurrentInstance() as ComponentInternalInstance
provide(RuleSoltsKey, instance?.proxy?.$slots)
provide(ChangeKey, handleChange)

const layoutConfig = computed(() => {
  return props.layout || {
    delete: 'left',
    relation: 'right'
  }
})

function handleChange(type: string, data: any) {
  emit('change', type, data)
}

function renderContent(h: any, ruleItem: RuleItem) {
  return ruleItem.childNodes.map((itemComp: RuleComp) => {
    if (itemComp.type === 'field') {
      return h(RuleField, { 
        key: itemComp.key, 
        itemComp, ruleItem,
      })
    }
    if (itemComp.type === 'operator') {
      return h(RuleOperator, { key: itemComp.key, itemComp, ruleItem })
    }
    if (itemComp.type === 'value') {
      return h(RuleValue, { 
        key: itemComp.key, itemComp, 
        ruleItem,
      })
    }
  })
}
function getValue() {
  return ruleNode.root.data
}
function setValue(data: NodeDataType) {
  ruleNode.initNode(data)
}
function setIndicators(indicators: IndicatorType[]) {
  ruleNode.dataSource.setIndicator(indicators)
}

defineExpose({
  getValue,
  setValue,
  setIndicators
})

</script>

<style lang="scss">
@import 'element-plus/theme-chalk/index.css';
.rule-builder {
  width: 900px;
  > .rule-group {
    margin-left: 0;
    > .delete-btn {
      display: none;
    }
    &::after {
      display: none;
    }
  }
}
.rule-group {
  padding: 10px;
  padding-right: 40px;
  margin-left: 20px;
  margin-bottom: 10px;
  border: 1px dashed #e4e4e4;
  position: relative;
  .delete-btn {
    top: calc(50% - 8px);
    left: -9px;
  }
  .rule-action-wrap {
    margin-top: 10px;
    .rule-action-btn {
      display: inline-block;
      padding: 10px 20px;
      font-size: 14px;
      border-radius: 4px;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      transition: .1s;
      font-weight: 500;
      &:focus,
      &:hover {
        color: #409eff;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
      }
    }
    .rule-action-btn+.rule-action-btn {
      margin-left: 10px;
    }
  }
  .releation-wrap {
    position: absolute;
    right: 20px;
    top: 0;
    bottom: 0;
    width: 1px;
    &.hidden {
      display: none;
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 1px;
      background-color: #ddd;
    }
    
    .releation-custom {
      position: absolute;
      right: -12px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      display: block;
      text-align: center;
      .releation {
        display: block;
        width: 20px;
        height: 20px;
        background: #e8f0ff;
        border-radius: 2px;
        border: 1px solid #7a99d8;
        font-size: 13px;
        font-weight: 400;
        color: #222;
        line-height: 18px;
      }
    }
  }
}

.rule-item {
  position: relative;
  display: flex;
  margin: 10px -5px;
  padding-left: 20px;
  .delete-btn {
    top: 3px;
    left: 4px;
  }
  .comp {
    flex: 1;
    min-width: 180px;
    >.el-select {
      width: 100%;
    }
    .el-cascader,
    .el-date-editor.el-input, 
    .el-date-editor.el-input__inner {
      width: 100%;
    }
  }
  &:nth-of-type(1) {
    margin-top: 0;
  }
  &:last-of-type {
    margin-bottom: 10px;
  }
  .comp {
    margin: 0 5px;
  }
  .rule-result {
    .readonly {
      .el-input__inner {
        border-color: #c8c9cc;
        background-color: #f6f7fb;
        &:hover {
          border-color: #c8c9cc;
        }
      }
    }
  }
}

.rule-group,
.rule-item {
  position: relative;
  .delete-btn {
    position: absolute;
    cursor: pointer;
  }
  &.single-child {
    &::after {
      display: none;
    }
  }
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    border-top: 1px solid #ddd;
    display: inline-block;
    top: 50%;
    right: -14px;
    transform: translateY(-50%);
  }
}

.rule-group {
  &::after {
    right: -20px;
  }
}

.rule-builder {
  &.disabled {
    .rule-group {
      padding-bottom: 0;
    }
    &.delete-left {
      .rule-item {
        padding-left: 0;
      }
      .rule-group {
        margin-left: 0;
      }
    }
    &.delete-right {
      .rule-group {
        padding-right: 10px;
      }
    }
  }
}
  
.rule-builder {
  &.delete-right {
    .rule-item,
    .rule-group {
      > .delete-btn {
        left: unset;
        right: 4px;
      }
    }
    .rule-group {
      > .delete-btn {
        right: -32px;
      }
    }
  }
  &.relation-left {
    .rule-item,
    .rule-group {
      &::after {
        right: unset;
        left: 5px;
      }
    }
    .rule-group {
      &::after {
        left: -20px;
      }
      .releation-wrap {
        right: unset;
        left: 10px;
      }
      .rule-action-wrap {
        margin-left: 20px;
      }
    }
  }
}


</style>