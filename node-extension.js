(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(require("tern/lib/infer"), require("tern/lib/tern"), require);
  if (typeof define == "function" && define.amd) // AMD
    return define([ "tern/lib/infer", "tern/lib/tern" ], mod);
  mod(tern, tern);
})(function(infer, tern, require) {
  "use strict";
  
  var nodeRequire_lint = function(node, addMessage, getRule) {
    var rule = getRule("UnknownModule");
    if (!rule) return;
    var cx = infer.cx(), server = cx.parent, data = server._node;
    var argNodes = node.arguments;
    if (argNodes && argNodes.length && argNodes[0].type == "Literal" || typeof argNodes[0].value == "string") {
      var currentFile = argNodes[0].sourceFile.name

      var name = argNodes[0].value
      var mod = server.mod.modules.resolveModule(name, currentFile)
      if (!(mod && (mod.getFunctionType() || mod.getType()))) addMessage(argNodes[0], "Unknown module '" + argNodes[0].value + "'", rule.severity);
    }
  };
  
  var nodeRequire_guessType = function(arg, i, file, setType, addValueType) {
    var cx = infer.cx(), server = cx.parent, data = server._node;
    //var currentFile = data.currentFile || data.resolveProjectPath(server, file.name);

    function addModules(modules, addValueType) {
      for (var name in modules) {
        //if (name == currentFile) continue;
        //var moduleName = data.resolveModulePath(name, currentFile);
        //addValueType("requiredModule", '"' + moduleName + '"');
        addValueType("requiredModule", '"' + name + '"');
      }
    }
    if (i == 0) {
      setType("requiredModule");
      addModules(cx.definitions.node, addValueType);
      addModules(data.modules, addValueType);
      return true;
    }
  };
  
  tern.registerPlugin("node-extension", function(server, options) {
    return {
      passes: {postLoadDef: postLoadDef}  
    };
  });
  
  function postLoadDef(json) {
    var cx = infer.cx(), defName = json["!name"];
    if (defName === 'commonjs') {
      var require = cx.definitions.commonjs.require;
      require.lint = nodeRequire_lint;
      require.guessType = nodeRequire_guessType;
    }
  }
  
});
