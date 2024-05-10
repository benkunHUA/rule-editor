import RuleComp from '../model/rule-comp';
import type RuleGroup from '../model/rule-group'
import type RuleItem from '../model/rule-item'
import type Enum from '../model/indicator/enum'
import type RemoteEnum from '../model/indicator/remote-enum'
import type Text from '../model/indicator/text'
import type Int from '../model/indicator/int'
import type Decimal from '../model/indicator/decimal'
import type Time from '../model/indicator/time'
import type Date from '../model/indicator/date'
import type DateTime from '../model/indicator/date-time'
import type Set from '../model/indicator/set'
import type Select from '../model/form/select'
import type Input from '../model/form/input'
import type TimePicker from '../model/form/time-picker'
import type DatePicker from '../model/form/date-picker'
import type Cascader from '../model/form/cascader'

export interface Item {
  label: string;
  value: number | string;
  dataType?: number;
}

export interface Group {
  item: Item[];
}

export interface Group {
  relation: string;
  group: Group[];
}

export interface NodeDataType {
  [key: string]: any
}

export interface OperateOptionType {
  label: string;
  value: number;
  form: any;
}

export type RuleNode = RuleGroup | RuleItem | RuleComp

export type labelType = string | number | string[] | number[]

export interface PropsType {
  group?: string;
  item?: string;
  dataType?: string;
  label?: string;
  value?: string;
  relation?: string;
}

export interface OptionPropsType {
  [key: string]: OperateOptionType[];
}

export interface DataTypeValueType {
  value: number | string;
  step?: number;
  precision?: number;
}

export interface DataTypePropsType {
  [key: string]: number | string | DataTypeValueType;
}

export interface DataItemType {
  label: string,
  value: string | number
}

export interface CommonIndicatorType {
  name: string,
  id: string | number,
  data?: NodeDataType,
  formMap?: FormMapType,
  validate?: (value: string & number) => boolean
}

export type IndicatorType = Enum | RemoteEnum | Text | Date | DateTime | Int | Decimal | Time | Set

export interface FormMapType {
  select?: Select | Record<string, any>;
  multiple?: Select | Record<string, any>;
  input?: Input | Record<string, any>;
  inputNumber?: Input | Record<string, any>;
  time?: TimePicker | Record<string, any>;
  timerange?: TimePicker | Record<string, any>;
  date?: DatePicker | Record<string, any>;
  daterange?: DatePicker | Record<string, any>;
  datetime?: DatePicker | Record<string, any>;
  datetimerange?: DatePicker | Record<string, any>;
  cascader?: Cascader | Record<string, any>
}

export type FormType = Select & Input & TimePicker & DatePicker

export interface CascaderOption extends Record<string, unknown> {
  label?: string
  value?: string | number
  children?: CascaderOption[]
  disabled?: boolean
  leaf?: boolean
}
