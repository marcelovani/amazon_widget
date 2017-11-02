api = 2
core = 7.x

; Amazon
; Temporarily using dev branch until this issue is committed
; https://www.drupal.org/node/2920070
projects[amazon][type] = module
projects[amazon][download][type] = git
projects[amazon][download][url] = http://git.drupal.org/project/amazon.git
projects[amazon][download][revision] = ec4fddf
projects[amazon][subdir] = contrib
; Patch to add support for locale storage.
projects[amazon][patch][] = "https://www.drupal.org/files/issues/locale_database_storage-2920070-4.patch"

; Amazon wysiwyg
; Temporarily using dev branch until this issue is committed
; https://www.drupal.org/node/2918260
projects[amazon_wysiwyg][type] = module
projects[amazon_wysiwyg][download][type] = git
projects[amazon_wysiwyg][download][url] = http://git.drupal.org/project/amazon_wysiwyg.git
projects[amazon_wysiwyg][download][revision] = eea1b49
projects[amazon_wysiwyg][subdir] = contrib
; Patch to add support for locale storage.
projects[amazon][patch][] = "https://www.drupal.org/files/issues/add_support_for-2918260-10.patch"
