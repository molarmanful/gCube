//managing html tags
$('g-cube').each(function(){
	//if tags exist
	if(!($(this).children('g-shufflespeed').length)){
		$(this).children('g-shufflespeed').text('10');
	}
	if(!($(this).children('g-speed').length)){
		$(this).children('g-speed').text('100');
	}
	if(!($(this).children('g-scramble').length)){
		$(this).children('g-scramble').text('');
	}
	if(!($(this).children('g-algorithm').length)){
		$(this).children('g-algorithm').text('');
	}
	if(!($(this).children('g-highlight').length)){
		$(this).children('g-highlight').text('');
	}
	if(!($(this).children('g-text').length)){
		$(this).children('g-text').text('');
	}
	if(!($(this).children('g-florian').length)){
		$(this).children('g-florian').text('0.1em');
	}
	$(this).gce({
		shufflespeed: $(this).children('g-shufflespeed').text(),
		speed: parseInt($(this).children('g-speed').text()),
		scramble: $(this).children('g-scramble').text(),
		algorithm: $(this).children('g-algorithm').text(),
		highlight: $(this).children('g-highlight').text(),
		text: $(this).children('g-text').text(),
		florian: $(this).children('g-florian').text()
	});
});
