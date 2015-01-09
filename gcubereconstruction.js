(function( $ ) {
	//plugin
	$.fn.reconstruct = function(algs, comments, callback) {
		
		//only <g-cube></g-cube> allowed
		this.filter('g-cube').each(function(){
			//only allow arrays of equal length for params
			if(typeof alg == 'array' && typeof comments == 'array' && algs.length == comments.length){
				//check for cube presence
				if(window.cube){
					
				}
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
