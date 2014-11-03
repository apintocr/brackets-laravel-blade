define(function (require, exports, module) {
	'use strict';

	var LanguageManager = brackets.getModule("language/LanguageManager");


	CodeMirror.defineMode("laravelblade", function (config, parserConfig) {
		var mustacheOverlay = {
			token: function (stream, state) {

				var ch;

				//Highlight Comments {{-- --}}
				if (stream.match("{{--")) {
					while ((ch = stream.next()) != null)
						if (ch == "}" && stream.next() == "}") break;
					stream.eat("}");
					return "comment";
				}

				//Highlight {{ $var }})
				if (stream.match("{{")) {
					while ((ch = stream.next()) != null)
						if (ch == "}" && stream.next() == "}") break;
					stream.eat("}");
					return "def";
				}
				//Highlight {% $var %} (Laravel 5)
				else if (stream.match('{%')) {
					while ((ch = stream.next()) != null)
						if (ch == "%" && stream.next() == "}") break;
					stream.eat("}");
					return "def";
				}

				//Return Null if no condition was met.
				else if (stream.next() != null) {
					return null;
				}
			}
		};
		return CodeMirror.overlayMode(CodeMirror.getMode(config, parserConfig.backdrop || "php"), mustacheOverlay);
	});


	LanguageManager.defineLanguage("laravelblade", {
		"name": "Laravel Blade",
		"mode": "laravelblade",
		"fileExtensions": ["blade.php"],
		"blockComment": ["{{--", "--}}"]
	});
});
