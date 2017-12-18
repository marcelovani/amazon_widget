# Amazon Widget
A client side Amazon widget.
This widget will hide the amazon fields and show the relevant items for the
country code detected.
It requires Amazon Wysiwyg module, which is responsible for adding the
country code used to identify which widgets to show/hide.

## How it works
It uses a geoip server to identify the country code of the request.
Then it looks for a CSS selector containing the country code i.e. .amazon-item.locale-uk
It will hide all Amazon items that are not relevant to the detected country code.

## Configuration
Visit /admin/config/services/amazon/widget
