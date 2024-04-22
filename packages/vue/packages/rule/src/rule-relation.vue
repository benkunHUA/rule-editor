<script lang='ts'>
import { defineComponent, inject, h } from 'vue'
import { RuleSoltsKey, ChangeKey } from '../../shared'
export default defineComponent({
  name: 'ruleRelation',
  props: {
    relation: {
      type: String,
      default: '',
    },
    toggleReleation: {
      type: Function,
      default: () => {},
    },
    deep: {
      type: Number,
      default: 0,
    },
  },
  setup(props: any) {
    const ruleSolts: any = inject(RuleSoltsKey)
    const onChange = inject(ChangeKey) as (t: string, v: any) => void
    function toggleReleation() {
      props.toggleReleation()
      onChange('relation', props.relation === '||' ? '&&' : '||')
    }

    return () => {
      return h(
        'div',
        { class: 'releation-custom', onClick: toggleReleation, props },
        [
          ruleSolts?.relation
            ? ruleSolts?.relation(props)
            : h(
                'span',
                { class: 'releation' },
                props.relation === '||' ? '或' : '且'
              ),
        ]
      )
    }
  },
})
</script>

<style>
</style>