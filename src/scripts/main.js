$(window).on('load', function () {
    var $preloader = $('.page-preloader'),
        $spinner   = $preloader.find('.preloader-itself');
    $spinner.fadeOut();
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
        $('[data-card-parent]').removeClass('open');
        $('[data-card-children]').closest('.bx-wrapper').removeClass('open');

        $(this).addClass('open');
        var parentNum = $(this).data('card-parent');
        var childrenSlider = $('[data-card-children="' + parentNum + '"]');
        childrenSlider.closest('.bx-wrapper').addClass('open');
    });

})(window.jQuery);

 $('.carousel').carousel({
        interval: false
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
    slideMargin: 20
  });
  $('.v-card-slider').bxSlider({
    slideWidth: 320,
    minSlides: 3,
    maxSlides: 8,
    moveSlides: 1,
    slideMargin: 20
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