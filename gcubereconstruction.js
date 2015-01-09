(function( $ ) {
	//plugin
	$.fn.reconstruct = function(algs, comments, callback) {
		
		//only <g-cube></g-cube> allowed
		this.filter('g-cube').each(function(){
			//only allow array params
			if(typeof alg == 'array' && typeof comments == 'array' && algs.length == comments.length){
				
			}
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
