googlecubeembed
==================

Have an online cubing tutorial page? Need an interactive, easy, 3D cube visualizer? Embed this Javascript Rubik's Cube in HTML5! All you need to do is to follow the steps below.

Using Google Chrome Cube Lab Code.

How to Use
==================

1. Put ```<script src="http://molarmanful.github.io/googlecubeembed/googlecubeembed.js"></script>``` in the head tag.
2. Make and apply CSS to ```<g-cube></g-cube>```. There are also optional attributes listed below.
3. Sit back and cube on!

```googlecubeembed.js``` includes jQuery 1.11.1 if the page does not have jQuery.

<cube> Attributes
==================
Example code:
```html
<g-cube speed="" initcontrols="true" scramble="B2 F U Bi R D2 L` R` F D` R F` B` D B` Ri F' L` B2 Ri B R` Fi Ui B" alg="[R U R' U'] [R' F] [R2 U' R'] U' [R U R' F']"></g-cube>
```
| Attribute | Description |
|-----------|-------------|
| _speed_ | Number. Milliseconds needed to perform a turn. Defaults to 1000. |
| _initcontrols_ | Boolean. Whether to include "Play algorithm" button. Must be set to true to use _alg_ attribute. |
| _scramble_ | String. Use Singmaster notation to scramble, and put spaces between moves. Brackets, curly brackets, and parentheses are allowed. |
| _alg_ | String. Use Singmaster notation to scramble, and put spaces between moves. Brackets, curly brackets, and parentheses are allowed. |

CSS Defaults
==================
```Height``` and ```width``` attributes are both ```10%```.
```position``` is set to ```absolute```.
```display``` is set to ```block```.

NOTE: Do not Change these parameters, but because ```<g-cube></g-cube>``` is absolute, set ```top```, ```left```, ```right```, and ```bottom``` CSS attributes.
