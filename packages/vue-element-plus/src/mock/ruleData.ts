export const values = {
  isArea: 1,
  relation: '||',
  group: [
    {
      item: [
        {
          label: '字段1(枚举)',
          value: 1,
          dataType: 1
        },
        {
          label: '等于',
          value: 2
        },
        {
          label: '选项1',
          value: 1
        }
      ]
    },
    {
      item: [
        {
          label: '字段4(时间)',
          value: 4,
          dataType: 4
        },
        {
          label: '等于',
          value: 2
        },
        {
          label: '12:12;12',
          value: '12:12;12',
        }
      ]
    },
  ],
}

export const dataSource = [
  {
    label: '字段1(枚举)',
    value: 1,
    dataType: 'enum'
  },
  {
    label: '字段101(远程枚举)',
    value: 101,
    dataType: 'remoteEnum'
  },
  {
    label: '字段2(文本)',
    value: 2,
    dataType: 'text'
  },
  {
    label: '字段3(数值)',
    value: 3,
    dataType: 'int'
  },
  {
    label: '字段4(时间)',
    value: 4,
    dataType: 'time'
  },
  {
    label: '字段5(日期)',
    value: 5,
    dataType: 'date'
  },
  {
    label: '字段6(日期时间)',
    value: 6,
    dataType: 'dateTime'
  },
  {
    label: '字段7(集合)',
    value: 7,
    dataType: 'set'
  },
  {
    label: '字段9(小数)',
    value: 9,
    dataType: 'decimal'
  },
]