$(window).on('load', function () {
    var $preloader = $('.page-preloader'),
        $spinner   = $preloader.find('.preloader-itself');
    $spinner.fadeOut('fast', function(){
            new WOW().init();
            drawCareer();
    });
    $preloader.delay(350).fadeOut('slow');
});

(function ($) {
    "use strict";

    $('.selectize').selectize({
        sortField: 'text'
    });

    $('.selectize-tag').selectize({
        plugins: ['remove_button'],
        delimiter: ',',
        persist: false,
        create: function (input) {
            return {
                value: input,
                text: input
            };
        }
    });

    // $(document).on('slide.bs.carousel','.carousel-top', function(event) {
    //     var $this   = $(this),
    //         itemLength = $this.find('.item').length,
    //         $slides = $this.find('.item'),
    //         $next   = $(event.relatedTarget),
    //         targetID = $next.index(),
    //         $active = $slides.filter('.active'),
    //         $bg = $('.slide-background-wrap .slide-background'),
    //         $left = $this.find('.carousel-control.left'),
    //         $right = $this.find('.carousel-control.right'),

    //         activeIndex = $slides.index($active),
    //         nextIndex   = $slides.index($next),
    //         background = $this.find('.slide-background');

    //     if (targetID === 0) {
    //             $left.addClass('hidden');
    //             $right.removeClass('hidden');
    //         } else if (targetID == itemLength - 1) {
    //             $left.removeClass('hidden');
    //             $right.addClass('hidden');
    //         } else {
    //             $left.removeClass('hidden');
    //             $right.removeClass('hidden');
    //         }

    //     $bg.eq(nextIndex).addClass('active');
    //     $bg.eq(activeIndex).removeClass('active');
    // });


    $("#spy-list a").on('click', function(event) {

       event.preventDefault();
       var hash = this.hash;

       $('html, body').animate({
           scrollTop: $(hash).offset().top-100
         }, 400, $.bez([.67,.27,.45,.89]), function(){
           window.location.hash = hash;
         });

    });



    $(document).on("focus", ".date-input", function(){
        $(this).datepicker('show');
    });

    $('.ccat.content').columnCatalog(window.ccatOpts || {})

    $('body').scrollspy({ target: '#spy-list', offset: '100' });

    $(document).on('click', '[data-card-parent]', function(){

        $(this).toggleClass('open');
        var parentNum = $(this).data('card-parent');
        var childrenSlider = $('[data-card-children="' + parentNum + '"]');
        childrenSlider.closest('.bx-wrapper').toggleClass('open');
    });


    $('body:not(.news-card)').on('click', function(){
        $('.bx-wrapper').removeClass('open');
    });

    $('.bx-wrapper').on('click', function(){
        $(this).addClass('open');
      });

    var isPC;
    if(navigator.userAgent.indexOf('Mac OS X') != -1){
      // for Mac
      isPC = false;
    }
    else {
      // for PC
      isPC = true;
    }

    if (isPC){
        $('.h-scroll-cont').addClass('addmargin');
    }


    var hoverParent, hoverChild, startAttr;
    $('[data-hover-parent]').on('mouseenter', function(){
            hoverParent = $(this).attr('data-hover-parent');
            hoverChild = $('[data-hover-child="'+ hoverParent +'"]');
            startAttr = hoverChild.attr('r');
            hoverChild.attr('r', 35);
    });

    $('[data-hover-parent]').on('mouseleave', function(){
            hoverChild.attr('r', startAttr);
    });


    $('.svg-hover').on('mouseenter', function(){
    });

    $('.svg-hover').on('mouseleave', function(){
    });

    // $('.svg-hover').hover(

    //     function(){
            
    //     },

    //     function(){

    // );

})(window.jQuery);



function pointAttachmentPos(){
    var posEl = $('[data-pos-el]');
    var attachEl = $('[data-attach-pos-el]');
    var posElItem, posElItemData, posElItemPos;

    if(posEl.length == 0 || attachEl.length == 0) return;

    for(var i=0; i < attachEl.length; i++){
        posElItem = $(attachEl[i]);
        posElItemData = $(posElItem[0]).attr('data-attach-pos-el');
        posElItemPos = $('[data-pos-el="'+ posElItemData +'"]').position();
        $(attachEl[i]).position(posElItemPos);
    }
};

