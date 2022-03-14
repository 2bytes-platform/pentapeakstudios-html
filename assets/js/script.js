$(function () {

    scrollAni();

    var _st = 0;
    $('.btn_open_menu').on('click',function () {
        if($(this).hasClass('open')) {
            $(this).removeClass('open').siblings('.header_menu_wrap').removeClass('open');
            $('body').removeClass('fixed').css('top','');
            $('body,html').scrollTop(_st);
        }else {
            _st = $(window).scrollTop();
            $(this).addClass('open').siblings('.header_menu_wrap').addClass('open');
            $('body').addClass('fixed').css('top', -_st);
        };
    });
    $('#header').on('click','.dim',function () {
        $(this).siblings('.btn_open_menu').removeClass('open').siblings('.header_menu_wrap').removeClass('open');
        $('body').removeClass('fixed').css('top','');
        $('body,html').scrollTop(_st);
    })

    $('.header_menu_wrap').on('click','a',function (e) {
        e.preventDefault();
        var $this= $(this),
            $target = $this.attr('href'),
            _offsetTop = $($target).offset().top - ($('#header').height());
        $('body,html').stop().animate({'scrollTop' : _offsetTop}, 600, function () {});
        if($('body').hasClass('fixed')) {
            $('body').removeClass('fixed').css('top','');
            $(this).removeClass('open').siblings('.header_menu_wrap').removeClass('open');
        }; 
    });

    /* form file */
    $(".file_box input[type=file]").on('click',function(){
        $('.file_box').addClass('on');
        setTimeout(function () {$('.file_box').removeClass('on');}, 1000)
    });
    $(".file_box input[type=file]").on('change',function(){
        var fileName = $("#file").val().split('\\')[$("#file").val().split('\\').length-1];
        $(".upload_file").val(fileName);
      });

    /* 버튼효과 */
    $( ".btn_ani_inner" ).mouseenter(function(e) {
        var parentOffset = $(this).offset();        
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $(this).prev(".btn_ani_circle").css({"left": relX, "top": relY });
        $(this).prev(".btn_ani_circle").removeClass("desplode-circle");
        $(this).prev(".btn_ani_circle").addClass("explode-circle");
     });
     $( ".btn_ani_inner" ).mouseleave(function(e) {
          var parentOffset = $(this).offset(); 
          var relX = e.pageX - parentOffset.left;
          var relY = e.pageY - parentOffset.top;
          $(this).prev(".btn_ani_circle").css({"left": relX, "top": relY });
          $(this).prev(".btn_ani_circle").removeClass("explode-circle");
          $(this).prev(".btn_ani_circle").addClass("desplode-circle");
     });

     /* dropbox */
     $('.form_control .select_box').on('click', '.btn_dropdown', function () {
        var $this = $(this);    
        $this.hasClass('on') ? $this.removeClass('on').siblings('.dropdown_items').removeClass('on').closest('.select_box').removeClass('on') : $this.addClass('on').siblings('.dropdown_items').addClass('on').closest('.select_box').addClass('on');
    });
    $('.form_control .dropdown_items').on('click','button', function () {
        var $this = $(this)
            $parent = $this.parent('li'),
            $wrap = $this.closest('.select_box')
            $items = $wrap.find('.dropdown_items'),
            $dropdownBtn = $wrap.find('.btn_dropdown'),
            _text = $this.text();
        $parent.addClass('selected').siblings().removeClass('selected');
        $wrap.removeClass('on');
        $items.removeClass('on');
        $dropdownBtn.removeClass('on').text(_text);
    });

    $(document).mouseup(function (e) {
        if($('.form_control .select_box.on').length && !$('.form_control .select_box.on').has(e.target).length) {
            $('.form_control .select_box.on').removeClass('on').find('.dropdown_items').removeClass('on').siblings('.btn_dropdown').removeClass('on');
        };
    });

});

var _wst = $(window).scrollTop();
$(window).on('scroll',function () {
    
    var _cst = $(window).scrollTop();
    var _hh = $('#header').outerHeight();

    if(_wst < _cst) {
        $('#header').addClass('invisible');
    }else if(_cst == 0) {
        $('#header').removeClass('invisible');
    } else if(_cst >= $(document).height() - $(window).height() - 10) {
        $('#header').addClass('invisible');
    }else {
        $('#header').removeClass('invisible');
    }
    _wst = _cst;
 
    scrollAni();

});

$(window).on('resize',function () {
    scrollAni();
});


function scrollAni() {
	var secPos = [];
	var secCon = $('.section_antmation');
	var i;
	for(i = 0; i < secCon.length; i++) {
		secPos.push(Math.floor(secCon.eq(i).offset().top) - $('#header').outerHeight())
	};

	var st = Math.floor($(window).scrollTop());
	var len = secPos.length;
	for (j = 0; j < len; j++) {
		if (st + ($(window).height() - 50) > secPos[j]) {
			$('.section_antmation').eq(j).addClass('on')
		};
	};
    
};

