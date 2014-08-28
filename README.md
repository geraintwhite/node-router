Node Web Server Router
===

A simple NodeJS path based router for hosting multiple miniservers on one port.

`index.js` is the router and creates the web server. Routes are setup in here to load modules in the `modules` directory depending on the path requested.

The wakeup and twitter modules use `data.json` files to store credentials needed.

An example wakeup `data.json` file would be:

```js
{
    "secret": "secret",
    "addr": "mac address"
}
```

An example twitter `data.json` file would be:

```js
{
    "consumerKey": "key",
    "consumerSecret": "secret",
    "accessToken": "token",
    "accessTokenSecret": "secret",
    "callBackUrl": "http://domain.com"
}
```
