(function( $ ) {
	//plugin start
	$.fn.reconstruct = function(algs, comments, callback) {
		
		//only <g-cube></g-cube> allowed
		this.filter('g-cube').each(function(){
			//only allow arrays of equal length for params
			if(typeof alg == 'array' && typeof comments == 'array' && algs.length == comments.length){
				//check for cube presence
				if(window.cube){
					rec();
				}
			}
			
			//reconstruct function - still can make 'this' refer to a g-cube tag
			function rec(){
				//overwrite any buttons previously in tag except for cube container and speed slider with reconstruction buttons
				$(this).children(':not(.cubecont):not(.speedslider)').remove().prepend('<button class="rec" style="top: 0; z-index: 100">Play Reconstruction</button><br><span id="steps"></span><br>');
				//play button
				$('.rec').click(function(){
					//play through steps
					var count = 0;
					while(count <= alg.length){
						
					}
				});
			}
			
			//callback
			if(typeof callback == 'function'){
				callback.call();
			}
		});
		
		//debug purposes
		console.log('gCube reconstruction loaded.');
		
		//chaining
		return this;
	};
}( jQuery ));
