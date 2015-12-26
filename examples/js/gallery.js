// Turn a CSV of algorithms into a gCube gallery.
// CSV format:
// 1 algorithm per line
// <algorithm>, <title>, <description>

(function(){
	function makeCube(algorithm, title, description) {
		var container = $('<div>');

		var titleElement = $('<div id="title">');
		titleElement.text(title);

		var descriptionElement = $('<div id="description">');
		descriptionElement.text(description);

		var element = $('<g-cube>');
		var gCube = new GCube(element);
		gCube.setup();
		gCube.galgorithm(algorithm);

		container.appendChild(titleElement);
		container.appendChild(descriptionElement);
		container.appendChild(gCube);

		return container;
	}

	console.log("asdf");

	var gallery = $('cubeGallery');
	var csv = $('algorithms').text();
	var algorithms = csv.split('\n').map(function(line) {
		return line.split(',');
	});

	var gCubes = algorithms.forEach(function(algorithm) {
		gallery.appendChild(makeCube(algorithm[0], algorithm[1], algorithm[2]));
	});
})();
