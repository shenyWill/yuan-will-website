/* eslint-disable */
/* PrismJS 1.15.0
https://prismjs.com/download.html#themes=prism-coy&languages=markup+css+clike+javascript+markup-templating+http+json+less+php+sass+scss&plugins=line-numbers+toolbar+highlight-keywords+remove-initial-line-feed+previewers+show-language */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
  Prism = function () {
    var e = /\blang(?:uage)?-([\w-]+)\b/i,
      t = 0,
      n = _self.Prism = {
        manual: _self.Prism && _self.Prism.manual,
        disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
        util: {
          encode: function (e) {
            return e instanceof r ? new r(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
          },
          type: function (e) {
            return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
          },
          objId: function (e) {
            return e.__id || Object.defineProperty(e, "__id", {
                value: ++t
              }),
              e.__id
          },
          clone: function (e, t) {
            var r = n.util.type(e);
            switch (t = t || {},
              r) {
              case "Object":
                if (t[n.util.objId(e)])
                  return t[n.util.objId(e)];
                var a = {};
                t[n.util.objId(e)] = a;
                for (var l in e)
                  e.hasOwnProperty(l) && (a[l] = n.util.clone(e[l], t));
                return a;
              case "Array":
                if (t[n.util.objId(e)])
                  return t[n.util.objId(e)];
                var a = [];
                return t[n.util.objId(e)] = a,
                  e.forEach(function (e, r) {
                    a[r] = n.util.clone(e, t)
                  }),
                  a
            }
            return e
          }
        },
        languages: {
          extend: function (e, t) {
            var r = n.util.clone(n.languages[e]);
            for (var a in t)
              r[a] = t[a];
            return r
          },
          insertBefore: function (e, t, r, a) {
            a = a || n.languages;
            var l = a[e];
            if (2 == arguments.length) {
              r = arguments[1];
              for (var i in r)
                r.hasOwnProperty(i) && (l[i] = r[i]);
              return l
            }
            var o = {};
            for (var s in l)
              if (l.hasOwnProperty(s)) {
                if (s == t)
                  for (var i in r)
                    r.hasOwnProperty(i) && (o[i] = r[i]);
                o[s] = l[s]
              }
            return n.languages.DFS(n.languages, function (t, n) {
                n === a[e] && t != e && (this[t] = o)
              }),
              a[e] = o
          },
          DFS: function (e, t, r, a) {
            a = a || {};
            for (var l in e)
              e.hasOwnProperty(l) && (t.call(e, l, e[l], r || l),
                "Object" !== n.util.type(e[l]) || a[n.util.objId(e[l])] ? "Array" !== n.util.type(e[l]) || a[n.util.objId(e[l])] || (a[n.util.objId(e[l])] = !0,
                  n.languages.DFS(e[l], t, l, a)) : (a[n.util.objId(e[l])] = !0,
                  n.languages.DFS(e[l], t, null, a)))
          }
        },
        plugins: {},
        highlightAll: function (e, t) {
          n.highlightAllUnder(document, e, t)
        },
        highlightAllUnder: function (e, t, r) {
          var a = {
            callback: r,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          n.hooks.run("before-highlightall", a);
          for (var l, i = a.elements || e.querySelectorAll(a.selector), o = 0; l = i[o++];)
            n.highlightElement(l, t === !0, a.callback)
        },
        highlightElement: function (t, r, a) {
          for (var l, i, o = t; o && !e.test(o.className);)
            o = o.parentNode;
          o && (l = (o.className.match(e) || [, ""])[1].toLowerCase(),
              i = n.languages[l]),
            t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l,
            t.parentNode && (o = t.parentNode,
              /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l));
          var s = t.textContent,
            u = {
              element: t,
              language: l,
              grammar: i,
              code: s
            };
          if (n.hooks.run("before-sanity-check", u),
            !u.code || !u.grammar)
            return u.code && (n.hooks.run("before-highlight", u),
                u.element.textContent = u.code,
                n.hooks.run("after-highlight", u)),
              n.hooks.run("complete", u),
              void 0;
          if (n.hooks.run("before-highlight", u),
            r && _self.Worker) {
            var g = new Worker(n.filename);
            g.onmessage = function (e) {
                u.highlightedCode = e.data,
                  n.hooks.run("before-insert", u),
                  u.element.innerHTML = u.highlightedCode,
                  a && a.call(u.element),
                  n.hooks.run("after-highlight", u),
                  n.hooks.run("complete", u)
              },
              g.postMessage(JSON.stringify({
                language: u.language,
                code: u.code,
                immediateClose: !0
              }))
          } else
            u.highlightedCode = n.highlight(u.code, u.grammar, u.language),
            n.hooks.run("before-insert", u),
            u.element.innerHTML = u.highlightedCode,
            a && a.call(t),
            n.hooks.run("after-highlight", u),
            n.hooks.run("complete", u)
        },
        highlight: function (e, t, a) {
          var l = {
            code: e,
            grammar: t,
            language: a
          };
          return n.hooks.run("before-tokenize", l),
            l.tokens = n.tokenize(l.code, l.grammar),
            n.hooks.run("after-tokenize", l),
            r.stringify(n.util.encode(l.tokens), l.language)
        },
        matchGrammar: function (e, t, r, a, l, i, o) {
          var s = n.Token;
          for (var u in r)
            if (r.hasOwnProperty(u) && r[u]) {
              if (u == o)
                return;
              var g = r[u];
              g = "Array" === n.util.type(g) ? g : [g];
              for (var c = 0; c < g.length; ++c) {
                var h = g[c],
                  f = h.inside,
                  d = !!h.lookbehind,
                  m = !!h.greedy,
                  p = 0,
                  y = h.alias;
                if (m && !h.pattern.global) {
                  var v = h.pattern.toString().match(/[imuy]*$/)[0];
                  h.pattern = RegExp(h.pattern.source, v + "g")
                }
                h = h.pattern || h;
                for (var b = a, k = l; b < t.length; k += t[b].length,
                  ++b) {
                  var w = t[b];
                  if (t.length > e.length)
                    return;
                  if (!(w instanceof s)) {
                    if (m && b != t.length - 1) {
                      h.lastIndex = k;
                      var _ = h.exec(e);
                      if (!_)
                        break;
                      for (var j = _.index + (d ? _[1].length : 0), P = _.index + _[0].length, A = b, x = k, O = t.length; O > A && (P > x || !t[A].type && !t[A - 1].greedy); ++A)
                        x += t[A].length,
                        j >= x && (++b,
                          k = x);
                      if (t[b] instanceof s)
                        continue;
                      I = A - b,
                        w = e.slice(k, x),
                        _.index -= k
                    } else {
                      h.lastIndex = 0;
                      var _ = h.exec(w),
                        I = 1
                    }
                    if (_) {
                      d && (p = _[1] ? _[1].length : 0);
                      var j = _.index + p,
                        _ = _[0].slice(p),
                        P = j + _.length,
                        N = w.slice(0, j),
                        S = w.slice(P),
                        C = [b, I];
                      N && (++b,
                        k += N.length,
                        C.push(N));
                      var E = new s(u, f ? n.tokenize(_, f) : _, y, _, m);
                      if (C.push(E),
                        S && C.push(S),
                        Array.prototype.splice.apply(t, C),
                        1 != I && n.matchGrammar(e, t, r, b, k, !0, u),
                        i)
                        break
                    } else if (i)
                      break
                  }
                }
              }
            }
        },
        tokenize: function (e, t) {
          var r = [e],
            a = t.rest;
          if (a) {
            for (var l in a)
              t[l] = a[l];
            delete t.rest
          }
          return n.matchGrammar(e, r, t, 0, 0, !1),
            r
        },
        hooks: {
          all: {},
          add: function (e, t) {
            var r = n.hooks.all;
            r[e] = r[e] || [],
              r[e].push(t)
          },
          run: function (e, t) {
            var r = n.hooks.all[e];
            if (r && r.length)
              for (var a, l = 0; a = r[l++];)
                a(t)
          }
        }
      },
      r = n.Token = function (e, t, n, r, a) {
        this.type = e,
          this.content = t,
          this.alias = n,
          this.length = 0 | (r || "").length,
          this.greedy = !!a
      };
    if (r.stringify = function (e, t, a) {
        if ("string" == typeof e)
          return e;
        if ("Array" === n.util.type(e))
          return e.map(function (n) {
            return r.stringify(n, t, e)
          }).join("");
        var l = {
          type: e.type,
          content: r.stringify(e.content, t, a),
          tag: "span",
          classes: ["token", e.type],
          attributes: {},
          language: t,
          parent: a
        };
        if (e.alias) {
          var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
          Array.prototype.push.apply(l.classes, i)
        }
        n.hooks.run("wrap", l);
        var o = Object.keys(l.attributes).map(function (e) {
          return e + '="' + (l.attributes[e] || "").replace(/"/g, "&quot;") + '"'
        }).join(" ");
        return "<" + l.tag + ' class="' + l.classes.join(" ") + '"' + (o ? " " + o : "") + ">" + l.content + "</" + l.tag + ">"
      },
      !_self.document)
      return _self.addEventListener ? (n.disableWorkerMessageHandler || _self.addEventListener("message", function (e) {
          var t = JSON.parse(e.data),
            r = t.language,
            a = t.code,
            l = t.immediateClose;
          _self.postMessage(n.highlight(a, n.languages[r], r)),
            l && _self.close()
        }, !1),
        _self.Prism) : _self.Prism;
    var a = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
    return a && (n.filename = a.src,
        n.manual || a.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(n.highlightAll) : window.setTimeout(n.highlightAll, 16) : document.addEventListener("DOMContentLoaded", n.highlightAll))),
      _self.Prism
  }();
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: /<!DOCTYPE[\s\S]+?>/i,
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
      pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
      greedy: !0,
      inside: {
        tag: {
          pattern: /^<\/?[^\s>\/]+/i,
          inside: {
            punctuation: /^<\/?/,
            namespace: /^[^\s>\/:]+:/
          }
        },
        "attr-value": {
          pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
          inside: {
            punctuation: [/^=/, {
              pattern: /(^|[^\\])["']/,
              lookbehind: !0
            }]
          }
        },
        punctuation: /\/?>/,
        "attr-name": {
          pattern: /[^\s>\/]+/,
          inside: {
            namespace: /^[^\s>\/:]+:/
          }
        }
      }
    },
    entity: /&#?[\da-z]{1,8};/i
  },
  Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity,
  Prism.hooks.add("wrap", function (a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
  }),
  Prism.languages.xml = Prism.languages.markup,
  Prism.languages.html = Prism.languages.markup,
  Prism.languages.mathml = Prism.languages.markup,
  Prism.languages.svg = Prism.languages.markup;
