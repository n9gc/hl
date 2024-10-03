

//typeof ScpoUF =="undefined" ? console.error('ScpoHL Cannot Work!\nMissing "scpoUsefulFunc.js"!') :
ScpoHL = {
	debugMode: false,
	//You can use this function to high light all the elements.
	allHighLight: function () {
		if (this.debugMode) start = new Date().getTime();
		for (var i in this)
			if (i.slice(0, 4) == "Code")
				this[i].allHighLight();  // High light all languages.
		if (this.debugMode) console.info("ScpoHL - Time spent: " + (new Date().getTime() - start));
	},
	debug: function (n) {
		this.qqqs0 = {a: 0};
		var time = [[], [], 0, 0], j, start, char1, char0, char2, char000, char0000,
		char0={x:NaN,y:NaN},
		char1={x:NaN,y:NaN};
		for (j = 0; j < n; j++) {
			// char = Math.random().toString(36).slice(-1);
			char0.x = Math.floor(Math.random() * 9999999);
			char0.y = Math.floor(Math.random() * 9999999);
			(function() {
				start = new Date().getTime();
				char1 = char0
				char1.x++;
				char1.y++;
				time[0].push(new Date().getTime() - start);
			}());
			(function() {
				start = new Date().getTime();
				char1.x = char0.x
				char1.y = char0.y
				char1.x++;
				char1.y++;
				time[1].push(new Date().getTime() - start);
			}());
		}
		for (j = 0; j < n; j++) {
			time[2] += time[0][j];
			time[3] += time[1][j];
		}
		console.log(time[2], time[3]);
	},
	replaceAll: function(s, l) {
		var i, t = [];
		for (i in l) t.push({n: i, v: l[i]});
		t.sort(function(a, b) {return a.n.length - b.n.length;});
		var f = function(n, a) {
			if (a.length == 1 || n.length == 1) return n.split(a[0].n).join(a[0].v);
			var o = a.slice(-1)[0], i, t = n.split(o.n);
			for (i = 0; i < t.length; i++) t[i] = f(t[i], a.slice(0, -1));
			return t.join(o.v);
		}
		return f(s, t);
	},
	es6: function (n) {
		try {
			eval('() => {}');
			return true;
		} catch (e) {
			return false;
		}
	},
	// spanWrap: function(lang, res, from, to, type) {
	// 	var i, head = '<span class="scpo-code-' + lang + '-'
	// 		+ this.getType(lang, type) + '">'
	// 	from = res.idx.indexOf(from);
	// 	if (res.txt.slice([from - 2], from)== '">')
	// 		if (res.idx[from - 1] == -1) {
	// 			console.log(res.txt.slice(from - 38, from + 39))
	// 			var f = 1
	// 		}
	// 	to = res.idx.indexOf(to) + 1;
	// 	res.txt = res.txt.slice(0, from)
	// 		+ head + res.txt.slice(from, to)
	// 		+ "</span>" + res.txt.slice(to);
	// 	for (i = 0; i < head.length; i++)
	// 		res.idx.splice(from, 0, -1);
	// 	to += head.length
	// 	for (i = 0; i < 7; i++)
	// 		res.idx.splice(to, 0, -1);
	// 	if (f)
	// 	console.log(res.txt.slice(from - 38, from + 39))
	// },
	wrap: function (res, map) {
		var fmt = 0, str = "", gap = 0, head = '<span class="scpo-code-' + res.lang + "-";
		if (typeof map == "undefined") {
			res.fmt.forEach(function (ele, idx) {
				if (ele != fmt) {
					if (fmt) str += head + ScpoHL["Code_" + res.lang].type[fmt] + '">' + res.txt.slice(gap, idx) + "</span>";
					else str += res.txt.slice(gap, idx);
					fmt = ele;
					gap = idx;
				}
			})
			if (fmt)
				str += head + ScpoHL["Code_" + res.lang].type[fmt] + '">'
					+ res.txt.slice(gap) + "</span>";
			else str += res.txt.slice(gap);
		} else {
			var mapstr = "", i;
			for (i in map) mapstr += i;
			res.fmt.forEach(function (ele, idx) {
				if (fmt == -1) {
					fmt = ele;
					gap = idx;
					return;
				}
				if (mapstr.indexOf(res.txt[idx]) != -1) {
					if (fmt) str += head + ScpoHL["Code_" + res.lang].type[fmt] + '">' + res.txt.slice(gap, idx) + "</span>";
					else str += res.txt.slice(gap, idx);
					if (ele) str += head + ScpoHL["Code_" + res.lang].type[ele] + '">' + map[res.txt[idx]] + "</span>";
					else str += map[res.txt[idx]];
					fmt = -1;
					return;
				}
				if (ele != fmt) {
					if (fmt) str += head + ScpoHL["Code_" + res.lang].type[fmt] + '">' + res.txt.slice(gap, idx) + "</span>";
					else str += res.txt.slice(gap, idx);
					fmt = ele;
					gap = idx;
				}
			})
			if (fmt != -1) {
				if (fmt)
					str += head + ScpoHL["Code_" + res.lang].type[fmt] + '">'
						+ res.txt.slice(gap) + "</span>";
				else str += res.txt.slice(gap);
			}
		}
		return str
	},
	getType: function (lang, n) {
		return typeof (n = this[(lang = "Code_" + lang)].type[n]) == "number" ? this[lang].type[n] : n;
	},
	brushType: function (res, f, t, type) {
		for (var i = f; i < t + 1; i++)
			if (res.fmt[i] == 0)
				res.fmt[i] = typeof type == "number" ? type : this["Code_" + res.lang].type[type];
	},
	arrayMax: 0,
	idxArray: [],
	fmtArray: [],
	defineRes: function (res) {
		if (res.txt.length > this.arrayMax) {
			for (var k = this.arrayMax; k < res.txt.length; k++)
				this.fmtArray.push(0);
			this.arrayMax = res.txt.length;
		}
		res.fmt = this.fmtArray.slice(0, res.txt.length);
	},
	js: {
		1: "string",
		2: "keyword",
		3: "symbol",
		4: "note",
		5: "operator",
		6: "escape"
	},
	Code_js: {
		type: {
			1: "string",
			2: "keyword",
			3: "symbol",
			4: "note",
			5: "operator",
			6: "escape",
			'"': 3,
			"'": 3,
			"(": 3,
			")": 3,
			"[": 3,
			"]": 3,
			"{": 3,
			"}": 3,
			".": 3,
			";": 3,
			"<": 5,
			">": 5,
			"/": 5,
			"+": 5,
			"-": 5,
			"&": 5,
		},
		allHighLight: function () {
			var i, j, k, o = document.createElement("pre");
			var idxArray = [], fmtArray = [], arrayMax = 0;
			ScpoHL.getELements("js").forEach(function (ele) {
				o.innerHTML = ele.innerHTML.replace(/< *br[ /]*>/g, "\n");
				var code = o.innerText,	// The code of the element.
				instr = "",					// Wether is inside of the string.
				inescape = 0,				// Wether there is a \ before.
				escapeLen = 3,
				//bracket = [],				// The bracket now.
				ga = {						// Flag that can sign the start of the code unit.
					_len: -1,
					_p: [],
					get p() {
						return this._p.pop();
					},
					set p(n) {
						this._len++;
						this._p.push(n);
						return n;
					},
					get t() {
						return this._p[this._len];
					}
				},
				type = 0,					// The type of code unit.
				//   0: empty unit;
				//   1: string;
				//   2: keyword;
				//   3: symbol;
				//   4: note;
				//   5: operator
				//   6: escape,
				char,
				noteF = 0,					// Wether there was '/' in the last character or the character judged now is in note.
				res = {						// The result of judgement.
					lang: "js",
					txt: code,				// The result text.
					fmt: [],				// The type of character.
				};
				ScpoHL.defineRes(res);
				for (j = 0; j < code.length; j++) (function () {	// judge character one by one.
					var char = code[j];
					if (noteF) {
						switch (noteF) {
							case 1:
								if ("/".indexOf(char) != -1) {
									type = 4;
									ga.p = j - 1;
									noteF = 2;
									return;
								}
								if ("*".indexOf(char) != -1) {
									type = 4;
									ga.p = j - 1;
									noteF = 3;
									return;
								}
								ScpoHL.brushType(res, j - 1, j - 1, 5);
								noteF = 0;
								type = 0;
								return;
							case 2:
								if ("\n".indexOf(char) != -1) {
									type = 0;
									noteF = 0;
									ScpoHL.brushType(res, ga.p, j - 1, 4);
								}
								return;
							case 3:
								if ("*".indexOf(char) != -1) noteF = 4;
								return;
							case 4:
								if ("/".indexOf(char) != -1) {
									type = 0;
									noteF = 0;
									ScpoHL.brushType(res, ga.p, j, 4);
								} else noteF = 3;
								return;
						}
					}
					if (instr.length) {
						if (instr.indexOf(char) != -1) {
							if (inescape) {
								ScpoHL.brushType(res, ga.t, ga.p, 6);
								inescape = 0;
							}
							ScpoHL.brushType(res, j, j, char);
							ScpoHL.brushType(res, ga.p, j - 1, 1);
							instr = ""
							type = 0;
						} else if ("\\".indexOf(char) != -1) {
							inescape = 1;
							ga.p = j;
							type = 6;
						} else if (inescape) {
							if ("0123456789".indexOf(char) != -1) {
								if (inescape == escapeLen) {
									ScpoHL.brushType(res, ga.p, j, 6);
									inescape = 0;
									type = 0;
								} else
									inescape++;
							} else {
								if (inescape == 1) {
									inescape++;
									if ("x".indexOf(char) != -1)
										escapeLen = 3;
									else if ("u".indexOf(char) != -1)
										escapeLen = 5;
								} else {
									ScpoHL.brushType(res, ga.p, j - Boolean(inescape - 1), 6);
									inescape = 0;
									type = 0;
								}
							}
						}
						return;
					}
					if ("\"'".indexOf(char) != -1) {
						instr = char;
						ga.p = j + 1;
						ScpoHL.brushType(res, j, j, char);
						type = 1;
						return;
					}
					if ("/".indexOf(char) != -1) {
						noteF = 1;
						return;
					}
					if ("ABCDEFGHI23232323JKLMNOPQRSTUVWXYZbcdefghijklmnopqrstuvwxyz_".indexOf(char) != -1) {
						char
						return;
					}
					if ("()[]{};<>+-&".indexOf(char) != -1) {
						ScpoHL.brushType(res, j, j, char);
						return;
					}
					//// . : ?
					// 3 .
					// 4 ...
					////
					// 3 :
					// 4 (?):
					////
					// 4 ?
					// 3 ?.
				})();
				ScpoHL.brushType(res, ga.p, j, type);
				var str = ScpoHL.wrap(res, {
					"<": "&lt;",
					">": "&gt;",
					"\n": "<br />",
					" ": "&nbsp;",
					"\t": "&nbsp;&nbsp;&nbsp;&nbsp;",
				})
				ele.innerHTML = str;
			})
		},
		test0: function () {
			var i, j, k;
			ScpoHL.getELements("js").forEach(function (ele) {
				var code = ele.innerText,	// The code of the element.
					instr = "",				// Wether is inside of the string.
					bracket = [],			// The bracket now.
					gap = 0,				// Flag that can sign the start of the code unit.
					type = 0,				// The type of code unit.
					//   0: empty unit;
					//   1: string;
					//   2: keyword;
					//   3: symbol;
					//   4: note;
					result = {				// The result of judgement.
						txt: code,			// The result text.
						idx: (function () {	// The original index of character.
							var r = [];
							for (k = 0; k < code.length; k++) r.push(k);
							return r;
						})()
					},
					char,
					noteF = 0;				// Wether there was '/' in the last character or the character judged now is in note.
				for (j = 0; j < code.length; j++) (function () {	// judge character one by one.
					char = code[j];
					if (noteF) {
						switch (noteF) {
							case 1:
								if (char == '/') {
									type = 4;
									gap = j - 1;
									noteF = 2;
								} else if (char == "*") {
									type = 4;
									gap = j - 1;
									noteF = 3;
								}
								return;
							case 2:
								if (char == '\n') {
									type = 0;
									noteF = 0;
									ScpoHL.spanWrap("js", result, gap, j - 1, 4);
								}
								return;
							case 3:
								if (char == "*") noteF = 4;
								return;
							case 4:
								if (char == "/") {
									type = 0;
									noteF = 0;
									ScpoHL.spanWrap("js", result, gap, j, 4);
								} else noteF = 3;
								return;
						}
					}
					if (instr) {
						if (instr == char) {
							ScpoHL.spanWrap("js", result, j, j, char);
							ScpoHL.spanWrap("js", result, gap, j - 1, 1);
							instr = ""
							type = 0;
						}
						return;
					}
					if (char == '"' || char == "'") {
						type = 1;
						instr = char;
						gap = j + 1;
						ScpoHL.spanWrap("js", result, j, j, 3);
						return;
					}
					if (char == "/") {
						noteF = 1;
						return;
					}
					if (/[A-z]/.exec(char) != null) {
						char
						return;
					}
					if (/[()\[\]{}.;:]/.exec(char) != null) {
						char
						return;
					}
				})();
				//ele.innerHTML = '<span class="scpo-code--bg">' +result.txt + '</span>';
			})
		},
		test1: function () {
			var i, j, k;
			ScpoHL.getELements("js").forEach(function (ele) {
				var code = ele.innerText,	// The code of the element.
					instr = "",				// Wether is inside of the string.
					bracket = [],			// The bracket now.
					gap = 0,				// Flag that can sign the start of the code unit.
					type = 0,				// The type of code unit.
					//   0: empty unit;
					//   1: string;
					//   2: keyword;
					//   3: symbol;
					//   4: note;
					result = {				// The result of judgement.
						txt: code,			// The result text.
						idx: (function () {	// The original index of character.
							var r = [];
							for (k = 0; k < code.length; k++) r.push(k);
							return r;
						})()
					},
					char,
					noteF = 0;				// Wether there was '/' in the last character or the character judged now is in note.
				for (j = 0; j < code.length; j++) (function () {	// judge character one by one.
					char = code[j];
					if (noteF) {
						switch (noteF) {
							case 1:
								if (char == '/') {
									gap = j - 1;
									noteF = 2;
								} else if (char == "*") {
									gap = j - 1;
									noteF = 3;
								}
								return;
							case 2:
								if (char == '\n') {
									noteF = 0;
									ScpoHL.spanWrap("js", result, gap, j - 1, 4);
								}
								return;
							case 3:
								if (char == "*") noteF = 4;
								return;
							case 4:
								if (char == "/") {
									noteF = 0;
									ScpoHL.spanWrap("js", result, gap, j, 4);
								} else noteF = 3;
								return;
						}
					}
					if (instr) {
						if (instr == char) {
							ScpoHL.spanWrap("js", result, j, j, char);
							ScpoHL.spanWrap("js", result, gap, j - 1, 1);
							instr = ""
						}
						return;
					}
					if (char == '"' || char == "'") {
						instr = char;
						gap = j + 1;
						ScpoHL.spanWrap("js", result, j, j, 3);
						return;
					}
					if (char == "/") {
						noteF = 1;
						return;
					}
					if (/[A-z]/.exec(char) != null) {
						char
						return;
					}
					if (/[()\[\]{}.;:]/.exec(char) != null) {
						char
						return;
					}
					switch (char) {
						case "(":
							ScpoHL.spanWrap("js", result, j, j, 3);
							//bracket.push(0);
							return;
						case ")":
							ScpoHL.spanWrap("js", result, j, j, 3);
							//if (bracket.slice(-1)[0] == 0) bracket.pop();
							return;
						case "[":
							ScpoHL.spanWrap("js", result, j, j, 3);
							//bracket.push(1);
							return;
						case "]":
							ScpoHL.spanWrap("js", result, j, j, 3);
							//if (bracket.slice(-1)[0] == 1) bracket.pop();
							return;
						case "{":
							ScpoHL.spanWrap("js", result, j, j, 3);
							//bracket.push(2);
							return;
						case "}":
							ScpoHL.spanWrap("js", result, j, j, 3);
							//if (bracket.slice(-1)[0] == 2) bracket.pop();
							return;
						case ".":
							ScpoHL.spanWrap("js", result, j, j, 3);
							return;
						case ";":
							ScpoHL.spanWrap("js", result, j, j, 3);
							return;
						case ":":
							ScpoHL.spanWrap("js", result, j, j, 3);
							return;
					}
				})();
				//ele.innerHTML = '<span class="scpo-code--bg">' +result.txt + '</span>';
			})
		},
	},
	getELements: function (n) {
		return document.querySelectorAll(".scpo-code-" + n);
	},
	setOnload: (function () { })()
}