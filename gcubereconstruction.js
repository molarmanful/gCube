(function( $ ) {
	$.fn.gce = function(options, callback) {
		
		//only <g-cube></g-cube> allowed
		this.filter('g-cube').each(function(){
			
		});
		
		//debug purposes
		console.log('gCube reconstruction loaded.');
		return this;
	};
}( jQuery ));
