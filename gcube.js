(function($) {
  //plugin start
  var scram, algo, algor, ths;
  window.cube = new ERNO.Cube();
  cube.rotation.y = -0.8;
  cube.keyboardControlsEnabled = false;
  cube.core.setOpacity(0);

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
      else {
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
      else {
        x.push(e[0].toLowerCase());
      }
    });
    return x;
  }
  
  //make new cube
  $.fn.gcube = function(callback) {
    this.filter('g-cube').each(function() {
      //cube container
      $(this).append('<div class="cubecont"></div>');
      $(this).find('.cubecont').append(cube.domElement);
    });
    if(typeof callback == 'function'){
      callback();
    }
    return this;
  }
  //change speed
  $.fn.gspeed = function(x) {
    this.filter('g-cube').each(function() {
      if (x.length) {
        cube.twistDuration = x;
      } else {
        cube.twistDuration = 10;
      }
    });
    return this;
  };
  //change scramble
  $.fn.gscramble = function(x) {
    if (x.length) {
      this.filter('g-cube').each(function() {
        scram = algparse(x.replace(/\/random/i, '').replace(/\/2-genR/i, '').replace(/\/2-genL/i, '').replace(/\/2-genM/i, '').replace(/\/3-genRF/i, '').replace(/\/3-genLF/i, '').replace(/\/3-genRL/i, ''));
        if (x.match('/random')) {
          if (x.match('/2-genR')) {
            cube.shuffleMethod = 'RrUu';
          } else if (x.match('/2-genM')) {
            cube.shuffleMethod = 'MmUu';
          } else if (x.match('/2-genL')) {
            cube.shuffleMethod = 'RrUu';
          } else if (x.match('/3-genRF')) {
            cube.shuffleMethod = 'RrUuFf';
          } else if (x.match('/3-genLF')) {
            cube.shuffleMethod = 'LlUuFf';
          } else if (x.match('/3-genRL')) {
            cube.shuffleMethod = 'RrUuLl';
          } else {
            cube.shuffleMethod = 'RrLlUuDdFfBb';
          }
          cube.shuffle(25);
        } else {
          cube.twist(scram);
        }
      });
    }
    return this;
  };
  //change alg
  $.fn.galgorithm = function(x) {
    if (x.length) {
      this.filter('g-cube').each(function() {
        algo = algparse(x);
        algor = algparseinv(x);
        cube.mouseControlsEnabled = false;
        $(this).children('button, input, span').remove();
        $(this).prepend('<button class="playalg" style="top: 0; z-index: 100">Play Algorithm</button><br><span>Speed:</span><input class="speedslider" type="range" min="10" max="1500" value="500">');
        $(this).children('.playalg').click(function() {
          if ($(this).text() == 'Play Algorithm') {
            cube.twistDuration = $('.speedslider').val();
            $(this).text('Reverse Algorithm');
            cube.twist(algo);
          } else {
            cube.twistDuration = 10;
            cube.twist(algor);
            $(this).text('Play Algorithm');
          }
        });
      });
    }
    return this;
  };
  
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
  
  //change state/highlight
  $.fn.ghighlight = function(x) {
    if (x.length) {
      this.filter('g-cube').each(function() {
        cube.hideStickers();
        ths = $(this);
        x = x.toLowerCase();
        if (highlighters.hasOwnProperty(x)) {
          highlighters[x].apply(cube);
        } else {
          cube.showStickers();
        }
      });
    }
    return this;
  };
  //change text
  $.fn.gtext = function(x) {
    this.filter('g-cube').each(function() {
      cube.showTexts();
      cube.folds[0].setText(x);
      cube.folds[1].setText('');
      cube.folds[2].setText('');
      if (x.length) {
        cube.rotation.x = 50.2;
      }
    });
    return this;
  };
  //change florian
  $.fn.gflorian = function(e,f) {
    this.filter('g-cube').each(function() {
      var x = '0.1em';
      var y = '0.1em';
      $(this).children('style').remove();
      if (e.length) {
        x = e;
      }
      if (f.length) {
        y = f;
      }
      //this is gonna be really messy...
      $(this).prepend('<style>'+
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
    });
    return this;
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
  
  // Expose a function to do the standard setup on a single g-cube.
  setupGcube = function(gcube) {
    var $gcube = $(gcube);
    var s = $gcube.find('g-speed').text(),
        sc = $gcube.find('g-scramble').text(),
        a = $gcube.find('g-algorithm').text(),
        h = $gcube.find('g-highlight').text(),
        t = $gcube.find('g-text').text(),
        f = $gcube.find('g-florian').text();
    if(f.match(',')){
      f = f.replace(/\s/g).split(',');
    } else {
      f = ['',''];
    }
    $gcube.gcube().gspeed(s).gscramble(sc).galgorithm(a).ghighlight(h).gtext(t).gflorian(f[0],f[1]);
  };
  
  // Expose a function to do the standard setup on all g-cubes.
  setupAllGcubes = function() {
    $('g-cube').each(function() {
      setupGcube(this);
    });
  };
  
  // Wait for the stylesheet to load before rendering, so that the cube won't render improperly during the load.
  var stylesheet = $('<link rel="stylesheet" type="text/css" href="https://molarmanful.github.io/gCube/gcube.css">');  
  stylesheet.load(function() {
    // Construct all of the g-cubes.
    setupAllGcubes();
  });
  $("head").prepend(stylesheet);
}(jQuery));
