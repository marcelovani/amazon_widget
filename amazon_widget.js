(function ($) {

  Drupal.behaviors.amazonWidget = {
    attach: function () {

      //var target = $view.get(0);

      $.ajax({
        url: Drupal.settings.amazon_widget.geoip_url,
        type: 'GET',
        success: function(response) {
          var country_code_key = Drupal.settings.amazon_widget.country_code_key;
          var country_code = response[country_code_key];
          console.debug(country_code);
        },
        error: function(xhr) {
          if (window.console) {
            console.debug('Failed to detect country code');
            console.debug(xhr);
          }
        },
        dataType: Drupal.settings.amazon_widget.data_type
      });

    }
  };

})(jQuery);
