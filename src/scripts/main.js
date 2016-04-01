$(window).on('load', function () {
    var $preloader = $('.page-preloader'),
        $spinner   = $preloader.find('.preloader-itself');
    $spinner.fadeOut('fast', function(){
            new WOW().init();
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

    // var data = {
    //     labels: ["2006", "2009", "2012", "2014", "2015", "2016"],
    //     datasets: [
    //         {
    //             label: "My First dataset",
    //             fillColor: "rgba(73,174,234,1)",
    //             strokeColor: "rgba(124,247,139,1)",
    //             highlightFill: "rgba(73,174,234,1)",
    //             highlightStroke: "rgba(73,174,234,1",
    //             data: [65, 59, 80, 81, 56, 55, 40]
    //         }
    //     ]
    // };

    // var options = {
    //         //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    //         scaleBeginAtZero : true,

    //         //Boolean - Whether grid lines are shown across the chart
    //         scaleShowGridLines : true,

    //         //String - Colour of the grid lines
    //         scaleGridLineColor : "rgba(0,0,0,.05)",

    //         //Number - Width of the grid lines
    //         scaleGridLineWidth : 1,

    //         //Boolean - Whether to show horizontal lines (except X axis)
    //         scaleShowHorizontalLines: true,

    //         //Boolean - Whether to show vertical lines (except Y axis)
    //         scaleShowVerticalLines: true,

    //         //Boolean - If there is a stroke on each bar
    //         barShowStroke : true,

    //         //Number - Pixel width of the bar stroke
    //         barStrokeWidth : 2,

    //         //Number - Spacing between each of the X value sets
    //         barValueSpacing : 5,

    //         //Number - Spacing between data sets within X values
    //         barDatasetSpacing : 1,

    //         //String - A legend template
    //         legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    //     }
    // var ctx = document.getElementById("ec-graph").getContext("2d");
    // var myBarChart = new Chart(ctx).Bar(data, options);




})(window.jQuery);



$(function() {
   $(".timeline-block").mousewheel(function(event, delta) {
      this.scrollLeft -= (delta * 30);
      event.preventDefault();
   });
});

$('.carousel').carousel({
    interval: 3000
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

});


$(document).ready(function(){
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
    minSlides: 3,
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

// textarea
window.autosize && autosize(document.querySelectorAll('textarea.form-control'));

// modal
$('#careerModal').modal();

// $(document).on('click', 'a[class^="cicon"]', function(e){
//     e.preventDefault();
// });

function animationCompete(inputId){

        // $('#'+inputId).('opacity', '0.3');
        $('#'+inputId).attr('data-animated', 'done');
        // $(this).closest('svg').attr('data-animated', 'done');
        console.log(this.targe);
}

function drawMap(){
    var anematedMapLines = '#_x31_0-line-london_1_, #_x39_-line-paris_1_, #_x35_-line-sydney_1_, #_x34_-line-johannensburg_1_, #_x33_-line-moskow_1_, #_x31_-line-buharest_1_, #_x32_-line-ukraine_1_';
    var anematedMapLinesRev = '#_x31_1-line-montreal_1_,#_x38_-line-rio_1_,#_x37_-line-la_1_,#_x36_-line-ny_1_'

    TweenMax.staggerFrom(anematedMapLines, 10, {drawSVG:0});
    TweenMax.staggerFromTo(anematedMapLinesRev, 10, {drawSVG:"100% 100%"}, {drawSVG:'0% 100%', ease: Circ.easeOut , onComplete:animationCompete, onCompleteParams:['map-points']});
}

function drawSagrada(){
    var animSagrada = '#sagrada-path';
    TweenMax.staggerFrom(animSagrada, 15, {drawSVG:0});
}

function drawESGraph(){
    var vLines = '#graph-lines';

    TweenMax.from(vLines, 10, {drawSVG:0, ease:Sine.easeOut});
}

function drawBanks(){
    var shadows = '#_x31__1_, #_x32__1_, #_x33__1_, #_x34__1_, #_x35__1_, #_x36__1_, #_x37__1_';
    var points = '#_x37_, #_x36_, #_x35_, #_x34_, #_x33_, #_x32_, #_x31_';
    var lines = '#_x37_-to-1, #_x32_-to-7, #_x36_-to-7, #_x36_-to-7, #_x33_-to-6, #_x35_-to-6, #_x34_-to-5, #_x33_-to-4, #_x32_-to-3, #_x31_-to-2';

    TweenMax.from('#_x31_',.3, {opacity:0, delay:3});
    TweenMax.from('#_x32_',.3, {opacity:0, delay:3.3});
    TweenMax.from('#_x33_',.3, {opacity:0, delay:3.6});
    TweenMax.from('#_x34_',.3, {opacity:0, delay:3.9});
    TweenMax.from('#_x35_',.3, {opacity:0, delay:4.2});
    TweenMax.from('#_x36_',.3, {opacity:0, delay:4.5});
    TweenMax.from('#_x37_',.3, {opacity:0, delay:4.8});
    TweenMax.from(lines, 3, {drawSVG:0, delay:5.2, onComplete:animationCompete, onCompleteParams:['Dots-gradient']});
    //TweenMax.from(shadows, 1, {opacity:3, delay:10});
}

function drawESGraph(){
    var vLines = '#graph-lines';

    TweenMax.from(vLines, 10, {drawSVG:0, ease:Sine.easeOut});
}

drawMap();
 drawSagrada();
drawESGraph();
drawBanks();


(function ($) {

    var container = document.getElementById('head-block');

    if (!container) return;

    console.log('1');

 })(window.jQuery);

$(document).on('hover', '.fae-c', function(){
    $('.st11').css('color', '#000');
    console.log('asdasd');
});