gCube
==================

Have an online cubing tutorial page? Need an interactive, easy-to-use 3x3x3 cube visualizer? Use gCube! All you need to do is to follow the steps below.

To see how gCube works, go to [this Codepen Collection](http://codepen.io/collection/XOLVLQ/).

gCube is built using Google Chrome Cube Lab Code, and is inspired by alg.cubing.net.

How to Use
==================

1. Include jQuery (`<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>`) if you have not already done so.
2. Put `<script src="https://molarmanful.github.io/gCube/gcube.min.js"></script>` in the head tag, AFTER your jQuery script tag.
3. Put ```<g-cube></g-cube>``` in the body tag, where you want the cube. See jQuery attributes below to customize the cube.
4. Sit back and cube!

HTML and jQuery
==================
HTML attributes are set using custom tags inside `g-cube` tags.
```html
<g-cube>
	<g-speed>10</g-speed>
	<g-scramble>D2 R2 F2 R B L U2 F D L2 B2 L2 F' U2 B L2 D2 F2 D2 B</g-scramble>
	<g-algorithm>R U R' U'</g-algorithm>
	<g-highlight>flxcross</g-highlight>
	<g-florian>0.2em,0.1em</g-florian>
	<g-angle>0.1,0.6,0.5</g-angle>
</g-cube>
```

All jQuery functions will only work on `g-cube` tags.
```javascript
//initialize
$('g-cube').gcube();
//speed
$('g-cube').gspeed(10);
//scramble
$('g-cube').gscramble("D2 R2 F2 R B L U2 F D L2 B2 L2 F' U2 B L2 D2 F2 D2 B");
//algorithm
$('g-cube').galgorithm("R U R' U'");
//highlight
$('g-cube').ghighlight("flxcross");
//florian
$('g-cube').gflorian("0.2em,0.1em");
//angle
$('g-cube').gangle("0.1,0.6,0.5");
```

| HTML/jQuery Attribute | Description |
|-----------|-------------|
| _gcube (jQuery only)_ | Takes no arguments. Initializes gCube and creates cube instance. |
| _speed_ | String/Number. Milliseconds needed to perform a turn in algorithm. Defaults to `10`. |
| _scramble_ | String. Use WCA Notation. Using `/random` is also allowed, but another of these commands is required: `/2-genR`, `/2-genL`, `/2-genM`, `/3-genRF`, `/3-genLF`, and `/3-genRL`. Defaults to an empty string. |
| _algorithm_ | String. Use WCA notation. Defaults to an empty string. |
| _highlight_ | String. Case-sensitive. |
| _text_ | String. You can put a message that is 18 characters or less. This will render on the front 2 faces of the cube. Defaults to an empty string. |
| _florian_ | String, string. First argument determines amount of curvature to add to the stickers at cubelet intersections. Second argument determines amount of curvature to add to the stickers at the edges of the cubelets. Must be CSS-acceptable measurements. |
| _angle_ | Number, number, number. Arguments determine rotation (decimal form) of x, y, and z rotations. |
| _callback_ | Function to be called after options are initialized. |

CSS
==================

### Base
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

### Stickers
Stickers can be customized in the almost the same way as a stickerless cube:
```css
/*name of class here*/ .faceUp .sticker {
	background-color: /*desired color for the sticker*/;
}
/*name of class here*/ .faceDown .sticker {
	background-color: /*desired color for the sticker*/;
}
/*name of class here*/ .faceLeft .sticker {
	background-color: /*desired color for the sticker*/;
}
/*name of class here*/ .faceRight .sticker {
	background-color: /*desired color for the sticker*/;
}
/*name of class here*/ .faceFront .sticker {
	background-color: /*desired color for the sticker*/;
}
/*name of class here*/ .faceBack .sticker {
	background-color: /*desired color for the sticker*/;
}
```
Then the jQuery (change `g-cube` if necessary):
```javascript
$('g-cube').addClass(/*name of class here*/);
```

### Logo
Logos will be displayed on the center of the down face.
```css
/*name of class here*/ .cubeletId-16 .sticker {
	background-image: url(/*url to logo image*/);
	/*add some other CSS to make it look nice*/
}
```
Then the jQuery (change `g-cube` if necessary):
```javascript
$('g-cube').addClass(/*name of class here*/);
```

### Inputs
The "Play Algorithm" button has the class `playalg`. The speed slider has the class `speedslider`.

Credits
==================
Thanks to Michael Casebolt for his contributions and bug fixes. Superb job!
