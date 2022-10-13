<p align="center"><a href="https://spope.github.io/MiniMasonry.js/" target="_blank"><img width="100" height="100" src="https://spope.github.io/MiniMasonry.js/icon.png"></a></p>

# MiniMasonry.js

Minimalist dependency free Masonry layout library

MiniMasonry is a **lightweight** dependency free Masonry layout. It will compute elements position in JavaScript and update their positions using CSS's **transform attribute**. This means positioning does not trigger browser layout and **use** the device's **GPU**. This also allows CSS animation during element positioning.

MiniMasonry is **responsive**, you give it a target width and it will adjust columns number and elements width. MiniMasonry will increase element width (until another column can fit in the layout) but will never reduce the target width.

## Installation

You can install MiniMasonry by cloning the repository, downloading the build type (minimasonry.min.js / minimasonry.esm.js) or using npm :
```shell
npm install minimasonry
```

Then, include the minified version of MiniMasonry.js on your website :
```html
<script src="node_modules/minimasonry/build/minimasonry.min.js"></script>
```

or use it via ESM :
```javascript
import MiniMasonry from "minimasonry";
```

## Usage

To use MiniMasonry you should have a container **relatively positioned** with your elements as children. Those **children** elements must be **absolutely positioned**.

Then you can initialise MiniMasonry :

```javascript
var masonry = new MiniMasonry({
    container: '.masonry_transition'
});
```
## Parameters

Here is the list of available parameters :

Name | Default value | Description
-----|---------------|------------
baseWidth (int)|255|Target width of elements.
container (string\|HTMLElement)|Null|Container's selector or element. **Required**
gutter (int)|10|Width / height of gutter between elements. Use gutterX / gutterY to set different values.
gutterX (int)|null|Width of gutter between elements. Need gutterY to work, fallback to `gutter`.
gutterY (int)|null|Height of gutter between elements. Need gutterX to work, fallback to `gutter`.
minify (boolean)|true|Whether or not MiniMasonry places elements on the shortest column or keeps exact order of the list.
surroundingGutter (boolean)|true|Set left gutter on first columns and right gutter on last.
ultimateGutter (int)|5|Gutter applied when only 1 column can be displayed.
direction (string)|"ltr"|Sorting direction, "ltr" or "rtl".
wedge (boolean)|false|False will start to sort from center, true will start from left or right according to direction parameter.

## API

Here is the list of available APIs :

Name|Description
----|-----------
layout()|If list has changed, trigger a relayout of the masonry.
destroy()|Remove the resize listener and set back container as it was before initialization.

MiniMasonry will add a "resize" event listener on the window to redraw the masonry on window resize. This listener is throttled to 66ms (15fps).

## Example

[See website](https://spope.github.io/MiniMasonry.js/)

[codepen](https://codepen.io/Spope/pen/WNwrpyd)

## License

MIT

Made by [Spope](https://spope.fr/)
