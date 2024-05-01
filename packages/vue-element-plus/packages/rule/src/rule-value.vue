<script lang='ts'>
import { defineComponent, h, inject, ref } from 'vue'
import { ChangeKey } from '@ben/rule-editor-vue'
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
  },
  setup(props: any) {
    const { itemComp, ruleItem } = props

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

    const onChange = inject(ChangeKey) as (t: string, v: any) => void
    return () => {
      return h('div', { class: 'comp rule-result' }, [
        typeof ruleItem.formType === 'string'
          ? h(RuleResult, {
            itemComp,
            ruleItem,
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

<style></style>