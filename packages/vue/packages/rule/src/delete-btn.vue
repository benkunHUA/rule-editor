<script lang='ts'>
import { defineComponent, inject, h } from 'vue'
import { RuleSoltsKey, ChangeKey } from '../../shared'
import { closePath } from '../../shared/icon'
export default defineComponent({
  name: 'DeleteBtn',
  props: {
    ruleNode: {
      type: Object,
      default: () => ({}),
    },
    setReleationPosition: {
      type: Function,
      default: () => {},
    },
  },
  setup(props: any) {
    const ruleSolts: any = inject(RuleSoltsKey)
    const onChange = inject(ChangeKey) as (t: string, v: any) => void
    function handleDelete() {
      props.ruleNode.deleteRuleNode()
      props.setReleationPosition()
      onChange(`delete-${props.ruleNode.type}`, props.ruleNode.data)
    }

    return () => {
      return h('span', { class: 'delete-btn', onClick: handleDelete }, [
        ruleSolts?.delete
          ? ruleSolts?.delete()
          : h(
              'svg',
              {
                width: 16,
                height: 16,
                viewBox: '0 0 1024 1024',
                class: 'delete-btn',
              },
              [h('path', { d: closePath })]
            ),
      ])
    }
  },
})
</script>

<style>
</style>