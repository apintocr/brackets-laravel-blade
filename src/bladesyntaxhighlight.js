define(function (require, exports, module) {
	'use strict';	

	var LanguageManager = brackets.getModule("language/LanguageManager");
	var CodeMirror 		= brackets.getModule("thirdparty/CodeMirror2/lib/codemirror");
    	var highlightClass  = "keyword";

	CodeMirror.defineMode("laravelblade", function (config, parserConfig) {
		
		var laravelOverlay = {
			startState: function() {
				return {
					inComment: false,
                    			inEcho: false,
                    			inEcho5: false,
                			inForm: false
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
						if (!stream.skipTo("--}}")) {
							stream.skipToEnd();
						} else {
							stream.match("--}}");
							state.inComment = false;
						}
						return "comment";
					}
				}
				
				//Laravel5 Echo Syntax (Single Line and Multiline)
				if (state.inEcho5) {
					if (!stream.skipTo("%}")) {
						stream.skipToEnd();
					} else {
						stream.match("%}");
						state.inEcho5 = false;
					}
					return highlightClass;
				} else {
					if (stream.match("{%")) {
						state.inEcho5 = true;
						if (!stream.skipTo("%}")) {
							stream.skipToEnd();
						} else {
							stream.match("%}");
							state.inEcho5 = false;
						}
						return highlightClass;
					}
				}
				
                		//Laravel Echo Syntax (Single Line and Multiline)
				if (state.inEcho) {
					if (!stream.skipTo("}}")) {
						stream.skipToEnd();
					} else {
						stream.match("}}");
						state.inEcho = false;
					}
					return highlightClass;
				} else {
					if (stream.match("{{")) {
						state.inEcho = true;
						if (!stream.skipTo("}}")) {
							stream.skipToEnd();
						} else {
							stream.match("}}");
							state.inEcho = false;
						}
						return highlightClass;
					}
				}
				
				//Laravel5 Form Syntax (Single Line and Multiline)
				if (state.inForm) {
					if (!stream.skipTo("!!}")) {
						stream.skipToEnd();
					} else {
						stream.match("!!}");
						state.inForm = false;
					}
					return highlightClass;
				} else {
					if (stream.match("{!!")) {
						state.inForm = true;
						if (!stream.skipTo("!!}")) {
							stream.skipToEnd();
						} else {
							stream.match("!!}");
							state.inForm = false;
						}
						return highlightClass;
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
