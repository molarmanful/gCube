
//if tags exist
if(!($('g-shufflespeed').length)){
	$('g-shufflespeed').text('10');
}
if(!($('g-speed').length)){
	$('g-speed').text('100');
}
if(!($('g-scramble').length)){
	$('g-scramble').text();
}
if(!($('g-algorithm').length)){
	$('g-algorithm').text('');
}
if(!($('g-highlight').length)){
	$('g-highlight').text('');
}
if(!($('g-text').length)){
	$('g-text').text('');
}
if(!($('g-florian').length)){
	$('g-florian').text('0.1em');
}

//managing html tags
$('g-cube').each(function(){
	$(this).gce({
		shufflespeed: $('g-shufflespeed').text(),
		speed: parseInt($('g-speed').text()),
		scramble: $('g-scramble').text(),
		algorithm: $('g-algorithm').text(),
		highlight: $('g-highlight').text(),
		text: $('g-text').text(),
		florian: $('g-florian').text()
	});
});
