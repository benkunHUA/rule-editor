export default {
  input: {},
  inputNumber: {
    type: "number",
    precision: 0,
  },
  select: {},
  multiple: { multiple: true },
  time: {
    format: "HH:mm:ss",
    valueFormat: "HH:mm:ss",
  },
  timerange: { 
    isRange: true,
    format: "HH:mm:ss",
    valueFormat: "HH:mm:ss",
  },
  date: {},
  daterange: {
    type: 'daterange'
  },
  datetime: {
    type: "datetime",
    format: "YYYY-MM-DD HH:mm:ss",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
  },
  datetimerange: {
    type: "datetimerange",
    format: "YYYY-MM-DD HH:mm:ss",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
  },
  cascader: {},
};
