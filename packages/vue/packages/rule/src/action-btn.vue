<script lang='ts'>
import { defineComponent, inject, h } from 'vue'
import { RuleSoltsKey, ChangeKey } from '../../shared'
export default defineComponent({
  name: 'ActionBtn',
  props: {
    deep: {
      type: Number,
      default: 1,
    },
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

    function addRuleItem() {
      props.ruleNode.addItem()
      props.setReleationPosition()
      onChange('add-item', null)
    }
    function addRuleGroup() {
      props.ruleNode.addGroup()
      props.setReleationPosition()
      onChange('add-group', null)
    }

    return () => {
      return h('div', { class: 'rule-action-wrap' }, [
        ruleSolts?.actionItem
          ? ruleSolts?.actionItem({addFn: addRuleItem, deep: props.deep})
          : h(
              'button',
              { class: 'rule-action-btn item', onClick: addRuleItem },
              ['增加项']
            ),
        props.deep < props.ruleNode.rule.deep
          ? ruleSolts?.actionGroup
            ? ruleSolts?.actionGroup({addFn: addRuleGroup, deep: props.deep})
            : h(
                'button',
                { class: 'rule-action-btn group', onClick: addRuleGroup },
                ['增加组']
              )
          : null,
      ])
    }
  },
})
</script>

<style></style>
