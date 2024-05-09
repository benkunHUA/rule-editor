import { Indicator } from "@rule-editor/core";
import { RuleEditor } from "./rule/index";
import { values } from "./mock/ruleData";

import "./styles/index.scss";

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
  new Indicator.decimal({
    id: 31,
    name: '小数字段',
  }),
  new Indicator.time({
    id: 4,
    name: '时间字段',
  }),
  new Indicator.date({
    id: 5,
    name: '日期字段',
  }),
  new Indicator.dateTime({
    id: 6,
    name: '日期时间字段',
  }),
]

function App() {
  return (
    <div className="App">
      <RuleEditor data={values} indicators={indicators} />
    </div>
  );
}

export default App;
