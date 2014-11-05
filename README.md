googlecubeembed
==================

Have an online cubing tutorial page? Need an interactive, easy, 3D cube visualizer? Embed this Javascript Rubik's Cube in HTML5! All you need to do is to follow the steps below.

Using Google Chrome Cube Lab Code.

How to Use
==================

1. Include jQuery 1.11.1+ if you haven't already.
2. Put ```<script src="http://molarmanful.github.io/googlecubeembed/googlecubeembed.js"></script>``` in the head tag.
3. Make a custom "cube" tag and apply CSS: ```<cube></cube>```. There are also optional attributes listed below.
4. Sit back and cube on!

<cube> Attributes
==================
Example code:
```html
<cube speed="" initcontrols="true" scramble="" alg=""></cube>
```
| Attribute | Description |
|-----------|-------------|
| _speed_ | Number. Milliseconds needed to perform a turn. Defaults to 1000. |
|-----------|-------------|
| _initcontrols_ | Boolean. Whether to include "Play algorithm" button. Required for _alg_ attribute. |
|-----------|-------------|
| _scramble_ | String. Use Singmaster notation to scramble, and put spaces between moves. |
|-----------|-------------|
| _alg_ | String. Use Singmaster notation to scramble, and put spaces between moves. |
|-----------|-------------|
