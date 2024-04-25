import React from 'react'
import { Rule } from '@ben/rule-editor-core'
import RuleGroup from './packages/rule/src/RuleGroup'
import RuleProvider from './packages/rule/src/RuleProvider'

import { values, dataSource } from './mock/ruleData'

import './packages/rule/src/style.scss'
import './index.scss'

function addItem(addFn: () => void, deep: number) {
  return (
    <span onClick={addFn}>新增项</span>
  )
}

function addGroup(addFn: () => void, deep: number) {
  return (
    <span onClick={addFn}>新增组</span>
  )
}

function relation(relation: string, deep: number) {
  return (
    <span>{relation}</span>
  )
}

function App() {
  const ruleNode = new Rule({ data: values, dataSource })

  function renderContent() {
    return [
      <div className='rule-field' key={1}>字段</div>,
      <input type="text" key={2}/>,
      <input type="text" key={3}/>
    ]
  }
  return (
    <div className="App">
      <RuleProvider 
        customDelete={<span>X</span>}
        customActionItem={addItem}
        customActionGroup={addGroup}
        customRelation={relation}
      >
        <RuleGroup
          ruleNode={ruleNode.root}
          renderContent={renderContent}
          deep={1}
          singleChild={true}
          customClass=''
        ></RuleGroup>
      </RuleProvider>
    </div>
  );
}

export default App;
