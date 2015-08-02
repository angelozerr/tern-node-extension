# tern-node-extension

[![Build Status](https://secure.travis-ci.org/angelozerr/tern-node-extension.png)](http://travis-ci.org/angelozerr/tern-node-extension)
[![NPM version](https://img.shields.io/npm/v/tern-node-extension.svg)](https://www.npmjs.org/package/tern-node-extension)

[tern-node-extension](https://github.com/angelozerr/tern-node-extension) is a plugin which adds support validation for node require  to the JavaSript code intelligence system [Tern](http://ternjs.net/).

Here a sample with Eclipse : 

![Node lint](https://github.com/angelozerr/tern.java/wiki/images/EclipseIDE_NodeJSLintOnRequireModule.png)

See [here](https://github.com/angelozerr/tern.java/wiki/Tern-&-Node.js-support) for more information about node lint with Eclipse.

## Installation

tern-node-extension works with the NodeJS [Tern Server][tern-server], and within a browser.

The easiest way to install tern-node-extension is to use a recent version of
[npm][npm]. In the directory where you installed the [tern package][tern-npm],
simply run

```
$ npm install tern-node-extension
```

## Configuration

`node-extension` tern plugin extends `node` tern plugin to support validation.

### With Node.js

In order for Tern to load the tern-node-express plugin once it is installed, you must
include `node-extension` in the `plugins` section of your [Tern configuration
file][tern-config] and `node`.

Here is a minimal example `.tern-project` configuration file:

```json
{
  "plugins": {
    "node": {},
    "lint": {},
    "node-extension": {}
  }
}
```

### With WebBrowser (CodeMirror)

See [demos/express.html](https://github.com/angelozerr/tern-node-extension/blob/master/demos/nodelint.html)

## Structure

The basic structure of the project is given in the following way:

* `node-extension.js` the tern plugin.
* `demos/` demos with node lint tern plugin which use CodeMirror.
