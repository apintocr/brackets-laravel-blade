
define(function (require, exports, module) {
	'use strict';	

	var LanguageManager = brackets.getModule("language/LanguageManager");
	var CodeMirror 		= brackets.getModule("thirdparty/CodeMirror2/lib/codemirror");
    var className       = "keyword";


	CodeMirror.defineMode("laravelblade", function (config, parserConfig) {
		
		var laravelOverlay = {
			startState: function() {
				return {
					inComment: false
				}  
			},
			token: function(stream, state) {
				var ch;
				
				// Laravel Comment Syntax (Single Line and Multiline)
				if (state.inComment) {
					if (!stream.skipTo("--}}")) {
						stream.skipToEnd();
					} else {
						stream.match("--}}");
						state.inComment = false;
					}
					return "comment";
				} else {
					if (stream.match("{{--")) {
						state.inComment = true;
						if (!stream.skipTo(("--}}"))) {
							stream.skipToEnd();
						} else {
							stream.match("--}}");
							state.inComment = false;
						}
						return "comment";
					}
				}
				
				//Laravel5 Echo Syntax (Single Line and Multiline)
				if (stream.match("{%")) {
					while ((ch = stream.next()) != null)
						if (ch == "%" && stream.next() == "}") {
							stream.eat("}");
							return className;
						}
				}
				
				//Laravel5 Form Syntax (Single Line and Multiline)
				if (stream.match("{!!")) {
					while ((ch = stream.next()) != null)
						if (ch == "!" && stream.next() == "!" && stream.next() == "}") {
							stream.eat("}");
							return className;
						}
				}
				
				
				//Laravel Echo Syntax (Single Line and Multiline)
				if (stream.match("{{")) {
					while ((ch = stream.next()) != null)
						if (ch == "}" && stream.next() == "}") {
							stream.eat("}");
							return className;
						}
                }
				
				//listen for opening tags
				while (stream.next() != null && 
					   !stream.match("{{--", false) && 
					   !stream.match("{%", false) && 
					   !stream.match("{!!", false) && 
					   !stream.match("{{", false)
					  ) {}
				return null;
					   
			}
		  };
		  return CodeMirror.overlayMode(CodeMirror.getMode(config, parserConfig.backdrop || "php"), laravelOverlay);
	});


	LanguageManager.defineLanguage("laravelblade", {
		"name": "Laravel Blade",
		"mode": "laravelblade",
		"fileExtensions": ["blade.php"],
		"blockComment": ["{{--", "--}}"]
	});
});
