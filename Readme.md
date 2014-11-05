# wpcom-browser-auth

**Browser authentication logic for the WordPress.com REST API**


This module provides authentication logic for web browsers to authenticate
against the WordPress.com REST API.

You must create a WordPress.com Application, with the "Native" app type.
Then you may pass the `client_id` of your application to the `redirect()`
function.

In your Redirect URL page, you invoke the `response()` function to get
the parsed access token (or error object if the user refused access),
with which you can execute API calls against the REST API.


### Installation

Install `wpcom-browser-auth` using `npm`:

``` bash
$ npm install wpcom-browser-auth
```


### Example

``` html
<html>
  <body>
    <script src="wpcom-browser-auth.js"></script>
    <script>
      var auth = wpcomBrowserAuth.response();
      if (auth) {
        // invoked as part of the Redirect URL
        if (auth.error) {
          // user denied WordPress.com access
        } else {
          // user granted access to WordPress.com
          var wpcom = new WPCOM(auth.access_token);
          var site = wpcom.site(auth.site_id);
        }
      } else {
        // no auth token information, redirect to OAuth page
        wpcomBrowserAuth.redirect(client_id);
      }
    </script>
  </body>
</html>
```

See the [example](./example/index.html) file for a more complete example.