function pointAttachmentOffset(){

    var offsetEl = $('[data-offset-el]');
    var attachOffsetEl = $('[data-attach-offset-el]');

    var offsetPoint, offsetPointData, offsetPointPos, correctTop, correctLeft;

    if(offsetEl.length == 0 || attachOffsetEl.length == 0) return;

    for(var i=0; i < attachOffsetEl.length; i++){
        offsetPoint = $(attachOffsetEl[i]);
        offsetPointData = $(offsetPoint[0]).attr('data-attach-offset-el');
        offsetPointPos = $('[data-offset-el="'+ offsetPointData +'"]').offset();
        $(attachOffsetEl[i]).offset(offsetPointPos);

        correctTop = $(offsetPoint[0]).attr('data-correct-top');
        correctLeft = $(offsetPoint[0]).attr('data-correct-left');
        $(attachOffsetEl[i]).css({top:'+='+correctTop+'', left:'+='+correctLeft+''});
    }
};


pointAttachmentOffset();
pointAttachmentPos();


/*
$(function() {
   $(".timeline-block").mousewheel(function(event, delta) {
      this.scrollLeft -= (delta * 30);
      event.preventDefault();
   });
});
*/
$('.carousel').carousel({
    interval: 6000
});


$(document).on("change", ".file-input", function(){

        var $fileLabel = $(".drop-text");
            $filename = $(".file-input").val();
            $fileLabelChildren = $(".drop-text").children();

        $fileLabel.addClass("filed");
        $filename = $filename.replace(/^.*[\\\/]/, '');

        $fileLabel.empty();
        $fileLabel.html($fileLabelChildren);
        $fileLabel.append('' + $filename + ' was uploaded.');

    });



$.fn.popelValidator.setRuleMessage({
        'not-empty ': "This field cannot be left blank"
    });


$.fn.popelValidator.defaults.messageTemplate = '<p class="help-block collapse"><span class="message-text"></span></p>';

$.fn.popelValidator.defaults.messageTextSelector = '.message-text';

$(document).on('controlvalidated.popel.validator', '.form-control', function (event) {
    var state = event.state;

    if (state === $.fn.popelValidator.Constructor.STATE_INVALID) {
        $(this).closest('.form-group').find('.help-block').collapse('show');
    }
});

$(document).on('resetcontrolmessage.popel.validator', '.form-control', function (event) {
    event.preventDefault();

    var $message = $(event.relatedTarget);

    $message.collapse('hide').one('hidden.bs.collapse', function () {
        $message.remove();
    });
});

$(document).off('keyup.popel.validator');


$(function(){
    var pageArray = window.location.pathname.split( '/' );
    var page = pageArray[pageArray.length-1];
    $('.layout-header li a').each(function(){
      var $href = $(this).attr('href');
      if ($href == page) {
        $(this).parent().addClass('active');
      }
    });
});


$(document).on('scroll onload', function(){
    var $header = $('.layout-header');
    if($header.offset().top > $header.height()) {
        $header.addClass('scrolled');
    }
    else {
        $header.removeClass('scrolled');
    }


    if($('.count-num').hasClass('animated')){
        $('.count-num h2').attr('id', 'count-num');
        var options = {
              useEasing : true,
              useGrouping : true,
              separator : '',
              decimal : '.',
              prefix : '',
              suffix : '+'
        };
        var count = new CountUp("count-num", 0, 4000, 0, 5, options);
        count.start();
    }

    if($('.count-num2').hasClass('animated')){
        $('.count-num2 tr:nth-of-type(1) .td-num').attr('id', 'count-num2');
        $('.count-num2 tr:nth-of-type(2) .td-num').attr('id', 'count-num3');
        $('.count-num2 tr:nth-of-type(3) .td-num').attr('id', 'count-num4');
        $('.count-num2 tr:nth-of-type(4) .td-num').attr('id', 'count-num5');
        var options2 = {
              useEasing : true,
              useGrouping : true,
              separator : '',
              decimal : '.',
              prefix : '',
              suffix : '%'
        };
        var count2 = new CountUp("count-num2", 0, 72, 0, 5, options2);
        var count3 = new CountUp("count-num3", 0, 18, 0, 5, options2);
        var count4 = new CountUp("count-num4", 0, 6, 0, 5, options2);
        var count5 = new CountUp("count-num5", 0, 4, 0, 5, options2);
        count2.start();
        count3.start();
        count4.start();
        count5.start();
    }

    if($('.lc-block').hasClass('animated')){
        $('.lc-count').attr('id', 'lc-count-num');
        var options = {
              useEasing : true,
              useGrouping : true,
              separator : ',',
              decimal : '.',
              prefix : '',
              suffix : ''
        };
        var lcCount = new CountUp("lc-count-num", 2.5, 0.7, 1, 6, options);
            lcCount.start();
    }



        checkAnimations();



});


