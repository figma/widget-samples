# Constraint support for x/y props

Previously x/y props in the widget API only supported numeric values, which meant that for certain layouts, you'd either have to calculate the offsets manually or in certain cases it was just not possible to do so.

We're introducing a way to specify contraints along the x/y axis. **As before, these props are only applicable to `<Frame />` children.**

## Visual Examples

Here are a few variations of these props and their corresponding output:

![image](https://user-images.githubusercontent.com/610102/160870033-890703ea-6aca-4501-9cbb-fe9dd9de520e.png)

## Complete Typings

The complete typings are below, 

```ts

type XProp = number | HorizontalConstraint
type YProps = number | VerticalConstraint

type VerticalConstraint =
    | TopConstraint
    | BottomConstraint
    | TopBottomConstraint
    | CenterConstraint
    | VerticalScaleConstraint;

type HorizontalConstraint =
    | LeftConstraint
    | RightConstraint
    | LeftRightConstraint
    | CenterConstraint
    | HorizontalScaleConstraint;

export interface TopConstraint {
    type: "top";
    offset: number;
}

export interface BottomConstraint {
    type: "bottom";
    offset: number;
}

export interface TopBottomConstraint {
    type: "top-bottom";
    topOffset: number;
    bottomOffset: number;
}

export interface LeftConstraint {
    type: "left";
    offset: number;
}

export interface RightConstraint {
    type: "right";
    offset: number;
}

export interface LeftRightConstraint {
    type: "left-right";
    leftOffset: number;
    rightOffset: number;
}

export interface CenterConstraint {
    type: "center";
    offset: number;
}

export interface HorizontalScaleConstraint {
    type: "horizontal-scale";
    leftOffsetPercent: number;
    rightOffsetPercent: number;
}

export interface VerticalScaleConstraint {
    type: "vertical-scale";
    topOffsetPercent: number;
    bottomOffsetPercent: number;
}
```
