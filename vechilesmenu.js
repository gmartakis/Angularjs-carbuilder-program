$(document).ready(function() {
	
	/*$('#mega-1').dcVerticalMegaMenu({
		rowItems: '3',
		speed: 'fast',
		effect: 'show',
		direction: 'right'
	});
	$('#mega-1 > li:nth-child(1)').hover(function()
	{
		$('#mega-1 > li:nth-child(1) > a > span:nth-child(1)').removeClass('dc-mega-icon');
		$('#mega-1 > li:nth-child(1) > a > span:nth-child(1)').addClass('dc-other-icon');
	},function()
	{
		$('#mega-1 > li:nth-child(1) > a > span:nth-child(1)').addClass('dc-mega-icon');
		$('#mega-1 > li:nth-child(1) > a > span:nth-child(1)').removeClass('dc-other-icon');
	});*/
	$('#accordion-5').dcAccordion({
				eventType: 'click',
				classActive  : 'active',
				autoClose: true,
				saveState: true,
				disableLink: true,
				showCount: false,
				menuClose: true,
				speed: 'fast'
				
	});
	
	
});