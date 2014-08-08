# Simpleyyt

My blog based on Jekyll-Bootstrap.

## About Jekyll-Bootstrap

For all usage and documentation please see: <http://jekyllbootstrap.com>

## About theme

This theme is the copy of [elementaryOS](http://elementaryos.org) portal page. Some features are imperfect, but I will make it more perfect.

## Usage

You can edit the `_config.yml` file to change the setting of site. If you want to change avatar or favicon, just replace the files in `assets\themes\Snail\img`.

## About excerpt

There are 2 ways of excerpt: "teaser" and "truncate_words" (Configurated in _config.yml).

 * "teaser": look for the More tag (<!--more-->) and create a teaser from the content that precedes the More tag.
You must place "<!--more-->" at paragraph in post. The whole content will be displayed in homepage if no More tag found in post.

 * "truncate_words": generate an excerpt automatically by selecting the first 20 words of the post. It doesn't work well in some of no-English post.

## Change Log

 * Add pagination.
 * Add new way of excerpt.
 * Download google fonts to the local.
 * Add google custom search engine.

## License

[MIT](http://opensource.org/licenses/MIT)
