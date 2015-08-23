/*
// TODO: Define a global object for gCube. Everything that gCube needs to expose goes in here.
gCube = {
  cubes: []
};
*/

//plugin start
(function($) {
  var algorithm, algorithmInverse;

  //alg parsers
  function algparse(s) {
    var x = [];
    s.trim().replace(/{|}|\[|\]\(|\)/g, '').split(/\s+/).forEach(function(e) {
      if (e.length === 2) {
        //180deg
        if (e[1] === '2') {
          x.push(new ERNO.Twist(e[0], 180));
        }
        //inverse
        else {
          x.push(e[0].toLowerCase());
        }
      }
      //inverse 180deg
      else if (e.length === 3) {
        x.push(new ERNO.Twist(e[0].toLowerCase(), 180));
      }
      //default
      else if (e.length === 1) {
        x.push(e[0]);
      }
    });
    return x;
  }

  function algparseinv(s) {
    var x = [];
    s.trim().replace(/{|}|\[|\]\(|\)/g, '').split(/\s+/).reverse().forEach(function(e) {
      if (e.length === 2) {
        //180deg
        if (e[1] === '2') {
          x.push(new ERNO.Twist(e[0].toLowerCase(), 180));
        }
        //inverse
        else {
          x.push(e[0].toUpperCase());
        }
      }
      //inverse 180deg
      else if (e.length === 3) {
        x.push(new ERNO.Twist(e[0].toUpperCase(), 180));
      }
      //default
      else if (e.length === 1) {
        x.push(e[0].toLowerCase());
      }
    });
    return x;
  }
  
  /* Create a map of highlighting methods. In the context of these highlighting functions,
    'this' is the ERNO.Cube instance. These are kept private so that
    $(cube).g-highlight(x) is used instead of a call to cube.hideStickers() and one of these functions. */
  var highlighters = {
    /** Only show the edge cubelets. */
    "edges": function() {
      this.edges.showStickers();
      this.centers.hideStickers();
      this.corners.hideStickers();
    },
    /** Only show the corner cubelets. */
    "corners": function() {
      this.corners.showStickers();
      this.edges.hideStickers();
      this.centers.hideStickers();
    },
    /** Only show the center cubelets. */
    "centers": function() {
      this.centers.showStickers();
      this.edges.hideStickers();
      this.corners.hideStickers();
    },
    /** Only show the down face's edges and the cube's centers. */
    "flcross": function() {
      this.down.cross.showStickers();
      this.centers.showStickers();
      this.rotation.x = 100;
    },
    /** Only show the down face's edges, the cube's centers, and the corner-edge pair in the
        Front-Right-Down position. */
    "flxcross": function() {
      this.down.cross.showStickers();
      this.centers.showStickers();
      this.hasId(5).showStickers();
      this.hasId(8).showStickers();
      this.rotation.x = 100;
    },
    /** Only show the cubelets on the down face and the cube's centers. */
    "fl": function() {
      this.down.showStickers();
      this.centers.showStickers();
      this.rotation.x = 100;
    },
    /** Only show the corners of the first layer, and put the down face in view of the camera. */
    "cfl": function() {
      this.down.corners.showStickers();
      this.rotation.x = 100;
    },
    /** Only show the cubelets in the "middle" slice and the cube's centers. */
    "belt": function() {
      this.equator.showStickers();
      this.centers.showStickers();
    },
    /** Only show the first two layers of the cube (the down face and the middle slice)
        and the center of the up face. Also put the down face in view of the camera. */
    "f2l": function() {
      this.showStickers();
      this.up.hideStickers();
      this.centers.showStickers();
      this.rotation.x = 100;
    },
    /** Shows all the stickers except for the ring of stickers on the up slice that don't face up. */
    "oll": function() {
      this.showEdgeStickersOnUpFace();
      this.showCornerStickersOnUpFace();
      this.centers.showStickers();
      this.equator.showStickers();
      this.down.showStickers();
    },
    /** Show all the stickers on the down and equator slices, as well as the stickers facing up on
        edges on the up face, and also the up face's center sticker. */
    "eoll": function() {
      this.showEdgeStickersOnUpFace();
      this.centers.showStickers();
      this.equator.showStickers();
      this.down.showStickers();
    },
    /** Show all the stickers on the down and equator slices, as well as the stickers facing up on
        corners on the up face, ans also the up face's center sticker. */
    "ocll": function() {
      this.showCornerStickersOnUpFace();
      this.centers.showStickers();
      this.equator.showStickers();
      this.down.showStickers();
    },
    /** Show all the stickers except for stickers on edge cubelets on the up slice which don't face up. */
    "coll": function() {
      this.showEdgeStickersOnUpFace();
      this.centers.showStickers();
      this.up.corners.showStickers();
      this.equator.showStickers();
      this.down.showStickers();
    },
    /** Show the stickers on all cubelets, and hide stickers on the edge cubelets of the up slice. */
    "cll": function() {
      this.showStickers();
      this.up.edges.hideStickers();
    },
    /** Only show the centers and a 2x2x2 block in the down-front-right position,
        and put the down face in view of the camera. */
    "2x2x2": function() {
      this.showStickers();
      this.up.hideStickers();
      this.back.hideStickers();
      this.left.hideStickers();
      this.centers.showStickers();
      this.rotation.x = 100;
    },
    /** Only show the centers and a 2x2x3 block along the down-front edge.
        Put the down face in view of the camera. */
    "2x2x3": function() {
      this.showStickers();
      this.up.hideStickers();
      this.back.hideStickers();
      this.centers.showStickers();
      this.rotation.x = 100;
    },
    /** Only show the centers and the cubelets on the middle slice which are not also on the up slice. */
    "eoline": function() {
      this.showStickers();
      this.up.hideStickers();
      this.left.hideStickers();
      this.right.hideStickers();
      this.centers.showStickers();
      this.rotation.x = 100;
    },
    /** Only show the cubelets on the right slice which are not also on the up slice.
        Put the down face in view of the camera. */
    "fb": function() {
      this.right.showStickers();
      this.up.hideStickers();
      this.rotation.x = 100;
    },
    /** Only show the cubelets on the right and left slice which are not also on the up slice.
        Put the down face in view of the camera. */
    "f2b": function() {
      this.right.showStickers();
      this.left.showStickers();
      this.up.hideStickers();
      this.rotation.x = 100;
    },
    /** Show all cubelets except for cubelets on the middle slice and the edges on the up slice. */
    "cmll": function() {
      this.right.showStickers();
      this.left.showStickers();
      this.up.hideStickers();
      this.up.corners.showStickers();
    }
  };
  
  // This is the GCube class's constructor
  function GCube(element) {
    // TODO: make sure there is only one g-cube element in the argument
    
    // Wrap the element with jQuery, in case it hasn't been wrapped already.
    this.element = $(element);
    
    // Create a cube and set some basic properties
    this.cube = new ERNO.Cube();
    this.cube.rotation.y = -0.8;
    this.cube.keyboardControlsEnabled = false;
    this.cube.core.setOpacity(0);
    
    // Create the cube container and put it inside the g-cube tag, and create a bounding
    // box div to hold the domElement, because the cube dynamically grows to the size
    // of its container. Do the appending inside-out to minimize "reflow":
    // http://blog.letitialew.com/post/30425074101/repaints-and-reflows-manipulating-the-dom
    this.container = $('<div class="cubecont"/>');
    this.boundingBox = $('<div class="cube-bounding-box"/>');
    this.boundingBox.append(this.cube.domElement);
    this.container.append(this.boundingBox);
    this.element.append(this.container);
    
    // At this point the cube is visible, but it has not been customized
    // with any gCube settings. Call setup to apply the settings from the tags,
    // or call the customization methods directly.
  }
  
  // Add GCube's methods to its prototype
  GCube.prototype = {
    // Do the standard setup of a gCube using the parameters found inside the html tags.
    // TODO: This could take an optional JSON object giving all the parameters
    setup: function() {
      var s = this.element.find('g-speed').text(),
        sc = this.element.find('g-scramble').text(),
        a = this.element.find('g-algorithm').text(),
        h = this.element.find('g-highlight').text(),
        t = this.element.find('g-text').text(),
        f = this.element.find('g-florian').text();
      // should try to keep consistent about passing in the tag content strings to these functions,
      // and the logic for the florian tag shouldn't go here anyway.
      if (f.match(',')) {
        f = f.replace(/\s/g).split(',');
      } else {
        f = ['',''];
      }
      // TODO: need to make these functions of this class's prototype, rather than jquery extensions
      this.gspeed(s).gscramble(sc).galgorithm(a).ghighlight(h).gtext(t).gflorian(f[0],f[1]);
      return this;
    },
    
    // Change the speed of the gCube's turning animations.
    gspeed: function(x) {
      if (x.length) {
        this.cube.twistDuration = x;
      } else {
        this.cube.twistDuration = 10;
      }
      return this;
    },
    
    // Set the scramble of the gCube. This determines the initial state of the cube.
    // TODO: use sub-tags or attributes instead of the irc-like slash command syntax.
    gscramble: function(x) {
      if (typeof x === 'string' && x.length > 0) {
        var scramble = algparse(x.replace(/\/random/i, '').replace(/\/2-genR/i, '').replace(/\/2-genL/i, '').replace(/\/2-genM/i, '').replace(/\/3-genRF/i, '').replace(/\/3-genLF/i, '').replace(/\/3-genRL/i, ''));
        if (x.match('/random')) {
          if (x.match('/2-genR')) {
            this.cube.shuffleMethod = 'RrUu';
          } else if (x.match('/2-genM')) {
            this.cube.shuffleMethod = 'MmUu';
          } else if (x.match('/2-genL')) {
            this.cube.shuffleMethod = 'RrUu';
          } else if (x.match('/3-genRF')) {
            this.cube.shuffleMethod = 'RrUuFf';
          } else if (x.match('/3-genLF')) {
            this.cube.shuffleMethod = 'LlUuFf';
          } else if (x.match('/3-genRL')) {
            this.cube.shuffleMethod = 'RrUuLl';
          } else {
            this.cube.shuffleMethod = 'RrLlUuDdFfBb';
          }
          this.cube.shuffle(25);
        } else {
          this.cube.twist(scramble);
        }
      }
      return this;
    },
    
    // Set the algorithm. When an algorithm is set, the gCube becomes a playable demo of a single algorithm.
    galgorithm: function(x) {
      if (typeof x === 'string' && x.length > 0) {
        var algorithm = algparse(x);
        var algorithmInverse = algparseinv(x);
        this.cube.mouseControlsEnabled = false;
        this.container.children('button, input, span').remove();
        this.container.prepend('<button class="playalg" style="top: 0; z-index: 100">Play Algorithm</button><br><span>Speed:</span><input class="speedslider" type="range" min="10" max="1500" value="500">');
        
        var gcube = this; // Keep a reference to the current gCube.
        this.container.children('.playalg').click(function() {
          var button = $(this);
          if (button.text() == 'Play Algorithm') {
            gcube.cube.twistDuration = parseInt(gcube.container.children('.speedslider').val());
            button.text('Reverse Algorithm');
            gcube.cube.twist(algorithm);
          } else {
            gcube.cube.twistDuration = 10;
            gcube.cube.twist(algorithmInverse);
            button.text('Play Algorithm');
          }
        });
      }
      return this;
    },
    
    // Set the highlight mode of the gCube. By default all stickers are shown, but by using
    // a highlight mode the cube's stickers can be selectively hidden. This is useful for
    // demonstrating algorithms used to solve certain steps in a solution method.
    // The highlight is applied before the scramble while the cube is still in the solved state.
    ghighlight: function(x) {
      if (typeof x === 'string' && x.length > 0) {
        this.cube.hideStickers();
        x = x.toLowerCase();
        if (highlighters.hasOwnProperty(x)) {
          highlighters[x].apply(this.cube);
        } else {
          this.cube.showStickers();
        }
      }
      return this;
    },
    
    // change text
    // TODO: I don't think this is working properly. Need to test further.
    gtext: function(x) {
      if (typeof x === 'string' && x.length > 0) {
        this.cube.showTexts();
        this.cube.folds[0].setText(x);
        this.cube.folds[1].setText('');
        this.cube.folds[2].setText('');
        this.cube.rotation.x = 50.2;
      }
      return this;
    },
    
    // Set the "florian" intensity on the edges of each face (e) and the centers of each face (f).
    // A Florian mod is a type of Rubik's cube mod where the inside edges are rounded to enable
    // the puzzle to be more flexible and "cut" better, making it better for speedsolving.
    // This function makes the gCube look like a Florian mod by adding some rounding to the
    // corners of the stickers.
    gflorian: function(e, f) {
      var x = '0.1em';
      var y = '0.1em';
      this.container.children('style').remove();
      if (typeof e === 'string') {
        x = e;
      }
      if (typeof f === 'string') {
        y = f;
      }
      //this is gonna be really messy...
      this.container.prepend('<style>'+
      '.cube .cubeletId-0 .faceFront .sticker {  border-radius: ' + y + ' ' + y + ' ' + x + ' ' + y + ';}'+
      '.cube .cubeletId-0 .faceUp .sticker {  border-radius: ' + y + ' ' + x + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-0 .faceLeft .sticker {  border-radius: ' + x + ' ' + y + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-1 .faceFront .sticker {  border-radius: ' + y + ' ' + y + ' ' + x + ' ' + x + ';}'+
      '.cube .cubeletId-1 .faceUp .sticker {  border-radius: ' + x + ' ' + x + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-2 .faceFront .sticker {  border-radius: ' + y + ' ' + y + ' ' + y + ' ' + x + ';}'+
      '.cube .cubeletId-2 .faceUp .sticker {  border-radius: ' + y + ' ' + x + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-2 .faceRight .sticker {  border-radius: ' + y + ' ' + y + ' ' + x + ' ' + y + ';}'+
      '.cube .cubeletId-3 .faceFront .sticker {  border-radius: ' + y + ' ' + x + ' ' + x +' ' + y + ';}'+
      '.cube .cubeletId-3 .faceLeft .sticker {  border-radius: ' + x + ' ' + x + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-4 .faceFront .sticker {  border-radius: ' + x + ';}'+
      '.cube .cubeletId-5 .faceFront .sticker {  border-radius: ' + x + ' ' + y + ' ' + y + ' ' + x + ';}'+
      '.cube .cubeletId-5 .faceRight .sticker {  border-radius: ' + y + ' ' + x + ' ' + x +' ' + y + ';}'+
      '.cube .cubeletId-6 .faceFront .sticker {  border-radius: ' + y + ' ' + x + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-6 .faceDown .sticker {  border-radius: ' + y + ' ' + x + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-6 .faceLeft .sticker {  border-radius: ' + y + ' ' + x + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-7 .faceFront .sticker {  border-radius: ' + x + ' ' + x + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-7 .faceDown .sticker {  border-radius: ' + y + ' ' + x + ' ' + x +' ' + y + ';}'+
      '.cube .cubeletId-8 .faceFront .sticker {  border-radius: ' + x + ' ' + y + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-8 .faceDown .sticker {  border-radius: ' + y + ' ' + y + ' ' + x + ' ' + y + ';}'+
      '.cube .cubeletId-8 .faceRight .sticker {  border-radius: ' + y + ' ' + x + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-9 .faceUp .sticker {  border-radius: ' + y + ' ' + x + ' ' + x +' ' + y + ';}'+
      '.cube .cubeletId-9 .faceLeft .sticker {  border-radius: ' + x + ' ' + y + ' ' + y + ' ' + x + ';}'+
      '.cube .cubeletId-10 .faceUp .sticker {  border-radius: ' + x + ';}'+
      '.cube .cubeletId-11 .faceUp .sticker {  border-radius: ' + x + ' ' + y + ' ' + y + ' ' + x + ';}'+
      '.cube .cubeletId-11 .faceRight .sticker {  border-radius: ' + y + ' ' + y + ' ' + x + ' ' + x + ';}'+
      '.cube .cubeletId-12 .faceLeft .sticker {  border-radius: ' + x + ';}'+
      '.cube .cubeletId-14 .faceRight .sticker {  border-radius: ' + x + ';}'+
      '.cube .cubeletId-15 .faceDown .sticker {  border-radius: ' + x + ' ' + x + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-15 .faceLeft .sticker {  border-radius: ' + y + ' ' + x + ' ' + x + ' ' + y + ';}'+
      '.cube .cubeletId-16 .faceDown .sticker {  border-radius: ' + x + ';}'+
      '.cube .cubeletId-17 .faceDown .sticker {  border-radius: ' + y + ' ' + y + ' ' + x + ' ' + x + ';}'+
      '.cube .cubeletId-17 .faceRight .sticker {  border-radius: ' + x + ' ' + x + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-18 .faceBack .sticker {  border-radius: ' + x + ' ' + y + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-18 .faceUp .sticker {  border-radius: ' + y + ' ' + y + ' ' + x + ' ' + y + ';}'+
      '.cube .cubeletId-18 .faceLeft .sticker {  border-radius: ' + y + ' ' + y + ' ' + y + ' ' + x + ';}'+
      '.cube .cubeletId-19 .faceUp .sticker {  border-radius: ' + y + ' ' + y + ' ' + x + ' ' + x + ';}'+
      '.cube .cubeletId-19 .faceBack .sticker {  border-radius: ' + x + ' ' + y + ' ' + y + ' ' + x + ';}'+
      '.cube .cubeletId-20 .faceUp .sticker {  border-radius: ' + y + ' ' + y + ' ' + y + ' ' + x + ';}'+
      '.cube .cubeletId-20 .faceBack .sticker {  border-radius: ' + y + ' ' + y + ' ' + y + ' ' + x + ';}'+
      '.cube .cubeletId-20 .faceRight .sticker {  border-radius: ' + y + ' ' + y + ' ' + y + ' ' + x + ';}'+
      '.cube .cubeletId-21 .faceBack .sticker {  border-radius: ' + x + ' ' + x + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-21 .faceLeft .sticker {  border-radius: ' + y + ' ' + y + ' ' + x + ' ' + x + ';}'+
      '.cube .cubeletId-22 .faceBack .sticker {  border-radius: ' + x + ';}'+
      '.cube .cubeletId-23 .faceBack .sticker {  border-radius: ' + y + ' ' + y + ' ' + x + ' ' + x + ';}'+
      '.cube .cubeletId-23 .faceRight .sticker {  border-radius: ' + x + ' ' + y + ' ' + y + ' ' + x + ';}'+
      '.cube .cubeletId-24 .faceBack .sticker {  border-radius: ' + y + ' ' + x + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-24 .faceDown .sticker {  border-radius: ' + x + ' ' + y + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-24 .faceLeft .sticker {  border-radius: ' + y + ' ' + y + ' ' + x + ' ' + y + ';}'+
      '.cube .cubeletId-25 .faceBack .sticker {  border-radius: ' + y + ' ' + x + ' ' + x +' ' + y + ';}'+
      '.cube .cubeletId-25 .faceDown .sticker {  border-radius: ' + x + ' ' + y + ' ' + y + ' ' + x + ';}'+
      '.cube .cubeletId-26 .faceRight .sticker {  border-radius: ' + x + ' ' + y + ' ' + y + ' ' + y + ';}'+
      '.cube .cubeletId-26 .faceDown .sticker {  border-radius: ' + y + ' ' + y + ' ' + y + ' ' + x + ';}'+
      '.cube .cubeletId-26 .faceBack .sticker {  border-radius: ' + y + ' ' + y + ' ' + x + ' ' + y + ';}</style>');
      
      return this;
    },
  };
  
  // Add the last layer highlighting functions to the Cube class.
  ERNO.extend(ERNO.Cube.prototype, {
    /* The DOM of the cube.domElement element isn't fully constructed until the render method (cuber/src/scripts/renderer.js:115) is called.
      This function is queued with a call to requestAnimationFrame immediately following the function's definition, and this happens during
      the call to  new ERNO.Cube(). The render function isn't guaranteed to have been called at any point in this code, so we need a way to
      wait for it to be called before continuing. The solution used here is to call requestAnimationFrame with a callback that executes the
      rest of our code. Multiple requestAnimationFrame callbacks are called in the order they are requested, so because we are requesting
      the callback after the render callback, we can be sure that this code will be executed after the render code. */
      
    showEdgeStickersOnUpFace: function() {
      var cube = this;
      requestAnimationFrame(function() {
        var edgeCubeletsOnUpFace = $(cube.domElement).find('.cubeletId-1, .cubeletId-11, .cubeletId-19, .cubeletId-9');
        var edgeStickersOnUpFace = edgeCubeletsOnUpFace.find('.sticker.orange');
        edgeStickersOnUpFace.css('display', 'block');
      });
    },
    
    showCornerStickersOnUpFace: function() {
      var cube = this;
      requestAnimationFrame(function() {
        var cornerCubeletsOnUpFace = $(cube.domElement).find('.cubeletId-0, .cubeletId-2, .cubeletId-20, .cubeletId-18');
        var cornerStickersOnUpFace = cornerCubeletsOnUpFace.find('.sticker.orange');
        cornerStickersOnUpFace.css('display', 'block');
      });
    }
  });
  
  // Expose a function to do the standard setup on all g-cubes.
  setupAllGcubes = function() {
    $('g-cube').each(function() {
      new GCube(this).setup();
    });
  };
  
  // Wait for the stylesheet to load before rendering, so that the cube won't render improperly during the load.
  var stylesheet = $('<link rel="stylesheet" type="text/css" href="gcube.css">');  
  stylesheet.load(function() {
    // Construct all of the g-cubes.
    setupAllGcubes();
  });
  $("head").prepend(stylesheet);
}(jQuery));
