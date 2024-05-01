import { define, observable, action } from "@formily/reactive";
import { IndicatorType } from "../type/index";

interface DataSourcePropType {
  indicators?: IndicatorType[];
}

export default class DataSource {
  public indicators: IndicatorType[];

  constructor(props: DataSourcePropType) {
    this.indicators = props.indicators || [];
  }

  markObservable() {
    define(this, {
      indicators: observable,
      addDataSourceItem: action,
      setIndicator: action,
    });
  }

  setIndicator(indicators: IndicatorType[]) {
    this.indicators = indicators || [];
  }

  addDataSourceItem(item: IndicatorType) {
    this.indicators.push(item);
  }
}
