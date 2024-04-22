import type { Component } from 'vue'
import { h, defineComponent } from 'vue'

type ListenersTransformRules = Record<string, string>

export const connect = <T extends Record<string, any>>(
  tag: any,
  transformRules?: ListenersTransformRules,
  defaultProps?: Partial<T>
): Component<T> => {
  return defineComponent({
    setup(props: any, context: any) {
      const { attrs, slots } = context
      return () => {
        let data = {
          ...attrs,
        }
        if (transformRules) {
          const listeners = transformRules
          Object.keys(listeners).forEach((extract) => {
            const event = listeners[extract]
            data[`on${event[0].toUpperCase()}${event.slice(1)}`] =
              attrs[`on${extract[0].toUpperCase()}${extract.slice(1)}`]
          })
        }
        if (defaultProps) {
          data = Object.assign(defaultProps, data)
        }
        return h(tag, data, slots)
      }
    },
  })
}
