import React from 'react'
import classnames from 'classnames'
import type { RuleNode } from '@ben/rule-editor-core'

export interface RuleItemProps {
  ruleNode: RuleNode;
  renderContent: (v: RuleNode) => JSX.Element[];
  singleChild?: boolean;
  setReleationPosition?: () => void;
}

const RuleItem: React.FC<RuleItemProps> = (props) => {

  const { ruleNode, singleChild, renderContent } = props
  const classes = classnames('rule-item', {
    'single-child': singleChild
  })
  return (
    <div className={classes}>
      { renderContent(ruleNode) }
    </div>
  )
}

export default RuleItem