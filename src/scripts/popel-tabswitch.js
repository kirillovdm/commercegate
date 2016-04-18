(function ($) {
    "use strict";

    if (!document.location.hash) return;

    var hash = document.location.hash,
        id   = hash.replace(/^#/, '');

    $('[data-toggle="popel-tabswitch"]').each(function () {
        var $tabs = $(this);

        $tabs.find('> li > [data-toggle="tab"]').each(function () {
            var $tab     = $(this),
                selector = $tab.data('target');

            if (!selector) {
                selector = $tab.attr('href');
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
            }

            var $target = $(selector);

            $tab.parent()[($target.attr('id') === id ? 'add' : 'remove') + 'Class']('active');

            if ($target.attr('id') === id) {
                $target.removeClass('fade');
                $target[0].offsetWidth; // reflow

                $target.addClass('in active');
                $target[0].offsetWidth; // reflow

                $target.addClass('fade');
            } else if ($target.hasClass('active')) {
                $target.removeClass('fade');
                $target[0].offsetWidth; // reflow

                $target.removeClass('in active');
                $target[0].offsetWidth; // reflow

                $target.addClass('fade');
            }
        });
    });
})(window.jQuery);
