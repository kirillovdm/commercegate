/**
 * @preserve Copyright 2011 Syd Lawrence ( www.sydlawrence.com ).
 * Version: 0.2
 *
 * Licensed under MIT and GPLv2.
 *
 * Usage: $('body').videoBG(options);
 *
 */

(function ($) {
    "use strict";

    // Define plugin name once to use throughout the script
    var pluginName = 'photoStrip';

    // Define plugin defaults
    var pluginDefaults = {
        orientation: 'horizontal',
        viewportSelector: '[data-photo-strip-element="viewport"]',
        stripSelector: '[data-photo-strip-element="strip"]',
        photoSelector: '[data-photo-strip-element="photo"]',
        prevSelector: '[data-photo-strip-element="prev"]',
        nextSelector: '[data-photo-strip-element="next"]',
        itemSelector: '.strip-item',
        activeClass: 'active',
        hiddenClass: 'hidden'
    };

    // Constructor function
    function Plugin (element, options) {
        this.init(pluginName, element, options);
    }

    var _getItems = function () {
        return this.$strip.find(this.options.itemSelector);
    };

    var _getItemByIndex = function (index) {
        return _getItems.call(this).eq(index);
    };

    var _getActiveIndex = function () {
        var $items  = _getItems.call(this),
            $active = $items.filter('.' + this.options.activeClass);

        return $items.index($active);
    };

    var _updateArrows = function () {
        var index  = _getActiveIndex.call(this),
            length = _getItems.call(this).length;

        this.$prev[(index <= 0 ? 'add' : 'remove') + 'Class'](this.options.hiddenClass);
        this.$next[(index >= length - 1 ? 'add' : 'remove') + 'Class'](this.options.hiddenClass);
    };

    var _updateStrip = function () {
        var dimenstion   = this.options.orientation == 'vertical' ? 'Height' : 'Width',
            property     = this.options.orientation == 'vertical' ? 'top' : 'left',
            viewportSize = this.$viewport['inner' + dimenstion](),
            $active      = _getItems.call(this).filter('.' + this.options.activeClass),
            activeSize   = $active['outer' + dimenstion](true),
            activeMargin = activeSize - $active['outer' + dimenstion](),
            activeStart  = $active.position()[property] + activeMargin,
            activeEnd    = activeStart + activeSize - activeMargin,
            stripStart   = -this.$strip.position()[property],
            stripEnd     = stripStart + viewportSize;

        if (stripStart <= activeStart && stripEnd >= activeEnd) return;
        if (stripStart > activeStart) {
            this.$strip.css(property, activeStart === 0 ? '0' : '-' + activeStart + 'px');
            return;
        }
        if (stripEnd < activeEnd) {
            this.$strip.css(property, '-' + (activeEnd - viewportSize) + 'px');
            return;
        }
    };

    Plugin.prototype = {
        
        constructor: Plugin,

        init: function (name, element, options) {
            // Plugin name is passed for extendability
            this.name     = name;
            this.$element = $(element);
            this.options  = $.extend({}, pluginDefaults, this.$element.data(), options);

            // Init elements
            this.$element.attr('data-toggle', 'photo-strip');
            this.$viewport = this.$element.find(this.options.viewportSelector);
            this.$strip    = this.$element.find(this.options.stripSelector);
            this.$photo    = this.$element.find(this.options.photoSelector);
            this.$prev     = this.$element.find(this.options.prevSelector).attr('data-photo-strip-element', 'prev');
            this.$next     = this.$element.find(this.options.nextSelector).attr('data-photo-strip-element', 'next');

            _updateArrows.call(this);
        },

        show: function (target) {
            var $target = $(target),
                $items  = _getItems.call(this);

            this.$photo.attr('src', $target.attr('href'));

            $items.removeClass(this.options.activeClass);
            $target.addClass(this.options.activeClass);

            _updateStrip.call(this);
            _updateArrows.call(this);
        },

        prev: function () {
            var index = _getActiveIndex.call(this);

            if (index <= 0) return true;
            index = index - 1;

            return this.show(_getItemByIndex.call(this, index));
        },

        next: function () {
            var index  = _getActiveIndex.call(this),
                length = _getItems.call(this).length;

            if (index >= length - 1) return true;
            index = index + 1;

            return this.show(_getItemByIndex.call(this, index));
        }
    };

    // Plugin wrapper for outside use
    $.fn[pluginName] = function (option) {
        return this.each(function () {
            var $this   = $(this),
                data    = $this.data(pluginName),
                options = typeof option == 'object' && option;
            if (!data) $this.data(pluginName, (data = new Plugin(this, options)));
            if (typeof option == 'string') data[option](data);
        });
    };

    // Expose constructor for extendability
    $.fn[pluginName].Constructor = Plugin;

    // Expose default options to make them changeable
    $.fn[pluginName].defaults = pluginDefaults;

    // Event listeners
    $(document).on('click', '[data-toggle="photo-strip"]', function (event) {
        var data = $(this).data(pluginName);
        if (!data) return true;

        var $target = $(event.target),
            $link   = $target.closest(data.options.itemSelector, data.$strip);

        if ($link.length === 0) return true;
        event.preventDefault();

        data.show($link);
    });

    $(document).on('click', '[data-photo-strip-element="prev"]', function (event) {
        var $target = $(this).closest('[data-toggle="photo-strip"]');
        if ($target.length === 0) return true;

        event.preventDefault();
        $target[pluginName]('prev');
    });

    $(document).on('click', '[data-photo-strip-element="next"]', function (event) {
        var $target = $(this).closest('[data-toggle="photo-strip"]');
        if ($target.length === 0) return true;

        event.preventDefault();
        $target[pluginName]('next');
    });

    // Auto-init
    $('[data-toggle="photo-strip"]')[pluginName]();

})(window.jQuery);