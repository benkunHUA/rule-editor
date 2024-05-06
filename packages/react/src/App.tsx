import React from 'react'
import { Rule } from '@rule-editor/core'
import RuleGroup from './packages/rule/src/RuleGroup'
import RuleProvider from './packages/rule/src/RuleProvider'

import { values } from './mock/ruleData'

import './packages/rule/src/style.scss'
import './index.scss'

function App() {
  const ruleNode = new Rule({ data: values, indicators: [] })

  function renderContent() {
    return [
      <div className='rule-field' key={1}>字段</div>,
      <input type="text" key={2}/>,
      <input type="text" key={3}/>
    ]
  }
  return (
    <div className="App">
      <RuleProvider>
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