$(document).ready(function(){

    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
    if (!isMobile) {
      $('.fullscreen-slider').bxSlider({
            slideWidth: 430,
            minSlides: 4,
            maxSlides: 5,
            moveSlides: 2,
            slideMargin: 10
          });

          $('.popular-products-slider').bxSlider({
            slideWidth: 300,
            minSlides: 3,
            maxSlides: 3,
            moveSlides: 3,
            slideMargin: 20
          });

          $('.carousel-small-3').bxSlider({
            slideWidth: 220,
            minSlides: 3,
            maxSlides: 3,
            moveSlides: 3,
            slideMargin: 20
          });

          $('.career-slider').bxSlider({
            slideWidth: 290,
            minSlides: 3,
            maxSlides: 8,
            moveSlides: 2,
            slideMargin: 20,
            infiniteLoop: false,
            hideControlOnEnd: true
          });
          $('.v-card-slider').bxSlider({
            slideWidth: 320,
            minSlides: 2,
            maxSlides: 8,
            moveSlides: 1,
            slideMargin: 20,
            infiniteLoop: false,
            hideControlOnEnd: true
          });
          $('.team-slider').bxSlider({
            slideWidth: 600,
            minSlides: 2,
            maxSlides: 10,
            moveSlides: 1,
            slideMargin: 20
          });
    }

    else{

        $('.wow').removeClass('wow' );

        $('.fullscreen-slider').bxSlider({
            slideWidth: 300,
            minSlides: 1,
            maxSlides: 5,
            moveSlides: 1,
            slideMargin: 10
          });

          $('.popular-products-slider').bxSlider({
            slideWidth: 300,
            minSlides: 1,
            maxSlides: 3,
            moveSlides: 1,
            slideMargin: 20
          });

          $('.carousel-small-3').bxSlider({
            slideWidth: 300,
            minSlides: 1,
            maxSlides: 3,
            moveSlides: 1,
            slideMargin: 20
          });

          $('.career-slider').bxSlider({
            slideWidth: 300,
            minSlides: 1,
            maxSlides: 8,
            moveSlides: 1,
            slideMargin: 20,
            infiniteLoop: false,
            hideControlOnEnd: true
          });
          $('.v-card-slider').bxSlider({
            slideWidth: 300,
            minSlides: 1,
            maxSlides: 8,
            moveSlides: 1,
            slideMargin: 20,
            infiniteLoop: false,
            hideControlOnEnd: true
          });
          $('.team-slider').bxSlider({
            slideWidth: 300,
            minSlides: 1,
            maxSlides: 10,
            moveSlides: 1,
            slideMargin: 20
          });
    }

});


$(document).on('click','.head-arrow-down, .learn-about-link', function(e){
    e.preventDefault();
    $('body').animate({scrollTop:$('.layout-content').offset().top-40});
});

/*jQuery BEZ Plugin for cubic-bezier easing*/
jQuery.extend({ bez: function(encodedFuncName, coOrdArray) {
    if (jQuery.isArray(encodedFuncName)) {
        coOrdArray = encodedFuncName;
        encodedFuncName = 'bez_' + coOrdArray.join('_').replace(/\./g, 'p');
    }
    if (typeof jQuery.easing[encodedFuncName] !== "function") {
        var polyBez = function(p1, p2) {
            var A = [null, null], B = [null, null], C = [null, null],
            bezCoOrd = function(t, ax) {
                C[ax] = 3 * p1[ax], B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax], A[ax] = 1 - C[ax] - B[ax];
                return t * (C[ax] + t * (B[ax] + t * A[ax]));
            },
            xDeriv = function(t) {
                return C[0] + t * (2 * B[0] + 3 * A[0] * t);
            },
            xForT = function(t) {
                var x = t, i = 0, z;
                while (++i < 14) {
                    z = bezCoOrd(x, 0) - t;
                    if (Math.abs(z) < 1e-3) break;
                    x -= z / xDeriv(x);
                }
                return x;
            };
            return function(t) {
                return bezCoOrd(xForT(t), 1);
            }
        };
        jQuery.easing[encodedFuncName] = function(x, t, b, c, d) {
            return c * polyBez([coOrdArray[0], coOrdArray[1]], [coOrdArray[2], coOrdArray[3]])(t/d) + b;
        }
    }
    return encodedFuncName;
}});
/*jQuery BEZ Plugin for cubic-bezier easing END*/