Prism.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
      inside: {
        rule: /@[\w-]+/
      }
    },
    url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
    selector: /[^{}\s][^{};]*?(?=\s*\{)/,
    string: {
      pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0
    },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /\B!important\b/i,
    "function": /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:]/
  },
  Prism.languages.css.atrule.inside.rest = Prism.languages.css,
  Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
      style: {
        pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
        lookbehind: !0,
        inside: Prism.languages.css,
        alias: "language-css",
        greedy: !0
      }
    }),
    Prism.languages.insertBefore("inside", "attr-value", {
      "style-attr": {
        pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
        inside: {
          "attr-name": {
            pattern: /^\s*style/i,
            inside: Prism.languages.markup.tag.inside
          },
          punctuation: /^\s*=\s*['"]|['"]\s*$/,
          "attr-value": {
            pattern: /.+/i,
            inside: Prism.languages.css
          }
        },
        alias: "language-css"
      }
    }, Prism.languages.markup.tag));
Prism.languages.clike = {
  comment: [{
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: !0
  }, {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: !0,
    greedy: !0
  }],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0
  },
  "class-name": {
    pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
    lookbehind: !0,
    inside: {
      punctuation: /[.\\]/
    }
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  "boolean": /\b(?:true|false)\b/,
  "function": /[a-z0-9_]+(?=\()/i,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
    number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    "function": /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
    operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
  }),
  Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
      lookbehind: !0,
      greedy: !0
    },
    "function-variable": {
      pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
      alias: "function"
    },
    constant: /\b[A-Z][A-Z\d_]*\b/
  }),
  Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
      pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
      greedy: !0,
      inside: {
        interpolation: {
          pattern: /\${[^}]+}/,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\${|}$/,
              alias: "punctuation"
            },
            rest: null
          }
        },
        string: /[\s\S]+/
      }
    }
  }),
  Prism.languages.javascript["template-string"].inside.interpolation.inside.rest = Prism.languages.javascript,
  Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
      pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
      lookbehind: !0,
      inside: Prism.languages.javascript,
      alias: "language-javascript",
      greedy: !0
    }
  }),
  Prism.languages.js = Prism.languages.javascript;
