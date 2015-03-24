gCube
==================

Have an online cubing tutorial page? Need an interactive, easy-to-use 3x3x3 cube visualizer? Use gCube! All you need to do is to follow the steps below.

To see how gCube works, go to [this Codepen Collection](http://codepen.io/collection/XOLVLQ/).

gCube is built using Google Chrome Cube Lab Code, and is inspired by alg.cubing.net.

How to Use
==================

1. Include jQuery (```<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>```) if you have not already done so.
2. Put ```<script src="http://molarmanful.github.io/gCube/gcube.js"></script>``` or ```<script src="http://molarmanful.github.io/gCube/gcube.min.js"></script>``` in the head tag, AFTER your jQuery script tag.
3. Put ```<g-cube></g-cube>``` in the body tag, where you want the cube. See jQuery attributes below to customize the cube.
4. Sit back and cube!

Jquery
==================

All functions will only work on `g-cube` tags.

```javascript
//speed, string
$('g-cube').gspeed(10);
//scramble, string
$('g-cube').gscramble("D2 R2 F2 R B L U2 F D L2 B2 L2 F' U2 B L2 D2 F2 D2 B");
//algorithm, string
$('g-cube').galgorithm("R U R' U'");
//highlight, string
$('g-cube').ghighlight("flxcross");
//florian, string
$('g-cube').gflorian("0.2em");
```

| Attribute | Description |
|-----------|-------------|
| _speed_ | String. Milliseconds needed to perform a turn in algorithm. Defaults to `10`. |
| _scramble_ | String. Use WCA Notation. Using `/random` is also allowed, but another of these commands is required: `/2-genR`, `/2-genL`, `/2-genM`, `/3-genRF`, `/3-genLF`, and `/3-genRL`. Defaults to an empty string. |
| _algorithm_ | String. Use WCA notation. Defaults to an empty string. |
| _highlight_ | String. Case-sensitive. Defaults to highlighting the whole cube. NOTE: OLL, EOLL, OCLL, and COLL stages might not work. See Issue #1. |
| _text_ | String. You can put a message that is 18 characters or less. This will render on the front 2 faces of the cube. Defaults to an empty string. |
| _florian_ | String. The amount of curve to add to the intersection of each cubelet. Must be a CSS-acceptable measurement. |
| _callback_ | Function to be called after options are initialized. |

Base Color Options
==================
There are 8 predefined classes that you can use for the base: transparent, stickerless, white, yellow, green, blue, orange, red, and neon. In addition, you can make your own class by adding this to your CSS code:

```css
/*name of class here*/ .face {
	background-color: /*desired color*/;
}
```

Then add this to your jQuery code (change `g-cube` if necessary):
```javascript
$('g-cube').addClass(/*name of class here*/);
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
