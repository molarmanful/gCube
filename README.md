gCube
==================

Have an online cubing tutorial page? Need an interactive, easy, 3D cube visualizer? Use gCube! All you need to do is to follow the steps below.

To see how gCube works, go to [this Codepen Collection](http://codepen.io/collection/XOLVLQ/).

gCube is built using Google Chrome Cube Lab Code.

How to Use
==================

1. Include jQuery 1.11.1 (```<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>```) if you have not already done so.
2. Put ```<script src="http://molarmanful.github.io/gCube/gcube.js"></script>``` or ```<script src="http://molarmanful.github.io/gCube/gcube.min.js"></script>``` in the head tag, AFTER your jQuery script tag.
	2a. If you want to use HTML tags, you must put either ```<script src="http://molarmanful.github.io/gCube/gcubehtml.js"></script>``` or ```<script src="http://molarmanful.github.io/gCube/gcubehtml.min.js"></script>``` in the head tag, AFTER, your gCube script tag.
3. Put ```<g-cube></g-cube>``` in the body tag, where you want the cube. See HTML or jQuery attributes below to customize the cube.
4. Sit back and cube!

HTML
==================
Here is an example code:
```html
<g-cube>
	<g-shufflespeed>10</g-shufflespeed>
	<g-speed>100</g-speed>
	<g-scramble>D2 R2 F2 R B L U2 F D L2 B2 L2 F' U2 B L2 D2 F2 D2 B</g-scramble>
	<g-algorithm>R2 U R2 U R2 U2 R U2</g-algorithm>
	<g-highlight>flxcross</g-highlight>
	<g-text>GCUBE</g-text>
	<g-florian>0.3em</g-florian>
</g-cube>
```

These attributes are based on the jQuery attributes (_see below_).

Jquery
==================

All functions will only work on `g-cube` tags.

Example code:
```javascript
$('g-cube').gce({
	shufflespeed: 10,
	speed: 100,
	scramble: "D2 R2 F2 R B L U2 F D L2 B2 L2 F' U2 B L2 D2 F2 D2 B",
	algorithm: "R2 U R2 U R2 U2 R U2",
	highlight: "flxcross",
	text: "GCUBE",
	florian: "0.3em"
}, callback());
```
| Attribute | Description |
|-----------|-------------|
| _shufflespeed_ | Number. Milliseconds needed to perform a turn in scramble. Defaults to `10`. |
| _speed_ | Number. Milliseconds needed to perform a turn in algorithm. Defaults to `100`. |
| _scramble_ | String. Use WCA Notation. Using `/random` is also allowed, but another of these commands is required: `/2-genR`, `/2-genL`, `/2-genM`, `/3-genRF`, `/3-genLF`, and `/3-genRL`. Defaults to an empty string. |
| _algorithm_ | String. If this is set, then mouse controls will be disabled unless `'/mouse'` is added to the end of the algorithm string. `/step` will add forward and backward step buttons. Use WCA notation. Defaults to an empty string. |
| _highlight_ | String. You can use one or more of these to hide all but some selected stickers: `onlyedges`, `onlycorners`, `onlycenters`, `flcross`, `flxcross`, `fl`, `flcorners`, `f2l`, `f2ll`, `llcross`, `llbar`, `llL`, `lldot`, `llcorners`, `2x2x2`, `2x2x3`, `eoline`, `roux1`, `roux2`, and `cmll`. Case-sensitive. Defaults to highlighting the whole cube. |
| _text_ | String. You can put a message that is 18 characters or less. This will render on the front 2 faces of the cube. Defaults to an empty string. |
| _florian_ | String. The amount of curve to add to the intersection of each cubelet. Must be a CSS-acceptable measurement. |
| _callback_ | Function to be called after options are initialized. |

These functions are used to change the cube settings after `.gce()` has been called.

```javascript
//speed, numeric
$('g-cube').setspeed(10);
//scramble, string
$('g-cube').scramble("D2 R2 F2 R B L U2 F D L2 B2 L2 F' U2 B L2 D2 F2 D2 B");
//algorithm, string
$('g-cube').setalg("R U R' U'");
//highlight, string
$('g-cube').sethighlight("flxcross");
//florian, string
$('g-cube').setflorian("0.2em");
```

Base Color Options
==================
There are 8 predefined classes that you can use for the base: transparent, stickerless, white, yellow, green, blue, orange, red, and neon. In addition, you can make your own class by adding this to your CSS code:

```css
/*name of class here*/ .face {
	background-color: /*desired color*/;
}
```

You can also set the cube's body color by adding this to your jQuery code:
```javascript
$('.cube').addClass(/*name of class here*/);
```

Custom stickerless cubes can use this CSS:
```css
/*name of class here*/ .faceUp {
	background-color: /*desired color for the face*/;
}
/*name of class here*/ .faceDown {
	background-color: /*desired color for the face*/;
}
/*name of class here*/ .faceLeft {
	background-color: /*desired color for the face*/;
}
/*name of class here*/ .faceRight {
	background-color: /*desired color for the face*/;
}
/*name of class here*/ .faceFront {
	background-color: /*desired color for the face*/;
}
/*name of class here*/ .faceBack {
	background-color: /*desired color for the face*/;
}
```

CSS Defaults
==================
`Height` and `width` attributes are both `100%`.

`position` is set to `absolute`.

`display` is set to `block`.
