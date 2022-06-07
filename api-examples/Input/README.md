# &lt;Input /&gt;

Text editing in widgets!

<a href="https://www.loom.com/share/c7cf2450af744244a5728cb82aa28560">
  <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/c7cf2450af744244a5728cb82aa28560-1645663821012-with-play.gif">
  <p>Figma Widget API - Input Component - 23 February 2022 - Watch Video</p>
</a>

## Introduction

Right now, the only way to accept user input is by popping open an iFrame. To make this easier, we are providing a new component `Input` to provide in-line text editing!

## API

```ts
interface TextEditEvent {
  characters: string
}

interface PlaceholderProps = Omit<TextStyleProps, 'href'> & {}

interface InputProps extends TextProps {
  onTextEditEnd: (e: TextEditEvent) => Promise<void>;
	value: string | null;
  placeholder?: string;
  placeholderProps?: PlaceholderProps;
  width?: Size; // same as Frame sizing options
  inputFrameProps: AutolayoutProps; // except for 'width' prop
  inputBehavior: 'wrap' | 'truncate' | 'multiline';
}
```

Note that `InputProps` extends `TextProps`! This means you can style the input text in a variety of ways, such as `fontWeight`, `fontFamily`, `fill`, etc. To style the placeholder, use `placeholderProps`. To style the frame, use `inputFrameProps`.

### `onTextEditEnd`

A handler method that passes in the characters in the editable text field when they exit text edit mode (aka onBlur). The `onTextEditEnd` event can always be triggered via clicking out of the element, hitting `Escape`, or `Cmd + Enter`. See [`inputBehavior`](#inputbehavior) for other ways to trigger `onTextEditEnd` and blurring the input.

### `value`

The value of the editable text. Typically, this value will be a synced variable that will be set in the `onTextEditEnd` handler.

### `placeholder`

Placeholder text that shows whenever the `value` is `null` or an empty string

### `placeholderProps`

A subset of `TextStyleProps` that allow you to style the placeholder. We took out `href` because it doesn’t really make sense for a placeholder to also be a link.

Default:

```tsx
{
  opacity: 0.3,
}
```

### `width`

The desired width of the editable text. The text will wrap around if the user types beyond the width. Defaults to `200`

### `inputFrameProps`

Allows you to style the Autolayout frame around the text/placeholder.

### `inputBehavior`

Allows you to specify some interactions and resizing behavior of the Input component.

- `"wrap"` (default) - Typing `Enter` blurs the input and triggers `onTextEditEnd` . On overflow, the text will wrap to the next line and the height of the input will autoresize.
- `"truncate"` - Typing `Enter` blurs the input and triggers `onTextEditEnd` . On overflow, the text will truncate.
- `"multiline"` - Typing `Enter` will create a new line. On overflow, the text will wrap to the next line and the height of the input will autoresize.
