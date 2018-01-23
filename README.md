<p align="center"><a href="https://spope.github.com/MiniMasonry.js" target="_blank"><img width="100" height="100" src="https://spope.github.com/MiniMasonry.js/icon.png"></a></p>

# MiniMasonry.js

Minimalist dependancy free Masonry layout library

MiniMasonry is a **lightweight** (1kb Gzipped) dependancy free Masonry layout. It will compute elements position in Javascript and update their positions using css's **transform attribute**. This means positioning does not trigger browser layout and **use** the device's **GPU**. This also allow css animation during element positionning.

MiniMasonry is **responsive**, you give it a target width and it will adjust columns number and elements width. MiniMasonry will increase element width (until another column can fit in the layout) but will never reduce the target width.

## Installation

Just include the minified version of MiniMasonry.js on your website :


```html
<script src="minimasonry/build/minimasonry.min.js"></script>
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
baseWidth|255|Target width of elements.
container|Null|Container selector. **Required**
gutter|10|Width / height of gutter between elements/
minify|true|Whether or not MiniMasonry place elements on shortest column or keep exact order of list.

## API

Here is the list of available APIs :

Name|Description
----|-----------
layout()|If list has changed, trigger a relayout of the masonry

MiniMasonry will add a "resize" event listener on the window to redraw the masonry on window resize. This listener is throttled to 66ms (15fps).

## Example

[See website](https://spope.github.com/MiniMasonry.js)

## License

MIT

Made by [Spope](https://spope.fr/)
