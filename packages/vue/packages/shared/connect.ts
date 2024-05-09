import type { Component } from "vue";
import { h, defineComponent } from "vue";

type ListenersTransformRules = Record<string, string>;

export const connect = <T extends Record<string, any>>(
  tag: T,
  transformRules?: ListenersTransformRules,
  defaultProps?: Partial<T>
): Component<T> => {
  return defineComponent({
    setup(props: any, context: any) {
      const { attrs, slots } = context;
      return () => {
        let data = {
          ...attrs,
        };
        if (transformRules) {
          Object.keys(transformRules).forEach((extract) => {
            const event = transformRules[extract];
            const targetKey = `on${event[0].toUpperCase()}${event.slice(1)}`;
            const sourceKey = `on${extract[0].toUpperCase()}${extract.slice(1)}`;
            data[targetKey] = attrs[sourceKey];
          });
        }
        if (defaultProps) {
          data = Object.assign({}, defaultProps, data);
        }
        return h(tag, data, slots);
      };
    },
  });
};
