var util = require("./util-lint");

exports['test required module validation'] = function() {

  // bad type
  util.assertLint("require(10)", {
    messages : [{"message":"Invalid argument at 1: cannot convert from number to string",
      "from":8,
      "to":10,
      "severity":"error",
      "file":"test1.js"}
    ]
  });
  
  // Unknown module 'XXX'
  util.assertLint("require('XXX')", {
    messages : [{"message":"Unknown module 'XXX'",
                 "from":8,
                 "to":13,
                 "severity":"error",
                 "file":"test1.js"}
               ]
  });
  
  // known module
  util.assertLint("require('fs')", {
          messages : []
  });
    
}

if (module == require.main) require("test").run(exports);