<template>
  <r-input
    v-if="'input' === formType"
    v-model="props.itemComp.value"
    :readonly="readOnly"
    :disabled="disabled"
    :validate="props.ruleItem?.indicator?.validate"
    :config="formConfig"
    @change="handleChange"
  ></r-input>
  <r-input
    v-if="'inputNumber' === formType"
    v-model="props.itemComp.value"
    :readonly="readOnly"
    :disabled="disabled"
    :validate="props.ruleItem?.indicator?.validate"
    :config="formConfig"
    @change="handleChange"
  ></r-input>
  <r-select
    v-if="'select' === formType"
    v-model="props.itemComp.value"
    :options="options"
    :readonly="readOnly"
    :disabled="disabled"
    :config="formConfig"
    @change="handleChange"
    @focus="handleFocus"
    @remote="handleRemote"
  ></r-select>
  <r-select
    v-if="'multiple' === formType"
    v-model="props.itemComp.value"
    :options="options"
    :readonly="readOnly"
    :disabled="disabled"
    :config="formConfig"
    @change="handleChange"
    @focus="handleFocus"
    @remote="handleRemote"
  ></r-select>
  <r-time-picker
    v-if="'time' === formType"
    v-model="props.itemComp.value"
    :readonly="readOnly"
    :disabled="disabled"
    :config="formConfig"
    @change="handleChange"
  ></r-time-picker>
  <r-time-picker
    v-if="'timerange' === formType"
    v-model="props.itemComp.value"
    :readonly="readOnly"
    :disabled="disabled"
    :config="formConfig"
    @change="handleChange"
  ></r-time-picker>
  <r-date-picker
    v-if="'date' === formType"
    v-model="props.itemComp.value"
    :readonly="readOnly"
    :disabled="disabled"
    :config="formConfig"
    @change="handleChange"
  ></r-date-picker>
  <r-date-picker
    v-if="'daterange' === formType"
    v-model="props.itemComp.value"
    :readonly="readOnly"
    :disabled="disabled"
    :config="formConfig"
    @change="handleChange"
  ></r-date-picker>
  <r-date-picker
    v-if="'datetime' === formType"
    v-model="props.itemComp.value"
    :readonly="readOnly"
    :disabled="disabled"
    :config="formConfig"
    @change="handleChange"
  ></r-date-picker>
  <r-date-picker
    v-if="'datetimerange' === formType"
    v-model="props.itemComp.value"
    :readonly="readOnly"
    :disabled="disabled"
    :config="formConfig"
    @change="handleChange"
  ></r-date-picker>
  <r-cascader
    v-if="'cascader' === formType"
    v-model="props.itemComp.value"
    :options="options"
    :readonly="readOnly"
    :disabled="disabled"
    :config="formConfig"
    @change="handleChange"
    @focus="handleFocus"
  ></r-cascader>
</template>

<script lang="ts">
export default {
  name: "RuleResult",
};
</script>
<script lang="ts" setup>
import { onMounted, ref, computed, inject } from "vue";
import type { DataItemType } from "@rule-editor/core";
import { ChangeKey } from "@rule-editor/vue";
import RSelect from "../../form/select.vue";
import RInput from "../../form/input.vue";
import RDatePicker from "../../form/date-picker.vue";
import RTimePicker from "../../form/time-picker.vue";
import RCascader from "../../form/cascader.vue";
import defaultFormConfig from "../../form/default-config";
const props = defineProps({
  itemComp: {
    type: Object,
    default: () => ({}),
  },
  ruleItem: {
    type: Object,
    default: () => ({}),
  },
});

const optionLoading = ref<boolean>(false);
const onChange = inject(ChangeKey) as (t: string, v: any) => void;

const formType = computed<keyof typeof defaultFormConfig>(() => {
  return props.ruleItem.formType;
});

const formConfig = computed(() => {
  let result = props.ruleItem?.indicator?.getForm(formType.value) || {};
  if (Object.keys(result).length === 0) {
    result = defaultFormConfig[formType.value] || {};
  }
  return result;
});

const options = computed(() => {
  if (!props.ruleItem.indicator) {
    return [];
  }
  return props.ruleItem.indicator.options;
});

const readOnly = computed(() => {
  return props.ruleItem.rule.readonly;
});

const disabled = computed(() => {
  return props.ruleItem.rule.disabled;
});

onMounted(() => {
  if (
    props.itemComp.value !== null &&
    ["select", "multiple", "cascader"].includes(props.ruleItem.formType)
  ) {
    handleRemote("", true);
    handleFocus();
  }
});

function handleRemote(keyword: string, initFlag = false) {
  const { remoteMethod } = props.ruleItem.indicator;
  // 指标模型中定义了选项获取方式
  if (typeof remoteMethod === "function") {
    optionLoading.value = true;
    props.ruleItem.indicator.getRemoteOptions(
      props.ruleItem.data,
      keyword,
      initFlag,
      () => {
        optionLoading.value = false;
      }
    );
    return;
  }
}

function handleChange(value: any, label: any) {
  if ("select" === formType.value) {
    const option = options.value.find((o: DataItemType) => o.value === value);
    label = option ? option.label : value;
  } else if ("multiple" === formType.value) {
    label = [];
    value.forEach((ol: any) => {
      const option = options.value.find((o: DataItemType) => o.value === ol);
      const item = option ? option.label : ol;
      label.push(item);
    });
  } else {
    label = label || value;
  }
  props.itemComp.setLabel(label);
  props.itemComp.setValue(value);
  onChange("value", value);
}

function handleFocus() {
  const { optionTrigger, optionMethod, options } = props.ruleItem.indicator;
  // 已经有数据了不重复获取
  if (options.length) {
    return;
  }
  // 指标模型中定义了选项获取方式
  if (optionTrigger === "focus" && typeof optionMethod === "function") {
    optionLoading.value = true;
    props.ruleItem.indicator.getOptions(props.ruleItem.data, () => {
      optionLoading.value = false;
    });
  }
}
</script>

<style></style>
