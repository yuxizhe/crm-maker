export const basicComponents = [
  {
    componentName: 'Input',
    componentText: '输入框',
    componentType: 'InputItem',
    icon: 'icon-input',
    props: {
      label: '输入框',
      dataType: 'string',
      extra: '',
      width: '100%',
      defaultValue: '',
      required: false,
      datacomponentName: 'string',
      pattern: '',
      placeholder: '',
      disabled: false,
    }
  },
  {
    componentName: 'InputNumber',
    componentText: '数字输入框',
    componentType: 'InputItem',
    icon: 'icon-input',
    props: {
      label: '数字输入框',
      dataType: 'string',
      extra: '',
      width: '100%',
      defaultValue: '',
      required: false,
      datacomponentName: 'number',
      pattern: '',
      placeholder: '',
      disabled: false,
    }
  },
  {
    componentName: 'TextArea',
    componentText: '文本框',
    componentType: 'InputItem',
    icon: 'icon-diy-com-textarea',
    props: {
      label: '文本框',
      width: '100%',
      extra: '',
      defaultValue: '',
      required: false,
      disabled: false,
      pattern: '',
      placeholder: ''
    }
  },
  {
    componentName: 'Select',
    componentText: '下拉选择',
    componentType: 'InputItem',
    icon: 'icon-select',
    props: {
      label: '选择框',
      defaultValue: '',
      multiple: false,
      extra: '',
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      showLabel: true,
      width: '',
      dataSource: [
        {
          value: 'value1',
          label: '选项1'
        },
        {
          value: 'value2',
          label: '选项2'
        },
        {
          value: 'value3',
          label: '选项3'
        }
      ],
      remote: false,
      filterable: false,
      remoteprops: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: ''
    }
  },
  {
    componentName: 'RadioGroup',
    componentText: '单选框',
    componentType: 'InputItem',
    icon: 'icon-radio-active',
    props: {
      label: '单选框',
      inline: true,
      extra: '',
      defaultValue: '',
      showLabel: true,
      dataSource: [
        {
          value: 'value1',
          label: '选项1'
        },
        {
          value: 'value2',
          label: '选项2'
        },
        {
          value: 'value3',
          label: '选项3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteprops: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false,
    }
  },
  {
    componentName: 'CheckboxGroup',
    componentText: '多选框',
    componentType: 'InputItem',
    icon: 'icon-check-box',
    props: {
      label: '多选框',
      inline: true,
      extra: '',
      defaultValue: [],
      showLabel: true,
      dataSource: [
        {
          value: 'value1',
          label: '选项1'
        },
        {
          value: 'value2',
          label: '选项2'
        },
        {
          value: 'value3',
          label: '选项3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteprops: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false,
    }
  },
  {
    componentName: 'TimePicker',
    componentText: '时间选择',
    componentType: 'InputItem',
    icon: 'icon-time',
    props: {
      label: '时间选择',
      defaultValue: '21:19:56',
      extra: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      width: '',
    }
  },
  {
    componentName: 'DatePicker',
    componentText: '日期选择',
    componentType: 'InputItem',
    icon: 'icon-date',
    props: {
      label: '日期选择',
      type: 'date',
      extra: '',
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      startPlaceholder: '',
      endPlaceholder: '',
      componentName: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      width: '',
    }
  },
  // {
  //   componentName: 'RangePicker',
  //   componentText: '日期范围选择',
  //   componentType: 'InputItem',
  //   icon: 'icon-date',
  //   props: {
  //     label: '日期范围选择',
  //     type: 'daterange',
  //     defaultValue: '',
  //     extra: '',
  //     readonly: false,
  //     disabled: false,
  //     editable: true,
  //     clearable: true,
  //     startPlaceholder: '',
  //     endPlaceholder: '',
  //     componentName: 'date',
  //     format: 'yyyy-MM-dd',
  //     timestamp: false,
  //     required: false,
  //     width: '',
  //   }
  // },
  {
    componentName: 'Upload',
    componentText: '上传图片组件',
    componentType: 'InputItem',
    icon: 'icon-date',
    props: {
      label: '上传图片',
      extra: '',
    }
  },
  {
    componentName: 'Button',
    componentText: '按钮',
    props: {
      "type": "primary",
      "onClick": "{{this.onSubmit}}",
      functions: [
        "{{this.onSubmit}}",
        "{{this.onModalAdd}}",
        "{{this.onSearch}}"
      ],
      style:"{{{ marginLeft: '10px' }}}"
    },
    children: '按钮',
    icon: 'icon-grid-',
  },
  // {
  //   componentName: 'text',
  //   componentText: '文本',
  //   icon: 'icon-wenzishezhi-',
  //   props: {
  //     defaultValue: 'This is a text',
  //     customClass: '',
  //   }
  // },
]

export const layoutComponents = [
  {
    componentName: 'Row',
    componentText: '栅格',
    componentType: 'Container',
    icon: 'icon-zhage',
    children: [{
      componentName: "Col",
      props: {
        span: 12,
        key: 1,
      },
      children: []
    }, {
      componentName: "Col",
      props: {
        span: 12,
        key: 2,
      },
      children: []
    }],
    props: {
      props: {
        componentName: "Col",
        props: {
          span: 12,
          key: 2,
        },
        children: []
      }
    },
  },
  {
    componentName: 'Modal',
    componentText: '弹窗',
    icon: 'icon-weibiaoti46',
    props: {
    },
    children: [
      
    ]
  },
  {
    componentName: 'Card',
    componentText: '卡片布局',
    icon: 'icon-weibiaoti46',
    props: {
    },
    children: []
  },
  {
    componentName: 'Table',
    componentText: '表格',
    componentType: 'Container',
    icon: 'icon-table',
    props: {
      showLabel: true,
      dataSource: [
        {
          value: 'name',
          label: '表头1-姓名',
          default: 'tony'
        },
        {
          value: 'date',
          label: '表头2-日期',
          default: '2020-6-15'
        },
        {
          value: 'address',
          label: '表头3-地址',
          default: '地址1地址1'
        }
      ],
      functions: [
        {
          label: '编辑',
          function: 'onModalEdit'
        },
        {
          label: '删除',
          function: 'onTableItemDelete'
        }
      ],
      // pagination: {
      //   total: this.store.total,
      //   defaultPageSize: 20,
      //   onChange: this.handlePageChange,
      //   current: this.store.page,
      // },
      props: {
        value: 'key',
        label: '表头n',
        default: '表单内容'
      },
      defaultValue: [],
      width: '',
      disabled: false,
      clearable: false,
      remote: false,
      remoteprops: [],
    }
  },
  {
    componentName: 'Divider',
    componentText: '分隔线',
    icon: 'icon-fengexian',
    props: {
    }
  },
  {
    componentName: 'Descriptions',
    componentText: '描述列表容器',
    icon: 'icon-weibiaoti46',
    props: {
    },
    children: []
  },
  {
    componentName: 'DescriptionsItem',
    componentText: '描述列表项',
    icon: 'icon-weibiaoti46',
    props: {
      label: '描述列表项',
      defaultValue: '描述列表项 DescriptionsItem'
    },
    children: []
  },
]
