//This plugin requires gcube.js and jQuery to run.

(function( $ ) {
	//plugin start
	$.fn.reconstruct = function(algs, comments, callback) {
		
		//only <g-cube></g-cube> allowed
		this.filter('g-cube').each(function(){
			//only allow arrays of equal length for params
			if(typeof algs == 'array' && typeof comments == 'array' && algs.length == comments.length){
				//check for cube presence
				if(window.cube){
					rec();
				}
			}
			
			//reconstruct function - still can make 'this' refer to a g-cube tag
			function rec(){
				//overwrite any buttons previously in tag except for cube container and speed slider with reconstruction buttons
				$(this).children(':not(.cubecont)').remove().prepend('<button class="rec" style="top: 0; z-index: 100">Play Reconstruction</button><br>Speed:<input class="speedslider" type="range" min="10" max="1500" value="' + settings.speed + '"><br><span class="steps"></span><br>');
				//play button clicked
				$('.rec').click(function(){
					//play through steps
					var count = 0;
					while(count < algs.length){
						//comments are where you display your algs and comments (duh!)
						$('.steps').html(comments);
						//twist alg
						cube.twist(algs[count]);
						//no infinite loops!
						count++;
					}
				});
			}
			
			//callback
			if(typeof callback == 'function'){
				callback.call();
			}
		});
		
		//debug purposes
		console.log('gCube solve reconstruction loaded.');
		
		//chaining
		return this;
	};
}( jQuery ));
