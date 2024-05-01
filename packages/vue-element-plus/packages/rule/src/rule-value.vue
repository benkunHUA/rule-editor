<script lang='ts'>
import { defineComponent, h, inject, ref } from 'vue'
import { RuleSoltsKey, ChangeKey } from '@ben/rule-editor-vue'
import RuleResult from './rule-result.vue'
export default defineComponent({
  name: 'RuleValue',
  props: {
    itemComp: {
      type: Object,
      default: () => ({}),
    },
    ruleItem: {
      type: Object,
      default: () => ({}),
    },
    remoteMethod: Function,
    fieldChange: Function,
    resultFocus: Function,
  },
  setup(props: any) {
    const {
      itemComp,
      ruleItem,
      remoteMethod,
      fieldChange,
      resultFocus,
    } = props

    function setData(data: any) {
      props.itemComp.setLabel(data.label)
      props.itemComp.setValue(data.value)
    }

    const formValue = ref('')

    function handleChange(value: any, label: any) {
      // 定义了校验方法
      const validate = props.ruleItem?.indicator?.validate
      if (typeof validate === 'function' && !validate(value)) {
        return
      }
      formValue.value = value
      props.itemComp.setLabel(label || value)
      props.itemComp.setValue(value)
      onChange('value', value)
    }

    const ruleSolts: any = inject(RuleSoltsKey)
    const onChange = inject(ChangeKey) as (t: string, v: any) => void
    return () => {
      return h('div', { class: 'comp rule-result' }, [
        ruleSolts?.value
          ? ruleSolts?.value({
              data: props.itemComp.data,
              ruleItem: props.ruleItem.data,
              setData: setData,
            })
          : typeof ruleItem.formType === 'string'
          ? h(RuleResult, {
              itemComp,
              ruleItem,
              remoteMethod,
              fieldChange,
              resultFocus,
            })
          : h(ruleItem.formType, {
              onChange: handleChange,
              modelValue: formValue.value,
            }),
      ])
    }
  },
})
</script>

<style>
</style>