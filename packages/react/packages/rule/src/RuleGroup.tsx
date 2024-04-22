import React from 'react'
import classnames from 'classnames'

export interface RuleGroupProps {
  ruleNode?: Record<string, any>;
}

const Button: React.FC<RuleGroupProps> = (props) => {
  const { ruleNode } = props

  const classes = classnames('rule-group')
  return (
    <div
      className={classes}
    >
    </div>
  )
}

export default Button