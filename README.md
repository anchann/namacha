*Work in progress*

A static snapshot scraper/server for SEO in single page hash-bang applications (like those built with AngularJS).

## To install

1. Clone the repo
1. `npm install`
1. `sudo npm install -g grunt-cli`
1. make sure phantomjs is in your path (e.g. by `sudo npm install -g phantomjs`)
1. `bower install` (to get bower do `sudo npm install -g bower`)
1. `sudo npm install -g typescript`
1. `grunt && node app.js`

## What it does

It keeps a static cache of rendered HTML pages for dynamic routes to allow for searchability of
single page applications. Read some background here: https://developers.google.com/webmasters/ajax-crawling/docs/getting-started

The app runs a web server with two routes. Fire a `POST` request to `/scrape` with `route` in the payload set to
whatever fragment you have appearing after the hashbang. The fire a `GET` request to `basePath?_escaped_fragment_=fragment`
and you'll be served the scraped content.

Concretely, say your `config.json` file (in the top level directory; gitignored; for defaults see `scripts/config.ts`) contains:

```
{
	"baseUrl":   "http://my-awesome-app.com/index.html",
	"basePath":  "/index.html"
}
```

Fire up the app and issue the following HTTP request to scrape

`POST localhost:3000/scrape` with body `route=/item/123`

This will go to `http://my-awesome-app.com/index.html/#!/item/123`, scrape the content, and save it on disk.
Now to see the scraped content that the search engine would see, hit up the following URL

`localhost:3000/index.html?_escaped_fragment_=/item/123`

And you should see your content. Obviously without CSS/JS, since we scraped only the HTML, and are
currently serving stuff from a different domain.

Wire it all up with varnish to make sure things are served from the same domain. Then schedule
whatever content management system you have backing your application to fire POST scrape requests.
Maybe you want to pair these requests with your sitemap generation in some nice way.

Still a work in progress, will clean things up as I go.


TODO:

* allow the user to provide named completenessDetection functions, and submit a name with the scrape
request POST. That way, we know when it's safe to scrape the content (e.g. Ajax calls all came back,
content is stable, etc)

