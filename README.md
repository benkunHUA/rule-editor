# 规则编辑器介绍

## 一、背景

新奥的各个业务场景中充斥着大量规则编辑的诉求，但纵观整个行业前端生态，实现规则编辑的思路都是千篇一律的前端表单动态表单方案，相信各位伙伴都有过相同经历，一旦规则组合或者规则表达的复杂度稍稍提升，用动态表单实现规则编辑这件事就会变得异常痛苦，一大段的表单适配逻辑，那么能不能从规则本身的特征出发，根据规则表达式的语法模式，打造一种优雅的规则编辑表达方式呢? 

其实隔壁  生态早就有标准答案了，苹果用户请打开 Find 使用文件检索功能, 使用查询条件编辑，这不就是经典的规则编辑器么！

![NsRuleEditor](https://res.ennew.com/image/gif/cf990d267c37fecefbab95dcf933586e.gif)

让我们来探索一下 [NsRuleEditor](https://developer.apple.com/documentation/appkit/nsruleeditor) 和 [NSPredicateEditor](https://developer.apple.com/documentation/appkit/nspredicateeditor) 的实现，它们的精妙之处在于使用了谓词编程范式来描述规则表达式。

[谓词编程](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Predicates/AdditionalChapters/Introduction.html#//apple_ref/doc/uid/TP40001789)是一种基于逻辑表达式的编程范式，它将程序中的逻辑表达式表示为谓词，通过对谓词进行组合和应用，实现程序的逻辑控制和数据处理，谓词编程的核心思想是将问题分解为一系列简单的谓词，通过对这些谓词进行组合和应用，实现复杂问题的求解。

在规则元表达式中，表达式即由值对象与谓词组成，任何复杂的规则都可以被值对象与谓词的组合描述，再根据表达式中不同值对象和谓词的属性，针对功能性进行进一步细分抽象，最后再映射到前端组件上，是不是就能够实现一个具备泛用性的规则编辑器了呢？

以上就是规则编辑器诞生的故事了。





## 二、设计理念与功能概览

基于谓词编程给我们启发，我们将规则表达式的结构定义成以下几个基础元素：规则组、规则项、指标、操作符、值。

![image-20231106151304183](https://res.ennew.com/image/png/ccd266196a9048bbdf81a7e58e4779b6.png)

### 规则组

如上图所示虚边框包裹的部分为规则组；由指标、操作符、值三者组成的部分为规则项。规则组包含若干个规则项，规则组还可以嵌套规则组，通过规则组的嵌套可以形成多层级的结构，同一层级的规则组和规则项由逻辑关系关联。

### 规则项

一个规则项应该是这样的形式： a > 100

其中"a"代表指标，">"代表操作符，"100"代表值

规则组和规则项可以用如下的json描述：

group 表示规则组，item 表示规则项，item 数组的三项依次表示指标、操作符、值

```json
{
  "relation": "&&",
  "group": [
    { 
      "item": [
        { label: '指标', value: 'indicator' },
        { label: '大于', value: '>' },
        { label: '100', value: '100' },
      ] 
    },
    {
      "relation": "||",
      "group": [
        { "item": [/*xxx*/] },
        { "item": [/*xxx*/] }
      ]
    }
  ]
}
```

### 指标

指标是一个规则项的核心，操作符有哪些选项，值用什么表单输入都由指标的**类型**控制。规则编辑器中默认定义了多种类型，每种类型都有其默认的操作符选项和值表单类型。

规则编辑器的使用关键就是定义指标类型，下面是定义指标类型的代码演示：

```vue
<template>
  <rule-builder
    :data="values"
    :indicators="indicators"
  >
  </rule-builder>
</template>

<script setup>
import { RuleBuilder, Indicator } from '@ennew/rule-builder-vue-ency'

let values = {
  relation: '',
  group: []
}

// 定义指标类型
const indicators = [
  new Indicator.enum({
    id: 1,
    name: '枚举字段',
  }),
  new Indicator.text({
    id: 2,
    name: '文本字段',
  }),
  new Indicator.int({
    id: 3,
    name: '整数字段',
  }),
  new Indicator.time({
    id: 4,
    name: '时间字段',
  }),
]

</script>
```

上面所示代码的运行效果如下：

<video>
  <source src="https://icomestatics.oss-cn-beijing.aliyuncs.com/ECM/statics/assets/%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8.mp4" type="video/mp4">
</video>

### 操作符

规则编辑器给每种类型定义了默认的操作符，如默认的不满足需求，有两种方式自定义，如下方代码所示：

```js
import { RuleBuilder, Indicator } from '@ennew/rule-builder-vue-ency'

// 方式一：继承内置的指标类型，重新给操作符数组赋值
class NewText extends Indicator.text {
  constructor(props) {
    super(props)
    this.operators = [
      { label: '等于', value: 2, form: 'input' },
      { label: '不等于', value: 3, form: 'datetime' },
    ]
  }
}

const indicators = [
  new NewText({
    id: 1,
    name: '文本字段1',
  }),
  // 方式二：实例化类型时直接传入操作符数组
  new Indicator.text({
    id: 2,
    name: '文本字段2',
    operators: [
      { label: '包含', value: 4, form: 'input' },
      { label: '不包含', value: 5, form: 'select' },
    ]
  }),
]
```

上面所示代码的运行效果如下：

<video>
  <source src="https://icomestatics.oss-cn-beijing.aliyuncs.com/ECM/statics/assets/%E8%87%AA%E5%AE%9A%E4%B9%89%E6%93%8D%E4%BD%9C%E7%AC%A6.mp4" type="video/mp4">
</video>


### 值

在上方的示例中可以看到，自定义操作符是给 operators 数组赋值，operators 数组有三个属性，label，value 好理解，一个是显示名一个是实际值，form 代表值表单的类型，还是看上方的示例，当指标选择“文本字段1”，操作符选择“等于”时；值表单类型是输入框，操作符选择“不等于”时，值表单类型是日期选择框。

**规则编辑器内置了如下几种值表单类型：**

- select-下拉框 
- multiple-多选下拉框
- null-没有结果项 
- input-输入框 
- inputNumber-数值输入框
- date-日期选择框 
- datetime-日期时间选择框 
- datetimerange-日期时间区间选择框 
- daterange-日期区间选择框
- cascader-级联选择框

用户可以通过如下的方式对值表单的属性进行设置：

```js
import { RuleBuilder, Indicator, Form } from '@ennew/rule-builder-vue-ency'

class Password extends Indicator.text {
  constructor(props) {
    super(props)
    this.operators = [
      { label: '等于', value: 2, form: 'input' },
      { label: '不等于', value: 3, form: 'input' },
    ]
    this.formMap = {
      input: new Form.input({
        showPassword: true
      }),
    }
  }
}

const indicators = [
  new Password({
    id: 100,
    name: '密码字段1',
  }),
  new Indicator.text({
    id: 101,
    name: '密码字段2',
    operators: [
      { label: '等于', value: 2, form: 'input' },
      { label: '不等于', value: 3, form: 'input' },
    ],
    formMap: {
      input: {
        showPassword: true
      }
		}
  })
]
```

如上方代码所示值表单的属性在 formMap 字段中定义，如果 operators 数组中有多种表单类型，那么在 formMap 也就要有多个键值对。定义值表单属性的方式也是两种，一是继承默认的类型重写 formMap，二是实例化时直接传入 formMap 属性。

通过继承规则编辑器默认的类型，然后对操作符和值表单属性自定义用户完全可以创建一种新的类型。

值表单类型如果是下拉框，那么获取值下拉框的选项也是很重要的事情，规则编辑器的做法如下：

```js
import { RuleBuilder, Indicator } from '@ennew/rule-builder-vue-ency'

const indicators = [
  new Indicator.enum({
    id: 1,
    name: '枚举字段1',
    optionMethod: getOption
  }),
  new Indicator.enum({
    id: 2,
    name: '枚举字段2',
    optionMethod: getOption,
    optionTrigger: 'fieldChange'
  }),
  new Indicator.enum({
    id: 3,
    name: '枚举字段3',
    options: [
      { label: '直接传入的', value: 1 }
    ],
  }),
]

function getOption(data, resolve) {
  if (data.item && data.item[0].value === 1) {
    resolve([
      {
        value: "option1",
        label: "选项1",
      },
    ])
  }
  if (data?.value === 2) {
    resolve([
      {
        value: "option2",
        label: "选项2",
      },
    ])
  }
}
```

如上代码所示，获取选项的方式有两种一种是直接传入 options 数组，另一种是传入optionMethod 方法，将选项作为回调函数的参数传入，默认是在值表单 focus 时触发，optionTrigger 还可以传入"fieldChange"表示指标变化时触发。

如果值选项需要用关键词远程搜索，规则编辑器还提供了远程枚举类型，代码如下：

```js
import { ref, onMounted } from 'vue'
import { RuleBuilder, Indicator } from '@ennew/rule-builder-vue-ency'

const indicators = [
  new Indicator.remoteEnum({
    id: 1,
    name: '远程字段',
    remoteMethod: getOption
  }),
]

const list = ref([])

onMounted(() => {
  list.value = states.map((item) => {
    return { value: `value:${item}`, label: `label:${item}` }
  })
})

const indicators = [
  new Indicator.remoteEnum({
    id: 1,
    name: '远程字段',
    remoteMethod: getOption
  }),
]

function getOption(data, keyword, initFlag, resolve) {
  if (keyword) {
    setTimeout(() => {
      const options = list.value.filter((item) => {
        return item.label.toLowerCase().includes(keyword.toLowerCase())
      })
      resolve(options)
    }, 200)
  } else {
    resolve([])
  }
}
const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  //xxx
]
```

<video>
  <source src="https://icomestatics.oss-cn-beijing.aliyuncs.com/ECM/statics/assets/%E5%80%BC%E9%80%89%E9%A1%B9%E8%8E%B7%E5%8F%96.mp4" type="video/mp4">
</video>

如果内置的值表单类型不满足需求，也可以自定义值表单，如下方代码所示：

```js
import { RuleBuilder, Indicator, connect } from '@ennew/rule-builder-vue-ency'
import CustomForm from "./CustomInput.vue"

const newInput = connect(
  CustomForm,
  { change: "input" },
  { placeholder: "请输入自定义" }
)

class NewText extends Indicator.text {
  constructor(props) {
    super(props)
    this.operators = [
      { label: '等于', value: 2, form: newInput },
      { label: '不等于', value: 3, form: newInput },
    ]
  }
}

const indicators = [
  new NewText({
    id: 1,
    name: '枚举字段',
  })
]
```

```vue
/*CustomInput.vue*/
<template>
  <input class="custom-input" v-model="modelValue"  />
</template>
<script setup>
import { ref } from 'vue'

const modelValue = ref('')
</script>

<style>
</style>
```

规则编辑器提供一个 connect 方法，将自定义的值组件与规则编辑器连接，如果自定义的表单输入变化事件不是 change 需要在 connect 方法的第二个参数做映射，第三个参数表示自定义组件的 props。

<video>
  <source src="https://icomestatics.oss-cn-beijing.aliyuncs.com/ECM/statics/assets/%E8%87%AA%E5%AE%9A%E4%B9%89%E5%80%BC%E7%BB%84%E4%BB%B6.mp4" type="video/mp4">
</video>


## 三、整体架构设计

### 组件的整体架构

![架构图](https://res.ennew.com/image/png/8b13500f02feef165798ef9cc69eb072.png)

规则编辑器整体分为三层，内核层、通用组件层、扩展组件层。从分层中可以看出，规则编辑器将逻辑和视图进行了分离，其中视图层又分成了通用组件层和扩展组件层。

内核层与 vue，react 等框架无关，是对规则编辑器逻辑的抽象，逻辑的定义和转换都在这一层进行。这样做最大程度考虑了复用性，不同框架之间都可以使用这一层的代码。

规则编辑器用到了很多表单组件，表单组件借助了 Ency Design 组件库的能力，基于是否使用了组件库的组件，将规则编辑器分成了通用和扩展组件层，通用组件层没有使用组件库，扩展组件层使用了。组件库是多种多样的，后续如果想用其他组件库，只需再开发扩展组件层即可。

**这三层之间又是怎么连接的呢？**

规则编辑器最终会在扩展组件层导出，在这一层中整合了内核层和通用组件层的能力，所以三层之间的关系实际是，扩展层与内核层，扩展层与通用层的关系。

**扩展层与内核层之间：**

```js
import { Rule } from '@ben/rule-editor-core'
import { reactive } from 'vue'

cont ruleNode = reactive(
  new Rule({
    data: data,
    indcators: indcators,
  })
)
```

从上面的代码中可以看出扩展层是实例化内核层的实体，并将数据进行相应式处理，有了相应式的数据，后面的开发就顺理成章了。

在 vue 中可以使用其自身的响应式能力，那么在 react 中该怎么处理？

在内核层中借助 formily/reactive 的能力对数据做了相应式处理，和 vue 的响应式并不矛盾，后续如果要开发 react 版本，那么再借助 formily/reactive-react 的 observer 包裹下 react 组件即可。

[formily文档](https://reactive.formilyjs.org/)

**扩展层与通用组件层之间：**

扩展层的代码如下：

```vue
<rule-group
 :ruleNode="ruleNode"
 :renderContent="renderContent"
\>
 <rule-item :renderContent="renderContent"></rule-item>
</rule-group>
```

```js
renderContent(h) {
 return [
  h(RuleField),
  h(RuleOperate),
  h(RuleResult)
 ]
}
```

rule-group 和 rule-item 是通用层的组件，RuleField, RuleOperate, RuleResult 是扩展层的组件并且这三个组件需要作为 rule-item 的子组件。

**通用层的 rule-item 组件代码如下：**

```js
setup(props) {
 return () => {
  return h(
   'div', 
   { class: 'rule-item' }, 
   [
     ...props.renderContent(h, ruleNode),
   ]
  )
 }
}
```

从上面的代码可以看出，扩展层和通用层是利用h函数做连接，扩展层中传入 render 方法，通用层中在h函数中调用 render。

### 模型层实体关系图

![类型实体关系图](https://res.ennew.com/image/png/b6b0286ac17b47cbd4066378f2e37305.png)

上图为指标类型的实体关系图(省略了部分实体)，每种类型都有对应的实体，operators 表示操作符选项，formMap 是值表单实例，实例中定义了表单的各种属性。用户在使用过程中通过修改 operators 来自定义操作符选项，通过修改formMap 来自定义值表单属性。在规则编辑器中也会通过继承基础类型来实现新的类型，如上图所示的 RemoteEnum 是通过继承 Enum 实现的可以远程搜索值选项的类型。

![视图实体关系图](https://res.ennew.com/image/png/6d12767e829f9221fd45d469b94c88f6.png)

在上面有介绍扩展层会实例化内核层的实体，这个实体就是上图所示的 Rule，用户在使用过程中主要会传入两个字段：indicators 和 data。indicators 存在 Rule.dataSource 中，data 会通过 Rule 的 init 方法转化成规则编辑器的五个组成部分，规则编辑器以规则组开始，Rule.root 即为规则组的根节点，规则组和规则项的子节点在 childNodes 中，规则组的子节点既有规则组也有规则项，规则项的子节点固定由指标、操作符、值三部分组成。

**Rule 的初始化过程：**

![初始化时序图](https://res.ennew.com/image/png/494ac799cf73eb388aef848273ef45bf.png)

RuleGroup 实例化 RuleGroup 的过程形成了规则编辑器的树结构，子节点在实例化完成后会回调 Rule 的 registerNode 方法将树结构的数据展平成对象结构，方便后续使用。节点实例化后先通过 vue/reactive 转成响应式数据，再通过 props 的方式传给组件，每个节点都有对 Rule 和父节点的引用（实体中的 rule 和 parent），指标组件可以通过访问 Rule.dataSource 获取所有指标渲染到下拉框中，规则组和规则项的新增和删除就是对 parent.childNodes 数组的新增和删除。

**指标和操作符切换过程**

![指标操作符切换时序图](https://res.ennew.com/image/png/b0abd0abee3d38b0d566e4ac828d469e.png)



## 四、后续工作

实现了规则的编辑，让我们再来关注下规则编辑器的输入输出，我们能否依据行业规则语法的定义(比如 Drools Rule Language)设计一套描述规则的语法结构，一方面方便服务端直接输入给规则引擎运行，一方面方便与规则编辑器视图的双向转换呢，答案当然是可以!

用户通过输入规则表达式语法『比如($a + $b) * 10  > c + 100』，即可生成规则编辑器的视图，而对于规则编辑器视图的编辑操作也会动态变更规则表达式。

![交互方式](https://res.ennew.com/image/png/fc3717a3e5c07d0b8ec98b10a31e9476.png)

我们会向着这个方向继续迭代。


## 使用说明

### 安装方法

```shell
enpm install @ennew/rule-builder-vue-ency
```

### 项目中引用代码

```vue
<template>
  <rule-builder
    :data="values"
    :indicators="indicators"
  >
  </rule-builder>
</template>
<script setup>
import { RuleBuilder, Indicator } from '@ennew/rule-builder-vue-ency'
let values = {
  relation: '',
  group: []
}
const indicators = [
  new Indicator.enum({
    id: 1,
    name: '指标',
  }),
]

</script>
```

### API文档

https://air-inc.ennew.com/qi-component-enn-rule-builder-ency-press

### playground

<font color=Blue>**基本使用**</font>

[在线运行](https://air.dev.ennew.com/rule-builder-playground#eNq9k8Fu00AQhl9ltJe0UmxDWwnJpFHgxpVrjZBrT8oW7+xqd50SRTnzBCUSQjwBIA4FceJpIBJvwew6kDhI9NaT7dnZb/6Zf7wQj4xJZy2KXIw8KtOUHscFAYxs22By3sqmRhsCAHld+vK0ELOyadEVYhOVVMuq9No6Ptt+dOcdK9uFcWiU7dTiT1dZaTw49K3hiFRGWw8LeMrXHne3hvDkDxqWMLVawWCCRHjVgyfcS4JUzQcB3KCHTi2cwiJIschVpaYcBoNhCFxY3Zoczp4VtAxXKk3Ow7YNvngW8rjQVkGK1KqDCASQdQ73I4uzSoWMXr9/++Pb958fV+tPX7oyy8P46FM8vvK7lKM9ypvX63cfbqVI6kGO9yDXN+vrz7dLkQp3KSd7lNXXX6ubfyg8tGBmZ9/GSj9v4gZNNi62tjkoxAvvjcuzzHkef5XWOOMZsoS00irrbGRPySPVz5Op5arZFBNJ/JoZ3ZRWup7PfdN5lebBSKozVUrKKue4EgtJ+a0Qhw8LSuOF6DaMnSkJxqyCF4QpnrrlaHDqc7jH2bwK3FZsRQxF10miSpNeOk38r8R03vZ4wBXyDhBi/1vKkHjXs7jsJ//Vwq0UYuMy/9Mt9sW1ZF5eREUTPmMEhRVJaq0mx+lRevIgq6Xzu/EUnUrOrb5yaCM8rgnPUix/A84IlPQ=)

<font color=Blue>**自定义操作符**</font>

[在线运行](https://air.dev.ennew.com/rule-builder-playground#eNq9VEFP1EAU/isvvSwku60sGJMKZPXmxYPxRo0p7SwU2+lkZgoS2IQDuCEsaGJcIhLCBT0IRBMxCIv+mW2rJ/6Cr51ddheD8WSym7TfzHvzfd+br0vaPcb0+YhopjYuScB8W5JJiwKM88gnpenI813CMwDAdG1pT1javO1HRFhaB/Wo6zm2DLnAtd6LWle9jP5mCI0bfWfhq3C4xyQIIiOGiBewkEtYgkdYdl9VFeFBtzXUoMrDAAoVQilZGGheQi0lQp3FQtbYJxIUW5iApYwKJ3iqF1ITCsvLhWIGzfAwYiZMPbFozaKGAUnzW9x62T5duWztpOcfkvUf8Yu19OI43VlNGvVkv55+Po/3Ni5bjV/1zaT5KT1/m7zebF/spofvkzf4uvrzZCNeaVnU8W0h4CFZeEyeS8A/oa7oCdFlBue8nJAKySMH0SHGQyaGFQ4gIka6mELkrCf0ENHcZ1Q2pXBAx3x7mvgoLj1ab59tFYpKvgnlIlRDHuCKR1kkC1DLtQ8WtU83r9eNXtXh8In0AtIrRcMA0DL8odRMAPTG36WFA+oaMNRR5LkmjHR6UDvAUwpJs57sHsZH28nxyYgaS21YbekN5KyBA4mP99rfN+JGUw0h2f6avvuSbB20W/vx2sG1OXQJDDrez6N8M4+y4gFwZTVekj9Nixtr8auPPcfG/tHp63W3b6pTNmdu4FOWHZWWTnLkop8HttIJTcT9IUublZIJ0zCExNvu6C6Z1/Os6E4YGCo1GCGa3cenpSpH8UaVlDyKjwYLfZt7YiBWgxnD5C5mqaGuEdgeNRwh8CQkouOTpQ3ftaieF+TRgknBbAqTyALziF0kVXfbJ1Vpwi3cjTcIZeVStKKmlJQCm+lzIqT4acq348clX8ATzG44LO1v34Bs4//2Ym5w8xUXlGJpnYniJzQig+Qiyp7N5IwquIYtaJa1khsGlVG9rI/dMVxPyH5cJyIoTfNwQRCeN++mUav9BksEPbM=)

<font color=Blue>**获取值选项**</font>

[在线运行](https://air.dev.ennew.com/rule-builder-playground#eNq9VlFvG0UQ/iurE6odyT4naSUkE4eUlNDQOkEhUKFcRDd3Y3vrvd3T7p5dk1riAR4QEq9IBSF4qMQLPIEEEoI/0yb0XzB7e3s+J21APNRK7J3Z2Zlvvt2dndPgZpaFkxyCbrBhIM04NbAZCUI2VM6hfZIznoCyCkK6CTW0FwUTynPQUVBqmUhYTI1UGucWgpt3vjp1Z6ja6NRioahjxTJDNJg8Qw1LM6kMOSUKBi0iRV/mwkBC5mSgZEoaiLdRszpA52853y2y6wG0yI5UabVmC4SA6RKQNvppg4hn6CwSHAxxmZEeObWwFSBCJkWXNB49arSsaqhknnXJ0XEk5nZRLIU2hDP86lm0zaPjFauvMDebK6S36fxZs7AIgcbaYPY6TGnWbDJkY2FmA5tcCcysMO6S++73tVNrOL/fIpyeAEe9+/V6gpAImSMA++/BLXYEox5ZC+RhQVMIIk+bZWCWdMlakSha0RRDN86+e/z0tz+f/fT12c+/rjkSCJGZ5aUPZiRxxRDMfqFw4Qubq2OsvzzG+r/EWJo9VGw4BIUuBgx4sj2iYmiPxn+Ecf3lMK4vw9C4504muC0l/Y3zb345++rJ0z++f/b5k/PHnzVafsPW3FYQclx4eSEYBak08PYFSDeWIf3917fnP37pIHlEbmGNmINCcWEL8IRGYpCL2GoX9DXtHW6hDy35BFbciWMDUuhDe47ItWukEo5Wj/2J7fXIWmlvMRTrmwtS/IB4DqLAUbcWBSVw+ympi4Lnn37x/Iff65PzcmRvEEp1YG/WQKz/HxDrV4GoT14CUVzzOo91tks2xzCbSpW08K4xs8Pp8EUEl0YVeix2hywFmZt6jbAfd2/Lg4eXdlE3wgHjBtTlilGrGnYqLDIMjbwrp6C2qYbmSshEzPMEtEeyPF3kWzBQjTy/JZJSP2+R9dVVRw8BruHSdixz57Jx5c5XoMZNBEhT6o60lfS4EhT7RIqFNKZCU12K25SzgVSC+fltyaWiiaxErPK4VXFuSs0tLOJTqqAUd9CcJX71OyDVsPJ1Gw0ZK4XdhI68113OmZDMg7B3mFYId+XUD+/Uod4BYfJ4PCvFuzJnurasT5nwoPpUzTgVSSVqTeNRjifEeG99Fo/YkIpKxDy1NJU3prX9yzKP32pkripRCrMIvgcnqkb5HkxoxckeVqnbNM30iFWsWd27oDT4bKyiDw9Z7Cmyio+kGnsRX+YR2aZKInOV50J5i44XuPdHzHvYH3NkvDoT+wqG0qf7Hj7eesYndLHxB1j9gOzqGm/v4126FNQpl4Ie2lZAa/DZHcLDatc+MHRUDj8ElSJrXmJ4Uhbh71HkRwxNBfEe4Cm/aMS0Pf2sspnJFBdZCcvzRse1PWULZGa86Ly2yr4mV7wZBSNjMt3tdOz9YXGYwARfMXxIwlimHdfSYH+DnYZIPm4PFL4anQG0mcBhJ5OcKqaXep7lBghbsJltaUTSSfE8dmKtMRICCXEUBStvRCIsFhR9D9nUGRVkE1Fgs4ReDPYoRWMDA9Mlq2iNNx7TKlIJWoHLpI09TvhAS4E9ZmGOXWIxgRG6vnhEwVUNmjV81Vw8WDausGAq1XuBvXAOy+BykY2HBaItnEMXwmCVbycy3boeroc3Xu8kWM7r+hB02j5RcqpBFc599Qzm/wDQoOt+)

<font color=Blue>**自定义值组件**</font>

[在线运行](https://air.dev.ennew.com/rule-builder-playground#eNq9Vctu5EQU/ZUrj1AnUtvudJJGMpkogIQ0GxYIsRkj5LbL3TWxq0pV5Twm6iVCs4ANCyT2bJBmWCEeC74mgXwGp6rsfiQwy1kk3X3uo86999Stm+hDpZKLjkVZdGJZq5rCstNcEJ3ormHxvONNxbQDiLKqsMXTPLoomo6ZPOpRLipeFlZqA9vmR7CHXOl2MkAn6dZZ+GlKzZUlw2yngPBWSW3phj5D2EchakzPhtRjKqUQrLS0olrLlkZnDL8vd06JUVTMRHk9Wuf7uDNWtp9I3YawPErSgD0TqrOuDY50LhpmKRRJT+nGVaAZyHIpMhqNxg5YaNmpjJ5/mYuVCwEjYwkkfCqE9RT3nPPmYB97Q+WyEAuWgQF37nlEq96CppRsKV0Fznz/y2/3f31/9/VP99/8fPfmx9s/XjnfXOz7M5vCGPqUXX7Orizhj4nKbNqUWAd7+p6d7kqge0pLZfYDTmQ6xQYsIHbJTSKB+imikucBd+yaYs4a9OCf169u//xuNA5dymg6phrVZZsGhHp2o25///Zh4OH/BqKx5Crd6u5GWwMrRA317/UF8Sqjgz6HKFqcMVr37u71D3+/+TUMcIVycYbTYlBfr0R73ThRnvWa6XSzl0dLa5XJ0tRYqKBMKnaReMUlpWzToD0oSrgBfBXXGsemNYu5wNdUyabQ3OyIc1epmPm105Oo0rbgIi2NwUngkeBbHu1/kIvEB3jR0alRhaBTsIBOkcWKMMyG1TajCbzRs6T0mgMH11RvnxfleTgmLmUjoa8ndV3DfcfE28IpU0jBgklqx1EXFe9MRkfqagtGq9UVGdnwip5UZVWzWW+9ig1/ycUiGxIA8qbh6NlkNp0F74ob14IMA264QEWNLM+9pUZPXSIQ4mLJNLceXjK+WKLWw2nPxoc9QmVnnWGrGFVUlSc1oYPj3svqQhgeLnfP1XOkZGqo7Oa8jOfsJcctSWZHx+Nk4v4dHh+PD9xgiC55ZZdoxGTyXmg9BOVFFI2jIKK4LVTywkiBJesngWvvDRhuNlzEPHrbEnOO71qGL3ad11xQSh71NwyPgVua2+Q6oc4XntEZbEghLG9ZXMn27DCZJkfvp5i33cYTZtp4ruWlYdonH64+OvhgPz9+poLA/SrE87OtemzKi7iVuCYw+M8v3NIBTOnDN2h4gRrsZXi7yTx+jTSr1y8OuOBhGTbTJjs2E9z2RiOsl//eLGt5rP4F1JOoUw==)

