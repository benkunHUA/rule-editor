import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

type JSXComponent =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>;

export function connect<T extends JSXComponent>(
  target: T,
  transformRules?: Record<string, string>,
  defaultProps?: Partial<React.ComponentProps<T>>
) {
  return (props: Record<string, any>) => {
    let data = {
      ...props,
    };
    if (transformRules) {
      Object.keys(transformRules).forEach((extract) => {
        const event = transformRules[extract];
        const targetKey = `on${event[0].toUpperCase()}${event.slice(1)}`;
        const sourceKey = `on${extract[0].toUpperCase()}${extract.slice(1)}`;
        data[targetKey] = props[sourceKey];
      });
    }
    if (defaultProps) {
      data = Object.assign({}, defaultProps, data);
    }
    const Destination = React.createElement(target, { ...data })
    hoistNonReactStatics(Destination, target as any);
    return Destination;
  };
}
