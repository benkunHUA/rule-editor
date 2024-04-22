<template>
  <div
    :id="props.ruleNode.key"
    class="rule-group"
    :class="{ 'single-child': props.singleChild }"
  >
    <template v-for="item in props.ruleNode.childNodes">
      <rule-group
        v-if="item.type === 'group'"
        :key="item.key"
        :ruleNode="item"
        :single-child="props.ruleNode.childNodes.length <= 1"
        :renderContent="props.renderContent"
        :setReleationPosition="setReleationPosition"
        :deep="props.deep + 1"
        :visible="props.visible"
      ></rule-group>
      <rule-item
        v-else
        :key="item.key + 1"
        :ruleNode="item"
        :single-child="props.ruleNode.childNodes.length <= 1"
        :renderContent="props.renderContent"
        :setReleationPosition="setReleationPosition"
      ></rule-item>
    </template>
    <delete-btn
      v-if="!readonly && !disabled"
      :ruleNode="props.ruleNode"
      :setReleationPosition="props.setReleationPosition"
    ></delete-btn>
    <action-btn
      v-if="!readonly && !disabled"
      :deep="props.deep"
      :ruleNode="props.ruleNode"
      :setReleationPosition="setReleationPosition"
    ></action-btn>
    <div
      :id="`${props.ruleNode.key}-releation`"
      class="releation-wrap"
      v-if="props.ruleNode.childNodes.length > 1"
    >
      <rule-relation
        :relation="props.ruleNode.relation"
        :toggleReleation="toggleReleation"
        :deep="props.deep"
      ></rule-relation>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, watch } from "vue";
import RuleItem from "./rule-item.vue";
import DeleteBtn from "./delete-btn.vue";
import RuleRelation from "./rule-relation.vue";
import ActionBtn from "./action-btn.vue";

export default defineComponent({
  name: "RuleGroup",
  components: {
    RuleItem,
    DeleteBtn,
    RuleRelation,
    ActionBtn,
  },
  props: {
    ruleNode: {
      type: Object,
      default: () => ({}),
    },
    renderContent: {
      type: Function,
      default: () => [],
    },
    singleChild: {
      type: Boolean,
      default: false,
    },
    setReleationPosition: {
      type: Function,
      default: () => {},
    },
    deep: {
      type: Number,
      default: 1,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  setup(props: any) {
    watch(
      () => props.visible,
      (val: boolean, oldVal: boolean) => {
        if (!oldVal && val) {
          setReleationPosition();
        }
      }
    );

    onMounted(() => {
      setReleationPosition();
    });

    const readonly = props.ruleNode.rule.readonly;
    const disabled = props.ruleNode.rule.disabled;

    function addRuleItem() {
      props.ruleNode.addItem();
      setReleationPosition();
    }

    function addRuleGroup() {
      props.ruleNode.addGroup();
      setReleationPosition();
    }

    function toggleReleation() {
      if (readonly || disabled) {
        return;
      }
      props.ruleNode.toggleReleation();
    }

    async function setReleationPosition() {
      await nextTick();
      const releationDom = document.getElementById(
        `${props.ruleNode.key}-releation`
      );
      if (!releationDom) {
        props.setReleationPosition();
        return;
      }
      const group: HTMLElement | null = document.getElementById(
        props.ruleNode.key
      );
      if (!group) {
        return;
      }
      let items: Element[] = Array.from(group.children);
      items = items.filter(
        (o) =>
          o.className?.includes &&
          (o.className.includes("rule-group") ||
            o.className.includes("rule-item"))
      );
      if (!items.length) {
        props.setReleationPosition();
        return;
      }
      const firstDomPosi = items[0].getBoundingClientRect();
      const lastDomPosi = items[items.length - 1].getBoundingClientRect();
      const top = firstDomPosi.height / 2;
      const start = firstDomPosi.y + top;
      const end = lastDomPosi.y + lastDomPosi.height / 2;
      releationDom.style.top = top + 10 + "px";
      releationDom.style.height = end - start + "px";
      //  父组件也要重置下位置
      props.setReleationPosition();
    }
    return {
      props,
      addRuleItem,
      addRuleGroup,
      setReleationPosition,
      toggleReleation,
      readonly,
      disabled,
    };
  },
});
</script>

<style></style>
