<script lang="ts">
import { provide, defineComponent, reactive, h, useSlots} from 'vue'
import { RuleSymbol } from '../../shared/context'

export default defineComponent({
  name: 'RuleProvide',
  props: ['rule'],
  setup(props: any) {
    const slots: any = useSlots()
    provide(RuleSymbol, props.rule)
    return () => {
      return h('div', { class: 'rule-provide' }, slots.default())
    }
  }
})
</script>