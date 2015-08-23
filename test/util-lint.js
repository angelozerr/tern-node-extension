"use strict";

var fs = require("fs"), path = require("path"), tern = require("tern"), assert = require('assert');
require("tern/plugin/node"),
require("tern-lint");
require("../node-extension.js");

var projectDir = path.resolve(__dirname, "..");
var resolve = function(pth) {
  return path.resolve(projectDir, pth);
};
var browser = JSON.parse(fs
    .readFileSync(resolve("node_modules/tern/defs/browser.json")), "utf8");
var ecma5 = JSON.parse(fs
    .readFileSync(resolve("node_modules/tern/defs/ecma5.json")), "utf8");

var allDefs = {
  browser : browser,
  ecma5 : ecma5
};

var createServer = exports.createServer = function(defNames, options) {
  var defs = [];
  if (defNames) {
    for (var i = 0; i < defNames.length; i++) {
      var def = allDefs[defNames[i]];
      defs.push(def);
    }
  }
  var plugins = {
    "node": {},
    "lint" : options ? options : {},
    "node-extension": {}
  };
  var server = new tern.Server({
    plugins : plugins,
    defs : defs
  });
  return server;
}

var assertLintReponse = exports.assertLintReponse = function(err, resp, expected) {
  if (err)
    throw err;
  var actualMessages = resp.messages;
  var expectedMessages = expected.messages;
  assert.equal(JSON.stringify(resp), JSON.stringify(expected));
}

exports.assertLint = function(text, expected, defNames, options) {
  var server = createServer(defNames, options);
  server.addFile("test1.js", text);
  server.request({
    query : {
      type : "lint",
      file : "test1.js"
    }
  }, function(err, resp) {
    assertLintReponse(err, resp, expected);
  });
}