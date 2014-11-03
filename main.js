define(function (require, exports, module) {
  'use strict';

  var LanguageManager = brackets.getModule("language/LanguageManager");
	

  CodeMirror.defineMode("laravelblade", function(config, parserConfig) {
    var bladeOverlay = {
      token: function(stream, state) {
        var ch;
        if (stream.match("@if")) {
          while ((ch = stream.next()) != null)
            if (ch == "}" && stream.next() == "}") break;
          stream.eat("}");
          return "def";
        }        
		  
		
		  if (stream.match("{{")) {
          while ((ch = stream.next()) != null)
            if (ch == "}" && stream.next() == "}") break;
          stream.eat("}");
          return "def";
        }
		  
		  
        while (
			stream.next() != null && !stream.match("@if", false) && 
			!stream.match("{{", false)) {}
        return null;
  
	  
	  }
		
		
    };
    return CodeMirror.overlayMode(CodeMirror.getMode(config, parserConfig.backdrop || "text/html"), bladeOverlay);
  });
	

  LanguageManager.defineLanguage("laravelblade", {
      "name": "Laravel Blade",
      "mode": "laravelblade",
      "fileExtensions": ["blade.php"],
      "blockComment": ["{{--", "--}}"]
  });
});
