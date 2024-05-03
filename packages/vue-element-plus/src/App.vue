<template>
  <div id="app">
    <ExampleBase />
    <ExampleValueOption />
    <el-time-picker :modelValue="value1" placeholder="Arbitrary time" @input.native="handlechange" />
    <!-- <ExampleOperate />
    <ExamplePassword />
    <ExampleCascader />
    <ExampleDisabled />
    <ExampleOldDataSource />
    <ExampleHandle />
    <ExampleValidate />
    <ExampleCustomForm />
    <ExampleActionSlot /> -->
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ExampleBase from './examples/base.vue'
import ExampleOperate from './examples/operate.vue'
import ExamplePassword from './examples/password.vue'
import ExampleValueOption from './examples/value-option.vue'
import ExampleCascader from './examples/cascader.vue'
import ExampleDisabled from './examples/disabled.vue'
import ExampleOldDataSource from './examples/old-datasource.vue'
import ExampleHandle from './examples/handle.vue'
import ExampleValidate from './examples/validate.vue'
import ExampleCustomForm from './examples/custom-form-rule.vue'
import ExampleActionSlot from './examples/slot-action.vue'
import { ElTimePicker } from "element-plus";

let value1 = ref()

function handlechange(val: string) {
  console.log(val)
}

</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.custom-field,
.custom-value {
  width: 100%;
  height: 30px;
}
.relation-custom {
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
</style>