$(document).on('click', '.affix li a', function(){
    $('.affix a.active').removeClass('active');
    $(this).addClass('active');
});


// var scrollCounter;
var $hInner = $('.h-scroll-inner');
var $hOuter = $('.h-scroll-cont');
var $arrowPrev = $('.white-arrow.prev');
var $arrowNext = $('.white-arrow.next');
var $tarrowPrev = $('.timeline-arrow.prev');
var $tarrowNext = $('.timeline-arrow.next');
var $animObject = $('.evolution-text');
var lt, rt;

$(document).on('click', '.white-arrow.next', function(){

    var leftPos = $hOuter.scrollLeft();
    rt = $hOuter.width() - leftPos;

    if(rt < 260){
        $arrowNext.addClass('hidden');
    }
    else if(leftPos > -1){
        $arrowPrev.removeClass('hidden');
    }

    $hOuter.animate({scrollLeft:leftPos+150}, 200);

});

$(document).on('click', '.white-arrow.prev', function(){
    var leftPos = $hOuter.scrollLeft();
    lt = $hOuter.width() - leftPos;
    if(leftPos < 150){
        $arrowPrev.addClass('hidden');
    }
    else if(lt > 120){
        $arrowNext.removeClass('hidden');
    }

    $hOuter.animate({scrollLeft:leftPos-150}, 200);


});

$(document).on('click', '.timeline-arrow.next', function(){
    var leftPos = $hOuter.scrollLeft();
    rt = $hOuter.width() - leftPos;

    if(rt < -3414){
        $tarrowNext.addClass('hidden');
    }
    else if(leftPos > -1){
        $tarrowPrev.removeClass('hidden');
    }

    $hOuter.animate({scrollLeft:leftPos+850}, 200);

});

$(document).on('click', '.timeline-arrow.prev', function(){
    var leftPos = $hOuter.scrollLeft();
    lt = $hOuter.width() - leftPos;

    if(leftPos < 1700){
        $tarrowPrev.addClass('hidden');
    }
    else if(lt > -6134){
        $tarrowNext.removeClass('hidden');
    }

    $hOuter.animate({scrollLeft:leftPos-850}, 200);


});

// textarea
window.autosize && autosize(document.querySelectorAll('textarea.form-control'));

// modal
$('#careerModal').modal();

// $(document).on('click', 'a[class^="cicon"]', function(e){
//     e.preventDefault();
// });



function animationCompete(inputId){

        // // $('#'+inputId).('opacity', '0.3');
        // $('#'+inputId).attr('data-animated', 'done');
        // // $(this).closest('svg').attr('data-animated', 'done');
        // console.log(this.targe);

        animComplete = true;
}


function drawMap(){
    var anematedMapLines = '#_x31_0-line-london_1_, #_x39_-line-paris_1_, #_x35_-line-sydney_1_, #_x34_-line-johannensburg_1_, #_x33_-line-moskow_1_, #_x31_-line-buharest_1_, #_x32_-line-ukraine_1_';
    var anematedMapLinesRev = '#_x31_1-line-montreal_1_,#_x38_-line-rio_1_,#_x37_-line-la_1_,#_x36_-line-ny_1_'
    var mPoints = '#map-points'
    var tlMap = new TimelineMax();
    TweenMax.staggerFrom(anematedMapLines, 6, {drawSVG:0, delay:1}, 0.2);
    tlMap.staggerFromTo(anematedMapLinesRev, 6, {drawSVG:"100% 100%"}, {drawSVG:'0% 100%', delay:1, ease: Circ.easeOut}, 0.2).to(mPoints, 1, {opacity:0.3});;
}

function drawSagrada(){
    var animSagrada = '#sagrada-svg line, #sagrada-svg path';
    TweenMax.staggerFrom(animSagrada, .2, {drawSVG:0, delay:1}, .001);
}


function drawBanks(){
    var shadows = '#_x31__1_, #_x32__1_, #_x33__1_, #_x34__1_, #_x35__1_, #_x36__1_, #_x37__1_';
    var points = '#_x37_, #_x36_, #_x35_, #_x34_, #_x33_, #_x32_, #_x31_';
    var lines = '#_x37_-to-1, #_x32_-to-7, #_x36_-to-7, #_x36_-to-7, #_x33_-to-6, #_x35_-to-6, #_x34_-to-5, #_x33_-to-4, #_x32_-to-3, #_x31_-to-2';
    var tlBank = new TimelineMax();
    tlBank.staggerFrom('.dots-fill',.3, {opacity:0, delay:1}, .3)
            .from(lines, 3, {drawSVG:0, ease:Power2.easeOut})
            .from(shadows, 1, {opacity:0});
}

