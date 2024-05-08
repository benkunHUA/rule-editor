import { RuleEditor } from "./rule/index";
import { values } from "./mock/ruleData"
function App() {
  return (
    <div className="App">
      <RuleEditor data={values} indicators={[]} />
    </div>
  );
}

export default App;
