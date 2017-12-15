(function ($) {
  'use strict';

  Drupal.behaviors.amazonWidget = {
    attach: function () {

      var parent = this;

      // Using document.ready to give time to the dom to put the markup on the page.
      $(document).ready(function () {
        // If a cookie is available, use it.
        var countryCode = parent.getCookie('amazonWidgetCountry');
        if (countryCode !== null) {
          parent.showLocalizedWidget(countryCode);
          return;
        }

        // Ajax request to detect country code.
        $.ajax({
          url: Drupal.settings.amazon_widget.geoip_url,
          type: 'GET',
          success: function (response) {
            var countryCodeKey = Drupal.settings.amazon_widget.country_code_key;
            var countryCode = response[countryCodeKey];

            // Country code mapping.
            switch (countryCode) {
              case 'GB':
                countryCode = 'uk';
            }

            // Set cookie.
            if (typeof countryCode === 'string') {
              var date = new Date();
              var hours = 4;
              date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
              var expires = '; expires=' + date.toGMTString();
              document.cookie = 'amazonWidgetCountry=' + countryCode + '; ' + expires + '; path=/';
            }

            parent.showLocalizedWidget(countryCode);
          },
          error: function (xhr) {
            parent.showLocalizedWidget();
            if (window.console) {
              console.debug('Failed to detect country code');
              console.debug(xhr);
            }
          },
          dataType: Drupal.settings.amazon_widget.data_type
        });
      });
    },

    /**
     * Shows the localized widgets for a given country code.
     * If there isn't any widget that matches the country code, then the
     * widget for the default Amazon locale will be displayed.
     */
    showLocalizedWidget: function (countryCode) {
      var defaultLocale = Drupal.settings.amazon_widget.default_locale;
      if (countryCode === undefined) {
        return this.showLocalizedWidget(defaultLocale);
      }

      var target = null;
      var target_found = false;
      var classes = Drupal.settings.amazon_widget.classes;
      var not_target = null;

      for (var i = 0, len = classes.length; i < len; i++) {
        target = $(classes[i] + '.locale-' + countryCode.toLowerCase());
        not_target = $(classes[i] + ':not(.locale-' + countryCode.toLowerCase() + ')');

        // Do we have a widget with the country code or the default country code
        if (target !== null && target.length) {
          target_found = true;
        }

        // Don't hide anything until we have a local widget or a default country widget
        if (target_found === true) {
          $(not_target).hide();
        }
      }

      // If the country code is not resolved, display the default widget.
      if (!target_found && countryCode !== defaultLocale) {
        this.showLocalizedWidget(defaultLocale);
      }
    },

    /**
     * Helper to get a cookie by name.
     *
     * @param name
     * @returns {T}
     */
    getCookie: function (name) {
      var value = '; ' + document.cookie;
      var parts = value.split('; ' + name + '=');
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
      return null;
    },

  };

})(jQuery);
