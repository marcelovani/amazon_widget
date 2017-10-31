<?php

/**
 * @file
 * Amazon Widget Admin pages.
 */

/**
 * Basic settings form.
 */
function amazon_widget_settings_form($form, &$form_state) {
  $form['amazon_widget'] = array(
    '#type' => 'fieldset',
    '#title' => 'Geoip settings',
  );
  $form['amazon_widget']['amazon_widget_geoip_url'] = array(
    '#type' => 'textfield',
    '#title' => t('The url for the geoip tool'),
    '#description' => t('You can use any provider that returns the country code.'),
    '#default_value' => _amazon_widget_variable_get('amazon_widget_geoip_url'),
    '#required' => TRUE,
  );
  $form['amazon_widget']['amazon_widget_geoip_data_type'] = array(
    '#type' => 'select',
    '#title' => t('Geoip response format'),
    '#description' => t('The format of the response.'),
    '#options' => array('json' => 'Json', 'csv' => 'CSV', 'xml' => 'XML'),
    '#default_value' => _amazon_widget_variable_get('amazon_widget_geoip_data_type'),
    '#required' => TRUE,
  );
  $form['amazon_widget']['amazon_widget_geoip_country_code_key'] = array(
    '#type' => 'textfield',
    '#title' => t('Geoip country code key'),
    '#description' => t('The key found in the response that maps to the country code.'),
    '#default_value' => _amazon_widget_variable_get('amazon_widget_geoip_country_code_key'),
    '#required' => TRUE,
  );

  $url = _amazon_widget_variable_get('amazon_widget_geoip_url');
  $request = drupal_http_request(trim($url, '/') . '/');

  if ($request->code != 404 && !empty($request->data)) {
    $form['amazon_widget']['example'] = array(
      '#type' => 'textarea',
      '#title' => t('Response example'),
      '#value' => $request->data,
      '#disabled' => TRUE
    );
    $key = _amazon_widget_variable_get('amazon_widget_geoip_country_code_key');
    $form['amazon_widget']['country'] = array(
      '#type' => 'textfield',
      '#title' => t('Detected country code'),
      '#value' => json_decode($request->data)->$key,
      '#size' => 3,
      '#disabled' => TRUE
    );
  }

  return system_settings_form($form);
}
