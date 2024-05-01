<script lang="ts">
import { defineComponent, onMounted, h, inject } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import type { DataItemType } from '@ben/rule-editor-core'
import { RuleSoltsKey, ChangeKey } from '@ben/rule-editor-vue'
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
    fieldChange: Function,
  },
  setup(props: any) {
    const ruleSolts = inject(RuleSoltsKey)
    const onChange = inject(ChangeKey) as (t: string, v: any) => void
    const readonly = props.itemComp.rule.readonly
    const disabled = props.itemComp.rule.disabled
    onMounted(() => {
      if (
        props.itemComp.value !== null &&
        ["select", "multiple", "cascader"].includes(props.ruleItem.formType)
      ) {
        fieldChange(props.itemComp.data)
      }
    })

    function fieldChange(data: DataItemType) {
      const { optionTrigger, optionMethod } = props.ruleItem.indicator
      // 指标模型中定义了选项获取方式
      if (optionTrigger === 'fieldChange' && typeof optionMethod === 'function') {
        props.ruleItem.indicator.getOptions(data)
        return
      }
      if (typeof props.fieldChange === "function") {
        props.fieldChange(data, (value: DataItemType[]) => {
          props.ruleItem.setResultOptions(value)
        })
      }
    }

    function handleChange(val: number) {
      const indicators = props.ruleItem.rule.dataSource.indicators
      const data = indicators.find((el: any) => el.value === val)
      props.ruleItem.handleFieldChange(data)
      fieldChange(data)
      onChange('indicator', { id: data.value, name: data.label, ...data.data })
    }

    function setData(data: DataItemType) {
      props.ruleItem.handleFieldChange(data)
      fieldChange(data)
    }

    return () => {
      return h("div", { class: "comp rule-field" }, [
        ruleSolts?.field
          ? ruleSolts?.field({ data: props.itemComp.data, setData: setData })
          : h(
              ElSelect,
              {
                size: "small",
                modelValue: props.itemComp.value,
                clearable: false,
                readonly: readonly,
                disabled: disabled,
                onChange: handleChange,
              },
              () =>
                props.ruleItem.rule.dataSource.indicators.map((item: DataItemType) =>
                  h(ElOption, {
                    key: item.value,
                    label: item.label,
                    value: item.value,
                  })
                )
            ),
      ])
    }
  },
})
</script>
