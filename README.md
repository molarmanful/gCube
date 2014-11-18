googlecubeembed
==================

Have an online cubing tutorial page? Need an interactive, easy, 3D cube visualizer? Embed this Javascript Rubik's Cube in HTML5! All you need to do is to follow the steps below.

Using Google Chrome Cube Lab Code.

How to Use
==================

1. Include jQuery 1.11.1 (```<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>```) if you have not already done so.
2. Put ```<script src="http://molarmanful.github.io/googlecubeembed/googlecubeembed.js"></script>``` in the head tag, AFTER your jQuery script tag.
3. Put ```<g-cube></g-cube>``` in the body tag, where you want the cube. See jQuery attributes below to customize the cube.
4. Sit back and cube on!

<cube> Attributes
==================
Example code:
```javascript
$('g-cube').gce({
	speed: 1000,
	scramble: "RrLlUuDdFfBbMmEeSsXxYyZz",
	initcontrols: true,
	algorithm: "RUruRUruRUru",
	colorscheme: "white yellow blue green orange red"
}, callback());
```
| Attribute | Description |
|-----------|-------------|
| _speed_ | Number. Milliseconds needed to perform a turn. Defaults to ```1000```. |
| _scramble_ | String. See _Notation_ for more info. Defaults to ```''```. |
| _algorithm_ | String. If this is set, then keyboard and mouse controls will be disabled unless ```'/keyboard'``` and/or ```'/mouse'``` is added to the end of the algorithm string. See _Notation_ for more info. Defaults to ```''```. |
| _colorscheme_ | String. Use CSS-accepted color values only. Separate colors with one space, and put colors in this format: ```"down up front back left right"```. Defaults to ```"white yellow blue green orange red"```, also known as the Western/BOY color scheme. |
| _highlight_ | String. You can use one or more of these to hide all but some selected stickers: `edges`, `corners`, `centers`, `flcross`, `flxcross`, `fl`, `flcorners`, `f2l`, `f2ll`, `llcross`, `llbar`, `llL`, `lldot`, `llcorners`, `2x2x2`, `2x2x3`, `eoline`, `roux1`, `roux2`. Case-sensitive. Defaults to highlighting the whole cube. |
| _callback_ | Function to be called after options are initialized. |

CSS Defaults
==================
```Height``` and ```width``` attributes are both ```100%```. You can change this if you want but use ```!important```.

```position``` is set to ```absolute```. Do not change this; instead, make a parent element if you really need to.

```display``` is set to ```block```. Do not change this.

You may want to set ```top```, ```left```, ```right```, ```bottom``` CSS attributes.

Notation
===================
Googlecubeembed notation is based on Singmaster notation, but instead of i, `, or ' suffixes to denote counterclockwise turns, lowercase letters are used. Rotations are uppercase unless turning counterclockwise. 180-degree turns are denoted as 2 uppercase/lowercase letters.

Examples:

R = R

Ri/R`/R' = r

R2 = RR/rr
