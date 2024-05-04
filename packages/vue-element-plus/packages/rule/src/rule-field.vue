<script lang="ts">
import { defineComponent, onMounted, h, inject } from "vue";
import { ElSelect, ElOption } from "element-plus";
import type { DataItemType } from "@rule-editor/core";
import { ChangeKey } from "@rule-editor/vue";
export default defineComponent({
  name: "RuleField",
  components: {
    ElSelect,
    ElOption,
  },
  props: {
    itemComp: {
      type: Object,
      default: () => ({}),
    },
    ruleItem: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: any) {
    const onChange = inject(ChangeKey) as (t: string, v: any) => void;
    const readonly = props.itemComp.rule.readonly;
    const disabled = props.itemComp.rule.disabled;
    onMounted(() => {
      if (
        props.itemComp.value !== null &&
        ["select", "multiple", "cascader"].includes(props.ruleItem.formType)
      ) {
        getOptionWhenFieldChange(props.itemComp.data);
      }
    });

    function getOptionWhenFieldChange(data: DataItemType) {
      const { optionTrigger, optionMethod } = props.ruleItem.indicator;
      // 指标模型中定义了选项获取方式
      if (
        optionTrigger === "fieldChange" &&
        typeof optionMethod === "function"
      ) {
        props.ruleItem.indicator.getOptions(data);
      }
    }

    function handleChange(val: number) {
      const indicators = props.ruleItem.rule.dataSource.indicators;
      const data = indicators.find((el: any) => el.value === val);
      props.ruleItem.handleFieldChange(data);
      getOptionWhenFieldChange(data);
      onChange("indicator", { id: data.value, name: data.label, ...data.data });
    }

    return () => {
      return h("div", { class: "comp rule-field" }, [
        h(
          ElSelect,
          {
            modelValue: props.itemComp.value,
            clearable: false,
            readonly: readonly,
            disabled: disabled,
            placeholder: "请选择",
            onChange: handleChange,
          },
          () =>
            props.ruleItem.rule.dataSource.indicators.map(
              (item: DataItemType) =>
                h(ElOption, {
                  key: item.value,
                  label: item.label,
                  value: item.value,
                })
            )
        ),
      ]);
    };
  },
});
</script>
