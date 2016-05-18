require.config({
　　　　"paths": {
　　　　　　"zepto": "zepto.min",
　　　　　　"zeptoTouch": "touch.min",
		"handlebars" : "handlebars"
　　　　},
	 shim: {         
		zepto: {
			exports: '$'
		},
		zeptoTouch: {
			deps: ['zepto'],
			exports: '$'
		},
		handlebars: {
			exports: 'Handlebars'
		}
	  }
});

requirejs(['zepto' ,'handlebars', 'zeptoTouch'],
	function ($,Handlebars) {
	    $(function(){
				var header = $('header');
				var reHeight = function(){
					$('body').css('padding-top',header.height());
				};
				//init title & description
				$('#title').text(_data.title);
				$('#description').text(_data.description);
				
				//template
				var template = Handlebars.compile($("#examination-template").html());
				
				Handlebars.registerHelper("isMultipleChoice",function(v){
					switch(v){
						case 0:
							return "［单选题］";
						case 1:
							return "［多选题］";
					}
				});
				
				Handlebars.registerHelper("typeRadio",function(v){
					if(v == 0){
						return 'data-check-type = \'radio\'';
					}
				});
				
				$('#examination').html(template(_data));
				
				//init body paddingTop
				reHeight();
				//close top alert
				$('#closeAlert').on('click' , function(){
					event.preventDefault();
					$(this).parents('.alert').hide();
					reHeight();
				});
				
				//simulation type = radio
				$('.examination').on('click' ,'.question-item' , function(){
					var p = $(this).parents('li');
					$(this).toggleClass('selected');
					if(p.attr('data-check-type') == 'radio'){
						$(this).siblings('.question-item').removeClass('selected');
					}
				});
				
				//check empty
				$('#submit').on('click' , function(){
					$('.examination > li').each(function(){
						if(!$(this).children('.question-item').hasClass('selected')){
							$(this).children('h3').addClass('alert-empty');
							$('#submitAlert').show();
						}else{
							$(this).children('h3').removeClass('alert-empty');
							$('#submitAlert').hide();
						}
					});
					
					if($('.examination > li > h3').hasClass('alert-empty')){
						$('#submitAlert').show();
					}else{
						//do something or show result here
						var total = 0;
						$('.selected').each(function(){
							console.log($(this).attr('data-value'))
							total += parseInt($(this).attr('data-value'));
						})
						alert("您本次考试成绩：" + total +"分");
					}
				});
			});
});