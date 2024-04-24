import React from 'react'
import { Rule } from '@ben/rule-editor-core'
import RuleGroup from './packages/rule/src/RuleGroup'

import { values, dataSource } from './mock/ruleData'

import './packages/rule/src/style.scss'

function App() {
  const ruleNode = new Rule({ data: values, dataSource })

  function renderContent() {
    return [
      <div className='rule-field'>字段</div>,
      <input type="text" />,
      <input type="text" />
    ]
  }
  return (
    <div className="App">
      <RuleGroup
        ruleNode={ruleNode.root}
        renderContent={renderContent}
        deep={1}
        singleChild={true}
      ></RuleGroup>
    </div>
  );
}

export default App;
