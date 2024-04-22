import { define, observable, action } from "@formily/reactive";
import { dataTypeMap, dataTypeOptionMap } from "../shared/option";
import Indicator from "./indicator/index";
import Form from "./form/index";
import {
  OptionPropsType,
  DataTypePropsType,
  OperateOptionType,
  IndicatorType,
  Item,
} from "../type/index";

interface DataSourcePropType {
  indicators?: IndicatorType[];
  optionProps?: OptionPropsType;
  dataTypeProps?: DataTypePropsType;
  dataSource?: Item[];
}

export default class DataSource {
  public indicators: IndicatorType[];
  public optionProps: OptionPropsType;
  public dataTypeProps: DataTypePropsType;

  constructor(props: DataSourcePropType) {
    this.indicators = props.indicators || [];
    this.optionProps = dataTypeOptionMap;
    this.dataTypeProps = dataTypeMap;
    this.markObservable();
    this.init(props);
    if (!this.indicators.length && props.dataSource?.length) {
      this.generateIndicator(props.dataSource);
    }
  }

  setIndicator(indicators: IndicatorType[]) {
    this.indicators = indicators || [];
  }

  markObservable() {
    define(this, {
      indicators: observable,
      addDataSourceItem: action,
      setIndicator: action,
    });
  }

  init(props: DataSourcePropType) {
    if (props.dataTypeProps) {
      Object.keys(props.dataTypeProps).forEach((key) => {
        if (props.dataTypeProps) {
          this.dataTypeProps[key] = props.dataTypeProps[key];
        }
      });
    }
    if (props.optionProps) {
      Object.keys(props.optionProps).forEach((key) => {
        if (props.optionProps) {
          this.optionProps[key] = props.optionProps[key];
        }
      });
    }
  }

  generateIndicator(dataSource: Item[]) {
    dataSource.forEach((item: Item) => {
      Object.keys(this.dataTypeProps).forEach((key) => {
        const value = this.dataTypeProps[key];
        const dataType = typeof value === "object" ? value.value : value;
        if (dataType === item.dataType) {
          const operators = this.optionProps[key];
          if (typeof value !== "object") {
            this.indicators.push(
              new Indicator[key]({
                id: item.value,
                name: item.label,
                data: item,
                dataType: dataType,
                operators: operators,
              })
            );
          } else {
            // 只有小数类型会是对象
            this.indicators.push(
              new Indicator[key]({
                id: item.value,
                name: item.label,
                data: item,
                dataType: dataType,
                operators: operators,
                formMap: {
                  inputNumber: new Form.input({ type: "number", ...value }),
                },
              })
            );
          }
        }
      });
    });
  }

  getDataTypeValue(key: string) {
    const value = this.dataTypeProps[key];
    if (typeof value === "object") {
      return value.value;
    }
    return value;
  }

  getDataTypeStr(dataType: number): string {
    const typeStr =
      Object.keys(this.dataTypeProps).find((key) => {
        return this.getDataTypeValue(key) === dataType;
      }) || "";
    return typeStr;
  }

  getOperateOption(dataType: number): OperateOptionType[] {
    const typeStr = this.getDataTypeStr(dataType);
    return this.optionProps[typeStr] || [];
  }

  addDataSourceItem(item: IndicatorType) {
    this.indicators.push(item);
  }
}