Prism.languages["markup-templating"] = {},
  Object.defineProperties(Prism.languages["markup-templating"], {
    buildPlaceholders: {
      value: function (e, t, n, a) {
        e.language === t && (e.tokenStack = [],
          e.code = e.code.replace(n, function (n) {
            if ("function" == typeof a && !a(n))
              return n;
            for (var r = e.tokenStack.length; - 1 !== e.code.indexOf("___" + t.toUpperCase() + r + "___");)
              ++r;
            return e.tokenStack[r] = n,
              "___" + t.toUpperCase() + r + "___"
          }),
          e.grammar = Prism.languages.markup)
      }
    },
    tokenizePlaceholders: {
      value: function (e, t) {
        if (e.language === t && e.tokenStack) {
          e.grammar = Prism.languages[t];
          var n = 0,
            a = Object.keys(e.tokenStack),
            r = function (o) {
              if (!(n >= a.length))
                for (var i = 0; i < o.length; i++) {
                  var g = o[i];
                  if ("string" == typeof g || g.content && "string" == typeof g.content) {
                    var c = a[n],
                      s = e.tokenStack[c],
                      l = "string" == typeof g ? g : g.content,
                      p = l.indexOf("___" + t.toUpperCase() + c + "___");
                    if (p > -1) {
                      ++n;
                      var f, u = l.substring(0, p),
                        _ = new Prism.Token(t, Prism.tokenize(s, e.grammar, t), "language-" + t, s),
                        k = l.substring(p + ("___" + t.toUpperCase() + c + "___").length);
                      if (u || k ? (f = [u, _, k].filter(function (e) {
                            return !!e
                          }),
                          r(f)) : f = _,
                        "string" == typeof g ? Array.prototype.splice.apply(o, [i, 1].concat(f)) : g.content = f,
                        n >= a.length)
                        break
                    }
                  } else
                    g.content && "string" != typeof g.content && r(g.content)
                }
            };
          r(e.tokens)
        }
      }
    }
  });
Prism.languages.http = {
  "request-line": {
    pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,
    inside: {
      property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
      "attr-name": /:\w+/
    }
  },
  "response-status": {
    pattern: /^HTTP\/1.[01] \d+.*/m,
    inside: {
      property: {
        pattern: /(^HTTP\/1.[01] )\d+.*/i,
        lookbehind: !0
      }
    }
  },
  "header-name": {
    pattern: /^[\w-]+:(?=.)/m,
    alias: "keyword"
  }
};
var httpLanguages = {
  "application/json": Prism.languages.javascript,
  "application/xml": Prism.languages.markup,
  "text/xml": Prism.languages.markup,
  "text/html": Prism.languages.markup
};
for (var contentType in httpLanguages)
  if (httpLanguages[contentType]) {
    var options = {};
    options[contentType] = {
        pattern: new RegExp("(content-type:\\s*" + contentType + "[\\w\\W]*?)(?:\\r?\\n|\\r){2}[\\w\\W]*", "i"),
        lookbehind: !0,
        inside: {
          rest: httpLanguages[contentType]
        }
      },
      Prism.languages.insertBefore("http", "header-name", options)
  };
Prism.languages.json = {
    property: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/i,
    string: {
      pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
      greedy: !0
    },
    number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    punctuation: /[{}[\]);,]/,
    operator: /:/g,
    "boolean": /\b(?:true|false)\b/i,
    "null": /\bnull\b/i
  },
  Prism.languages.jsonp = Prism.languages.json;
Prism.languages.less = Prism.languages.extend("css", {
    comment: [/\/\*[\s\S]*?\*\//, {
      pattern: /(^|[^\\])\/\/.*/,
      lookbehind: !0
    }],
    atrule: {
      pattern: /@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i,
      inside: {
        punctuation: /[:()]/
      }
    },
    selector: {
      pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,
      inside: {
        variable: /@+[\w-]+/
      }
    },
    property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
    punctuation: /[{}();:,]/,
    operator: /[+\-*\/]/
  }),
  Prism.languages.insertBefore("less", "punctuation", {
    "function": Prism.languages.less.function
  }),
  Prism.languages.insertBefore("less", "property", {
    variable: [{
      pattern: /@[\w-]+\s*:/,
      inside: {
        punctuation: /:/
      }
    }, /@@?[\w-]+/],
    "mixin-usage": {
      pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
      lookbehind: !0,
      alias: "function"
    }
  });
