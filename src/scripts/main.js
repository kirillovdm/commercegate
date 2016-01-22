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

    $(document).on('slide.bs.carousel','.carousel-top', function(event) {
        var $this   = $(this),
            itemLength = $this.find('.item').length,
            $slides = $this.find('.item'),
            $next   = $(event.relatedTarget),
            targetID = $next.index(),
            $active = $slides.filter('.active'),
            $bg = $('.slide-background-wrap .slide-background'),
            $left = $this.find('.carousel-control.left'),
            $right = $this.find('.carousel-control.right'),

            activeIndex = $slides.index($active),
            nextIndex   = $slides.index($next),
            background = $this.find('.slide-background');

        if (targetID === 0) {
                $left.addClass('hidden');
                $right.removeClass('hidden');
            } else if (targetID == itemLength - 1) {
                $left.removeClass('hidden');
                $right.addClass('hidden');
            } else {
                $left.removeClass('hidden');
                $right.removeClass('hidden');
            }

        $bg.eq(nextIndex).addClass('active');
        $bg.eq(activeIndex).removeClass('active');
    });

    $('.carousel').carousel({
        interval: false
    });

    $(document).on("focus", ".date-input", function(){
        $(this).datepicker('show');
    });



})(window.jQuery);


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