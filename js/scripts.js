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
				var t1 = $(displayedSection).offset().top, t2 = $(section).offset().top;
				var scrollTo = ((t1 < t2) ? t1 : t2) - 20;
				$('html, body').animate({ scrollTop: scrollTo}, 200, "swing");
				displayedSection.slideUp(200, function(){
					toggled.addClass('on').removeClass('off');	
					section.children('.project').slideDown();
				});
			}
			else
			{
				toggled.removeClass('on').addClass('off');
				section.children('.project').slideUp();
			}
		}
		else
		{
			toggled.addClass('on').removeClass('off');	
			section.children('.project').slideDown();
		}
	});

	$('.circlelink').click(function(e){
		e.preventDefault();
		$('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500);
	});

	$('.toplink').click(function(e){
		e.preventDefault();

		if(!$(this).hasClass('animated'))
		{
			// $($(this).attr('href')).fadeIn();
			$('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500);
		}
	});

	/*
	$('.landing_anchor').click(function(e){
		e.preventDefault();
		$('html, body').animate({ scrollTop: $("#landing").offset().top }, 100);
	});
	*/

	var form = $('#contactFrom');
	form.submit(function(e) {
		e.preventDefault();

		if(!$('#submit').hasClass("sent"))
		{
			$.ajax({
				url: 'https://formspree.io/mail@harrando.me',
				method: 'POST',
				data: $(this).serialize(),
				dataType: 'json',
				beforeSend: function() {
					$('.form-control').prop('disabled', true);
					form.find('#submit').attr('value', 'Sending ..').removeClass('resend').addClass('sending');
				},
				success: function(data) {
					form.find('#submit').attr('value', 'Thank you !').removeClass('sending').addClass('sent');
				},
				error: function(err) {
					$('.form-control').prop('disabled', false);
					form.find('#submit').attr('value', 'Resend').removeClass('sending').addClass('resend');
				}
			});
		}
	});

});