! function (e) {
  e.languages.php = e.languages.extend("clike", {
      keyword: /\b(?:and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
      constant: /\b[A-Z0-9_]{2,}\b/,
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: !0
      }
    }),
    e.languages.insertBefore("php", "string", {
      "shell-comment": {
        pattern: /(^|[^\\])#.*/,
        lookbehind: !0,
        alias: "comment"
      }
    }),
    e.languages.insertBefore("php", "keyword", {
      delimiter: {
        pattern: /\?>|<\?(?:php|=)?/i,
        alias: "important"
      },
      variable: /\$+(?:\w+\b|(?={))/i,
      "package": {
        pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
        lookbehind: !0,
        inside: {
          punctuation: /\\/
        }
      }
    }),
    e.languages.insertBefore("php", "operator", {
      property: {
        pattern: /(->)[\w]+/,
        lookbehind: !0
      }
    }),
    e.languages.insertBefore("php", "string", {
      "nowdoc-string": {
        pattern: /<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/,
        greedy: !0,
        alias: "string",
        inside: {
          delimiter: {
            pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
            alias: "symbol",
            inside: {
              punctuation: /^<<<'?|[';]$/
            }
          }
        }
      },
      "heredoc-string": {
        pattern: /<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,
        greedy: !0,
        alias: "string",
        inside: {
          delimiter: {
            pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
            alias: "symbol",
            inside: {
              punctuation: /^<<<"?|[";]$/
            }
          },
          interpolation: null
        }
      },
      "single-quoted-string": {
        pattern: /'(?:\\[\s\S]|[^\\'])*'/,
        greedy: !0,
        alias: "string"
      },
      "double-quoted-string": {
        pattern: /"(?:\\[\s\S]|[^\\"])*"/,
        greedy: !0,
        alias: "string",
        inside: {
          interpolation: null
        }
      }
    }),
    delete e.languages.php.string;
  var n = {
    pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/,
    lookbehind: !0,
    inside: {
      rest: e.languages.php
    }
  };
  e.languages.php["heredoc-string"].inside.interpolation = n,
    e.languages.php["double-quoted-string"].inside.interpolation = n,
    e.hooks.add("before-tokenize", function (n) {
      if (/(?:<\?php|<\?)/gi.test(n.code)) {
        var i = /(?:<\?php|<\?)[\s\S]*?(?:\?>|$)/gi;
        e.languages["markup-templating"].buildPlaceholders(n, "php", i)
      }
    }),
    e.hooks.add("after-tokenize", function (n) {
      e.languages["markup-templating"].tokenizePlaceholders(n, "php")
    })
}(Prism);
! function (e) {
  e.languages.sass = e.languages.extend("css", {
      comment: {
        pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
        lookbehind: !0
      }
    }),
    e.languages.insertBefore("sass", "atrule", {
      "atrule-line": {
        pattern: /^(?:[ \t]*)[@+=].+/m,
        inside: {
          atrule: /(?:@[\w-]+|[+=])/m
        }
      }
    }),
    delete e.languages.sass.atrule;
  var a = /\$[-\w]+|#\{\$[-\w]+\}/,
    t = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/, {
      pattern: /(\s+)-(?=\s)/,
      lookbehind: !0
    }];
  e.languages.insertBefore("sass", "property", {
      "variable-line": {
        pattern: /^[ \t]*\$.+/m,
        inside: {
          punctuation: /:/,
          variable: a,
          operator: t
        }
      },
      "property-line": {
        pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
        inside: {
          property: [/[^:\s]+(?=\s*:)/, {
            pattern: /(:)[^:\s]+/,
            lookbehind: !0
          }],
          punctuation: /:/,
          variable: a,
          operator: t,
          important: e.languages.sass.important
        }
      }
    }),
    delete e.languages.sass.property,
    delete e.languages.sass.important,
    delete e.languages.sass.selector,
    e.languages.insertBefore("sass", "punctuation", {
      selector: {
        pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
        lookbehind: !0
      }
    })
}(Prism);
Prism.languages.scss = Prism.languages.extend("css", {
    comment: {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
      lookbehind: !0
    },
    atrule: {
      pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
      inside: {
        rule: /@[\w-]+/
      }
    },
    url: /(?:[-a-z]+-)*url(?=\()/i,
    selector: {
      pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|&|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
      inside: {
        parent: {
          pattern: /&/,
          alias: "important"
        },
        placeholder: /%[-\w]+/,
        variable: /\$[-\w]+|#\{\$[-\w]+\}/
      }
    }
  }),
  Prism.languages.insertBefore("scss", "atrule", {
    keyword: [/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i, {
      pattern: /( +)(?:from|through)(?= )/,
      lookbehind: !0
    }]
  }),
  Prism.languages.scss.property = {
    pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/i,
    inside: {
      variable: /\$[-\w]+|#\{\$[-\w]+\}/
    }
  },
  Prism.languages.insertBefore("scss", "important", {
    variable: /\$[-\w]+|#\{\$[-\w]+\}/
  }),
  Prism.languages.insertBefore("scss", "function", {
    placeholder: {
      pattern: /%[-\w]+/,
      alias: "selector"
    },
    statement: {
      pattern: /\B!(?:default|optional)\b/i,
      alias: "keyword"
    },
    "boolean": /\b(?:true|false)\b/,
    "null": /\bnull\b/,
    operator: {
      pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
      lookbehind: !0
    }
  }),
  Prism.languages.scss.atrule.inside.rest = Prism.languages.scss;
! function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    var e = "line-numbers",
      t = /\n(?!$)/g,
      n = function (e) {
        var n = r(e),
          s = n["white-space"];
        if ("pre-wrap" === s || "pre-line" === s) {
          var l = e.querySelector("code"),
            i = e.querySelector(".line-numbers-rows"),
            a = e.querySelector(".line-numbers-sizer"),
            o = l.textContent.split(t);
          a || (a = document.createElement("span"),
              a.className = "line-numbers-sizer",
              l.appendChild(a)),
            a.style.display = "block",
            o.forEach(function (e, t) {
              a.textContent = e || "\n";
              var n = a.getBoundingClientRect().height;
              i.children[t].style.height = n + "px"
            }),
            a.textContent = "",
            a.style.display = "none"
        }
      },
      r = function (e) {
        return e ? window.getComputedStyle ? getComputedStyle(e) : e.currentStyle || null : null
      };
    window.addEventListener("resize", function () {
        Array.prototype.forEach.call(document.querySelectorAll("pre." + e), n)
      }),
      Prism.hooks.add("complete", function (e) {
        if (e.code) {
          var r = e.element.parentNode,
            s = /\s*\bline-numbers\b\s*/;
          if (r && /pre/i.test(r.nodeName) && (s.test(r.className) || s.test(e.element.className)) && !e.element.querySelector(".line-numbers-rows")) {
            s.test(e.element.className) && (e.element.className = e.element.className.replace(s, " ")),
              s.test(r.className) || (r.className += " line-numbers");
            var l, i = e.code.match(t),
              a = i ? i.length + 1 : 1,
              o = new Array(a + 1);
            o = o.join("<span></span>"),
              l = document.createElement("span"),
              l.setAttribute("aria-hidden", "true"),
              l.className = "line-numbers-rows",
              l.innerHTML = o,
              r.hasAttribute("data-start") && (r.style.counterReset = "linenumber " + (parseInt(r.getAttribute("data-start"), 10) - 1)),
              e.element.appendChild(l),
              n(r),
              Prism.hooks.run("line-numbers", e)
          }
        }
      }),
      Prism.hooks.add("line-numbers", function (e) {
        e.plugins = e.plugins || {},
          e.plugins.lineNumbers = !0
      }),
      Prism.plugins.lineNumbers = {
        getLine: function (t, n) {
          if ("PRE" === t.tagName && t.classList.contains(e)) {
            var r = t.querySelector(".line-numbers-rows"),
              s = parseInt(t.getAttribute("data-start"), 10) || 1,
              l = s + (r.children.length - 1);
            s > n && (n = s),
              n > l && (n = l);
            var i = n - s;
            return r.children[i]
          }
        }
      }
  }
}();
! function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    var t = [],
      e = {},
      n = function () {};
    Prism.plugins.toolbar = {};
    var a = Prism.plugins.toolbar.registerButton = function (n, a) {
        var o;
        o = "function" == typeof a ? a : function (t) {
            var e;
            return "function" == typeof a.onClick ? (e = document.createElement("button"),
                e.type = "button",
                e.addEventListener("click", function () {
                  a.onClick.call(this, t)
                })) : "string" == typeof a.url ? (e = document.createElement("a"),
                e.href = a.url) : e = document.createElement("span"),
              e.textContent = a.text,
              e
          },
          t.push(e[n] = o)
      },
      o = Prism.plugins.toolbar.hook = function (a) {
        var o = a.element.parentNode;
        if (o && /pre/i.test(o.nodeName) && !o.parentNode.classList.contains("code-toolbar")) {
          var r = document.createElement("div");
          r.classList.add("code-toolbar"),
            o.parentNode.insertBefore(r, o),
            r.appendChild(o);
          var i = document.createElement("div");
          i.classList.add("toolbar"),
            document.body.hasAttribute("data-toolbar-order") && (t = document.body.getAttribute("data-toolbar-order").split(",").map(function (t) {
              return e[t] || n
            })),
            t.forEach(function (t) {
              var e = t(a);
              if (e) {
                var n = document.createElement("div");
                n.classList.add("toolbar-item"),
                  n.appendChild(e),
                  i.appendChild(n)
              }
            }),
            r.appendChild(i)
        }
      };
    a("label", function (t) {
        var e = t.element.parentNode;
        if (e && /pre/i.test(e.nodeName) && e.hasAttribute("data-label")) {
          var n, a, o = e.getAttribute("data-label");
          try {
            a = document.querySelector("template#" + o)
          } catch (r) {}
          return a ? n = a.content : (e.hasAttribute("data-url") ? (n = document.createElement("a"),
                n.href = e.getAttribute("data-url")) : n = document.createElement("span"),
              n.textContent = o),
            n
        }
      }),
      Prism.hooks.add("complete", o)
  }
}();
! function () {
  "undefined" != typeof self && !self.Prism || "undefined" != typeof global && !global.Prism || Prism.hooks.add("wrap", function (e) {
    "keyword" === e.type && e.classes.push("keyword-" + e.content)
  })
}();
! function () {
  "undefined" != typeof self && self.Prism && self.document && Prism.hooks.add("before-sanity-check", function (e) {
    if (e.code) {
      var s = e.element.parentNode,
        n = /\s*\bkeep-initial-line-feed\b\s*/;
      !s || "pre" !== s.nodeName.toLowerCase() || n.test(s.className) || n.test(e.element.className) || (e.code = e.code.replace(/^(?:\r?\n|\r)/, ""))
    }
  })
}();
! function () {
  if (("undefined" == typeof self || self.Prism) && self.document && Function.prototype.bind) {
    var e = {
        gradient: {
          create: function () {
            var e = {},
              s = function (e, s, i) {
                var t = "180deg";
                return /^(?:-?\d*\.?\d+(?:deg|rad)|to\b|top|right|bottom|left)/.test(i[0]) && (t = i.shift(),
                    t.indexOf("to ") < 0 && (t.indexOf("top") >= 0 ? t = t.indexOf("left") >= 0 ? "to bottom right" : t.indexOf("right") >= 0 ? "to bottom left" : "to bottom" : t.indexOf("bottom") >= 0 ? t = t.indexOf("left") >= 0 ? "to top right" : t.indexOf("right") >= 0 ? "to top left" : "to top" : t.indexOf("left") >= 0 ? t = "to right" : t.indexOf("right") >= 0 ? t = "to left" : e && (t.indexOf("deg") >= 0 ? t = 90 - parseFloat(t) + "deg" : t.indexOf("rad") >= 0 && (t = Math.PI / 2 - parseFloat(t) + "rad")))),
                  s + "(" + t + "," + i.join(",") + ")"
              },
              i = function (e, s, i) {
                if (i[0].indexOf("at") < 0) {
                  var t = "center",
                    a = "ellipse",
                    r = "farthest-corner";
                  if (/\bcenter|top|right|bottom|left\b|^\d+/.test(i[0]) && (t = i.shift().replace(/\s*-?\d+(?:rad|deg)\s*/, "")),
                    /\bcircle|ellipse|closest|farthest|contain|cover\b/.test(i[0])) {
                    var n = i.shift().split(/\s+/);
                    !n[0] || "circle" !== n[0] && "ellipse" !== n[0] || (a = n.shift()),
                      n[0] && (r = n.shift()),
                      "cover" === r ? r = "farthest-corner" : "contain" === r && (r = "clothest-side")
                  }
                  return s + "(" + a + " " + r + " at " + t + "," + i.join(",") + ")"
                }
                return s + "(" + i.join(",") + ")"
              },
              t = function (t) {
                if (e[t])
                  return e[t];
                var a = t.match(/^(\b|\B-[a-z]{1,10}-)((?:repeating-)?(?:linear|radial)-gradient)/),
                  r = a && a[1],
                  n = a && a[2],
                  l = t.replace(/^(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\(|\)$/g, "").split(/\s*,\s*/);
                return e[t] = n.indexOf("linear") >= 0 ? s(r, n, l) : n.indexOf("radial") >= 0 ? i(r, n, l) : n + "(" + l.join(",") + ")"
              };
            return function () {
              new Prism.plugins.Previewer("gradient", function (e) {
                return this.firstChild.style.backgroundImage = "",
                  this.firstChild.style.backgroundImage = t(e),
                  !!this.firstChild.style.backgroundImage
              }, "*", function () {
                this._elt.innerHTML = "<div></div>"
              })
            }
          }(),
          tokens: {
            gradient: {
              pattern: /(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\((?:(?:rgb|hsl)a?\(.+?\)|[^\)])+\)/gi,
              inside: {
                "function": /[\w-]+(?=\()/,
                punctuation: /[(),]/
              }
            }
          },
          languages: {
            css: !0,
            less: !0,
            sass: [{
              lang: "sass",
              before: "punctuation",
              inside: "inside",
              root: Prism.languages.sass && Prism.languages.sass["variable-line"]
            }, {
              lang: "sass",
              before: "punctuation",
              inside: "inside",
              root: Prism.languages.sass && Prism.languages.sass["property-line"]
            }],
            scss: !0,
            stylus: [{
              lang: "stylus",
              before: "func",
              inside: "rest",
              root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
            }, {
              lang: "stylus",
              before: "func",
              inside: "rest",
              root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
            }]
          }
        },
        angle: {
          create: function () {
            new Prism.plugins.Previewer("angle", function (e) {
              var s, i, t = parseFloat(e),
                a = e.match(/[a-z]+$/i);
              if (!t || !a)
                return !1;
              switch (a = a[0]) {
                case "deg":
                  s = 360;
                  break;
                case "grad":
                  s = 400;
                  break;
                case "rad":
                  s = 2 * Math.PI;
                  break;
                case "turn":
                  s = 1
              }
              return i = 100 * t / s,
                i %= 100,
                this[(0 > t ? "set" : "remove") + "Attribute"]("data-negative", ""),
                this.querySelector("circle").style.strokeDasharray = Math.abs(i) + ",500",
                !0
            }, "*", function () {
              this._elt.innerHTML = '<svg viewBox="0 0 64 64"><circle r="16" cy="32" cx="32"></circle></svg>'
            })
          },
          tokens: {
            angle: /(?:\b|\B-|(?=\B\.))\d*\.?\d+(?:deg|g?rad|turn)\b/i
          },
          languages: {
            css: !0,
            less: !0,
            markup: {
              lang: "markup",
              before: "punctuation",
              inside: "inside",
              root: Prism.languages.markup && Prism.languages.markup.tag.inside["attr-value"]
            },
            sass: [{
              lang: "sass",
              inside: "inside",
              root: Prism.languages.sass && Prism.languages.sass["property-line"]
            }, {
              lang: "sass",
              before: "operator",
              inside: "inside",
              root: Prism.languages.sass && Prism.languages.sass["variable-line"]
            }],
            scss: !0,
            stylus: [{
              lang: "stylus",
              before: "func",
              inside: "rest",
              root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
            }, {
              lang: "stylus",
              before: "func",
              inside: "rest",
              root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
            }]
          }
        },
        color: {
          create: function () {
            new Prism.plugins.Previewer("color", function (e) {
              return this.style.backgroundColor = "",
                this.style.backgroundColor = e,
                !!this.style.backgroundColor
            })
          },
          tokens: {
            color: {
              pattern: /\B#(?:[0-9a-f]{3}){1,2}\b|\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B|\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
              inside: {
                "function": /[\w-]+(?=\()/,
                punctuation: /[(),]/
              }
            }
          },
          languages: {
            css: !0,
            less: !0,
            markup: {
              lang: "markup",
              before: "punctuation",
              inside: "inside",
              root: Prism.languages.markup && Prism.languages.markup.tag.inside["attr-value"]
            },
            sass: [{
              lang: "sass",
              before: "punctuation",
              inside: "inside",
              root: Prism.languages.sass && Prism.languages.sass["variable-line"]
            }, {
              lang: "sass",
              inside: "inside",
              root: Prism.languages.sass && Prism.languages.sass["property-line"]
            }],
            scss: !0,
            stylus: [{
              lang: "stylus",
              before: "hexcode",
              inside: "rest",
              root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
            }, {
              lang: "stylus",
              before: "hexcode",
              inside: "rest",
              root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
            }]
          }
        },
        easing: {
          create: function () {
            new Prism.plugins.Previewer("easing", function (e) {
              e = {
                linear: "0,0,1,1",
                ease: ".25,.1,.25,1",
                "ease-in": ".42,0,1,1",
                "ease-out": "0,0,.58,1",
                "ease-in-out": ".42,0,.58,1"
              } [e] || e;
              var s = e.match(/-?\d*\.?\d+/g);
              if (4 === s.length) {
                s = s.map(function (e, s) {
                    return 100 * (s % 2 ? 1 - e : e)
                  }),
                  this.querySelector("path").setAttribute("d", "M0,100 C" + s[0] + "," + s[1] + ", " + s[2] + "," + s[3] + ", 100,0");
                var i = this.querySelectorAll("line");
                return i[0].setAttribute("x2", s[0]),
                  i[0].setAttribute("y2", s[1]),
                  i[1].setAttribute("x2", s[2]),
                  i[1].setAttribute("y2", s[3]),
                  !0
              }
              return !1
            }, "*", function () {
              this._elt.innerHTML = '<svg viewBox="-20 -20 140 140" width="100" height="100"><defs><marker id="prism-previewer-easing-marker" viewBox="0 0 4 4" refX="2" refY="2" markerUnits="strokeWidth"><circle cx="2" cy="2" r="1.5" /></marker></defs><path d="M0,100 C20,50, 40,30, 100,0" /><line x1="0" y1="100" x2="20" y2="50" marker-start="url(' + location.href + '#prism-previewer-easing-marker)" marker-end="url(' + location.href + '#prism-previewer-easing-marker)" /><line x1="100" y1="0" x2="40" y2="30" marker-start="url(' + location.href + '#prism-previewer-easing-marker)" marker-end="url(' + location.href + '#prism-previewer-easing-marker)" /></svg>'
            })
          },
          tokens: {
            easing: {
              pattern: /\bcubic-bezier\((?:-?\d*\.?\d+,\s*){3}-?\d*\.?\d+\)\B|\b(?:linear|ease(?:-in)?(?:-out)?)(?=\s|[;}]|$)/i,
              inside: {
                "function": /[\w-]+(?=\()/,
                punctuation: /[(),]/
              }
            }
          },
          languages: {
            css: !0,
            less: !0,
            sass: [{
              lang: "sass",
              inside: "inside",
              before: "punctuation",
              root: Prism.languages.sass && Prism.languages.sass["variable-line"]
            }, {
              lang: "sass",
              inside: "inside",
              root: Prism.languages.sass && Prism.languages.sass["property-line"]
            }],
            scss: !0,
            stylus: [{
              lang: "stylus",
              before: "hexcode",
              inside: "rest",
              root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
            }, {
              lang: "stylus",
              before: "hexcode",
              inside: "rest",
              root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
            }]
          }
        },
        time: {
          create: function () {
            new Prism.plugins.Previewer("time", function (e) {
              var s = parseFloat(e),
                i = e.match(/[a-z]+$/i);
              return s && i ? (i = i[0],
                this.querySelector("circle").style.animationDuration = 2 * s + i,
                !0) : !1
            }, "*", function () {
              this._elt.innerHTML = '<svg viewBox="0 0 64 64"><circle r="16" cy="32" cx="32"></circle></svg>'
            })
          },
          tokens: {
            time: /(?:\b|\B-|(?=\B\.))\d*\.?\d+m?s\b/i
          },
          languages: {
            css: !0,
            less: !0,
            markup: {
              lang: "markup",
              before: "punctuation",
              inside: "inside",
              root: Prism.languages.markup && Prism.languages.markup.tag.inside["attr-value"]
            },
            sass: [{
              lang: "sass",
              inside: "inside",
              root: Prism.languages.sass && Prism.languages.sass["property-line"]
            }, {
              lang: "sass",
              before: "operator",
              inside: "inside",
              root: Prism.languages.sass && Prism.languages.sass["variable-line"]
            }],
            scss: !0,
            stylus: [{
              lang: "stylus",
              before: "hexcode",
              inside: "rest",
              root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
            }, {
              lang: "stylus",
              before: "hexcode",
              inside: "rest",
              root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
            }]
          }
        }
      },
      s = function (e) {
        var s = 0,
          i = 0,
          t = e;
        if (t.parentNode) {
          do
            s += t.offsetLeft,
            i += t.offsetTop;
          while ((t = t.offsetParent) && t.nodeType < 9);
          t = e;
          do
            s -= t.scrollLeft,
            i -= t.scrollTop;
          while ((t = t.parentNode) && !/body/i.test(t.nodeName))
        }
        return {
          top: i,
          right: innerWidth - s - e.offsetWidth,
          bottom: innerHeight - i - e.offsetHeight,
          left: s
        }
      },
      i = /(?:^|\s)token(?=$|\s)/,
      t = /(?:^|\s)active(?=$|\s)/g,
      a = /(?:^|\s)flipped(?=$|\s)/g,
      r = function (e, s, i, t) {
        this._elt = null,
          this._type = e,
          this._clsRegexp = RegExp("(?:^|\\s)" + e + "(?=$|\\s)"),
          this._token = null,
          this.updater = s,
          this._mouseout = this.mouseout.bind(this),
          this.initializer = t;
        var a = this;
        i || (i = ["*"]),
          "Array" !== Prism.util.type(i) && (i = [i]),
          i.forEach(function (e) {
            "string" != typeof e && (e = e.lang),
              r.byLanguages[e] || (r.byLanguages[e] = []),
              r.byLanguages[e].indexOf(a) < 0 && r.byLanguages[e].push(a)
          }),
          r.byType[e] = this
      };
    r.prototype.init = function () {
        this._elt || (this._elt = document.createElement("div"),
          this._elt.className = "prism-previewer prism-previewer-" + this._type,
          document.body.appendChild(this._elt),
          this.initializer && this.initializer())
      },
      r.prototype.isDisabled = function (e) {
        do
          if (e.hasAttribute && e.hasAttribute("data-previewers")) {
            var s = e.getAttribute("data-previewers");
            return -1 === (s || "").split(/\s+/).indexOf(this._type)
          }
        while (e = e.parentNode);
        return !1
      },
      r.prototype.check = function (e) {
        if (!i.test(e.className) || !this.isDisabled(e)) {
          do
            if (i.test(e.className) && this._clsRegexp.test(e.className))
              break;
          while (e = e.parentNode);
          e && e !== this._token && (this._token = e,
            this.show())
        }
      },
      r.prototype.mouseout = function () {
        this._token.removeEventListener("mouseout", this._mouseout, !1),
          this._token = null,
          this.hide()
      },
      r.prototype.show = function () {
        if (this._elt || this.init(),
          this._token)
          if (this.updater.call(this._elt, this._token.textContent)) {
            this._token.addEventListener("mouseout", this._mouseout, !1);
            var e = s(this._token);
            this._elt.className += " active",
              e.top - this._elt.offsetHeight > 0 ? (this._elt.className = this._elt.className.replace(a, ""),
                this._elt.style.top = e.top + "px",
                this._elt.style.bottom = "") : (this._elt.className += " flipped",
                this._elt.style.bottom = e.bottom + "px",
                this._elt.style.top = ""),
              this._elt.style.left = e.left + Math.min(200, this._token.offsetWidth / 2) + "px"
          } else
            this.hide()
      },
      r.prototype.hide = function () {
        this._elt.className = this._elt.className.replace(t, "")
      },
      r.byLanguages = {},
      r.byType = {},
      r.initEvents = function (e, s) {
        var i = [];
        r.byLanguages[s] && (i = i.concat(r.byLanguages[s])),
          r.byLanguages["*"] && (i = i.concat(r.byLanguages["*"])),
          e.addEventListener("mouseover", function (e) {
            var s = e.target;
            i.forEach(function (e) {
              e.check(s)
            })
          }, !1)
      },
      Prism.plugins.Previewer = r,
      Prism.hooks.add("before-highlight", function (s) {
        for (var i in e) {
          var t = e[i].languages;
          if (s.language && t[s.language] && !t[s.language].initialized) {
            var a = t[s.language];
            "Array" !== Prism.util.type(a) && (a = [a]),
              a.forEach(function (a) {
                var r, n, l, o;
                a === !0 ? (r = "important",
                    n = s.language,
                    a = s.language) : (r = a.before || "important",
                    n = a.inside || a.lang,
                    l = a.root || Prism.languages,
                    o = a.skip,
                    a = s.language),
                  !o && Prism.languages[a] && (Prism.languages.insertBefore(n, r, e[i].tokens, l),
                    s.grammar = Prism.languages[a],
                    t[s.language] = {
                      initialized: !0
                    })
              })
          }
        }
      }),
      Prism.hooks.add("after-highlight", function (e) {
        (r.byLanguages["*"] || r.byLanguages[e.language]) && r.initEvents(e.element, e.language)
      });
    for (var n in e)
      e[n].create()
  }
}();
! function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    if (!Prism.plugins.toolbar)
      return console.warn("Show Languages plugin loaded before Toolbar plugin."),
        void 0;
    var e = {
      html: "HTML",
      xml: "XML",
      svg: "SVG",
      mathml: "MathML",
      css: "CSS",
      clike: "C-like",
      javascript: "JavaScript",
      abap: "ABAP",
      actionscript: "ActionScript",
      apacheconf: "Apache Configuration",
      apl: "APL",
      applescript: "AppleScript",
      arff: "ARFF",
      asciidoc: "AsciiDoc",
      asm6502: "6502 Assembly",
      aspnet: "ASP.NET (C#)",
      autohotkey: "AutoHotkey",
      autoit: "AutoIt",
      basic: "BASIC",
      csharp: "C#",
      cpp: "C++",
      coffeescript: "CoffeeScript",
      csp: "Content-Security-Policy",
      "css-extras": "CSS Extras",
      django: "Django/Jinja2",
      erb: "ERB",
      fsharp: "F#",
      gedcom: "GEDCOM",
      glsl: "GLSL",
      graphql: "GraphQL",
      http: "HTTP",
      hpkp: "HTTP Public-Key-Pins",
      hsts: "HTTP Strict-Transport-Security",
      ichigojam: "IchigoJam",
      inform7: "Inform 7",
      json: "JSON",
      latex: "LaTeX",
      livescript: "LiveScript",
      lolcode: "LOLCODE",
      "markup-templating": "Markup templating",
      matlab: "MATLAB",
      mel: "MEL",
      n4js: "N4JS",
      nasm: "NASM",
      nginx: "nginx",
      nsis: "NSIS",
      objectivec: "Objective-C",
      ocaml: "OCaml",
      opencl: "OpenCL",
      parigp: "PARI/GP",
      objectpascal: "Object Pascal",
      php: "PHP",
      "php-extras": "PHP Extras",
      plsql: "PL/SQL",
      powershell: "PowerShell",
      properties: ".properties",
      protobuf: "Protocol Buffers",
      q: "Q (kdb+ database)",
      jsx: "React JSX",
      tsx: "React TSX",
      renpy: "Ren'py",
      rest: "reST (reStructuredText)",
      sas: "SAS",
      sass: "Sass (Sass)",
      scss: "Sass (Scss)",
      sql: "SQL",
      soy: "Soy (Closure Template)",
      tap: "TAP",
      tt2: "Template Toolkit 2",
      typescript: "TypeScript",
      vbnet: "VB.Net",
      vhdl: "VHDL",
      vim: "vim",
      "visual-basic": "Visual Basic",
      wasm: "WebAssembly",
      wiki: "Wiki markup",
      xojo: "Xojo (REALbasic)",
      xquery: "XQuery",
      yaml: "YAML"
    };
    Prism.plugins.toolbar.registerButton("show-language", function (a) {
      var t = a.element.parentNode;
      if (t && /pre/i.test(t.nodeName)) {
        var s = t.getAttribute("data-language") || e[a.language] || a.language && a.language.substring(0, 1).toUpperCase() + a.language.substring(1);
        if (s) {
          var i = document.createElement("span");
          return i.textContent = s,
            i
        }
      }
    })
  }
}();
