import { CascaderOption } from '../../type/index'

export type isLeaf = (data: CascaderOption, node: Node) => boolean
export type Resolve = (dataList?: CascaderOption[]) => void
export type LazyLoad = (node: Node, resolve: Resolve) => void

export interface CascaderProps {
  multiple?: boolean;
  changeOnSelect?: boolean;
  checkStrictly?: boolean;
  emitPath?: boolean;
  lazy?: boolean;
  lazyLoad?: LazyLoad;
  value?: string;
  label?: string;
  children?: string;
  disabled?: string;
  leaf?: string | isLeaf;
  triggerLazyLoadAfterExpanded?: boolean;
  showRadio?: boolean;
  loadingText?: string;
}

export interface CascaderType {
  props?: CascaderProps;
  placeholder?: string;
  disabled?: boolean;
  showDisabled?: boolean;
  clearable?: boolean;
  showAllLevels?: boolean;
  separator?: string;
  filterable?: boolean;
  filterMethod?: ((node: any, keyword: string) => boolean) | undefined;
  debounce?: number;
  beforeFilter?: ((value: string) => boolean | Promise<any>) | undefined;
  popperClass?: string;
  teleported?: boolean;
  popperAppendToBody?: boolean;
}

export default class Cascader {
  public FORM_TYPE: string
  public props: CascaderProps
  public placeholder: string
  public disabled: boolean
  public showDisabled: boolean
  public clearable: boolean
  public showAllLevels: boolean
  public separator: string
  public filterable: boolean
  public filterMethod: ((node: any, keyword: string) => boolean) | undefined
  public debounce: number
  public beforeFilter: ((value: string) => boolean | Promise<any>) | undefined
  public popperClass: string
  public teleported: boolean
  public popperAppendToBody: boolean

  constructor(option: CascaderType | undefined) {
    const props = option || {}
    this.FORM_TYPE = 'cascader'
    this.props = this.getDefaultProps(props.props || {})
    this.placeholder = props.placeholder || '请选择'
    this.disabled = props.disabled || false
    this.showDisabled = props.showDisabled || false
    this.clearable = props.clearable || true
    this.showAllLevels = props.showAllLevels || false
    this.separator = props.separator || '/'
    this.filterable = props.filterable || true
    this.filterMethod = props.filterMethod || undefined
    this.debounce = props.debounce || 300
    this.beforeFilter = props.beforeFilter || undefined
    this.popperClass = props.popperClass || ''
    this.teleported = props.teleported || true
    this.popperAppendToBody = props.popperAppendToBody || true
  }

  getDefaultProps(props: CascaderProps) : CascaderProps {
    return {
      multiple: props.multiple || false,
      changeOnSelect: props.changeOnSelect || false,
      checkStrictly: props.checkStrictly || false,
      emitPath: props.emitPath || true,
      lazy: props.lazy || false,
      lazyLoad: props.lazyLoad || undefined,
      value: props.value || 'value',
      label: props.label || 'label',
      children: props.children || 'children',
      disabled: props.disabled || 'disabled',
      leaf: props.leaf || 'leaf',
      triggerLazyLoadAfterExpanded: props.triggerLazyLoadAfterExpanded || false,
      showRadio: props.showRadio || false,
      loadingText: props.loadingText || '加载中',
    }
  }
}
