import Enum, { EnumProps } from './enum'
import Select from '../form/select'
import { DataItemType, Group } from '../../type/index'

interface RemoteEnumProps extends EnumProps {
  url?: string;
  remoteMethod?: (
    (data: Group, keyword: string, initFlag: boolean, cb: (v: DataItemType[]) => void) => void
  ) | null;
}
export default class RemoteEnum extends Enum {
  public url: string
  public remoteMethod: (
    (data: Group, keyword: string, initFlag: boolean, cb: (v: DataItemType[]) => void) => void
  ) | null
  constructor(props: RemoteEnumProps) {
    super(props)
    if (!props.formMap) {
      this.formMap = {
        select: new Select({ remote: true }),
        multiple: new Select({ multiple: true, remote: true }),
      }
    }
    this.dataType = 101
    this.url = props.url || ''
    this.remoteMethod = props.remoteMethod || null
  }

  getRemoteOptions(data: Group, keyword: string, initFlag: boolean, cb: () => void) {
    if (typeof this.remoteMethod !== 'function') {
      return
    }
    this.remoteMethod(data, keyword, initFlag, (options: DataItemType[]) => {
      this.setOptions(options)
      if (typeof cb === 'function') {
        cb()
      }
    })
  }
}
