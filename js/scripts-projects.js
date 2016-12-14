$(document).ready(function(){
	$('#projects_brief .content').hide();
	$('#projects_section .project').hide();
	
	$('.show_brief').click(function(){
		if($('.show_brief i').hasClass('on'))
		{
			$('.show_brief i').removeClass('on').addClass('off');
			$('#projects_brief .content').slideUp();	
		}
		else
		{
			$('.show_brief i').removeClass('off').addClass('on');
			$('#projects_brief .content').slideDown();	
		}
	});


	$('.show_section i').click(function(){
		var section = $(this).parent().parent().parent();
		var toggled = $(this);
		var displayed;

		// Hiding the brief when a show section is toggled
		if($('.show_brief i').hasClass('on'))
		{
			$('.show_brief i').removeClass('on').addClass('off');
			$('#projects_brief .content').slideUp();	
		}
		
		$('.show_section i').each(function(){
			if($(this).hasClass('on')){
				// $(this).removeClass('on').addClass('off');
				displayed = $(this);
				displayedSection = displayed.parent().parent().parent().children(".project");
			}
		});

		if(displayed)
		{
			displayed.removeClass('on').addClass('off');
			if(displayed.attr('id') != toggled.attr('id'))
			{
				displayedSection.slideUp(500, function(){
					toggled.addClass('on').removeClass('off');	
					section.children('.project').slideDown(1000);
				});
			}
			else
			{
				toggled.removeClass('on').addClass('off');
				section.children('.project').slideUp(300);
			}
		}
		else
		{
			toggled.addClass('on').removeClass('off');	
			section.children('.project').slideDown(500);
		}
	});
});