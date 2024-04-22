export const dataTypeMap = {
  enum: 1, // 枚举
  text: 2, // 文本
  int: {
    value: 3,
    precision: 0,
  }, // 数值
  time: 4, // 时间
  date: 5, // 日期
  dateTime: 6, // 日期时间
  set: 7, // 集合
  decimal: 9, // 小数
}

export const operateMap = {
  equal: { label: '等于', value: 2 },
  unequal: { label: '不等于', value: 3 },
  greater: { label: '大于', value: 4 },
  greaterEqual: { label: '大于等于', value: 5 },
  less: { label: '小于', value: 6 },
  lessEqual: { label: '小于等于', value: 7 },
  include: { label: '包含', value: 8 },
  exclusive: { label: '不包含', value: 9 },
  startOfText: { label: '文本开始含', value: 10 },
  endOfText: { label: '文本结束含', value: 11 },
  null: { label: '为空', value: 12 },
  notNull: { label: '不为空', value: 13 },
  inSet: { label: '在集合', value: 14 },
  outOfSet: { label: '不在集合', value: 15 },
  section: { label: '区间', value: 16 },
}
// select-下拉框 multiple-多选下拉框 null-没有结果项 input-输入框 inputNumber-数值输入框
// date-日期选择框 datetime-日期时间选择框 datetimerange-日期时间区间选择框 daterange-日期区间选择框
export const dataTypeOptionMap = {
  enum: [
    { ...operateMap.equal, form: 'select' },
    { ...operateMap.unequal, form: 'select' },
    { ...operateMap.inSet, form: 'multiple' },
    { ...operateMap.outOfSet, form: 'multiple' },
    { ...operateMap.include, form: 'select' },
    { ...operateMap.exclusive, form: 'select' },
    { ...operateMap.null, form: 'null' },
    { ...operateMap.notNull, form: 'null' },
  ],
  text: [
    { ...operateMap.equal, form: 'input' },
    { ...operateMap.unequal, form: 'input' },
    { ...operateMap.inSet, form: 'multiple' },
    { ...operateMap.outOfSet, form: 'multiple' },
    { ...operateMap.include, form: 'input' },
    { ...operateMap.exclusive, form: 'input' },
    { ...operateMap.null, form: 'null' },
    { ...operateMap.notNull, form: 'null' },
    { ...operateMap.startOfText, form: 'input' },
    { ...operateMap.endOfText, form: 'input' },
  ],
  int: [
    { ...operateMap.equal, form: 'inputNumber' },
    { ...operateMap.unequal, form: 'inputNumber' },
    { ...operateMap.greater, form: 'inputNumber' },
    { ...operateMap.greaterEqual, form: 'inputNumber' },
    { ...operateMap.less, form: 'inputNumber' },
    { ...operateMap.lessEqual, form: 'inputNumber' },
    { ...operateMap.null, form: 'null' },
    { ...operateMap.notNull, form: 'null' },
  ],
  time: [
    { ...operateMap.equal, form: 'time' },
    { ...operateMap.unequal, form: 'time' },
    { ...operateMap.greater, form: 'time' },
    { ...operateMap.greaterEqual, form: 'time' },
    { ...operateMap.less, form: 'time' },
    { ...operateMap.lessEqual, form: 'time' },
    { ...operateMap.null, form: 'null' },
    { ...operateMap.notNull, form: 'null' },
    { ...operateMap.section, form: 'timerange' },
  ],
  date: [
    { ...operateMap.equal, form: 'date' },
    { ...operateMap.unequal, form: 'date' },
    { ...operateMap.greater, form: 'date' },
    { ...operateMap.greaterEqual, form: 'date' },
    { ...operateMap.less, form: 'date' },
    { ...operateMap.lessEqual, form: 'date' },
    { ...operateMap.null, form: 'null' },
    { ...operateMap.notNull, form: 'null' },
    { ...operateMap.section, form: 'daterange' },
  ],
  dateTime: [
    { ...operateMap.equal, form: 'datetime' },
    { ...operateMap.unequal, form: 'datetime' },
    { ...operateMap.greater, form: 'datetime' },
    { ...operateMap.greaterEqual, form: 'datetime' },
    { ...operateMap.less, form: 'datetime' },
    { ...operateMap.lessEqual, form: 'datetime' },
    { ...operateMap.null, form: 'null' },
    { ...operateMap.notNull, form: 'null' },
    { ...operateMap.section, form: 'datetimerange' },
  ],
  set: [
    { ...operateMap.equal, form: 'select' },
    { ...operateMap.unequal, form: 'select' },
    { ...operateMap.include, form: 'select' },
    { ...operateMap.exclusive, form: 'select' },
    { ...operateMap.null, form: 'null' },
    { ...operateMap.notNull, form: 'null' },
  ],
  decimal: [
    { ...operateMap.equal, form: 'inputNumber' },
    { ...operateMap.unequal, form: 'inputNumber' },
    { ...operateMap.greater, form: 'inputNumber' },
    { ...operateMap.greaterEqual, form: 'inputNumber' },
    { ...operateMap.less, form: 'inputNumber' },
    { ...operateMap.lessEqual, form: 'inputNumber' },
    { ...operateMap.null, form: 'null' },
    { ...operateMap.notNull, form: 'null' },
  ],
}

export const formType = {
  select: 'select',
  multiple: 'multiple',
  null: 'null',
  input: 'input',
  inputNumber: 'inputNumber',
  date: 'date',
  datetime: 'datetime',
  datetimerange: 'datetimerange',
  daterange: 'daterange',
  cascader: 'cascader',
}