function drawPulse(){
    var dot = '#pulse-dot2 path';

    if($(dot).length<1) return;

    var path = MorphSVGPlugin.pathDataToBezier('#pulse-back', {align:dot});
    TweenMax.set(dot, {xPercent:-50, yPercent:-50});
    TweenMax.to(dot, 3, {bezier:{curviness:1, values:path, type:'cubic'}, ease:Linear.easeNone, repeat:-1});

}
drawPulse();

function drawUsers(){
    var users = ".s-users";
    var usertl = new TimelineMax();

    usertl.staggerFrom(users, 1, {opacity:0, delay:1}, .25).to('#b-user', .75, {morphSVG:'#b-user-end'}).from('#done-icon', .75, {opacity:0});

}

function drawCareer(){
    var arrow = '#arrow'
    var text = "#type path";
    var circle = ".careers-photo-block .circle"
    var careertl = new TimelineMax();
    careertl.staggerFromTo(text, .1, {drawSVG:"100% 100%"}, {drawSVG:'0% 100%', delay:1.5}, .1).from(circle, .5, {opacity:0}).fromTo(arrow, .75, {drawSVG:"100% 100%"}, {drawSVG:'0% 100%', ease:Power2.easeIn});
    // careertl.from(text, 1.5, {opacity:0}).from(arrow, 1.5, {opacity:0});
}

var aboutKey = true;
var sagradaKey = true;
var bankKey = true;
var usersKey = true;
var careerKey = true;


function checkAnimations(){
    var animElement, elemIsAnimated, animatedSVG;

        animElement = $('[data-start-anim]');
        elemIsAnimated = animElement.hasClass('animated');
        animatedSVG = $('.animated[data-start-anim]');

        animData = animatedSVG.attr('data-start-anim');

            switch (animData) {

                case 'about_map':
                    if(aboutKey){
                        drawMap();
                    }
                        aboutKey = false;
                        break

                case 'sagrada':
                    if(sagradaKey){
                        drawSagrada();
                    }
                        sagradaKey = false;
                    break

                case 'ext_map':
                    if(bankKey){
                        drawBanks();
                    }
                    bankKey = false;
                    break

                case 'pulse':
                    drawPulse();
                    break

                case 'users':
                    if(usersKey){
                        drawUsers();
                    }
                    usersKey = false;
                    break

                case 'you-can':
                    if(careerKey){
                        drawCareer();
                    }
                    careerKey = false;
                    break
            }

}
checkAnimations();


$(document).on('mouseenter', '.circle-wrapper', function(){
    var hoverCircle = $(this).attr('data-circle');
    var countString = $(this).find('.c-content').text();
    var countNum = parseInt(countString);
    var countEl = "count-circle-" +hoverCircle+ "";

    var options = {
              useEasing : true,
              useGrouping : true,
              separator : '',
              decimal : '.',
              prefix : '+',
              suffix : '%'
        };
        
    var countCircl = new CountUp(countEl, 0, countNum, 0, 2, options);
        
    countCircl.start();
});


(function ($) {

    var container = document.getElementById('head-block');

    if (!container) return;

 })(window.jQuery);

$(document).on('hover', '.fae-c', function(){
    $('.st11').css('color', '#000');
});


// function over(){
//     TweenMax.to('#ellipse3', 1, {top:'-5'});
// }

// function out(){
//     TweenMax.to('#ellipse3', 1, {top:'5px'});
// }

// $("#ellipse3").hover(over, out);

$(document).on('click tap', '.menu-icon', function(){
    $('.layout-header, .menu-icon, .content-wrapper').toggleClass('active');
});

$('.collapse').collapse();

$(document).ready(function() {
    $('.collapse-title').addClass('collapsed');
    $('.collapse').removeClass('in');
});

$('#creersTab').tab('show');

$(document).on('click tap', '.collapse-title', function(){
    $(this).children().toggleClass('up');
});
var bubbleInterval;
var topCount = 0;
$(document).on('mouseenter', '.bubbles', function(){
    
    // $('.bubbles').css({top:'-=100px'});

    
       bubbleInterval = setInterval(function(){
            if(topCount <= 255){
                $('.bubbles').css({top:'-=1'});
                topCount += 1;

            }
            else{
                clearInterval(bubbleInterval);
            }
       }, 30);
});

$(document).on('mouseleave', '.dialog-block', function(){
    clearInterval(bubbleInterval);
});