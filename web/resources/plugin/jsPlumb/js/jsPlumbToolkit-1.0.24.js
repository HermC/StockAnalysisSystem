(function() {
    "use strict";
    var a, b = this;
    a = "undefined" != typeof exports ? exports : b.Farahey = {};
    var c = function(a, b, c) {
        for (var d = 0, e = a.length, f =- 1, g = 0; e > d;)
            if (f = parseInt((d + e) / 2), g = c(a[f], b), 0 > g)
                d = f + 1;
            else {
                if (!(g > 0))
                    return f;
                e = f
            }
        return d
    }, d = "undefined" != typeof jsPlumbGeom ? jsPlumbGeom: Biltong, e = function(a, b, d) {
        var e = c(a, b, d);
        a.splice(e, 0, b)
    }, f = function(a, b) {
        var c = a, e = {}, f = function(a) {
            if (!e[a[1]]) {
                var c = b(a[2]);
                e[a[1]] = {
                    l: a[0][0],
                    t: a[0][1],
                    w: c[0],
                    h: c[1],
                    center: [a[0][0] + c[0] / 2, a[0][1] + c[1] / 2]
                }
            }
            return e[a[1]]
        };
        this.setOrigin = function(a) {
            c = a, e = {}
        }, this.compare = function(a, b) {
            var e = d.lineLength(c, f(a).center), g = d.lineLength(c, f(b).center);
            return g > e?-1 : e == g ? 0 : 1
        }
    }, g = function(a, b, c, d) {
        return a[b] <= d && d <= a[b] + a[c]
    }, h = [function(a, b) {
        return a.x + a.w - b.x
    }, function(a, b) {
        return a.x - (b.x + b.w)
    }
    ], i = [function(a, b) {
        return a.y + a.h - b.y
    }, function(a, b) {
        return a.y - (b.y + b.h)
    }
    ], j = [null, [h[0], i[1]], [h[0], i[0]], [h[1], i[0]], [h[1], i[1]]], k = function(a, b, c, d, e) {
        isNaN(c) && (c = 0);
        var f, h, i, k = b.y + b.h, l = c == 1 / 0 || c==-(1 / 0) ? b.x + b.w / 2: (k - d) / c, m = Math.atan(c);
        return g(b, "x", "w", l) ? (f = j[e][1](a, b), h = f / Math.sin(m), i = h * Math.cos(m), {
            left: i,
            top: f
        }) : (i = j[e][0](a, b), h = i / Math.cos(m), f = h * Math.sin(m), {
            left: i,
            top: f
        })
    }, l = a.calculateSpacingAdjustment = function(a, b) {
        var c = a.center || [a.x + a.w / 2, a.y + a.h / 2], e = b.center || [b.x + b.w / 2, b.y + b.h / 2], f = d.gradient(c, e), g = d.quadrant(c, e), h = f == 1 / 0 || f==-(1 / 0) || isNaN(f) ? 0: c[1] - f * c[0];
        return k(a, b, f, h, g)
    }, m = a.paddedRectangle = function(a, b, c) {
        return {
            x: a[0] - c[0],
            y: a[1] - c[1],
            w: b[0] + 2 * c[0],
            h: b[1] + 2 * c[1]
        }
    }, n = function(a, b, c, e, f, g, h, i, j, k) {
        g = g || [0, 0], k = k || function() {};
        var n, o, p = m(g, [1, 1], e), q = 100, r = 1, s=!0, t = {}, u = function(a, b, c, d) {
            t[a]=!0, b[0] += c, b[1] += d
        }, v = function() {
            for (var g = 0; g < a.length; g++) {
                var t = b[a[g][1]], w = a[g][1], x = (a[g][2], c[a[g][1]]), y = m(t, x, e);
                h(a[g][1]) && d.intersects(p, y) && (n = l(p, y), o = f(a[g][1], t, n), u(w, t, o.left, o.top)), y = m(t, x, e);
                for (var z = 0; z < a.length; z++)
                    if (g != z && h(a[z][1])) {
                        var A = b[a[z][1]], B = c[a[z][1]], C = m(A, B, e);
                        d.intersects(y, C) && (s=!0, n = l(y, C), o = f(a[z][1], A, n), u(a[z][1], A, o.left, o.top))
                    }
            }
            i && k(), s && q > r && (s=!1, r++, i ? window.setTimeout(v, j) : v())
        };
        return v(), t
    }, o = function(a) {
        if (null == a)
            return null;
        if ("[object Array]" === Object.prototype.toString.call(a)) {
            var b = [];
            return b.push.apply(b, a), b
        }
        var c = [];
        for (var d in a)
            c.push(a[d]);
        return c
    };
    b.Magnetizer = function(a) {
        var b, c, d, g, h, i = a.getPosition, j = a.getSize, k = a.getId, l = a.setPosition, m = a.padding || [20, 20], p = a.constrain || function(a, b, c) {
                return c
            }, q = [], r = {}, s = {}, t = o(a.elements || []), u = a.origin || [0, 0], v = a.executeNow, w = (this.getOrigin = function() {
            return u
        }, a.filter || function(a) {
            return !0
        }), x = a.orderByDistanceFromOrigin, y = new f(u, j), z = a.updateOnStep, A = a.stepInterval || 350, B = a.debug, C = function() {
            var a = document.createElement("div");
            a.style.position = "absolute", a.style.width = "10px", a.style.height = "10px", a.style.backgroundColor = "red", document.body.appendChild(a), h = a
        }, D = function(a) {
            x && 0 != q.length ? e(q, a, y.compare) : q.push(a)
        }, E = function() {
            y.setOrigin(u), q = [], r = {}, s = {}, b = c = 1 / 0, d = g =- (1 / 0);
            for (var a = 0; a < t.length; a++) {
                var e = i(t[a]), f = j(t[a]), h = k(t[a]);
                r[h] = [e.left, e.top], D([[e.left, e.top], h, t[a]]), s[h] = f, b = Math.min(b, e.left), c = Math.min(c, e.top), d = Math.max(d, e.left + f[0]), g = Math.max(g, e.top + f[1])
            }
        }, F = function() {
            if (t.length > 1) {
                var a = n(q, r, s, m, p, u, w, z, A, G);
                G(a)
            }
        }, G = function(a) {
            for (var b = 0; b < t.length; b++) {
                var c = k(t[b]);
                a[c] && l(t[b], {
                    left: r[c][0],
                    top: r[c][1]
                })
            }
        }, H = function(a) {
            null != a && (u = a, y.setOrigin(a))
        };
        this.execute = function(a) {
            H(a), E(), F()
        }, this.executeAtCenter = function() {
            E(), H([(b + d) / 2, (c + g) / 2]), F()
        }, this.executeAtEvent = function(b) {
            var c = a.container, d = a.getContainerPosition(c), e = b.pageX - d.left + c[0].scrollLeft, f = b.pageY - d.top + c[0].scrollTop;
            B && (h.style.left = b.pageX + "px", h.style.top = b.pageY + "px"), this.execute([e, f])
        }, this.setElements = function(a) {
            t = o(a)
        }, this.addElement = function(a) {
            t.push(a)
        }, this.removeElement = function(a) {
            for (var b =- 1, c = 0; c < t.length; c++)
                if (t[c] == a) {
                    b = c;
                    break
                }
            - 1 != b && t.splice(b, 1)
        }, this.setPadding = function(a) {
            m = a
        }, this.setConstrain = function(a) {
            p = a
        }, this.setFilter = function(a) {
            w = a
        }, this.reset = function() {
            t.length = 0
        }, B && C(), v && this.execute()
    }
}).call("undefined" != typeof window ? window : this), null, function() {
    var a = this;
    "undefined" != typeof global && (a = global);
    var b = this;
    Array.prototype.peek = function() {
        return this.length > 0 ? this[this.length - 1] : null
    };
    var c = "undefined" != typeof navigator && /MSIE\s([\d.]+)/.test(navigator.userAgent) ? new Number(RegExp.$1): - 1, d = c>-1 && 9 > c, e = function(a, b, c) {
        var d = function(b, c) {
            for (var d = [], e = 0; e < b.length; e++) {
                var f = g({}, b[e]);
                d.push(f), g(f.atts, c.atts, function(b, c) {
                    p(b, c, f, null, a)
                })
            }
            return d
        }.bind(this);
        this.template = c.template, this.getFunctionBody = function(b) {
            return a.compile(d(a.parse(c.template, null, {
                originalCustomTag: b.tag,
                context: b.context
            }), b), !1, !0, !0)
        }.bind(this), this.getFunctionEnd = function() {
            return ";_els.pop();"
        }, this.rendered = c.rendered || function() {}, this.updated = c.updated || function() {}
    }, f = function(a, b) {
        for (var c = 0; c < a.length; c++) {
            var d = a[c];
            null != d && 0 != d.length && b(c, d)
        }
    }, g = function(a, b, c) {
        for (var d in b)
            a[d] = b[d], c && c(d, a[d]);
        return a
    }, h = function(a, b, c) {
        if (null == a)
            return null;
        if ("$data" === b || null == b)
            return a;
        var d = b.match(/^\{(.*)\}$/);
        if (d) {
            for (var e = {}, f = d[1].split(","), g = 0; g < f.length; g++) {
                var i = f[g].split(":"), j = h(a, i[1]);
                e[n(i[0])] = j || i[1].replace(/'/g, "")
            }
            return e
        }
        b = b.replace(/\['([^']*)'\]/g, ".$1");
        var k = a, l = k, m = null;
        return b.replace(/([^\.])+/g, function(a, b, d, e) {
            if (null == m) {
                var f = a.match(/([^\[0-9]+){1}(\[)([0-9+])/), g = d + a.length >= e.length, h = function() {
                    return l[f[1]] || function() {
                            return l[f[1]] = [], l[f[1]]
                        }()
                };
                if (g)
                    if (f) {
                        var i = h(), j = f[3];
                        null == c ? m = i[j] : i[j] = c
                    } else
                        null == c ? m = l[a] : l[a] = c;
                else if (f) {
                    var k = h();
                    l = k[f[3]] || function() {
                            return k[f[3]] = {}, k[f[3]]
                        }()
                } else
                    l = l[a] || function() {
                            return l[a] = {}, l[a]
                        }()
            }
        }), m
    }, i = function(b) {
        var c = a.document.getElementById(b);
        return null != c ? c.innerHTML : null
    }, j = function(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }, k = function(a) {
        for (var b = [], c = 0; c < a.length; c++)
            j(a[c]) ? b.push.apply(b, k(a[c])) : b[b.length] = a[c];
        return b
    }, l = function(a, b) {
        for (var c = [], d = 0, e = a.length; e > d; d++)
            c.push(b(a[d]));
        return k(c)
    }, m = function(a, b) {
        for (var c = [], d = 0, e = a.length; e > d; d++)
            b(a[d]) && c.push(a[d]);
        return c
    }, n = function(a) {
        if (null == a)
            return a;
        for (var b = a.replace(/^\s\s*/, ""), c = /\s/, d = b.length; c.test(b.charAt(--d)););
        return b.slice(0, d + 1)
    }, o = function(a, b, c, d, e) {
        var f = r(), g = {
            w: b,
            e: [],
            u: f
        };
        e.bindings[f] = g;
        var h = function() {
            return null != d ? "try {  if(" + d + ") { out = out.replace(this.e[k][0], eval(this.e[k][1])); } else out=''; } catch(__) { out='';}" : "try { out = out.replace(this.e[k][0], eval(this.e[k][1])); } catch(__) { out=out.replace(this.e[k][0], '');}"
        }, i = function() {
            return null != d ? "var out='';try { with($data) { if (" + d + ") out = this.w; else return null; }}catch(_){return null;}" : "var out = this.w;"
        };
        g.reapply = new Function("$data", i() + "for (var k = 0; k < this.e.length; k++) { with($data) { " + h() + " }} return out;"), c.bindings[a] = g, b.replace(/\$\{([^\}]*)\}/g, function(a, b, c, d) {
            g.e.push([a, b])
        })
    }, p = function(a, b, c, d, e) {
        c.atts[a] = b, o(a, b, c, d, e)
    }, q = function(a, b) {
        function c(a, c) {
            var d = a.match(/([^=]+)=['"](.*)['"]/);
            return null == d && null == c ? e.atts[a] = "" : null == d ? p(a, "", e, c, b) : p(d[1], d[2], e, c, b), d
        }
        for (var d = b.parseAttributes(a), e = {
            el: n(d[0]),
            atts: {},
            bindings: {}
        }, f = 1; f < d.length; f++) {
            var g = n(d[f]);
            if (null != g && g.length > 0) {
                var h = g.match(b.inlineIfRe);
                if (h)
                    for (var i = h[2].split(b.attributesRe), j = 0; j < i.length; j++) {
                        var k = n(i[j]);
                        null != k && k.length > 0 && c(k, h[1])
                    } else
                    c(g)
            }
        }
        return e
    }, r = function(a) {
        var b = a ? "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx": "xxxxxxxx-xxxx-4xxx";
        return b.replace(/[xy]/g, function(a) {
            var b = 16 * Math.random() | 0, c = "x" == a ? b: 3 & b | 8;
            return c.toString(16)
        })
    }, s = function(a) {
        if (null == a || 0 == a.length)
            return !1;
        for (var b = a.length - 1; b>-1; b--)
            if ("each" === a[b].type)
                return !0;
        return !1
    }, t = function(a, b) {
        var c = this.bindings[b];
        return null == c ? "" : c.reapply(a)
    }, u = function(a, b) {
        this.uuid = r(), this.children = [], this.instance = b, b.entries[this.uuid] = this
    }, v = function(a, b) {
        u.apply(this, arguments);
        var c = q(a, b), d = c.el.split(":");
        this.tag = c.el, 2 == d.length && (this.namespace = d[0]), this.atts = c.atts, this.bindings = c.bindings, this.type = "element", this.compile = function(a, b) {
            if (a.customTags[this.tag]) {
                for (var c = a.customTags[this.tag].getFunctionBody(this), d = 0; d < this.children.length; d++)
                    this.children[d].precompile && (c += this.children[d].precompile(a)), c += this.children[d].compile(a), this.children[d].postcompile && (c += this.children[d].postcompile(a));
                return c += "_le=_els.pop();_rotors.customTags['" + this.tag + "'].rendered(_le, _rotors);_rotors.pet(_eid,'" + this.uuid + "');"
            }
            var e = "/* element entry " + this.uuid + " */;";
            if (this.remove!==!0) {
                e += a.getExecutionContent(this.tag, this.uuid, !1, this.namespace);
                for (var f in this.atts)
                    if (this.atts.hasOwnProperty(f)) {
                        var g;
                        g = null != this.bindings[f] ? "_rotors.bind(data[0], '" + this.bindings[f].u + "');" : "'" + this.atts[f] + "'", e += "__a=" + g + ";if(__a!=null) e.setAttribute('" + f + "',__a || '');"
                    }
            }
            for (var h = 0; h < this.children.length; h++)
                this.children[h].precompile && (e += this.children[h].precompile(a)), e += this.children[h].compile(a), this.children[h].postcompile && (e += this.children[h].postcompile(a));
            return this.remove===!0 || b || (e += "_le=_els.pop();", e += "_rotors.pet(_eid, '" + this.uuid + "');"), e
        };
        var e = function(a, c) {
            b.each(c.split(";"), function(b) {
                var c = b.indexOf(":"), d = b.substring(0, c);
                a.style[d] = b.substring(c + 1)
            })
        };
        this.update = function(a, c) {
            for (var d in this.atts)
                if (this.atts.hasOwnProperty(d) && "class" !== d) {
                    var f;
                    f = null != this.bindings[d] ? this.bindings[d].reapply(c) : "'" + this.atts[d] + "'", null != f && ("style" === d && null != a.style ? e(a, f) : a.setAttribute(d, f))
                }
            this.originalCustomTag && b.customTags[this.originalCustomTag].updated(a, c)
        }
    }, w = function(a) {
        this.uuid = r(), this.comment = a, this.compile = function() {
            return ""
        }
    }, x = function(a, b) {
        u.apply(this, arguments), this.value = a.value, this.type = "text", this.bindings = {};
        var c = function() {
            return "_rotors.bind(data[0], '" + this.bindings.__element.u + "', typeof $key !== 'undefined' ? $key : null, typeof $value !== 'undefined' ? $value : null)"
        }.bind(this);
        this.compile = function(a) {
            return a.getExecutionContent(c(), this.uuid, !0) + ";_rotors.pet(_eid, '" + this.uuid + "');"
        }, this.update = function(a, b) {
            a.nodeValue = this.bindings.__element.reapply(b)
        }
    }, y = function() {
        this.childNodes = [], this.appendChild = function(a) {
            this.childNodes.push(a)
        }
    }, z = function(a) {
        y.apply(this), this.tag = a;
        var b = {};
        this.setAttribute = function(a, c) {
            b[a] = c
        }, this.getAttribute = function(a) {
            return b[a]
        }
    }, A = function(a) {
        this.nodeValue = a
    }, B = function(a) {
        return a.isBrowser ? i : null
    }, C = function(a, b, c) {
        return function(d) {
            var e = c ? null: a.cache[d];
            return null == e && (e = b(d)), null == e && (e = a.defaultTemplate), null != e && (a.cache[d] = e), e
        }
    }, D = function(a) {
        a = a || {}, this.cache = {}, this.templateCache = {}, null != a.defaultTemplate && this.setDefaultTemplate(a.defaultTemplate)
    }, E = function(a, b) {
        for (var c in b)
            b.hasOwnProperty(c) && (a[c] = b[c])
    };
    E(D.prototype, {
        bindings: {},
        entries: {},
        executions: {},
        bind: t,
        defaultTemplate: "<div></div>",
        defaultCompiledTemplate: null,
        setDefaultTemplate: function(a) {
            null != a ? (this.defaultTemplate = a, this.defaultCompiledTemplate = this.compile(this.parse(a))) : this.clearDefaultTemplate()
        },
        clearDefaultTemplate: function() {
            this.defaultTemplate = null, this.defaultCompiledTemplate = null
        },
        clearCache: function() {
            this.cache = {}, this.templateCache = {}
        },
        namespaceHandlers: {
            svg: function(a) {
                return "e = document.createElementNS('http://www.w3.org/2000/svg', '" + a.split(":")[1] + "');e.setAttribute('version', '1.1');e.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');"
            }
        },
        each: function(a, b, c, d) {
            var e;
            if (j(a))
                for (e = 0; e < a.length; e++)
                    b(a[e], c, e, d);
            else
                for (e in a)
                    a.hasOwnProperty(e) && b({
                        $key: e,
                        $value: a[e]
                    }, c, e, d)
        },
        openRe: new RegExp("<([^/>]*?)>$|<([^/].*[^/])>$"),
        closeRe: new RegExp("^</([^>]+)>"),
        openCloseRe: new RegExp("<(.*)(/>$)"),
        tokenizerRe: /(<[^\^>]+\/>)|(<!--[\s\S]*?-->)|(<[\/a-zA-Z0-9\-:]+(?:\s*[a-zA-Z\-]+=\"[^\"]+\"|\s*[a-zA-Z\-]+='[^']+'|\s*[a-zA-Z\-]|\s*\{\{.*\}\})*>)/,
        commentRe: /<!--[\s\S]*?-->/,
        attributesRe: /([a-zA-Z0-9\-_:]+="[^"]*")|(\{\{if [^(?:\}\})]+\}\}.*\{\{\/if\}\})/,
        inlineIfRe: /\{\{if ([^\}]+)\}\}(.*)\{\{\/if\}\}/,
        singleExpressionRe: /^[\s]*\$\{([^\}]*)\}[\s]*$/,
        parseAttributes: function(a) {
            return null == a ? a : this.filterEmpty(a.replace("/>", ">").split(/^<|>$/)[1].split(this.attributesRe))
        },
        map: l,
        flatten: k,
        filter: m,
        data: h,
        uuid: r,
        filterEmpty: function(a) {
            return m(a, function(a) {
                return null != a && n(a).length > 0
            })
        },
        isBrowser: function() {
            return "undefined" != typeof navigator
        }(),
        isOldIE: function() {
            return d
        },
        cf: function() {
            return this.isBrowser ? this.isOldIE() ? a.document.createElement("div") : a.document.createDocumentFragment() : new y
        },
        ctn: function(b) {
            return this.isBrowser ? a.document.createTextNode(b) : new A(b)
        },
        ce: function(b) {
            return this.isBrowser ? a.document.createElement(b) : new z(b)
        },
        customElements: {
            "r-each": {
                parse: function(a, b, c, d) {
                    a.context = a.atts["in"], a.type = "each"
                },
                compile: function(a) {
                    var b = function() {
                        var b = "function(item, _rotorsLoopId, _rotorsLoopIndex, _rotorsLoopContext) { ";
                        b += "data.unshift(item);$value=item;$key=_rotorsLoopIndex;";
                        for (var c = 0; c < this.children.length; c++)
                            b += this.children[c].compile(a);
                        return b += "data.splice(0,1);", b += "}"
                    }.bind(this), c = ";_rotors.te(null, _eid, '" + this.uuid + "');", d = this.context ? ';data.unshift(_rotors.data(data[0], "' + this.context + '"));': "", e = "_rotors.each(data[0], " + b() + ",'" + this.uuid + "', '" + this.context + "');", f = this.context ? ";data.splice(0, 1);": "", g = ";_rotors.pet(_eid, '" + this.uuid + "');";
                    return c + d + e + f + g
                }
            },
            "r-if": {
                parse: function(a, b, c, d) {
                    a.test = a.atts.test
                },
                compile: function(a) {
                    var b, c = "", d = "", e = this.happyFlowChildren || this.children;
                    for (b = 0; b < e.length; b++)
                        c += e[b].compile(a) + ";";
                    if (null != this.happyFlowChildren) {
                        for (d = "else {", b = 0; b < this.children.length; b++)
                            d += this.children[b].compile(a) + ";";
                        d += "}"
                    }
                    return ";with (data[0]) { if(" + this.test + ") { " + c + " }" + d + "}"
                }
            },
            "r-else": {
                remove: !0,
                parse: function(a, b, c, d, e) {
                    var f = e.peek();
                    null != f && "r-if" === f.tag && (f.happyFlowChildren = f.children, f.children = [])
                },
                compile: function(a) {}
            },
            "r-for": {
                parse: function(a, b, c, d, e) {
                    a.loop = a.atts.loop
                },
                compile: function(a) {
                    var b = "";
                    b += "var __limit; with(data[0]){__limit=(" + this.loop + ");}", b += "for(var $index=0;$index<__limit;$index++){data[0].$index=$index;";
                    for (var c = 0; c < this.children.length; c++)
                        b += this.children[c].compile(a) + ";";
                    return b += "}delete data[0].$index;"
                }
            },
            "r-tmpl": {
                remove: !0,
                parse: function(a, b, c, d, e, f) {
                    a.type = "template", a.context = a.atts.context, a.templateId = a.atts.id;
                    var g = s(e);
                    if ( - 1 !== f.indexOf(a.templateId)) {
                        if (!g)
                            throw new TypeError("recursive template call [" + a.templateId + "]");
                        a.compile = function(b) {
                            return ";eval(_rotors.templateCache['" + a.templateId + "'].functionBody);"
                        }
                    } else {
                        var h = c(a.templateId);
                        f.push(a.templateId);
                        var i = d.parse(h, c, null, f);
                        null == d.templateCache[a.templateId] && (d.templateCache[a.templateId] = d.compile(i));
                        for (var j = 0; j < i.length; j++)
                            i[j].context = a.context;
                        d.debug("nested ast", i), a.children = i
                    }
                },
                precompile: function(a) {
                    return this.context ? ';data.unshift(_rotors.data(data[0], "' + this.context + '"));' : ""
                },
                postcompile: function(a) {
                    return this.context ? ";data.splice(0, 1);" : ""
                }
            },
            "r-html": {
                parse: function(a, b, c, d) {},
                compile: function(a) {
                    return ";var __hp=_rotors.parse(data[0].value),__hc=_rotors.compile(__hp,true);var __f=__hc(data[0], _rotors);_els.peek().appendChild(__f.childNodes[0]);"
                }
            }
        },
        customTags: {},
        registerTag: function(a, b) {
            this.customTags[a] = new e(this, a, b)
        },
        debugEnabled: !1,
        debug: function() {
            this.debugEnabled && console.log.apply(console, arguments)
        },
        maybeDebug: function() {
            this.debugEnabled && arguments[0] && console.log.apply(console, arguments)
        },
        parse: function(a, b, c, d) {
            d = d || [], b = C(this, b || B(this), null);
            var e = [], g = [], h = this, i = function(a, b) {
                var c = a.match(b);
                return null == c?!1 : c
            }, j = function() {
                return e.length > 0 ? e[e.length - 1] : null
            }, k = function(a) {
                var b = j();
                return null != b && b.tag == a
            }, l = function(a, b) {
                e.length > 0 && j().children.push(a), b ? 0 == e.length && g.push(a) : e.push(a)
            }, m = function(a) {
                l(a, !0)
            }, p = function() {
                var a = e.pop();
                return 0 == e.length && g.push(a), a
            }, q = function(a, b, c, d, f) {
                var g = new v(a, d), h = d.customElements[g.tag];
                return h && (h.parse(g, b, c, d, e, f), h.compile && (g.compile = h.compile), g.precompile = h.precompile, g.postcompile = h.postcompile, g.custom=!0, g.remove = h.remove, d.debug("  element is a custom element"), d.maybeDebug(g.remove, "  element's root should not appear in output")), g
            }, r = [{
                re: h.commentRe,
                handler: function(a, b, c, d) {
                    d.debug("comment", a, b), l(new w(a), !0)
                }
            }, {
                re: h.openRe,
                handler: function(a, b, c, d, e) {
                    d.debug("open element", a, b);
                    var f = q(a, b, c, d, e);
                    l(f, f.remove)
                }
            }, {
                re: h.closeRe,
                handler: function(a, b, c, d) {
                    d.debug("close element", a, b);
                    var e = d.customElements[b[1]];
                    if (null == e ||!e.remove) {
                        if (!k(b[1]))
                            throw new TypeError("Unbalanced closing tag '" + b[1] + "'; opening tag was '" + p().tag + "'");
                        p()
                    }
                }
            }, {
                re: h.openCloseRe,
                handler: function(a, b, c, d, e) {
                    d.debug("open and close element", a, b);
                    var f = q(a, b, c, d, e);
                    l(f, !0)
                }
            }, {
                re: /.*/,
                handler: function(a, b, c, d) {
                    var e = n(a);
                    if (null != e && e.length > 0) {
                        d.debug("text node", a);
                        var f = new x({
                            value: e
                        }, d);
                        m(f), o("__element", e, f, null, d)
                    }
                }
            }
            ];
            if (f(n(a).split(this.tokenizerRe), function(a, c) {
                    for (var e = 0; e < r.length; e++) {
                        c = n(c);
                        var f = i(c, r[e].re);
                        if (f) {
                            r[e].handler(c, f, b, this, d);
                            break
                        }
                    }
                }.bind(this)), g.length > 0 && c)
                for (var s in c)
                    g[0][s] = c[s];
            return g
        },
        compile: function(a, b, c, d) {
            for (var e = "data=[data||{}];var frag=_rotors.cf(),_els=[],e,_le,__a,$value,$key,_eid = _rotors.nec();_els.push(frag);", f = "return frag;", g = [], h = 0; h < a.length; h++) {
                var i = "";
                a[h].precompile && (i += a[h].precompile(this)), i += a[h].compile(this, d), a[h].postcompile && (i += a[h].postcompile(this)), g.push(i)
            }
            var j = g.join("");
            if (this.debug("function body :", j), c)
                return j;
            var k = new Function("data,_rotors", e + g.join("") + f), l = this;
            if (b)
                return k;
            var m = function(a) {
                return k.apply(this, [a, l])
            };
            return m.functionBody = j, m
        },
        nec: function() {
            var a = this.uuid();
            return this.executions[a] = {
                current: [{
                    children: []
                }
                ]
            }, a
        },
        te: function(a, b, c, d) {
            var e = {
                el: a,
                children: [],
                id: c,
                index: d
            };
            this.executions[b].current[0].children.push(e);
            var f = c + (null != d ? "-" + d : "");
            this.executions[b][f] = e, this.executions[b].current.unshift(e)
        },
        pet: function(a, b) {
            this.executions[a].current = this.executions[a].current.splice(1)
        },
        getExecutionContent: function(a, b, c, d, e) {
            var f = null != d ? this.namespaceHandlers[d](a): c ? "e=_rotors.ctn(" + a + ");": "e=_rotors.ce('" + a + "');";
            return f + "_els.peek().appendChild(e);" + (c ? "" : "_els.push(e);") + "e._rotors=_rotors.entries['" + b + "'];e._rotorsEid=_eid;if(typeof _rotorsLoopId !== 'undefined') {e._rotorsLoopId=_rotorsLoopId;e._rotorsLoopIndex=_rotorsLoopIndex;e._rotorsLoopContext=_rotorsLoopContext;}_rotors.te(e, _eid, '" + b + "', typeof _rotorsLoopIndex != 'undefined' ? _rotorsLoopIndex : null);"
        },
        updaters: {},
        onUpdate: function(a, b) {
            if (null != a._rotors) {
                var c = a._rotors.instance;
                a._RotorsUpdate = a._RotorsUpdate || r(), c.updaters[a._RotorsUpdate] = c.updaters[a._RotorsUpdate] || [], c.updaters[a._RotorsUpdate].push(b)
            }
        },
        update: function(a, b) {
            var c, d, e, f = [], g = a._rotorsEid;
            if (null != g && null != a._rotors) {
                e = a._rotors.instance, c = e.executions[g];
                var h = a._rotorsLoopIndex, i = a._rotors.uuid + (null != h ? "-" + h : "");
                d = c[i];
                var j = function(a, b, c) {
                    null != a && (a._rotors.update(a, b), a._RotorsUpdate && e.updaters[a._RotorsUpdate] && f.push([a, e.updaters[a._RotorsUpdate], b]));
                    for (var d = 0; d < c.children.length; d++) {
                        var g = e.entries[c.children[d].id], h = "each" === e.entries[c.id].type, i = h && null != c.children[d].el && null != c.children[d].el._rotorsLoopIndex ? b[c.children[d].el._rotorsLoopIndex]: e.data(b, g.context);
                        j(c.children[d].el, i, c.children[d])
                    }
                };
                j(a, b, d);
                for (var k = 0; k < f.length; k++)
                    for (var l = f[k], m = 0; m < l[1].length; m++)
                        try {
                            l[1][m](l[0], l[2])
                        } catch (n) {}
            }
        },
        remove: function(a) {
            a._RotorsUpdate && this.updaters[a._RotorsUpdate] && delete this.updaters[a._RotorsUpdate], a._rotorsEid && this.executions[a._rotorsEid] && delete this.executions[a._rotorsEid]
        },
        template: function(a, b, c, d) {
            var e, f = d ? null: this.templateCache[a];
            if (null != f)
                return e = f(b), this.isOldIE() ? e.childNodes[0] : e;
            c = C(this, c || B(this), d);
            var g = c(a);
            if (null != g) {
                var h = this.parse(g, c, null, [a]), i = this.compile(h);
                return this.templateCache[a] = i, e = i(b), this.isOldIE() ? e.childNodes[0] : e
            }
            return this.cf()
        },
        precompileTemplate: function(a, b) {
            var c = this.parse(a, b || B(this));
            return this.compile(c, !0)
        },
        precompileTemplates: function(a, b) {
            var c = function(c) {
                var d = a[c];
                return d || (b || B(this))(c)
            }, d = {};
            for (var e in a)
                d[e] = this.precompileTemplate(a[e], c);
            return d
        },
        importTemplate: function(a, b) {
            var c = this;
            b = "string" == typeof b ? Function("data", "_rotors", b) : b, this.templateCache[a] = function(a) {
                return b.apply(c, [a, c])
            }
        },
        importTemplates: function(a) {
            for (var b in a)
                this.importTemplate(b, a[b])
        },
        importBindings: function(a) {
            this.bindings = this.bindings || {};
            for (var b in a) {
                var c = a[b];
                this.bindings[b] = {
                    e: c.e,
                    u: c.u,
                    w: c.w,
                    reapply: Function("$data", c.reapply)
                }
            }
        }
    });
    var F = function(a) {
        return new D(a)
    }, G = function(a) {
        var b = {};
        for (var c in a.bindings) {
            var d = a.bindings[c];
            b[c] = {
                e: d.e,
                u: d.u,
                w: d.w,
                reapply: String(d.reapply).replace(/^function\s*\S+\s*\([^)]*\)\s*\{|\}$/g, "")
            }
        }
        return b
    }, H = function(a, c) {
        c = c || "rotors";
        var d, e = (b.Rotors || b).newInstance(), f = {}, g = new RegExp("<script type=['\"]" + c + "['\"] id=['\"]([^'\"]+)['\"]>((.*\n)*?)</script>", "g");
        d = a.replace(g, function(a, b, c) {
            return f[b] = c, ""
        });
        var h = [{}, null, d];
        for (var i in f)
            h[0][i] = String(e.precompileTemplate(f[i], function(a) {
                return f[a]
            })).replace(/^function\s*\S+\s*\([^)]*\)\s*\{|\}$/g, "");
        return h[1] = G(e), h
    };
    "undefined" != typeof navigator ? (b.Rotors = {
        newInstance: F,
        precompile: H,
        data: h
    }, b.RotorsInstance = D) : (b.newInstance = F, b.instanceClass = D, b.precompile = H, b.data = h)
}.call("undefined" != typeof window ? window : this), null, function() {
    var a = this;
    a.jsPlumbToolkitUtil = a.jsPlumbToolkitUtil || {};
    var b = a.jsPlumbToolkitUtil, c = function(a, b) {
        return function() {
            return a.apply(b, arguments)
        }
    };
    b.requestAnimationFrame = c(a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || function(b, c) {
            a.setTimeout(b, 10)
        }, a);
    b.ajax = function(a) {
        var b = window.XMLHttpRequest ? new XMLHttpRequest: new ActiveXObject("Microsoft.XMLHTTP"), c = a.type || "GET";
        if (b) {
            var d = "json" === a.dataType ? function(a) {
                return JSON.parse(a)
            }
                : function(a) {
                return a
            };
            b.open(c, a.url, !0);
            var e = a.headers || {};
            for (var f in e)
                b.setRequestHeader(f, e[f]);
            b.onreadystatechange = function() {
                4 == b.readyState && ("2" === ("" + b.status)[0] ? a.success(d(b.responseText)) : a.error && a.error(b.responseText, b.status))
            }, b.send(a.data ? JSON.stringify(a.data) : null)
        } else
            a.error && a.error("ajax not supported")
    }, b.debounce = function(a, b) {
        b = b || 150;
        var c = null;
        return function() {
            window.clearTimeout(c), c = window.setTimeout(a, b)
        }
    }, b.xml = {
        setNodeText: function(a, b) {
            a.text = b;
            try {
                a.textContent = b
            } catch (c) {}
        },
        getNodeText: function(a) {
            return null != a ? a.text || a.textContent : ""
        },
        getChild: function(a, b) {
            for (var c = null, d = 0; d < a.childNodes.length; d++)
                if (1 == a.childNodes[d].nodeType && a.childNodes[d].nodeName == b) {
                    c = a.childNodes[d];
                    break
                }
            return c
        },
        getChildren: function(a, b) {
            for (var c = [], d = 0; d < a.childNodes.length; d++)
                1 == a.childNodes[d].nodeType && a.childNodes[d].nodeName == b && c.push(a.childNodes[d]);
            return c
        },
        xmlToString: function(a) {
            try {
                return (new XMLSerializer).serializeToString(a).replace(/\s*xmlns=\"http\:\/\/www.w3.org\/1999\/xhtml\"/g, "")
            } catch (b) {
                try {
                    return a.xml
                } catch (c) {
                    throw new Error("Cannot serialize XML " + c)
                }
            }
            return !1
        },
        createElement: function(a, b, c) {
            var d;
            try {
                d = new ActiveXObject("Microsoft.XMLDOM").createNode(1, a, "")
            } catch (e) {
                d = document.createElement(a)
            }
            if (c && jsPlumbToolkitUtil.xml.setNodeText(d, c), b)
                for (var f in b)
                    d.setAttribute(f, b[f]);
            return d
        }
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    var a = this;
    a.jsPlumbToolkitUtil = a.jsPlumbToolkitUtil || {};
    var b = a.jsPlumbToolkitUtil, c = a.jsPlumbUtil;
    b.fastTrim = function(a) {
        for (var b = a.replace(/^\s\s*/, ""), c = /\s/, d = b.length; c.test(b.charAt(--d)););
        return b.slice(0, d + 1)
    }, b.uuid = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
            var b = 16 * Math.random() | 0, c = "x" == a ? b: 3 & b | 8;
            return c.toString(16)
        })
    }, b.each = function(a, b) {
        a = null == a.length || "string" == typeof a ? [a] : a;
        for (var c = 0; c < a.length; c++)
            b(a[c])
    }, b.populate = function(a, b) {
        var d = function(a) {
            var c = a.match(/(\${.*?})/g);
            if (null != c)
                for (var d = 0; d < c.length; d++) {
                    var e = b[c[d].substring(2, c[d].length - 1)];
                    e && (a = a.replace(c[d], e))
                }
            return a
        }, e = function(a) {
            if (null != a) {
                if (c.isString(a))
                    return d(a);
                if (c.isArray(a)) {
                    for (var b = [], f = 0; f < a.length; f++)
                        b.push(e(a[f]));
                    return b
                }
                if (c.isObject(a)) {
                    var b = {};
                    for (var f in a)
                        b[f] = e(a[f]);
                    return b
                }
                return a
            }
        };
        return e(a)
    }, b.mergeWithParents = function(a, b, c) {
        c = c || "parent";
        var d = function(a) {
            return a ? b[a] : null
        }, e = function(a) {
            return a ? d(a[c]) : null
        }, f = function(a, b) {
            if (null == a)
                return b;
            var c = jsPlumbUtil.merge(a, b);
            return f(e(a), c)
        }, g = function(a) {
            if (null == a)
                return {};
            if ("string" == typeof a)
                return d(a);
            if (a.length) {
                for (var b, c=!1, e = 0; !c && e < a.length;)
                    b = g(a[e]), b ? c=!0 : e++;
                return b
            }
        }, h = g(a);
        return h ? f(e(h), h) : {}
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    var a = {
        nodeTraverseStart: "startNodeTraversal",
        nodeTraverseEnd: "endNodeTraversal",
        start: "startOverlayAnimation",
        end: "endOverlayAnimation"
    }, b = {
        nodeTraversing: "jtk-animate-node-traversing",
        edgeTraversing: "jtk-animate-edge-traversing",
        nodeTraversable: "jtk-animate-node-traversable",
        edgeTraversable: "jtk-animate-edge-traversable"
    };
    jsPlumb.Connection.prototype.animateOverlay = function(c, d) {
        var e = this, f = new jsPlumbUtil.EventGenerator, g = e.getConnector().getLength();
        d = d || {};
        var h, i, j, k = jsPlumbUtil.uuid(), l = d.forwards!==!1, m = d.rate || 30, n = d.dwell || 250, o = d.speed || 100, p = g / o * 1e3, q = p / m, r = 1 / q * (l ? 1 : - 1), s = d.isFinal!==!1, t = l ? 0: 1, u = function() {
            return l ? x >= 1 : 0 >= x
        }, v = l ? e.source: e.target, w = l ? e.target: e.source, x = t, y = function() {
            x += r, u() ? C() : (i.loc = x, e.repaint())
        };
        if ("string" == typeof c)
            j = [c, {
                location: t,
                id: k
            }
            ];
        else {
            var z = jsPlumb.extend({}, c[1]);
            z.location = t, z.id = k, j = [c[0], z]
        }
        var A = function() {
            f.fire(a.start, e), i = e.addOverlay(j), h = window.setInterval(y, m)
        }, B = function() {
            f.fire(a.nodeTraverseStart, {
                connection: e,
                element: v
            }), jsPlumb.addClass(v, b.nodeTraversing), e.addClass(b.edgeTraversing), window.setTimeout(function() {
                jsPlumb.removeClass(v, b.nodeTraversing), f.fire(a.nodeTraverseEnd, {
                    connection: e,
                    element: v
                }), A()
            }, n)
        }, C = function() {
            e.removeOverlay(k), window.clearInterval(h), s ? (jsPlumb.addClass(w, b.nodeTraversing), window.setTimeout(function() {
                jsPlumb.removeClass(w, b.nodeTraversing), e.removeClass(b.edgeTraversing), f.fire(a.end, e)
            }, n)) : (e.removeClass(b.edgeTraversing), f.fire(a.end, e))
        };
        return d.previous ? d.previous.bind(a.end, B) : B(), f
    }
}(), null, function() {
    "use strict";
    var a = this, b = ["node", "port", "edge"], c = ["Refreshed", "Added", "Removed", "Updated", "Moved"], d = ["edge"], e = ["Source", "Target"], f = function(a, b, c, d) {
        for (var e = 0; e < a.length; e++)
            for (var f = 0; f < b.length; f++)
                c.bind(a[e] + b[f], d)
    };
    a.jsPlumbToolkitUtil.AutoSaver = function(a, g, h, i) {
        var j=!1, k = function() {
            j || a.save({
                url: g,
                success: h,
                error: i
            })
        };
        a.bind("dataLoadStart", function() {
            j=!0
        }), a.bind("dataLoadEnd", function() {
            j=!1
        }), f(b, c, a, k), f(d, e, a, k)
    }, a.jsPlumbToolkitUtil.CatchAllEventHandler = function(a) {
        var g = function() {
            a.fire("dataUpdated")
        };
        f(b, c, a, g), f(d, e, a, g)
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    var a = this, b = a.jsPlumbToolkitUtil, c = a.jsPlumbUtil;
    b.Selection = function(a) {
        jsPlumbUtil.EventGenerator.apply(this, arguments);
        var d, e = a.toolkit, f = [], g = [], h = Math.Infinity, i = Math.Infinity, j = a.generator, k = {}, l = this, m = a.onClear || function() {}, n = function(a) {
            return "Edge" === a.objectType ? g : f
        }, o = function(a) {
            var c = [], e = n(a), f = "Edge" === a.objectType ? i: h;
            if (e.length >= f) {
                if (d === b.Selection.DISCARD_NEW)
                    return !1;
                c = e.splice(0, 1), p(c[0], "Removed"), delete k[c[0].getFullId()]
            }
            return e.push(a), p(a, "Added"), c
        }, p = function(a, b) {
            var c = a.objectType.toLowerCase() + b, d = {
                Node: {
                    data: a.data,
                    node: a
                },
                Port: {
                    data: a.data,
                    node: a.node,
                    port: a
                },
                Edge: {
                    data: a.data,
                    edge: a
                }
            };
            l.fire(c, d[a.objectType])
        };
        this.getModel = e.getModel, this.setSuspendGraph = e.setSuspendGraph, this.getNodeId = e.getNodeId, this.getEdgeId = e.getEdgeId, this.getPortId = e.getPortId, this.getNodeType = e.getNodeType, this.getEdgeType = e.getEdgeType, this.getPortType = e.getPortType, this.getObjectInfo = e.getObjectInfo, this.isDebugEnabled = e.isDebugEnabled;
        var q = function(a, b) {
            if (!k[a.getFullId()]) {
                var c = o(a);
                return c===!1 ? [[], []] : (k[a.getFullId()] = a, b && b(a, !0), [[a], c])
            }
            return [[], []]
        }, r = function(a, b) {
            var d = c.removeWithFunction(n(a), function(b) {
                return b.id == a.id
            });
            return d && p(a, "Removed"), delete k[a.getFullId()], b && b(a, !1), [[], []]
        }, s = function(a, b) {
            return k[a.getFullId()] ? r(a, b) : q(a, b)
        }, t = function(a, b, c) {
            var d = [], f = [];
            if (null == a)
                return d;
            var g = function(a) {
                var h;
                if (jsPlumbUtil.isString(a)) {
                    if (h = e.getNode(a) || e.getEdge(a), null != h) {
                        var i = b(h, c);
                        d.push.apply(d, i[0]), f.push.apply(f, i[1])
                    }
                } else if (a.eachNode && a.eachEdge)
                    a.eachNode(function(a, b) {
                        g(b)
                    }), a.eachEdge(function(a, b) {
                        g(b)
                    });
                else if (a.each)
                    a.each(function(a, b) {
                        g(b.vertex || b)
                    });
                else if (null != a.length)
                    for (var j = 0; j < a.length; j++)
                        g(a[j], c);
                else {
                    var i = b(a, c);
                    d.push.apply(d, i[0]), f.push.apply(f, i[1])
                }
            };
            return g(a), [d, f]
        }.bind(this);
        e.bind("nodeRemoved", function(a) {
            r(a.node)
        }), e.bind("portRemoved", function(a) {
            r(a.port)
        }), e.bind("edgeRemoved", function(a) {
            r(a.edge)
        }), e.bind("edgeTarget", function(a) {
            k[a.edge.getFullId()] && l.fire("edgeTarget", a)
        }), e.bind("edgeSource", function(a) {
            k[a.edge.getFullId()] && l.fire("edgeSource", a)
        }), e.bind("nodeUpdated", function(a) {
            k[a.node.getFullId()] && l.fire("nodeUpdated", a)
        }), e.bind("edgeUpdated", function(a) {
            k[a.edge.getFullId()] && l.fire("edgeUpdated", a)
        }), e.bind("portUpdated", function(a) {
            k[a.port.getFullId()] && l.fire("portUpdated", a)
        }), this.remove = function(a, b) {
            return t(a, r, b)
        }, this.append = function(a, b) {
            return t(a, q, b)
        }, this.toggle = function(a, b) {
            return t(a, s, b)
        }, this.setMaxNodes = function(a) {
            h = a
        }, this.setMaxEdges = function(a) {
            i = a
        }, this.setCapacityPolicy = function(a) {
            d = a
        }, this.clear = function(a) {
            f.length = 0, g.length = 0, k = {}, a || m(this)
        }, this.reload = function() {
            if (null != j) {
                this.clear(), this.fire("dataLoadStart"), j(this, e);
                for (var a = 0; a < f.length; a++)
                    l.fire("nodeAdded", f[a]);
                for (var a = 0; a < edges.length; a++)
                    l.fire("edgeAdded", g[a]);
                this.fire("dataLoadEnd")
            }
        }, this.each = function(a, b) {
            for (var c = "Edge" != b ? f : g, d = 0; d < c.length; d++)
                try {
                    a(d, c[d])
                } catch (e) {
                    jsPlumbUtil.log("Selection iterator function failed", e)
                }
        }, this.eachNode = this.each, this.eachEdge = function(a) {
            this.each(a, "Edge")
        }, this.getNodeCount = function() {
            return f.length
        }, this.getNodeAt = function(a) {
            return f[a]
        }, this.getNodes = function() {
            return f
        }, this.getNode = e.getNode, this.getAllEdgesFor = function(a) {
            for (var b = a.getAllEdges(), c = [], d = 0; d < b.length; d++)
                null != k[b[d].getId()] && c.push(b[d]);
            return c
        }, this.getEdgeCount = function() {
            return g.length
        }, this.get = this.getNodeAt = function(a) {
            return f[a]
        }, this.getEdge = function(a) {
            return g[a]
        }, this.setCapacityPolicy(b.Selection.DISCARD_EXISTING)
    }, b.Selection.DISCARD_EXISTING = "discardExisting", b.Selection.DISCARD_NEW = "discardNew"
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    var a = this, b = a.jsPlumbGraph = {};
    b.version = "0.1", b.name = "jsPlumbGraph";
    var c = function(a, b) {
        var c = {};
        this.setAttribute = function(a, b) {
            c[a] = b
        }, this.getAttribute = function(a) {
            return c[a]
        };
        var d = b.getType(a || {});
        this.getType = function() {
            return d
        }, this.setType = function(a) {
            d = a
        }, this.graph = b
    }, d = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
            var b = 16 * Math.random() | 0, c = "x" == a ? b: 3 & b | 8;
            return c.toString(16)
        })
    }, e = function(a, b, c) {
        if (null == a)
            return d();
        if ("string" == typeof a)
            return a;
        var e = b || c.getIdFunction();
        return e(a) || d()
    }, f = function(a) {
        return "string" == typeof a ? {
            id: a
        } : a
    }, g = b.Vertex = b.Node = function(a, d, g) {
        c.apply(this, [a, g]), this.objectType = "Node", this.id = e(a, d, g), this.data = f(a), this.getFullId = function() {
            return this.id
        };
        var i = [], j = 0, k = 0, l = [], m = [], n = {};
        this.getEdges = function(a) {
            if (null == a || null == a.filter)
                return i;
            for (var b = [], c = 0; c < i.length; c++)
                a.filter(i[c]) && b.push(i[c]);
            return b
        }, this.getSourceEdges = function() {
            return this.getEdges({
                filter: function(a) {
                    return a.source == this
                }.bind(this)
            })
        }, this.getTargetEdges = function() {
            return this.getEdges({
                filter: function(a) {
                    return a.target == this
                }.bind(this)
            })
        }, this.addEdge = function(a) {
            i.push(a), a.source !== this && a.isDirected() || k++, a.target !== this && a.isDirected() || j++
        }, this.deleteEdge = function(a) {
            for (var b =- 1, c = 0; c < i.length; c++)
                if (i[c].getId() === a.getId()) {
                    b = c;
                    break
                }
            return b>-1 ? (i.splice(b, 1), a.source !== this && a.isDirected() || k--, a.target !== this && a.isDirected() || j--, !0) : !1
        }, this.getAllEdges = function(a) {
            for (var b = this.getEdges(a).slice(0), c = 0; c < l.length; c++)
                b.push.apply(b, l[c].getEdges(a));
            return b
        }, this.addGraph = function(a) {
            return a = "string" == typeof a ? new b.Graph({
                id: a
            }) : a, m.push(a), a.id || (a.id = "" + m.length), a
        }, this.getGraph = function(a) {
            for (var b = 0; b < m.length; b++)
                if (m[b].id === a)
                    return m[b]
        }, this.getIndegreeCentrality = function() {
            for (var a = 0, b = 0; b < l.length; b++)
                a += l[b].getIndegreeCentrality();
            return j + a
        }, this.getOutdegreeCentrality = function() {
            for (var a = 0, b = 0; b < l.length; b++)
                a += l[b].getOutdegreeCentrality();
            return k + a
        }, this.getPorts = function() {
            return l
        }, this.addPort = function(a, b) {
            var c = e(a, b, g), d = this.getPort(c);
            return null == d && (d = new h(a, b, this), l.push(d), n[d.id] = d), d
        }, this.setPort = function(a, b) {
            var c = this.getPort(a);
            return c || (c = this.addPort({
                id: a
            })), c.data = b, c.setType(this.graph.getType(b)), c
        }, this.getPort = function(a) {
            return n[a]
        };
        var o = function(a) {
            return a.constructor == jsPlumbGraph.Port ? a.id : a
        };
        this.removePort = function(a) {
            if (a) {
                for (var b = o(a), c =- 1, d=!1, e = 0; e < l.length; e++)
                    if (l[e].id === b) {
                        c = e;
                        break
                    }
                - 1 != c && (l.splice(c, 1), d=!0), delete n[b]
            }
            return d
        };
        var p = 0, q = {};
        this.setDefaultInternalCost = function(a) {
            p = a
        }, this.getInternalEdge = function(a, b) {
            var c = o(a), d = o(b), e = {
                source: n[c],
                target: n[d],
                cost: 1 / 0
            };
            if (e.source && e.target) {
                var f = q[c + "-" + d] || {
                        cost: p,
                        directed: !1
                    };
                for (var g in f)
                    e[g] = f[g]
            }
            return e
        }, this.setInternalEdge = function(a, b, c, d) {
            var e = o(a), f = o(b);
            return q[e + "-" + f] = {
                cost: c || p,
                directed: d
            }, this.getInternalEdge(a, b)
        }, this.inspect = function() {
            for (var a = "{ id:" + this.id + ", edges:[\n", b = 0; b < i.length; b++)
                a += i[b].inspect() + "\n";
            return a += "]}"
        }
    }, h = b.Port = function(a, b, c) {
        g.apply(this, [a, b, c.graph]), this.objectType = "Port", this.getNode = function() {
            return c
        }, this.getFullId = function() {
            return c.id + this.graph.getPortSeparator() + this.id
        }, this.isChildOf = function(a) {
            return c == a
        }, this.getPorts = this.addPort = this.deletePort = this.getPort = null
    }, i = b.Edge = function(a) {
        c.call(this, a.data, a.graph), this.source = a.source, this.target = a.target, this.objectType = "Edge";
        var b = a.cost || 1, d=!(a.directed===!1), e = a.id, f = null;
        this.data = a.data || {}, this.getCost = function() {
            return b
        }, this.setCost = function(a) {
            b = a
        }, this.getId = this.getFullId = function() {
            return null === e ? this.source.id + "_" + this.target.id : e
        }, this.setId = function(a) {
            e = a
        }, this.isDirected = function() {
            return d
        }, this.setDirected = function(a) {
            d = a
        }, this.inspect = function() {
            return null != e ? "{ id:" + e + ", connectionId:" + f + ", cost:" + b + ", directed:" + d + ", source:" + this.source.id + ", target:" + this.target.id + "}" : void 0
        }
    }, j = (b.Graph = function(a) {
        a = a || {}, this.vertices = [], this.edges = [], this.id = a.id;
        var c = {}, d = 0, f = {}, h = 0, j=!(a.defaultDirected===!1), k = a.defaultCost || 1, l = a.idFunction || function(a) {
                return a.id
            }, o = a.typeFunction || function(a) {
                return a.type || "default"
            }, p = a.enableSubgraphs===!0, q = a.portSeparator || ".";
        this.setIdFunction = function(a) {
            l = a
        }, this.getIdFunction = function() {
            return l
        }, this.setTypeFunction = function(a) {
            o = a
        }, this.getType = function(a) {
            return o(a)
        }, this.setEnableSubgraphs = function(a) {
            p = a
        }, this.setPortSeparator = function(a) {
            q = a
        }, this.getPortSeparator = function() {
            return q
        };
        var r = function(a, d) {
            if (null == a)
                return null;
            if ("string" != typeof a) {
                if (a.constructor == b.Port || a.constructor == b.Node)
                    return a;
                var e = a;
                if (a = l(a), "string" != typeof a)
                    return e
            }
            var f = p ? a.split("/"): [a], g = function(a) {
                if (c[a])
                    return c[a];
                var b = a.split(q), e = b[0], f = c[e];
                if (2 === b.length && null != f) {
                    var g = f.getPort(b[1]);
                    return null == g && d && (g = f.addPort(b[1])), g
                }
                return f
            };
            if (1 == f.length)
                return g(f[0]);
            if (f.length > 1 && f%2 == 0)
                throw "Subgraph path format error.";
            for (var h = null, i = null, j = 0; j < f.length - 1; j += 2)
                h = g(f[j]), i = h.getGraph(f[j + 1]);
            return i.getVertex(f[f.length - 1])
        };
        this.clear = function() {
            this.vertices.length = 0, d = 0, h = 0, c = {}, f = {}
        }, this.getVertices = this.getNodes = function() {
            return this.vertices
        }, this.getVertexCount = this.getNodeCount = function() {
            return this.vertices.length
        }, this.getVertexAt = this.getNodeAt = function(a) {
            return this.vertices[a]
        }, this.getEdgeCount = function() {
            return h
        }, this.addEdge = function(a, b) {
            var c = null == a.directed ? j===!0: !(a.directed===!1), d = a.cost || k, g = e(a.data, b, this), l = r(a.source, !0), m = r(a.target, !0);
            if (null == l || null == l.objectType)
                throw new TypeError("Unknown source node [" + a.source + "]");
            if (null == m || null == m.objectType)
                throw new TypeError("Unknown target node [" + a.target + "]");
            var n = new i({
                source: l,
                target: m,
                cost: d,
                directed: c,
                data: a.data || {},
                id: g,
                graph: this
            });
            return n.source.addEdge(n), n.target.addEdge(n), f[g] = n, h++, n
        }, this.addVertex = this.addNode = function(a, b) {
            var e = new g(a, b || l, this);
            return c[e.id] ? null : (this.vertices.push(e), c[e.id] = e, e._id = d++, e)
        }, this.addVertices = this.addNodes = function(a, b) {
            for (var c = 0; c < a.length; c++)
                this.addVertex(a[c], b || l)
        }, this.deleteVertex = this.deleteNode = function(a) {
            var b = r(a);
            if (b) {
                for (var e =- 1, f = 0; f < this.vertices.length; f++)
                    if (this.vertices[f].id === b.id) {
                        e = f;
                        break
                    }
                e>-1 && (this.vertices.splice(e, 1), null != b.group && b.group.deleteVertex(b));
                for (var g = b.getEdges(), i = 0; i < g.length; i++)
                    this.deleteEdge(g[i]);
                if (h -= g.length, b.getPorts)
                    for (var j = b.getPorts(), k = 0; k < j.length; k++)
                        this.deleteVertex(j[k]);
                delete c[b.id], d--
            }
        }, this.deleteEdge = function(a) {
            if (a = this.getEdge(a), null != a) {
                var b = r(a.source);
                b && b.deleteEdge(a) && h--;
                var c = r(a.target);
                c && c.deleteEdge(a), delete f[a.getId()]
            }
        }, this.getEdge = function(a) {
            if (null != a) {
                if ("string" != typeof a) {
                    if (a.constructor == b.Edge)
                        return a;
                    var c = a;
                    if (a = l(a), "string" != typeof a)
                        return c
                }
                return f[a]
            }
        }, this.getEdges = function(a) {
            a = a || {};
            var b, c = a.source, d = a.target, e = a.filter || function() {
                    return !0
                }, g = function(a) {
                return !(null != c && a.source == j !== c || null != d && a.target == j !== d)
            }, h = [], i = function(a) {
                e(a) && g(a) && h.push(a)
            };
            if (a.node) {
                var j = r(a.node), k = j.getAllEdges();
                for (b = 0; b < k.length; b++)
                    i(k[b])
            } else
                for (b in f)
                    i(f[b]);
            return h
        }, this.getAllEdges = function() {
            var a = [];
            for (var b in f)
                a.push(f[b]);
            return a
        }, this.findPath = function(a, b, c, d, e) {
            return a = r(a), b = r(b), n.compute({
                graph: this,
                source: a,
                target: b,
                strict: !(c===!1),
                nodeFilter: d,
                edgeFilter: e
            })
        }, this.getDistance = function(a, b, c) {
            var d = this.findPath(a, b, c);
            return d.pathDistance
        }, this.getVertex = this.getNode = r, this.setTarget = function(a, b) {
            if (b = r(b), null == b)
                return {
                    success: !1
                };
            var c = a.target;
            return a.target.deleteEdge(a), a.target = b, b.addEdge(a), {
                old: c,
                edge: a,
                "new": b,
                success: !0
            }
        }, this.setSource = function(a, b) {
            if (b = r(b), null == b)
                return {
                    success: !1
                };
            var c = a.source;
            return a.source.deleteEdge(a), a.source = b, b.addEdge(a), {
                old: c,
                edge: a,
                "new": b,
                success: !0
            }
        }, this.printPath = function(a, b) {
            a = r(a), b = r(b);
            for (var c = this.findPath(a, b).path, d = "[" + a.id + " - " + b.id + "] : ", e = 0; e < c.length; e++)
                d = d + "{ vertex:" + c[e].vertex.id + ", cost:" + c[e].cost + ", edge: " + (c[e].edge && c[e].edge.getId()) + " } ";
            return d
        }, this.getDiameter = function(a) {
            for (var b = 0, c = 0; c < this.vertices.length; c++)
                for (var d = 0; d < this.vertices.length; d++)
                    if (d != c) {
                        var e = n.compute({
                            graph: this,
                            source: this.vertices[c],
                            target: this.vertices[d]
                        });
                        if (null == e.path || 0 == e.path.length) {
                            if (!a)
                                return 1 / 0
                        } else
                            b = Math.max(b, e.pathDistance)
                    }
            return b
        }, this.diameter = this.getDiameter, this.getCentrality = function(a) {
            return a = r(a), (a.getIndegreeCentrality() + a.getOutdegreeCentrality()) / (this.getVertexCount() - 1)
        }, this.getDegreeCentrality = this.getCentrality, this.getIndegreeCentrality = function(a) {
            return a = r(a), a.getIndegreeCentrality() / (this.getVertexCount() - 1)
        }, this.getOutdegreeCentrality = function(a) {
            return a = r(a), a.getOutdegreeCentrality() / (this.getVertexCount() - 1)
        }, this.getCloseness = function(a) {
            return 1 / this.getFarness(a)
        }, this.getFarness = function(a) {
            a = r(a);
            var b = n.compute({
                graph: this,
                source: a,
                target: a,
                processAll: !0
            }), c = 0;
            for (var d in b.dist)
                c += b.dist[d];
            return c / (this.getVertexCount() - 1)
        }, this.getBetweenness = function(a) {
            var b = this.getVertexCount(), c = (b - 1) * (b - 2) / 2, d = 0, e = 0, f = function(a, b, c, d, e) {
                var g = c.parents[a][b];
                if (0 == g.length) {
                    var h = d.slice();
                    h.unshift(a), e.push(h)
                } else
                    for (var i = 0; i < g.length; i++)
                        if ( - 1 == d.indexOf(g[i][0].id)) {
                            var h = d.slice();
                            h.unshift(g[i][0].id), f(a, g[i][0].id, c, h, e)
                        }
            };
            a = r(a);
            var g = m.compute({
                graph: this,
                focus: a
            });
            for (var h in g.paths)
                for (var i in g.paths[h])
                    if (h != i) {
                        var j = [], k = 0;
                        f(h, i, g, [i], j);
                        for (var l = 0; l < j.length; l++) {
                            var n = j[l].indexOf(a.id);
                            n > 0 && n < j[l].length - 1 && k++
                        }
                        d += k / j.length, e += k
                    }
            return d / c
        }, this.inspect = function() {
            for (var a = "", b = 0; b < this.vertices.length; b++)
                a += this.vertices[b].inspect() + "\n";
            return a
        }, this.serialize = function() {
            for (var a = {
                nodes: [],
                edges: [],
                ports: []
            }, b = 0; b < this.vertices.length; b++) {
                var c = this.vertices[b];
                a.nodes.push(c.data);
                for (var d = c.getAllEdges(), e = c.getPorts(), f = 0; f < d.length; f++)
                    if (d[f].source == c || "Port" === d[f].source.objectType && d[f].source.getNode() == c) {
                        var g = {
                            source: d[f].source.getFullId(),
                            target: d[f].target.getFullId()
                        };
                        d[f].data && (g.data = d[f].data), a.edges.push(g)
                    }
                for (var h = 0; h < e.length; h++) {
                    var i = {};
                    for (var j in e[h].data)
                        i[j] = e[h].data[j];
                    i.id = e[h].getFullId(), a.ports.push(i)
                }
            }
            return a
        }
    }, function(a, b, c, d, e) {
        for (var f =- 1, g = null, h = 1 / 0, i = 0; i < a.length; i++)
            if (!b[i]) {
                var j = e(a[i]);
                h > j && (h = j, f = i, g = a[i])
            }
        return {
            node: g,
            index: f
        }
    }), k = function(a, b) {
        var c = b.getFullId(), d = a[c];
        return null == d && (c = b.getNode ? b.getNode().id : b.id, d = a[c]), null == d ? null : {
            p: d,
            id: c
        }
    }, l = function(a, b, c, d, e, f) {
        for (var g = [], h = d, i = k(b, h); null != i;)
            g.splice(0, 0, {
                vertex: h,
                cost: a[i.id],
                edge: c[i.id]
            }), h = i.p, i = k(b, h);
        return g.splice(0, 0, {
            vertex: h,
            cost: 0,
            edge: null
        }), g
    }, m = {
        getPath: function(a, b, c, d) {
            if (a[c.id][d.id] == 1 / 0)
                return null;
            var e = b[c.id][d.id];
            return null == e ? " " : m.getPath(a, b, c, e) + " " + e.id + " " + m.getPath(a, b, e, d)
        },
        getPaths: function(a, b, c, d, e) {
            if (a[c.id][d.id] == 1 / 0)
                return null;
            var f = b[c.id][d.id];
            return 0 == f.length ? " " : m.getPaths(a, b, c, f[0]) + " " + f[0].id + " " + m.getPaths(a, b, f[0], d)
        },
        compute: function(a) {
            var b, c, d, e = a.graph, f = e.getVertexCount(), g = {}, h = {};
            for (b = 0; f > b; b++) {
                var i = e.getVertexAt(b);
                for (g[i.id] || (g[i.id] = {})
                         , h[i.id] || (h[i.id] = {}), g[i.id][i.id] = 0, c = 0;
                     f > c;
                     c++)if (b != c) {
                    var j = e.getVertexAt(c);
                    g[i.id][j.id] || (g[i.id][j.id] = 1 / 0), h[i.id][j.id] || (h[i.id][j.id] = [])
                }
                var k = i.getEdges();
                for (d = 0; d < k.length; d++)
                    k[d].source == i ? g[i.id][k[d].target.id] = k[d].getCost() : (g[k[d].source.id] || (g[k[d].source.id] = {}, h[k[d].source.id] = {}), g[i.id][k[d].source.id] = k[d].getCost())
            }
            for (d = 0; f > d; d++)
                for (b = 0; f > b; b++)
                    for (c = 0; f > c; c++)
                        if (b != c && c != d && b != d) {
                            var l = e.getVertexAt(b).id, m = e.getVertexAt(c).id, n = e.getVertexAt(d).id;
                            g[l][n] + g[n][m] <= g[l][m] && g[l][n] + g[n][m] != 1 / 0 && (g[l][m] = g[l][n] + g[n][m], h[l][m] || (h[l][m] = []), h[l][m].unshift([e.getVertexAt(d), g[l][m]]))
                        }
            return {
                paths: g,
                parents: h
            }
        }
    }, n = {
        compute: function(a) {
            for (var b = a.graph, c = a.source, d = a.target, e = a.nodeFilter, f = a.edgeFilter, g = {}, h = {}, i = {}, k = {
                dist: g,
                previous: h,
                edges: i,
                path: []
            }, m = a.processAll, n = {}, o = {}, p=!(a.strict===!1), q = function(a) {
                return a.getFullId ? a.getFullId() : a.id
            }, r = [], s = function(a) {
                var b = o[a.getFullId()];
                return n[b.v.id]
            }, t = function(a, b) {
                var c, d;
                if ("Port" === a.objectType) {
                    for (g[a.getFullId()] = b, c = s(a)
                             , d = 0;
                         d < c.length;
                         d++)c[d].p != a && (g[c[d].p.getFullId()] = b + a.getNode().getInternalEdge(a, c[d].p).cost);
                    p || (g[a.getNode().id] = b)
                } else
                    for (g[a.id] = b, c = n[a.id], d = 0; d < c.length; d++)
                        g[c[d].p.getFullId()] = b
            }, u = function(a) {
                return e&&!e(a) ? 1 / 0 : g[q(a)]
            }, v = function(a, b, c) {
                if ("Port" === a.objectType) {
                    for (var d = s(a), e = 0; e < d.length; e++)
                        h[d[e].p.getFullId()] = c.node;
                    p || (h[a.getNode().id] = c.node)
                }
                h[b] = c.node
            }, w = function(a, b, c) {
                if ("Port" === a.objectType) {
                    for (var d = s(a), e = 0; e < d.length; e++)
                        i[d[e].p.getFullId()] = c;
                    p || (i[a.getNode().id] = c)
                }
                i[b] = c
            }, x = 0; x < b.vertices.length; x++) {
                var y = b.vertices[x], z = y.getPorts();
                r.push(y);
                var A = {
                    v: y,
                    i: r.length - 1
                };
                n[y.id] = [], t(y, 1 / 0);
                for (var B = 0; B < z.length; B++)
                    r.push(z[B]), o[z[B].getFullId()] = A, n[y.id].push({
                        p: z[B],
                        i: r.length - 1
                    }), t(z[B], 1 / 0)
            }
            if (null == c && (c = b.getVertex(a.sourceId)), null == d && (d = b.getVertex(a.targetId)), null == c || null == d)
                return k;
            var C = c, D = d;
            c.getNode && (C = c.getNode()), d.getNode && (D = d.getNode()), t(c, 0);
            for (var E = new Array(b.vertices.length), F = 0, G = function(a, b, c, d) {
                for (var e = 0; e < b.length; e++) {
                    var f = b[e];
                    if (c(f)) {
                        var g = d(f), h = g.tp || g.tn, i = q(h), j = u(a.node) + f.getCost(), k = u(h);
                        k > j && (t(h, j), v(h, i, a), w(h, i, f))
                    }
                }
            }; F < r.length;) {
                var H = j(r, E, g, q, u), I = H.node ? q(H.node): null;
                if (!H.node || u(H.node) == 1 / 0)
                    break;
                if (d && (I == q(d) ||!p && H.node.isChildOf && H.node.isChildOf(d)) && (k.path = l(g, h, i, d, q), k.pathDistance = k.path[k.path.length - 1].cost, !m))
                    break;
                E[H.index]=!0, F += 1, G(H, H.node.getAllEdges(), function(a) {
                    return f&&!f(a)?!1 : !a.isDirected() || H.node == a.source ||!p && a.source.isChildOf && a.source.isChildOf(H.node)
                }, function(a) {
                    var b = a.source.getNode ? a.source.getNode(): a.source, c = a.source.getNode ? a.source: null, d = a.target.getNode ? a.target.getNode(): a.target, e = a.target.getNode ? a.target: null;
                    return a.source == H.node ||!p && a.source.isChildOf && a.source.isChildOf(H.node) ? {
                        tn: d,
                        tp: e
                    } : {
                        tn: b,
                        tp: c
                    }
                })
            }
            return k
        }
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    var a = this, b = a.jsPlumbUtil, c = a.jsPlumb, d = a.jsPlumbToolkitUtil, e = "type", f = "default", g = function(a) {
        return a.id
    };
    a.jsPlumbToolkitInstance = function(h) {
        h = h || {};
        var i = h.idFunction || g, j = h.typeProperty || e, k = h.edgeTypeProperty || e, l = h.portTypeProperty || e, m = h.typeFunction || function(a) {
                return a[j] || f
            }, n = h.edgeIdFunction || i, o = h.edgeTypeFunction || function(a) {
                return a[k] || f
            }, p = h.portIdFunction || i, q = h.portTypeFunction || function(a) {
                return a[l] || f
            }, r = h.portExtractor, s = this, t=!1, u=!1, v = h.model || {}, w = function(a, c, e) {
            c = null != c && b.isObject(c) ? c : {}, c = b.clone(c), c.id = c.id || d.uuid(), c.type = c.type || (null == a ? null : a.type || a), e(c)
        }, x = h.nodeFactory || w, y = h.edgeFactory || w, z = h.portFactory || w, A = h.autoSave && h.saveUrl, B = h.saveUrl, C = h.onAutoSaveSuccess || function() {}, D = h.onAutoSaveError || function() {}, E = h.doNotUpdateOriginalData===!0, F = {
            portSeparator: h.portSeparator,
            defaultCost: h.defaultCost,
            defaultDirected: h.defaultDirected,
            enableSubgraphs: h.enableSubgraphs
        };
        b.EventGenerator.apply(this, arguments);
        var G = new jsPlumbGraph.Graph(F);
        A && new d.AutoSaver(this, B, C, D), new d.CatchAllEventHandler(this), this.getNodeFactory = function() {
            return x
        }, this.getEdgeFactory = function() {
            return y
        }, this.getPortFactory = function() {
            return z
        }, this.setNodeFactory = function(a) {
            x = a
        }, this.setEdgeFactory = function(a) {
            y = a
        }, this.setPortFactory = function(a) {
            z = a
        }, this.setDebugEnabled = function(a) {
            u = a
        }, this.isDebugEnabled = function() {
            return u
        }, this.getModel = function() {
            return v || {}
        };
        var H, I = function() {
            return null == H && (H = new jsPlumbToolkit.Model(v || {})), H
        }, J = function(a, b) {
            if (null == v)
                return !0;
            var c = this.getType(a), d = this.getType(b), e = I(), f = a.getNode ? a.getNode(): a, g = b.getNode ? b.getNode(): b, h = "Node" == a.objectType ? e.getNodeDefinition(c): e.getPortDefinition(c), i = "Node" == b.objectType ? e.getNodeDefinition(d): e.getPortDefinition(d), j = this.getNodeType(f), k = this.getNodeType(g), l = e.getNodeDefinition(j), m = e.getNodeDefinition(k);
            return null != h.maxConnections && a.getEdges().length >= h.maxConnections?!1 : null != i.maxConnections && b.getEdges().length >= i.maxConnections?!1 : a == b?!(l.allowLoopback===!1 || h.allowLoopback===!1 || i.allowLoopback===!1 || m.allowLoopback===!1) : f == g?!(l.allowNodeLoopback===!1 || h.allowNodeLoopback===!1 || i.allowNodeLoopback===!1 || m.allowNodeLoopback===!1) : !0
        }.bind(this);
        this.beforeConnect = h.beforeConnect || J, this.beforeMoveConnection = h.beforeMoveConnection || J, this.beforeStartConnect = h.beforeStartConnect || function(a, b) {
                return {}
            }, this.beforeDetach = h.beforeDetach || function(a, b, c) {
                return !0
            }, this.beforeStartDetach = h.beforeStartDetach || function(a, b) {
                return !0
            }, this.setSuspendGraph = function(a) {
            t = a
        }, this.setDoNotUpdateOriginalData = function(a) {
            E = a
        }, this.getTypeFunction = function() {
            return m
        }, this.connect = function(a) {
            a = a || {};
            var b;
            if (!t) {
                var d = G.getVertex(a.source), e = G.getVertex(a.target), f = a.cost, g = a.directed;
                if (!d) {
                    if (a.doNotCreateMissingNodes)
                        return;
                    d = G.addVertex(a.source), s.fire("nodeAdded", {
                        data: {},
                        node: d
                    })
                }
                if (!e) {
                    if (a.doNotCreateMissingNodes)
                        return;
                    e = G.addVertex(a.target), s.fire("nodeAdded", {
                        data: {},
                        node: e
                    })
                }
                var h = this.beforeStartConnect(d, o(a.data || {}));
                if (h) {
                    var i = a.data || {};
                    "object" == typeof h && c.extend(i, h);
                    var j = this.beforeConnect(d, e, i);
                    j!==!1 && (b = G.addEdge({
                        source: d,
                        target: e,
                        cost: f,
                        directed: g,
                        data: i
                    }), s.fire("edgeAdded", {
                        edge: b
                    }))
                }
            }
            return b
        }, this.clear = function() {
            return G.clear(), this.fire("graphCleared"), this
        }, this.getGraph = function() {
            return G
        }, this.getNodeCount = function() {
            return G.getVertexCount()
        }, this.getNodeAt = function(a) {
            return G.getVertexAt(a)
        }, this.getNodes = function() {
            return G.getVertices()
        }, this.eachNode = function(a) {
            for (var b = 0, c = G.getVertexCount(); c > b; b++)
                a(b, G.getVertexAt(b))
        }, this.eachEdge = function(a) {
            for (var b = G.getEdges(), c = 0, d = b.length; d > c; c++)
                a(c, b[c])
        }, this.getEdgeCount = function() {
            return G.getEdgeCount()
        }, this.getNodeId = function(a) {
            return b.isObject(a) ? i(a) : a
        }, this.getNodeType = function(a) {
            return m(a) || "default"
        }, this.getEdgeId = function(a) {
            return b.isObject(a) ? n(a) : a
        }, this.getEdgeType = function(a) {
            return o(a) || "default"
        }, this.getPortId = function(a) {
            return b.isObject(a) ? p(a) : a
        }, this.getPortType = function(a) {
            return q(a) || "default"
        }, this.getType = function(a) {
            var b = "Node" === a.objectType ? m: "Port" === a.objectType ? q: o;
            return b(a.data) || "default"
        }, this.setType = function(a, b) {
            var c = this.getType(a);
            if (c !== b) {
                var d = "Node" === a.objectType ? j: "Port" === a.objectType ? l: k, e = a.objectType.charAt(0).toLowerCase() + a.objectType.substring(1) + "TypeChanged";
                a.data[d] = b, this.fire(e, {
                    obj: a,
                    previousType: c,
                    newType: b
                })
            }
        }, this.addNode = function(b, c, e) {
            var f = i(b);
            null == f && "string" != typeof b && (b.id = d.uuid());
            var g = G.addNode(b, i);
            if (null != g) {
                if (null != r) {
                    var h = r(g.data, g);
                    if (null != h)
                        for (var j = 0; j < h.length; j++)
                            g.addPort(h[j])
                }
                return P || E || a.jsPlumbToolkitIO.manage("addNode", N, O, g, i || G.getIdFunction(), s), e || s.fire("nodeAdded", {
                    data: b,
                    node: g,
                    eventInfo: c
                }), g
            }
            return G.getNode(f)
        }, this.addFactoryNode = function(a, b, c) {
            b = 2 != arguments.length || null != arguments[1] && "object" != typeof arguments[1] ? {} : arguments[1], c = 3 == arguments.length ? arguments[2] : "function" == typeof arguments[1] ? arguments[1] : null, b.type = b.type || a, x(a, b, function(a) {
                var b = this.addNode(a);
                c && c(b)
            }.bind(this))
        }, this.addNodes = function(a) {
            for (var b = 0; b < a.length; b++)
                s.addNode.apply(s, [a[b]]);
            return s
        }, this.getNode = function(a) {
            return G.getVertex(a)
        }, this.getEdge = function(a) {
            return G.getEdge(a)
        }, this.exists = function(a) {
            for (var b = 0; b < arguments.length; b++)
                if (null == G.getVertex(arguments[b]))
                    return !1;
            return !0
        }, this.removeNode = function(b, c) {
            b = b.constructor == jsPlumbGraph.Vertex || b.constructor == jsPlumbGraph.Port ? b : G.getVertex(b);
            for (var d = b.getAllEdges() || [], e = 0; e < d.length; e++)
                s.removeEdge(d[e]);
            return G.deleteVertex(b.id), P || E || a.jsPlumbToolkitIO.manage("removeNode", N, O, b, i || G.getIdFunction(), s), c || s.fire("nodeRemoved", {
                node: b,
                nodeId: b.id,
                edges: d
            }), s
        }, this.addEdge = function(b, c, d) {
            var e = G.addEdge(b, n);
            return P || E || a.jsPlumbToolkitIO.manage("addEdge", N, O, e, n || G.getIdFunction(), s), d || s.fire("edgeAdded", {
                edge: e,
                source: c,
                geometry: b.geometry,
                addedByMouse: b.addedByMouse
            }, null), e
        }, this.removeEdge = function(b, c) {
            return b = G.getEdge(b), null != b && (G.deleteEdge(b), P || E || a.jsPlumbToolkitIO.manage("removeEdge", N, O, b, n || G.getIdFunction(), s), s.fire("edgeRemoved", {
                edge: b,
                source: c
            }, null)), s
        }, this.edgeMoved = function(a, b, c) {
            var d = (a[0 === c ? "source": "target"], 0 == c ? "setSource" : "setTarget");
            return this[d](a, b)
        }, this.setTarget = function(a, b, c) {
            var d = G.setTarget.apply(G, arguments);
            return d.success===!1 || c || s.fire("edgeTarget", d), d
        }, this.setSource = function(a, b, c) {
            var d = G.setSource.apply(G, arguments);
            return d.success===!1 || c || s.fire("edgeSource", d), d
        }, this.addNewPort = function(b, c, d, e) {
            b = G.getVertex(b), z({
                node: b,
                type: c
            }, d, function(c) {
                var d = p(c), f = b.addPort(d);
                f.data = c, P || E || a.jsPlumbToolkitIO.manage("addPort", N, O, {
                    node: b,
                    port: f
                }, p || G.getIdFunction(), s), e || s.fire("portAdded", {
                    node: b,
                    data: c,
                    port: f
                }, null)
            })
        }, this.addPort = function(b, c, d) {
            var e = b.addPort(c, p);
            return P || E || a.jsPlumbToolkitIO.manage("addPort", N, O, {
                node: b,
                port: e
            }, p || G.getIdFunction(), s), d || s.fire("portAdded", {
                node: b,
                data: c,
                port: e
            }, null), e
        }, this.removePort = function(a, b, c) {
            var d=!1;
            a = a.constructor == jsPlumbGraph.Vertex || a.constructor == jsPlumbGraph.Port ? a : G.getVertex(a);
            var e = a.getPort(b);
            if (e) {
                var f = e.getAllEdges();
                if (d = a.removePort(e), d&&!c) {
                    s.fire("portRemoved", {
                        node: a,
                        port: e,
                        edges: f
                    }, null);
                    for (var g = 0; g < f.length; g++)
                        s.removeEdge(f[g])
                }
            }
            return d
        }, this.remove = function(a) {
            if (null != a) {
                var b = s.getObjectInfo(a);
                s.setSuspendRendering(!0);
                try {
                    if (!b.obj || "Node" != b.type && "Edge" != b.type) {
                        for (; a.getNodeCount() > 0;)
                            s.removeNode(a.get(0));
                        for (; a.getEdgeCount() > 0;)
                            s.removeEdge(a.getEdge(0))
                    } else
                        s["remove" + b.type](b.obj)
                } finally {
                    s.setSuspendRendering(!1, !0)
                }
            }
        }, this.setSuspendRendering = function(a, b) {
            for (var c in X)
                X[c].setSuspendRendering(a, b)
        }, this.batch = function(a) {
            s.setSuspendRendering(!0);
            try {
                a()
            } catch (b) {
                jsPlumbUtil.log("Error in transaction " + b)
            } finally {
                s.setSuspendRendering(!1, !0)
            }
        };
        var K = function(a, c, d, e, f) {
            var g = G.getNode(a);
            if (g && g.objectType) {
                if (c)
                    for (var h in c)
                        b.replace(g.data, h, c[h]);
                s.fire(d, e(g), null)
            }
        }.bind(this);
        this.updateNode = function(a, b) {
            K(a, b, "nodeUpdated", function(a) {
                return {
                    node: a,
                    updates: b || {}
                }
            })
        }, this.updatePort = function(a, b) {
            K(a, b, "portUpdated", function(a) {
                return {
                    port: a,
                    node: a.getNode(),
                    updates: b || {}
                }
            })
        }, this.updateEdge = function(a, c) {
            var d = G.getEdge(a);
            if (d) {
                if (c)
                    for (var e in c)
                        null == d.data[e] ? d.data[e] = c[e] : b.replace(d.data, e, c[e]);
                s.fire("edgeUpdated", {
                    edge: d,
                    updates: c || {}
                }, null)
            }
        }, this.update = function(a, c) {
            return b.isString(a) && (a = this.getNode(a)), a && a.objectType && this["update" + a.objectType](a, c), a
        }, this.getPath = function(b) {
            return new a.jsPlumbToolkit.Path(this, b)
        };
        var L = this.findGraphObject = function(a) {
            return null == a ? null : "*" === a ? G : a.constructor == jsPlumbGraph.Vertex || a.constructor == jsPlumbGraph.Port ? a : b.isString(a) || b.isObject(a) ? G.getVertex(a) : null
        }, M = function(a, b, c) {
            a = a || {};
            var d = [], e = {}, f = function(a) {
                e[a.getId()] || (d.push(a), e[a.getId()]=!0)
            }, g = function(d, e, g, h) {
                if (null != d)
                    for (var i = d[b]({
                        filter: a.filter
                    }), j = 0; j < i.length; j++) {
                        var k = e && d == G || i[j].source == d || c && i[j].source.constructor == jsPlumbGraph.Port && i[j].source.getNode() == d, l = g && d == G || i[j].target == d || c && i[j].target.constructor == jsPlumbGraph.Port && i[j].target.getNode() == d;
                        (e && k || g && l || h && (k || l)) && f(i[j])
                    }
            };
            return g(L(a.source), !0, !1, !1), g(L(a.target), !1, !0, !1), g(L(a.element), !1, !1, !0), d
        };
        this.getEdges = function(a) {
            return M(a, "getEdges", !1)
        }, this.getAllEdges = function() {
            return G.getAllEdges()
        }, this.getAllEdgesFor = function(a, b) {
            return a.getAllEdges({
                filter: b
            })
        };
        var N, O, P, Q = function(b, c, e) {
            b = b || {};
            var f = b.type || "json", g = b.data, h = b.url, i = b.jsonp, j = b.onload, k = b.parameters || {}, l = b.error || function() {};
            if (null == g && null == h)
                throw new TypeError("You must supply either data or url to load.");
            var m = function(b) {
                N = b, O = f, P=!0, s.fire(c), a.jsPlumbToolkitIO.parse(f, b, s, k), W(e), j && j(s, b), s.fire("graphChanged")
            };
            if (g)
                m(g);
            else if (h) {
                if (i) {
                    var n =- 1 === h.indexOf("?") ? "?" : "&";
                    h = h + n + "callback=?"
                }
                var o = "json" === f ? f: b.dataType, p = b.headers || {
                        Accept: "application/json"
                    };
                d.ajax({
                    url: h,
                    success: m,
                    dataType: o,
                    error: l,
                    headers: p
                })
            }
            return s
        };
        this.load = function(a) {
            return Q(a, "dataLoadStart", "dataLoadEnd")
        }, this.append = function(a) {
            return Q(a, "dataAppendStart", "dataAppendEnd")
        }, this.save = function(a) {
            a = a || {};
            var b = this.exportData(a);
            return d.ajax({
                url: a.url,
                type: "POST",
                data: b,
                success: a.success,
                error: a.error
            }), s
        }, this.exportData = function(b) {
            return b = b || {}, a.jsPlumbToolkitIO.exportData(b.type || "json", s, b.parameters)
        };
        var R = function(a) {
            return new d.Selection({
                toolkit: s,
                onClear: a || function() {}
            })
        }, S = R(function(a) {
            s.fire("selectionCleared", {
                selection: a
            })
        });
        h.maxSelectedNodes && S.setMaxNodes(h.maxSelectedNodes), h.maxSelectedEdges && S.setMaxEdges(h.maxSelectedEdges), h.selectionCapacityPolicy && S.setCapacityPolicy(h.selectionCapacityPolicy);
        var T = function(a, b, c, d) {
            return b || c.clear(!0), c.append(a, function(a) {
                d && s.fire("select", {
                    append: b,
                    obj: a,
                    selection: c
                })
            })
        };
        this.setSelection = function(a) {
            T(a, !1, S, !0)
        }, this.select = function(a, b) {
            var c = R(), d = T(a, !0, c);
            if (b)
                for (var e = 0; e < d[0].length; e++) {
                    var f = d[0][e];
                    if ("Node" == f.objectType || "Port" == f.objectType)
                        for (var g = f.getAllEdges(), h = 0; h < g.length; h++)
                            c.append(g[h])
                }
            return c
        };
        var U = function(a, b, c, d) {
            for (var e = a.getAllEdges(), f = 0, g = e.length; g > f; f++)
                if (e[f].source === a || e[f].getNode && e[f].getNode() === a) {
                    var h = e[f].target, i = h.getFullId();
                    d[i] || (b.append(h), c && b.append(e[f]), d[i]=!0, U(h, b, c, d))
                }
        };
        this.selectDescendants = function(a, b, c) {
            var d = s.getObjectInfo(a), e = R();
            if (d.obj && "Node" === d.obj.objectType) {
                b && T(d.obj, !0, e);
                var f = {};
                f[d.obj.getFullId()]=!0, U(d.obj, e, c, f)
            }
            return e
        }, this.filter = function(a, b) {
            var c = "function" == typeof a ? a: function(c) {
                var d = c.data, e=!1;
                for (var f in a) {
                    var g = a[f] === d[f];
                    if (!g&&!b)
                        return !1;
                    e = e || g
                }
                return e
            }, d = R();
            return this.eachNode(function(a, b) {
                c(b) && d.append(b);
                for (var e = b.getPorts(), f = 0; f < e.length; f++)
                    c(e[f]) && d.append(e[f])
            }), this.eachEdge(function(a, b) {
                c(b) && d.append(b)
            }), d
        }, this.addToSelection = function(a) {
            var b = this.getObjectInfo(a);
            if (b) {
                var c = T(b.obj, !0, S, !0);
                V("deselect", c[1]), V("select", c[0])
            }
        };
        var V = function(a, b) {
            for (var c = 0; c < b.length; c++)
                s.fire(a, {
                    obj: b[c],
                    selection: S
                })
        };
        this.toggleSelection = function(a) {
            var b = this.getObjectInfo(a);
            if (b) {
                var c = [], d = S.toggle(b.obj, function(a, b) {
                    b || c.push(a)
                });
                V("deselect", d[1]), V("deselect", c), V("select", d[0])
            }
        }, this.removeFromSelection = function(a) {
            var b = this.getObjectInfo(a);
            b && S.remove(b.obj, function(a) {
                s.fire("deselect", {
                    obj: a,
                    selection: S
                })
            })
        }, this.addPathToSelection = function(a) {
            this.addToSelection(this.getPath(a))
        }, this.selectAll = function() {
            throw new TypeError("not implemented")
        }, this.clearSelection = S.clear, this.getSelection = function() {
            return S
        }, this.setMaxSelectedNodes = function(a) {
            S.setMaxNodes(a)
        }, this.setMaxSelectedEdges = function(a) {
            S.setMaxEdges(a)
        }, this.setSelectionCapacityPolicy = function(a) {
            S.setCapacityPolicy(a)
        };
        var W = function(a) {
            s.setSuspendGraph(!0), s.fire(a), s.setSuspendGraph(!1), P=!1
        }, X = {};
        if (this.render = function(b, d) {
                var e = c.extend({}, d || {});
                c.extend(e, b), e.toolkit = s, null != b.selection && (b.selection.constructor === jsPlumbToolkitUtil.Selection ? e.toolkit = b.selection : e.toolkit = new jsPlumbToolkitUtil.Selection({
                    generator: b.selection,
                    toolkit: s
                }));
                var f = e.type || a.jsPlumbToolkit.DefaultRendererType, g = new a.jsPlumbToolkit.Renderers[f](e), h = e.id || jsPlumbUtil.uuid();
                return X[h] = g, g.id = h, g
            }, this.getRenderer = function(a) {
                return X[a]
            }, this.getRenderers = function() {
                return X
            }, this.getObjectInfo = function(a, d) {
                var e = {
                    els: {},
                    obj: null,
                    type: null,
                    id: null,
                    el: null
                }, f = function(a) {
                    return null != a ? a.jtk ? a : f(a.parentNode) : void 0
                }, g = function(a) {
                    var b = {};
                    for (var c in X)
                        b[c] = [X[c], X[c].getRenderedElement(a)];
                    return b
                };
                if (null != a) {
                    if (a.eachNode && a.eachEdge)
                        return {
                            obj: a
                        };
                    if (b.isArray(a))
                        return {
                            obj: a
                        };
                    var h = c.getElement(a);
                    if (null != h && h.jtk)
                        e.el = h, e.obj = h.jtk.port || h.jtk.node;
                    else if (null != a.tagName) {
                        var i = f(h);
                        null != i && (e.el = i, e.obj = i.jtk.port || i.jtk.node)
                    } else {
                        if ("string" == typeof a && (a = this.getNode(a)), null == a)
                            return e;
                        e.obj = a, null != d && (e.el = d(a))
                    }
                    null == d && (e.els = g(e.obj)), null != e.obj && (e.id = e.obj.id, e.type = e.obj.objectType)
                }
                return e
            }, h.data) {
            var Y = h.dataType || "json";
            s.load({
                data: h.data,
                type: Y
            })
        }
    }, b.extend(a.jsPlumbToolkitInstance, b.EventGenerator), a.jsPlumbToolkit = new a.jsPlumbToolkitInstance({}), a.jsPlumbToolkit.DefaultRendererType = null, a.jsPlumbToolkit.ready = c.ready, a.jsPlumbToolkit.Renderers = {}, a.jsPlumbToolkit.Widgets = {}, a.jsPlumbToolkit.newInstance = function(b) {
        return new a.jsPlumbToolkitInstance(b)
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    var a = jsPlumbToolkit, b = jsPlumbToolkitUtil, c = jsPlumbUtil;
    a.Model = function(d, e) {
        d = d || {}, d.nodes = d.nodes || {}, d.edges = d.edges || {}, d.ports = d.ports || {};
        var f, g, h = {}, i = function(a) {
            var c = b.mergeWithParents([a, "default"], d.nodes);
            return delete c.parent, c
        }, j = function(a) {
            var c = b.mergeWithParents([a, "default"], d.edges);
            return delete c.parent, c
        }, k = function(a, c) {
            var e = c && c.ports ? b.mergeWithParents([a, "default"], c.ports): b.mergeWithParents([a, "default"], d.ports);
            return delete e.parent, e
        };
        if ("undefined" != typeof e) {
            for (var l in d.edges) {
                if (f = j(l), f.overlays)
                    for (g = 0; g < f.overlays.length; g++)
                        if (c.isArray(f.overlays[g]) && f.overlays[g][1].events)
                            for (var m in f.overlays[g][1].events)
                                f.overlays[g][1].events[m] = function(a, b) {
                                    return function(c, d) {
                                        a.call(b, {
                                            overlay: c,
                                            e: d,
                                            component: c.component,
                                            edge: c.component.edge
                                        })
                                    }
                                }(f.overlays[g][1].events[m], f.overlays[g]);
                e.registerConnectionType(l, f)
            }
            for (g in d.ports)
                f = k(g), e.registerEndpointType(g, f);
            if (d.states)
                for (var n in d.states)
                    h[n] = new a.UIState(n, d.states[n], e)
        }
        return {
            getNodeDefinition: i,
            getEdgeDefinition: j,
            getPortDefinition: k,
            getState: function(a) {
                return h[a]
            }
        }
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    var a = jsPlumbToolkit.ready, b = function(a) {
        var b = 0, c = function() {
            b--, 0 >= b && e()
        };
        this.add = function(d) {
            b++, jsPlumbToolkitUtil.ajax({
                url: d,
                success: function(b) {
                    var d = a.innerHTML;
                    d += b, a.innerHTML = d, c()
                },
                error: function(a) {
                    c()
                }
            })
        }, this.ensureNotEmpty = function() {
            0 >= b && e()
        }
    }, c = [], d=!1, e = function() {
        d=!0;
        for (var b = 0; b < c.length; b++)
            a.call(a, c[b])
    };
    jsPlumbToolkit.ready = function(b) {
        d ? a.call(a, b) : c.push(b)
    }, jsPlumb.ready(function() {
        var a = document.getElementById("jsPlumbToolkitTemplates");
        if (a)
            e();
        else {
            a = document.createElement("div"), a.style.display = "none", a.id = "jsPlumbToolkitTemplates", document.body.appendChild(a);
            for (var c = new b(a), d = document.getElementsByTagName("script"), f = 0; f < d.length; f++) {
                var g = d[f].getAttribute("type"), h = d[f].getAttribute("src");
                "text/x-jtk-templates" == g && c.add(h)
            }
            c.ensureNotEmpty()
        }
    })
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    this.jsPlumbToolkit.Classes = {
        LASSO: "jtk-lasso",
        LASSO_SELECT_DEFEAT: "jtk-lasso-select-defeat",
        MINIVIEW: "jtk-miniview",
        MINIVIEW_CANVAS: "jtk-miniview-canvas",
        MINIVIEW_PANNER: "jtk-miniview-panner",
        MINIVIEW_ELEMENT: "jtk-miniview-element",
        MINIVIEW_PANNING: "jtk-miniview-panning",
        MINIVIEW_COLLAPSE: "jtk-miniview-collapse",
        MINIVIEW_COLLAPSED: "jtk-miniview-collapsed",
        NODE: "jtk-node",
        PORT: "jtk-port",
        SELECT_DEFEAT: "jtk-drag-select-defeat",
        SURFACE: "jtk-surface",
        SURFACE_NO_PAN: "jtk-surface-nopan",
        SURFACE_CANVAS: "jtk-surface-canvas",
        SURFACE_PAN: "jtk-surface-pan",
        SURFACE_PAN_LEFT: "jtk-surface-pan-left",
        SURFACE_PAN_TOP: "jtk-surface-pan-top",
        SURFACE_PAN_RIGHT: "jtk-surface-pan-right",
        SURFACE_PAN_BOTTOM: "jtk-surface-pan-bottom",
        SURFACE_PAN_ACTIVE: "jtk-surface-pan-active",
        SURFACE_SELECTED_ELEMENT: "jtk-surface-selected-element",
        SURFACE_SELECTED_CONNECTION: "jtk-surface-selected-connection",
        SURFACE_PANNING: "jtk-surface-panning",
        SURFACE_ELEMENT_DRAGGING: "jtk-surface-element-dragging",
        SURFACE_DROPPABLE_NODE: "jtk-surface-droppable-node",
        TOOLBAR: "jtk-toolbar",
        TOOLBAR_TOOL: "jtk-tool",
        TOOLBAR_TOOL_SELECTED: "jtk-tool-selected",
        TOOLBAR_TOOL_ICON: "jtk-tool-icon"
    }, this.jsPlumbToolkit.Constants = {
        click: "click",
        start: "start",
        stop: "stop",
        drop: "drop",
        disabled: "disabled",
        pan: "pan",
        select: "select",
        drag: "drag",
        left: "left",
        right: "right",
        top: "top",
        bottom: "bottom",
        width: "width",
        height: "height",
        leftmin: "leftmin",
        leftmax: "leftmax",
        topmin: "topmin",
        topmax: "topmax",
        min: "min",
        max: "max",
        nominalSize: "50px",
        px: "px",
        onepx: "1px",
        nopx: "0px",
        em: "em",
        absolute: "absolute",
        relative: "relative",
        none: "none",
        block: "block",
        hidden: "hidden",
        div: "div",
        id: "id",
        plusEquals: "+=",
        minusEquals: "-=",
        dot: ".",
        transform: "transform",
        transformOrigin: "transform-origin",
        nodeType: "Node",
        portType: "Port",
        edgeType: "Edge",
        surfaceNodeDragScope: "surfaceNodeDrag",
        mistletoeLayoutType: "Mistletoe",
        surfaceType: "Surface",
        jtkStatePrefix: "jtk-state-",
        msgCannotSaveState: "Cannot save state",
        msgCannotRestoreState: "Cannot restore state"
    }, this.jsPlumbToolkit.Attributes = {
        jtkNodeId: "jtk-node-id",
        relatedNodeId: "related-node-id"
    }, this.jsPlumbToolkit.Methods = {
        addClass: "addClass",
        removeClass: "removeClass"
    }, this.jsPlumbToolkit.Events = {
        beforeDrop: "beforeDrop",
        beforeDetach: "beforeDetach",
        click: "click",
        canvasClick: "canvasClick",
        canvasDblClick: "canvasDblClick",
        connection: "connection",
        connectionDetached: "connectionDetached",
        connectionMoved: "connectionMoved",
        contentDimensions: "contentDimensions",
        contextmenu: "contextmenu",
        dataLoadStart: "dataLoadStart",
        dataAppendStart: "dataAppendStart",
        dataLoadEnd: "dataLoadEnd",
        dataAppendEnd: "dataAppendEnd",
        dblclick: "dblclick",
        drag: "drag",
        drop: "drop",
        dragover: "dragover",
        dragend: "dragend",
        edgeAdded: "edgeAdded",
        edgeRemoved: "edgeRemoved",
        edgeTypeChanged: "edgeTypeChanged",
        elementDragged: "elementDragged",
        elementAdded: "elementAdded",
        elementRemoved: "elementRemoved",
        endOverlayAnimation: "endOverlayAnimation",
        graphCleared: "graphCleared",
        modeChanged: "modeChanged",
        mousedown: "mousedown",
        mousemove: "mousemove",
        mouseout: "mouseout",
        mouseup: "mouseup",
        mouseenter: "mouseenter",
        mouseleave: "mouseleave",
        mouseover: "mouseover",
        nodeAdded: "nodeAdded",
        nodeDropped: "nodeDropped",
        nodeMoveStart: "nodeMoveStart",
        nodeMoveEnd: "nodeMoveEnd",
        nodeRemoved: "nodeRemoved",
        edgeTarget: "edgeTarget",
        nodeTypeChanged: "nodeTypeChanged",
        edgeSource: "edgeSource",
        objectRepainted: "objectRepainted",
        pan: "pan",
        portAdded: "portAdded",
        portRemoved: "portRemoved",
        portTypeChanged: "portTypeChanged",
        redraw: "redraw",
        start: "start",
        startOverlayAnimation: "startOverlayAnimation",
        stateRestored: "stateRestored",
        stop: "stop",
        tap: "tap",
        touchend: "touchend",
        touchmove: "touchmove",
        touchstart: "touchstart",
        unload: "unload",
        portRefreshed: "portRefreshed",
        nodeRefreshed: "nodeRefreshed",
        edgeRefreshed: "edgeRefreshed",
        nodeRendered: "nodeRendered",
        nodeUpdated: "nodeUpdated",
        portUpdated: "portUpdated",
        edgeUpdated: "edgeUpdated",
        zoom: "zoom",
        relayout: "relayout",
        deselect: "deselect",
        selectionCleared: "selectionCleared",
        resize: "resize",
        anchorChanged: "anchorChanged"
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    var a = this;
    a.jsPlumbToolkit.util = {
        Cookies: {
            get: function(a) {
                document.cookie.match(new RegExp(a + "=[a-zA-Z0-9.()=|%/_]+($|;)", "g"));
                return val && 0 != val.length ? unescape(val[0].substring(a.length + 1, val[0].length).replace(";", "")) || null : null
            },
            set: function(a, b, c, d) {
                var e = [a + "=" + escape(b), "/", window.location.host], f = function() {
                    if ("NaN" == parseInt(d))
                        return "";
                    var a = new Date;
                    return a.setTime(a.getTime() + 60 * parseInt(d) * 60 * 1e3), a.toGMTString()
                };
                return d && e.push(f(d)), document.cookie = e.join("; ")
            },
            unset: function(b, c, d) {
                c = c && "string" == typeof c ? c : "", d = d && "string" == typeof d ? d : "", a.jsPlumbToolkit.util.Cookies.get(b) && a.jsPlumbToolkit.util.Cookies.set(b, "", "Thu, 01-Jan-70 00:00:01 GMT", c, d)
            }
        },
        Storage: {
            set: function(b, c) {
                "undefined" == typeof localStorage ? a.jsPlumbToolkit.util.Cookies.set(b, c) : localStorage.setItem(b, c)
            },
            get: function(b) {
                return "undefined" == typeof localStorage ? a.jsPlumbToolkit.util.Cookies.read(b) : localStorage.getItem(b)
            },
            clear: function(b) {
                "undefined" == typeof localStorage ? a.jsPlumbToolkit.util.Cookies.unset(b) : localStorage.removeItem(b)
            },
            clearAll: function() {
                if ("undefined" == typeof localStorage);
                else
                    for (; localStorage.length > 0;) {
                        var a = localStorage.key(0);
                        localStorage.removeItem(a)
                    }
            },
            setJSON: function(b, c) {
                if ("undefined" == typeof JSON)
                    throw new TypeError("JSON undefined. Cannot store value.");
                a.jsPlumbToolkit.util.Storage.set(b, JSON.stringify(c))
            },
            getJSON: function(b) {
                if ("undefined" == typeof JSON)
                    throw new TypeError("JSON undefined. Cannot retrieve value.");
                return JSON.parse(a.jsPlumbToolkit.util.Storage.get(b))
            }
        }
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    var a = this, b = a.jsPlumbToolkit, c = b;
    c.Path = function(a, b) {
        this.bind = a.bind, this.getModel = a.getModel, this.setSuspendGraph = a.setSuspendGraph, this.getNodeId = a.getNodeId, this.getEdgeId = a.getEdgeId, this.getPortId = a.getPortId, this.getNodeType = a.getNodeType, this.getEdgeType = a.getEdgeType, this.getPortType = a.getPortType;
        for (var c = a.getGraph().findPath(b.source, b.target, b.strict, b.nodeFilter, b.edgeFilter), d = function() {
            for (var b = 0; b < c.path.length; b++)
                c.path[b].edge && a.removeEdge(c.path[b].edge);
            return this
        }.bind(this), e = function() {
            for (var b = 0; b < c.path.length; b++)
                a.removeNode(c.path[b].vertex);
            return this
        }.bind(this), f = function(b, d) {
            var e = a.findGraphObject(b), f=!1;
            if (e)
                for (var g = 0; g < c.path.length; g++)
                    if (c.path[g].vertex == e || c.path[g].edge == e ||!d && "Port" == c.path[g].vertex.objectType && c.path[g].vertex.isChildOf(e)) {
                        f=!0;
                        break
                    }
            return f
        }, g = [], h = {}, i = 0; i < c.path.length; i++)
            g.push(c.path[i].vertex), h[a.getNodeId(c.path[i].vertex)] = [c.path[i].vertex, i];
        this.getNodes = function() {
            return g
        }, this.getNode = function(a) {
            return h["string" == typeof a ? a: a.id][0]
        }, this.getAllEdgesFor = function(a) {
            var b = h[a.id][1];
            return b < c.path.length - 1 ? [c.path[b + 1].edge] : []
        };
        var j = function(a, b) {
            for (var d = b || 0; d < c.path.length; d++)
                try {
                    a(d, c.path[d])
                } catch (e) {
                    jsPlumbUtil.log("Path iterator function failed", e)
                }
        };
        this.each = function(a) {
            j(function(b, c) {
                a(b, c)
            })
        }, this.eachNode = function(a) {
            j(function(b, c) {
                a(b, c.vertex)
            })
        }, this.eachEdge = function(a) {
            j(function(b, c) {
                a(b, c.edge)
            }, 1)
        }, this.getNodeCount = function() {
            return c.path.length
        }, this.getNodeAt = function(a) {
            return c.path[a].vertex
        }, this.getEdgeCount = function() {
            return 0 == c.path.length ? 0 : c.path.length - 1
        }, this.path = c, this.deleteEdges = d, this.deleteNodes = e, this.deleteAll = e, this.isEmpty = function() {
            return 0 == c.path.length
        }, this.getCost = function() {
            return c.pathDistance
        }, this.contains = f, this.exists = function() {
            return null != c.pathDistance
        }, this.selectEdges = function(a) {
            return _selectEdges(a, "getEdges", !1)
        }, this.selectAllEdges = function(a) {
            return _selectEdges(a, "getAllEdges", !0)
        }
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    var a = this, b = a.jsPlumbToolkitIO = {}, c = jsPlumbUtil;
    b.version = "0.1", b.name = "jsPlumbToolkitIO";
    var d = function(a, b, c) {
        for (var d = a.nodes || [], e = a.edges || [], f = a.ports || [], g = 0; g < d.length; g++)
            b.addNode(d[g]);
        for (var h = 0; h < f.length; h++)
            if (f[h].nodeId) {
                var i = b.getNode(f[h].nodeId);
                if (null == i)
                    throw new TypeError("Unknown node [" + f[h].nodeId + "]");
                i.addPort(f[h])
            }
        for (var j = 0; j < e.length; j++) {
            var k = {
                source: e[j].source,
                target: e[j].target,
                cost: e[j].cost || 1,
                directed: e[j].directed,
                data: e[j].data
            };
            e[j].geometry && (k.geometry = e[j].geometry), b.addEdge(k)
        }
    }, e = function(a, b) {
        return a.getGraph().serialize()
    }, f = function(a, b, c) {
        var d = function(a) {
            var c = b.addNode(a);
            if (a.children)
                for (var e = 0; e < a.children.length; e++) {
                    var f = b.addNode(a.children[e]);
                    b.addEdge({
                        source: c,
                        target: f
                    }), d(a.children[e])
                }
        };
        d(a)
    };
    b.exporters = {
        json: e
    }, b.parsers = {
        json: d,
        "hierarchical-json": f
    }, b.managers = {
        json: {
            removeNode: function(a, b, d) {
                var e = d(b.data);
                c.removeWithFunction(a.nodes, function(a) {
                    return a.id == e
                })
            },
            removeEdge: function(a, b, d) {
                var e = d(b.data);
                c.removeWithFunction(a.edges, function(a) {
                    return a.data && a.data.id == e
                })
            },
            addNode: function(a, b, c) {
                a.nodes = a.nodes || [], a.nodes.push(b.data)
            },
            addEdge: function(a, b, c) {
                var d = {
                    source: b.source.getFullId(),
                    target: b.target.getFullId(),
                    data: b.data || {}
                };
                a.edges = a.edges || [], a.edges.push(d)
            },
            addPort: function(a, b, c) {
                a.ports = a.ports || [];
                var d = jsPlumb.extend({}, b.port.data || {});
                d.id = b.port.getFullId(), a.ports.push(d)
            },
            removePort: function(a, b, d) {
                var e = b.port.getFullId();
                c.removeWithFunction(a.ports, function(a) {
                    return a.id == e
                })
            }
        }
    }, b.parse = function(a, c, d, e) {
        var f = b.parsers[a];
        if (null == f)
            throw new Error("jsPlumb Toolkit - parse - [" + a + "] is an unsupported type");
        return f(c, d, e)
    }, b.exportData = function(a, c, d) {
        var e = b.exporters[a];
        if (null === e)
            throw new Error("jsPlumb Toolkit - exportData - [" + a + "]  is an unsupported type");
        return e(c, d)
    }, b.manage = function(a, c, d, e, f, g) {
        b.managers[d] && b.managers[d][a] && b.managers[d][a](c, e, f)
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    var a = this, b = a.jsPlumbToolkit, c = b;
    c.Support = {
        ingest: function(c) {
            var d = c.jsPlumb || a.jsPlumb;
            if (!d.getContainer())
                throw new TypeError("No Container set on jsPlumb instance. Cannot continue.");
            var e = b.newInstance(), f = d.select(), g = {}, h = function() {
                return "default"
            }, i = c.idFunction || function(a) {
                    return d.getId(a)
                }, j = c.typeFunction || h, k = c.idFunction || function(a) {
                    return a.id
                }, l = c.edgeTypeFunction || h, m = c.render!==!1, n = function(a) {
                var b = i(a), c = j(a), f = d.getId(a);
                null == g[f] && (g[f] = e.addNode({
                    id: b,
                    type: c
                }, null, !0), a.jtk = {
                    node: g[f]
                })
            }, o = function(a) {
                var b = g[a.sourceId], c = g[a.targetId], d = k(a), f = l(a);
                a.edge = e.addEdge({
                    source: b,
                    target: c,
                    data: {
                        id: d,
                        type: f
                    }
                }, null, !0)
            };
            if (c.nodeSelector)
                for (var p = d.getContainer().querySelectorAll(c.nodeSelector), q = 0; q < p.length; q++) {
                    var r = d.getId(p[q]);
                    n(p[q], r), d.manage(r, p[q])
                }
            var s = d.getManagedElements();
            for (var r in s)
                n(s[r].el, r);
            if (f.each(function(a) {
                    o(a)
                }), m) {
                var t = a.jsPlumb.extend({}, c.renderParams || {});
                t.jsPlumbInstance = d, t.container = d.getContainer();
                var u = e.render(t);
                return u.ingest = function(a) {
                    n(a), u.importNode(a, i(a))
                }, u
            }
            return e
        }
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    var a = this, b = a.jsPlumbToolkit, c = b.Layouts = {
        Decorators: {}
    }, d = jsPlumbUtil, e = function(a) {
        var b = 1 / 0, c = 1 / 0, d =- (1 / 0), e =- (1 / 0);
        for (var f in a)
            b = Math.min(b, a[f][0]), d = Math.max(d, a[f][0]), c = Math.min(c, a[f][1]), e = Math.max(e, a[f][1]);
        return [[b, c], [d, e], Math.abs(b - d), Math.abs(c - e)]
    }, f = function(a) {
        if (null == a)
            return [];
        for (var b = [], d = function(a) {
            var b = "string" == typeof a ? a: a[0], d = c.Decorators[b], e = "string" == typeof a ? {}
                : a[1];
            if (!d)
                throw new TypeError("Decorator [" + b + "] no registered on jsPlumbToolkit.Layouts.Decorators");
            return new d(e)
        }, e = 0; e < a.length; e++)
            b.push(d(a[e]));
        return b
    };
    c.AbstractLayout = function(b) {
        b = b || {};
        var c = this, d = function() {
            return {
                padding: [0, 0]
            }
        }, g = function() {
            var b = a.jsPlumb.extend(d(), c.defaultParameters || {});
            a.jsPlumb.extend(b, i || {}), i = b
        }, h = b.adapter, i = b.parameters || {}, j = b.getElementForNode, k = new Magnetizer({
            getPosition: function(a) {
                var b = o[a.id];
                return {
                    left: b[0],
                    top: b[1]
                }
            },
            getSize: function(a) {
                return v[a.id]
            },
            getId: function(a) {
                return a.id
            },
            setPosition: function(a, b) {
                F(a.id, b.left, b.top)
            },
            padding: i.padding,
            filter: function(a) {
                return c.canMagnetize ? c.canMagnetize(a) : !0
            }
        }), l = b.magnetized===!1?!1 : c.defaultMagnetized || b.magnetize===!0;
        this.decorators = f(b.decorators), this.adapter = b.adapter;
        var m = b.jsPlumb || a.jsPlumb, n = b.jsPlumbToolkit, o = {}, p = [], q = 1 / 0, r = 1 / 0, s =- (1 / 0), t =- (1 / 0), u = {}, v = {}, w = b.container, x = m.getSize(w), y = b.width || x[0], z = b.height || x[1], A=!1, B = function() {
            A=!1, q = 1 / 0, s =- (1 / 0), r = 1 / 0, t =- (1 / 0);
            for (var a = 0; a < c.decorators.length; a++)
                c.decorators[a].reset({
                    remove: m.remove
                });
            o = {}, p.splice(0), v = {}, u = {}, k.reset(), c.reset && c.reset()
        };
        this.magnetize = function(a) {
            a = a || {};
            var b = a.event ? "executeAtEvent": a.origin ? "execute": "executeAtCenter", c = a.event ? [a.event, a.options]: a.origin ? [a.origin, a.options]: [a.options];
            k[b].apply(k, c), J(m.repaintEverything)
        }, this.nodeAdded = function(a, b) {
            var d = b && b.position ? b.position: a.node.data && a.node.data.left && a.node.data.top ? a.node.data: c.adapter.getOffset(a.el);
            if (this._nodeAdded) {
                var e = this._nodeAdded(a, b);
                e && (d.left = e[0], d.top = e[1])
            }
            u[a.node.id] = a.node, F(a.node.id, d.left, d.top), C(a.node.id, a.el), k.addElement(a.node)
        }, this.nodeRemoved = function(a) {
            delete o[a], delete v[a], delete u[a], this._nodeRemoved && this._nodeRemoved(a), k.removeElement(b.node)
        };
        var C = function(a, b) {
            var c = v[a];
            return c || (b = b || j(a), null != b ? (c = m.getSize(b), v[a] = c) : c = [0, 0]), c
        }, D = function(a, b, c, d) {
            var e = o[a];
            if (!e) {
                if (null != b && null != c)
                    e = [b, c];
                else {
                    if (d)
                        return null;
                    e = [Math.floor(Math.random() * (y + 1)), Math.floor(Math.random() * (z + 1))]
                }
                F(a, e[0], e[1])
            }
            return e
        }, E = function(a) {
            q = Math.min(q, a[0]), r = Math.min(r, a[1]), s = Math.max(s, a[0]), t = Math.max(t, a[1])
        }, F = this.setPosition = function(a, b, d, e) {
            var f = o[a];
            f ? (f[0] = parseFloat(b), f[1] = parseFloat(d)) : (f = o[a] = [parseFloat(b), parseFloat(d)], p.push([f, a])), E(f), e && c._nodeMoved && c._nodeMoved(a, b, d)
        }, G = function(a, b, c) {
            b = b || 10, c = c || 10;
            var d = o[a];
            return d || (d = o[a] = []), d[0] = Math.floor(Math.random() * b), d[1] = Math.floor(Math.random() * c), E(d), d
        }, H = function() {
            for (var a in o)
                console.log(a, o[a][0], o[a][1])
        }, I = function(a, b) {
            var d = j(a);
            if (null != d) {
                var e = o[a];
                return c.adapter.setAbsolutePosition(d, e, b), M[a] = [e[0], e[1]], e.concat(C(a))
            }
            return null
        }.bind(this), J = this.draw = function(a) {
            for (var b in o) {
                var d = I(b);
                null != d && (q = Math.min(d[0], q), r = Math.min(d[1], r), s = Math.max(d[0] + d[2], s), t = Math.max(d[1] + d[3], t))
            }
            for (var e = 0; e < c.decorators.length; e++)
                c.decorators[e].decorate({
                    adapter: c.adapter,
                    layout: c,
                    append: function(a, b, d) {
                        c.adapter.append(a, b, d, !0)
                    },
                    setAbsolutePosition: c.adapter.setAbsolutePosition,
                    toolkit: n,
                    jsPlumb: m,
                    bounds: [q, r, s, t],
                    floatElement: c.adapter.floatElement,
                    fixElement: c.adapter.fixElement
                });
            a && a()
        }, K = function(a) {
            console.log(a);
            var b = e(o, C, j);
            H(), console.log(b[0], b[1], b[2], b[3])
        };
        this.bb = K;
        var L = this.getPositions = function() {
            return o
        }, M = (this.getPosition = function(a) {
            return o[a]
        }, {}), N = (this.getSize = function(a) {
            return v[a]
        }, this.setSize = function(a, b) {
            v[a] = b
        });
        this.begin = function(a, b) {}, this.end = function(a, b) {};
        var O = function(a) {
            if (null != n) {
                g(), k.setElements(h.getNodes()), this.begin && this.begin(n, i);
                for (var b = function() {
                    J(function() {
                        l && c.magnetize(), c.end && c.end(n, i), a && a()
                    })
                }; !A;)
                    this.step(n, i);
                b()
            }
        }.bind(this);
        return this.relayout = function(a, b) {
            B(), null != a && (i = a), O(b)
        }, this.layout = function(a) {
            A=!1, O(a)
        }, this.clear = function() {
            B()
        }, {
            adapter: b.adapter,
            jsPlumb: m,
            toolkit: n,
            getPosition: D,
            setPosition: F,
            getRandomPosition: G,
            getSize: C,
            setSize: N,
            getPositions: L,
            setPositions: function(a) {
                o = a
            },
            width: y,
            height: z,
            reset: B,
            draw: J,
            setDone: function(a) {
                A = a
            }
        }
    }, c.EmptyLayout = function(a) {
        var b = {};
        this.refresh = this.relayout = this.layout = function() {
            this.clear();
            for (var c = a.getNodeCount(), d = 0; c > d; d++) {
                var e = a.getNodeAt(d);
                b[e.getFullId()] = [0, 0]
            }
        }, this.nodeRemoved = function(a) {
            delete b[a.id]
        }, this.nodeAdded = function(a) {
            b[a.id]=!1
        }, this.getPositions = function() {
            return b
        }, this.getPosition = function(a) {
            return b[a]
        }, this.setPosition = function(a, c, d) {
            b[a] = [c, d]
        }, this.clear = function() {
            b = {}
        }
    }, c.Mistletoe = function(b) {
        if (!b.parameters.layout)
            throw "No layout specified for MistletoeLayout";
        var e = {}, f = a.jsPlumb.extend({}, b);
        f.getElementForNode = function(a) {
            return e[a]
        };
        var g, h, i, j = c.AbstractLayout.apply(this, [f]), k = b.parameters.layout, l = function() {
            j.setPositions(k.getPositions()), j.draw(), this.fire("redraw")
        }.bind(this);
        d.EventGenerator.apply(this, arguments), this.map = function(a, b) {
            e[a] = b
        };
        var m = function() {
            e = {}, g = k.layout, h = k.relayout, i = k.clear, k.layout = function() {
                g.apply(k, arguments), l()
            }, k.relayout = function() {
                j.reset(), h.apply(k, arguments), l()
            }, k.clear = function() {
                i.apply(k, arguments), j.reset()
            }
        };
        m(), this.setHostLayout = function(a) {
            k = a, m()
        }
    };
    var g = c.AbsoluteBackedLayout = function(a) {
        a = a || {};
        var b = c.AbstractLayout.apply(this, arguments), d = function(a) {
            return [a.data.left, a.data.top]
        }, e = function(b, c) {
            return (a.locationFunction || d)(b)
        };
        return this.begin = function(a, c) {
            for (var d = b.adapter.getNodeCount(), f = 0; d > f; f++) {
                var g = b.adapter.getNodeAt(f), h = a.getNodeId(g.data), i = b.getPosition(h, null, null, !0);
                null == i && (i = e(g, c)), this.setPosition(h, i[0], i[1], !0)
            }
        }, this._nodeAdded = function(b, c) {
            return e(b.node, a.parameters || {})
        }, this.getAbsolutePosition = function(a, b) {
            return e(a, b)
        }, this.step = function() {
            b.setDone(!0)
        }, b
    };
    d.extend(g, c.AbstractLayout), c.Absolute = function(a) {
        c.AbsoluteBackedLayout.apply(this, arguments)
    }, d.extend(c.Absolute, c.AbsoluteBackedLayout);
    var h = c.AbstractHierarchicalLayout = function(a) {
        var b = this, d = c.AbstractLayout.apply(this, arguments);
        return b.begin = function(b, c) {
            c.ignoreLoops=!(a.ignoreLoops===!1), c.getRootNode = c.getRootNode || function(a) {
                    return d.adapter.getNodeCount() > 0 ? d.adapter.getNodeAt(0) : void 0
                }, c.getChildEdges = c.getChildEdges || function(a, b) {
                    return d.toolkit.getAllEdgesFor(a, function(b) {
                        return b.source === a
                    })
                }, c.rootNode = c.getRootNode(b), c.rootNode ? c.root = c.rootNode.id : d.setDone(!0)
        }, d
    };
    d.extend(h, c.AbstractLayout)
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    var a = this, b = a.jsPlumbToolkit, c = b.Layouts;
    c.Circular = function(a) {
        a = a || {};
        var b = c.AbstractLayout.apply(this, arguments);
        this.defaultParameters = {
            padding: 30,
            locationFunction: a.locationFunction
        }, this.step = function(a, c) {
            var d = b.adapter.getNodeCount();
            if (0 == d)
                return void b.setDone(!0);
            var e, f, g = 0, h = 0, i = 10, j = 2 * Math.PI / d, k =- Math.PI / 2;
            for (e = 0; d > e; e++)
                f = b.adapter.getNodeAt(e), b.setPosition(f.id, g + Math.sin(k) * i, h + Math.cos(k) * i, !0), k += j;
            var l = b.adapter.getNodeAt(0), m = b.getSize(l.id), n = b.getPosition(l.id), o = {
                x: n[0] - c.padding,
                y: n[1] - c.padding,
                w: m[0] + 2 * c.padding,
                h: m[1] + 2 * c.padding
            }, p = b.adapter.getNodeAt(1), q = b.getSize(p.id), r = b.getPosition(p.id), s = {
                x: r[0] - c.padding,
                y: r[1] - c.padding,
                w: q[0] + 2 * c.padding,
                h: q[1] + 2 * c.padding
            }, t = Farahey.calculateSpacingAdjustment(o, s), u = [n[0] + m[0] / 2, n[1] + m[1] / 2], v = [r[0] + t.left + q[0] / 2, r[1] + t.top + + (q[1] / 2)], w = Math.sqrt(Math.pow(u[0] - v[0], 2) + Math.pow(u[1] - v[1], 2));
            for (i = w / 2 / Math.sin(j / 2), e = 0; d > e; e++)
                f = b.adapter.getNodeAt(e), b.setPosition(f.id, g + Math.sin(k) * i, h + Math.cos(k) * i, !0), k += j;
            b.setDone(!0)
        }
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    var a = this, b = a.jsPlumbToolkit, c = b.Layouts;
    c.Hierarchical = function(a) {
        var b, d, e, f, g, h, i, j, k = c.AbstractHierarchicalLayout.apply(this, arguments), l = [], m = null != a.parameters ? a.parameters.compress: !1, n = [], o = [], p = k.toolkit.getNodeId, q = function(a) {
            var b = n[a];
            return b || (b = {
                nodes: [],
                pointer: 0
            }, n[a] = b), b
        }, r = function(a, b, c, d, f) {
            var g = q(c), i = {
                node: a,
                parent: d,
                childGroup: f,
                loc: g.pointer,
                index: g.nodes.length,
                dimensions: b,
                size: b[e]
            }, j = b[0 == e ? 1: 0];
            return null == l[c] ? l[c] = j : l[c] = Math.max(l[c], j), g.pointer += b[e] + h[e], g.nodes.push(i), i
        }, s = function(a, b) {
            var c = o[b];
            c || (c = [], o[b] = c), a.index = c.length, c.push(a)
        }, t = function(a) {
            if (a.size > 0) {
                var b = a.parent.loc + a.parent.size / 2 - (a.size - h[e]) / 2, c = o[a.depth], d =- (1 / 0), f = 0;
                if (null != c && c.length > 0) {
                    var g = c[c.length - 1], i = g.nodes[g.nodes.length - 1];
                    d = i.loc + i.size + h[e]
                }
                b >= d ? a.loc = b : (f = d - b, a.loc = d);
                for (var j = a.loc, k = 0; k < a.nodes.length; k++)
                    a.nodes[k].loc = j, j += a.nodes[k].size, j += h[e];
                f > 0 && v(a), s(a, a.depth)
            }
        }, u = function(a) {
            var b = a.nodes[0].loc, c = a.nodes[a.nodes.length - 1].loc + a.nodes[a.nodes.length - 1].size, d = (b + c) / 2, e = d - a.parent.size / 2, f = e - a.parent.loc;
            if (a.parent.loc = e, !a.parent.root)
                for (var g = a.parent.childGroup, h = a.parent.childGroupIndex + 1; h < g.nodes.length; h++)
                    g.nodes[h].loc += f
        }, v = function(a) {
            for (var b = a; null != b;)
                u(b), b = b.parent.childGroup
        }, w = function(a, b) {
            if (!i[a.node.id]) {
                i[a.node.id]=!0;
                var c, d = j(a.node, k.toolkit), f = {
                    nodes: [],
                    loc: 0,
                    size: 0,
                    parent: a,
                    depth: b + 1
                }, g = [];
                for (c = 0; c < d.length; c++) {
                    var l = d[c].source === a.node ? d[c].target: d[c].source;
                    if (l = k.toolkit.getNode(l), null != l && l !== a.node) {
                        var m = k.getSize(p(l)), n = r(l, m, b + 1, a, f);
                        n.childGroupIndex = f.nodes.length, f.nodes.push(n), f.size += m[e] + h[e], g.push(n)
                    }
                }
                for (t(f)
                         , c = 0;
                     c < g.length;
                     c++)w(g[c], b + 1)
            }
        };
        this.defaultParameters = {
            padding: [60, 60],
            orientation: "horizontal",
            border: 0,
            locationFunction: a.locationFunction
        };
        var x = this.begin;
        this.begin = function(a, c) {
            x.apply(this, arguments), b = c.orientation, d = "horizontal" === b, e = d ? 0 : 1, f = d ? "width" : "height", g = k.adapter.getNodeCount(), h = c.padding, n.length = 0, o.length = 0, i = {}, j = c.getChildEdges
        }, this.step = function(a, b) {
            var c = k.getSize(b.root), d = r(b.rootNode, c, 0, null, null);
            d.root=!0, w(d, 0, null);
            for (var f, g, i = 0, j = function(a, b) {
                var c = 0 == e ? 1: 0;
                return m && a.parent ? k.getPosition(p(a.parent.node))[c] + a.parent.dimensions[c] + h[c] : b
            }, o = 0; o < n.length; o++) {
                n[o].otherAxis = i;
                for (var q = 0; q < n[o].nodes.length; q++)
                    f = 0 == e ? n[o].nodes[q].loc : j(n[o].nodes[q], i), n[o].nodes[q].parent && k.getPosition(p(n[o].nodes[q].parent.node)), g = 1 == e ? n[o].nodes[q].loc : j(n[o].nodes[q], i), k.setPosition(p(n[o].nodes[q].node), f, g, !0);
                n[o].otherAxisSize = l[o] + h[0 == e ? 1: 0], i += n[o].otherAxisSize
            }
            k.setDone(!0)
        }, this.getHierarchy = function() {
            return n
        }, this.getOrientation = function() {
            return b
        };
        var y = this.nodeRemoved;
        this.nodeRemoved = function() {
            n = [], y.apply(this, arguments)
        }
    }, jsPlumbUtil.extend(c.Hierarchical, c.AbstractHierarchicalLayout)
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    var a = this, b = a.jsPlumbToolkit, c = b.Layouts;
    c.Spring = function(a) {
        this.defaultMagnetized=!0;
        var b = c.AbsoluteBackedLayout.apply(this, arguments);
        this.defaultParameters = {
            padding: [50, 50],
            iterations: 500,
            maxRepulsiveForceDistance: 6,
            k: 2,
            c: .01,
            maxVertexMovement: .5,
            locationFunction: a.locationFunction
        };
        var d, e = this.defaultParameters, f = {}, g = a.absoluteBacked!==!1, h = 0, i = 1 / 0, j =- (1 / 0), k = 1 / 0, l =- (1 / 0), m = 1, n = 1, o = 0, p = function(a) {
            a.getNode && (a = a.getNode());
            var c = f[a.id];
            if (!c) {
                var d = b.getRandomPosition(a.id, .5, .5);
                c = f[a.id] = {
                    id: a.id,
                    n: a,
                    sp: d,
                    p: [d[0], d[1]],
                    f: [0, 0]
                }
            }
            return c
        }, q = function(a, b, c) {
            i = Math.min(i, b), k = Math.min(k, c), j = Math.max(j, b), l = Math.max(l, c), a.p[0] = b, a.p[1] = c
        }, r = function(a, b) {
            if (!a.locked ||!b.locked) {
                var c = b.p[0] - a.p[0], d = b.p[1] - a.p[1], f = c * c + d * d;
                .01 > f && (c = .1 * Math.random() + .1, d = .1 * Math.random() + .1, f = c * c + d * d);
                var g = Math.sqrt(f);
                if (g < e.maxRepulsiveForceDistance) {
                    o++;
                    var h = e.k * e.k / g, i = h * c / g, j = h * d / g;
                    b.f[0] += b.locked ? 0 : (a.locked ? 2 : 1) * i, b.f[1] += b.locked ? 0 : (a.locked ? 2 : 1) * j, a.f[0] -= a.locked ? 0 : (b.locked ? 2 : 1) * i, a.f[1] -= a.locked ? 0 : (b.locked ? 2 : 1) * j
                }
            }
        }, s = function(a, b) {
            var c = p(b.target);
            if (!a.locked ||!c.locked) {
                o++;
                var d = c.p[0] - a.p[0], f = c.p[1] - a.p[1], g = d * d + f * f;
                .01 > g && (d = .1 * Math.random() + .1, f = .1 * Math.random() + .1, g = d * d + f * f);
                var h = Math.sqrt(g);
                h > e.maxRepulsiveForceDistance && (h = e.maxRepulsiveForceDistance, g = h * h);
                var i = (g - e.k * e.k) / e.k;
                (void 0 == b.weight || b.weight < 1) && (b.weight = 1), i*=.5 * Math.log(b.weight) + 1;
                var j = i * d / h, k = i * f / h;
                c.f[0] -= c.locked ? 0 : (a.locked ? 2 : 1) * j, c.f[1] -= c.locked ? 0 : (a.locked ? 2 : 1) * k, a.f[0] += a.locked ? 0 : (c.locked ? 2 : 1) * j, a.f[1] += a.locked ? 0 : (c.locked ? 2 : 1) * k
            }
        }, t = function() {
            m = b.width / (j - i) * .62, n = b.height / (l - k) * .62;
            for (var a in f) {
                var c = f[a];
                c.locked || (c.sp = v(c.p), b.setPosition(c.id, c.sp[0], c.sp[1], !0))
            }
        }, u = function(a) {
            return [i + (a[0] - .19 * b.width) / m, k + (a[1] - .19 * b.height) / n]
        }, v = function(a) {
            return [.19 * b.width + (a[0] - i) * m, .19 * b.height + (a[1] - k) * n]
        };
        this._nodeMoved = function(a, b, c) {
            var d = f[a];
            d && (d.sp = [b, c], d.p = u(d.sp))
        }, this.canMagnetize = function(a) {
            return f[a] && f[a].locked!==!0
        }, this.reset = function() {
            f = {}, h = 0, i = k = 1 / 0, j = l =- (1 / 0)
        }, this._nodeRemoved = function(a) {
            delete f[a]
        }, this._nodeAdded = function(a, c) {
            if (c && c.position) {
                var d = p(a.node);
                d && (d.locked=!0, b.setPosition(d.id, c.position.left, c.position.top, !0))
            }
        }, this.begin = function(a, c) {
            h = 0, d = b.adapter.getNodeCount()
        }, this.step = function(a, c) {
            var f, i = [], j = function(a) {
                return i[a] ? i[a] : function() {
                    return i[a] = p(b.adapter.getNodeAt(a)), i[a]
                }()
            };
            for (o = 0, f = 0; d > f; f++) {
                var k = j(f);
                if (g&&!k.locked) {
                    var l = this.getAbsolutePosition(k.n, c);
                    if (null != l && 2 == l.length&&!isNaN(l[0])&&!isNaN(l[1])) {
                        q(k, l[0], l[1]), k.sp = k.p, b.setPosition(k.id, l[0], l[1], !0), k.locked=!0;
                        continue
                    }
                }
                for (var m = f + 1; d > m; m++) {
                    var n = j(m);
                    r(k, n)
                }
                for (var u = b.toolkit.getAllEdgesFor(k.n), v = 0; v < u.length; v++)
                    s(k, u[v])
            }
            if (0 != o)
                for (f = 0; d > f; f++) {
                    var w = j(f), x = e.c * w.f[0], y = e.c * w.f[1], z = e.maxVertexMovement;
                    x > z && (x = z), - z > x && (x =- z), y > z && (y = z), - z > y && (y =- z), q(w, w.p[0] + x, w.p[1] + y), w.f[0] = 0, w.f[1] = 0
                }
            h++, (0 == o || h >= e.iterations) && (t(), b.setDone(!0))
        }, this.end = function() {
            for (var a in f)
                f[a].locked=!0
        }
    }, jsPlumbUtil.extend(c.Spring, c.AbsoluteBackedLayout)
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    var a = this, b = a.jsPlumbToolkit.Renderers, c = a.jsPlumbToolkit, d = a.jsPlumbToolkitUtil, e = a.jsPlumbUtil;
    c.UIState = function(a, b, c) {
        for (var d in b)
            if (b.hasOwnProperty(d)) {
                var e = "*" === d ? "e-state-" + a: "e-state-" + a + "-" + d, f = "*" === d ? "c-state-" + a: "c-state-" + a + "-" + d;
                c.registerEndpointType(e, b[d]), c.registerConnectionType(f, b[d])
            }
        this.activate = function(d, e, f) {
            d.eachEdge(function(c, d) {
                var h = e.getRenderedConnection(d.getId()), i = f.getEdgeType(d.data), j = i ? "c-state-" + a + "-" + i: null;
                j && h.addType(j, d.data), b["*"] && h.addType("c-state-" + a, d.data), g(d, h, d.source, 0, "addType", f), g(d, h, d.target, 1, "addType", f)
            }), d.eachNode(function(a, d) {
                var g = f.getNodeType(d.data), h = g ? b[g]: null, i = e.getRenderedNode(d.id);
                h && h.cssClass && c.addClass(i, h.cssClass), b["*"] && c.addClass(i, b["*"].cssClass)
            })
        };
        var g = function(b, c, d, e, f, g) {
            var h = c.endpoints[e], i = g.getPortType(d.data);
            h[f]("e-state-" + a + "-" + i), h[f]("e-state-" + a)
        };
        this.deactivate = function(d, e, f) {
            d.eachEdge(function(c, d) {
                var h = e.getRenderedConnection(d.getId()), i = f.getEdgeType(d.data), j = i ? "c-state-" + a + "-" + i: null;
                j && h.removeType(j, d.data), b["*"] && h.removeType("c-state-" + a), g(d, h, d.source, 0, "removeType", f), g(d, h, d.target, 1, "removeType", f)
            }), d.eachNode(function(a, d) {
                var g = f.getNodeType(d.data), h = g ? b[g]: null, i = e.getRenderedNode(d.id);
                h && h.cssClass && c.removeClass(i, h.cssClass), b["*"] && c.removeClass(i, b["*"].cssClass)
            })
        }
    };
    var f = b.atts = {
        NODE: "data-jtk-node-id",
        PORT: "data-jtk-port-id"
    }, g = b.els = {
        SOURCE: "JTK-SOURCE",
        PORT: "JTK-PORT",
        TARGET: "JTK-TARGET"
    }, h = jsPlumbToolkit.Classes, i = jsPlumbToolkit.Constants, j = jsPlumbToolkit.Events;
    b.mouseEvents = ["click", "dblclick", "contextmenu", "mousedown", "mouseup", "mousemove", "mouseenter", "mouseleave", "mouseover"], b.createElement = function(a, b) {
        var c = document.createElement(a.type || i.div);
        a.units || i.px;
        return null != a.top && (c.style.top = a.top + i.px), null != a.left && (c.style.left = a.left + i.px), null != a.right && (c.style.right = a.right + i.px), null != a.bottom && (c.style.bottom = a.bottom + i.px), c.style.width = a.width, c.style.height = a.height, c.style.position = a.position || i.absolute, a.id && c.setAttribute(i.id, a.id), a.display && (c.style.display = a.display), a.clazz && (c.className = a.clazz), null != b && jsPlumb.appendElement(c, b), c
    };
    var k = function(a, b) {
        var c = document.createElement("div");
        return c.innerHTML = a.name || a.id, c.className = h.NODE, c.style.border = "1px solid #456", c.style.position = "absolute", c
    }, l = '<div data-jtk-node-id="${id}" class="' + h.NODE + '"></div>', m = {
        rotors: {
            render: function(a, b) {
                return o.template(a, b).childNodes[0]
            }
        }
    }, n = "rotors", o = Rotors.newInstance({
        defaultTemplate: l
    }), p = b.DOMElementAdapter = function(a) {
        var b = this.getJsPlumb(), c = b.getElement(a.container);
        this.getWidth = function() {
            return b.getSize(c)[0]
        }, this.getHeight = function() {
            return b.getSize(c)[1]
        }, this.append = function(a) {
            var d = b.getElement(a);
            b.appendElement(d, c)
        }, this.remove = function(a) {
            var c = b.getElement(a);
            b.removeElement(c)
        }, this.setAbsolutePosition = jsPlumb.setAbsolutePosition, this.getOffset = function(a, c) {
            return b.getOffset(a, c)
        }
    }, q = b.AbstractRenderer = function(b) {
        b = b || {};
        var i = this, l = b.toolkit, p = new c.Layouts.EmptyLayout(i), q = jsPlumb.getElement(b.container), r=!(b.elementsDraggable===!1), s = b.elementsDroppable===!0, t=!1, u = b.refreshAutomatically!==!1, v = b.templateRenderer ? e.isString(b.templateRenderer) ? m[b.templateRenderer] : {
            render: b.templateRenderer
        } : m[n], w = b.enhancedView!==!1, x = b.assignPosse || function() {
                return null
            }, y = b.modelLeftAttribute || "left", z = b.modelTopAttribute || "top", A = e.merge(b.jsPlumb || {}), B = b.jsPlumbInstance || jsPlumb.getInstance(A), C = B.getId(q);
        B.bind("beforeDrop", function(a) {
            var b = a.connection, c = b.endpoints[0].graph || b.source.jtk, d = b.endpoints[1].graph || b.target.jtk, e = c.port || c.node, f = d.port || d.node, g = a.connection.edge;
            return null == g ? l.beforeConnect(e, f, a.connection.getData()) : l.beforeMoveConnection(e, f, g)
        }), B.bind("beforeDrag", function(a) {
            var b = a.endpoint.graph || a.source.jtk, c = b.port || b.node, d = a.endpoint.connectionType;
            return l.beforeStartConnect(c, d)
        }), B.bind("beforeDetach", function(a, b) {
            var c = a.endpoints[0].graph || a.source.jtk, d = a.endpoints[1].graph || a.target.jtk, e = c.port || c.node, f = d.port || d.node, g = a.edge;
            return l.beforeDetach(e, f, g, b)
        }), B.bind("beforeStartDetach", function(a) {
            var b = a.endpoint.graph || a.source.jtk, c = b.port || b.node, d = a.connection.edge;
            return l.beforeStartDetach(c, d)
        }), B.bind("connectionEdit", function(a) {
            a.edge && (a.edge.geometry = a.getConnector().getGeometry())
        }), e.EventGenerator.apply(this, arguments), this.getJsPlumb = function() {
            return B
        }, this.getToolkit = function() {
            return l
        };
        var D = [j.canvasClick, j.canvasDblClick, j.nodeAdded, j.nodeDropped, j.nodeRemoved, j.nodeRendered, j.nodeMoveStart, j.nodeMoveEnd, j.portAdded, j.portRemoved, j.edgeAdded, j.edgeRemoved, j.edgeTypeChanged, j.nodeTypeChanged, j.portTypeChanged, j.dataLoadEnd, j.anchorChanged, j.objectRepainted, j.modeChanged, j.pan, j.zoom, j.relayout, j.click, j.tap, j.stateRestored, j.startOverlayAnimation, j.endOverlayAnimation], E = i.bind, F = B.bind;
        if (this.setHoverSuspended = B.setHoverSuspended, this.isHoverSuspended = B.isHoverSuspended, this.setJsPlumbDefaults = function(a) {
                delete a.Container, B.restoreDefaults(), B.importDefaults(a)
            }, this.bind = function(a, b) {
                - 1 == D.indexOf(a) ? F(a, b) : E(a, b)
            }, b.events)
            for (var G in b.events)
                this.bind(G, b.events[G]);
        if (b.interceptors)
            for (var H in b.interceptors)
                this.bind(H, b.interceptors[H]);
        var I=!1;
        F(j.connection, function(a) {
            if (null == a.connection.edge) {
                I=!0, a.sourceEndpoint.getParameter("nodeId") || a.sourceEndpoint.setParameter("nodeId", K[a.sourceEndpoint.elementId].id), a.targetEndpoint.getParameter("nodeId") || a.targetEndpoint.setParameter("nodeId", K[a.targetEndpoint.elementId].id);
                var b = a.sourceEndpoint.getParameter("portType"), c = _.getPortDefinition(b), d = null != c && c.edgeType ? c.edgeType: a.sourceEndpoint.getParameter("edgeType") || "default", e = a.sourceEndpoint.getParameter("nodeId"), f = a.sourceEndpoint.getParameter("portId"), g = a.targetEndpoint.getParameter("nodeId"), h = a.targetEndpoint.getParameter("portId"), k = e + (f ? "." + f : ""), m = g + (h ? "." + h : ""), n = {
                    sourceNodeId: e,
                    sourcePortId: f,
                    targetNodeId: g,
                    targetPortId: h,
                    type: d,
                    source: l.getNode(k),
                    target: l.getNode(m),
                    sourceId: k,
                    targetId: m
                }, o = l.getEdgeFactory()(d, a.connection.getData() || {}, function(b) {
                    n.edge = l.addEdge({
                        source: k,
                        target: m,
                        cost: a.connection.getCost(),
                        directed: a.connection.isDirected(),
                        data: b,
                        addedByMouse: !0
                    }, i), P[n.edge.getId()] = a.connection, a.connection.edge = n.edge, T(d, n.edge, a.connection), n.addedByMouse=!0, i.fire(j.edgeAdded, n)
                });
                o===!1 && B.detach(a.connection), I=!1
            }
        }), F(j.connectionMoved, function(a) {
            var b = 0 == a.index ? a.newSourceEndpoint: a.newTargetEndpoint;
            I=!0, l.edgeMoved(a.connection.edge, b.element.jtk.port || b.element.jtk.node, a.index), I=!1
        }), F(j.connectionDetached, function(a) {
            I=!0, l.removeEdge(a.connection.edge), I=!1;
            var b = a.sourceEndpoint.getParameters(), c = a.targetEndpoint.getParameters(), d = b.nodeId + (b.portId ? "." + b.portId : ""), e = c.nodeId + (c.portId ? "." + c.portId : "");
            i.fire(j.edgeRemoved, {
                sourceNodeId: b.nodeId,
                targetNodeId: c.nodeId,
                sourcePortId: b.portId,
                targetPortId: c.portId,
                sourceId: d,
                targetId: e,
                source: l.getNode(d),
                target: l.getNode(e),
                edge: a.connection.edge
            })
        });
        var J = {}, K = {}, L = {}, M = [], N = function(a) {
            M.push(a)
        }, O = function(a) {
            var b = M.indexOf(a);
            - 1 != b && M.splice(b, 1)
        };
        this.getNodeCount = function() {
            return M.length
        }, this.getNodeAt = function(a) {
            return M[a]
        }, this.getNodes = function() {
            return M
        }, this.getNode = function(a) {
            return J[a]
        };
        var P = {}, Q = function(a) {
            return P[a.getId()]
        }, R = function(a) {
            for (var b = [], c = 0; c < a.length; c++)
                b.push(P[a[c].getId()]);
            return b
        }, S = function(a, b, c, d) {
            d.bind(a, function(a, e) {
                b.apply(b, [{
                    edge: c,
                    e: e,
                    connection: d,
                    toolkit: l,
                    renderer: i
                }
                ])
            })
        }, T = function(a, b, c) {
            if (!c.getParameter("edge")) {
                var d = _.getEdgeDefinition(a);
                if (d && d.events)
                    for (var e in d.events)
                        S(e, d.events[e], b, c)
            }
        }, U = function(a, b) {
            var c = a.endpoints[0].getParameters(), d = a.endpoints[1].getParameters(), e = c.nodeId + (c.portId ? "." + c.portId : ""), f = d.nodeId + (d.portId ? "." + d.portId : "");
            i.fire(j.edgeRemoved, {
                sourceNodeId: c.nodeId,
                targetNodeId: d.nodeId,
                sourcePortId: c.portId,
                targetPortId: d.portId,
                sourceId: e,
                targetId: f,
                source: l.getNode(e),
                target: l.getNode(f),
                edge: b
            })
        };
        this.setSuspendRendering = function(a, b) {
            t = a, B.setSuspendDrawing(a), b && this.refresh()
        }, this.batch = function(a) {
            this.setSuspendEvents(!0), l.batch(a), this.setSuspendEvents(!1)
        };
        var V = function(a, b) {
            if (t)
                X.push([a, b]);
            else {
                var c = x(b);
                if (null != c) {
                    var d = jsPlumbUtil.isArray(c) ? c: [c];
                    d.unshift(a), B.addToPosse.apply(B, d)
                }
            }
        }, W = function() {
            for (var a = 0; a < X.length; a++)
                V.apply(this, X[a])
        }, X = [];
        if (this.bindToolkitEvents!==!1) {
            var Y = function() {
                X.length = 0, B.setSuspendDrawing(!0), this.setSuspendRendering(!0)
            }.bind(this);
            l.bind(j.dataLoadStart, Y), l.bind(j.dataAppendStart, Y), l.bind(j.dataLoadEnd, function() {
                this.setSuspendRendering(!1), W(), i.relayout(), B.setSuspendDrawing(!1, !0), p && i.fire(j.dataLoadEnd)
            }.bind(this)), l.bind(j.dataAppendEnd, function() {
                this.setSuspendRendering(!1), W(), i.refresh(), B.setSuspendDrawing(!1, !0), p && i.fire(j.dataAppendEnd)
            }.bind(this));
            var Z = function(a, b) {
                var c = J[a.id];
                if (null == c) {
                    var d = _.getNodeDefinition(l.getNodeType(a.data));
                    if (d.ignore===!0)
                        return !1;
                    if (c = ea(a, a.data, a), !c)
                        throw new Error("Cannot render node");
                    var e = B.getId(c);
                    J[a.id] = c, K[e] = a, N(a), c.jtk = {
                        node: a
                    }, i.append(c, e, b ? b.position : null), V(c, a), ka(c, a, a.id);
                    var f = {
                        node: a,
                        el: c
                    };
                    i.getLayout().nodeAdded(f, b), i.fire(j.nodeAdded, f)
                }
                return c
            };
            l.bind(j.nodeAdded, function(a) {
                var b, c = a.node, d = Z(c, a.eventInfo);
                if (null != d) {
                    var e = B.getSelector(d, "[data-port-id]");
                    for (b = 0; b < e.length; b++) {
                        var f = e[b].getAttribute("data-port-id");
                        L[c.id + "." + f] = e[b], e[b].jtk = e[b].jtk || {
                                node: c,
                                port: c.getPort(f)
                            }
                    }
                    i.refresh(!0)
                }
            }), l.bind(j.nodeRemoved, function(a) {
                i.getLayout().nodeRemoved(a.nodeId);
                var b = J[a.nodeId];
                i.fire(j.nodeRemoved, {
                    node: a.nodeId,
                    el: b
                });
                var c = B.getId(b);
                o.remove(b), B.remove(b), delete J[a.nodeId], delete K[c], O(a.node), delete b.jtk, i.refresh(!0)
            });
            var $ = function(a, b) {
                return function() {
                    var c = ca(a);
                    c.doNotFireConnectionEvent=!0, b && (c.geometry = b), l.isDebugEnabled() && console.log("Renderer", "adding edge with params", c);
                    var d = B.connect(c);
                    d.edge = a, P[a.getId()] = d, T(c.type, a, d), i.fire(j.edgeAdded, {
                        source: a.source,
                        target: a.target,
                        connection: d,
                        edge: a,
                        geometry: b
                    }), i.refresh(!0)
                }
            };
            l.bind(j.edgeAdded, function(a) {
                if (!I && a.source !== i) {
                    var c = a.edge, d = _.getEdgeDefinition(l.getEdgeType(c.data || {}));
                    if (d && d.ignore===!0)
                        return;
                    var e = $(c, a.geometry);
                    b.connectionHandler ? b.connectionHandler(c, e) : e()
                }
            }), l.bind(j.edgeRemoved, function(a) {
                if (!I && a.source !== i) {
                    var b = a.edge, c = P[b.getId()];
                    c && (l.isDebugEnabled() && console.log("Renderer", "removing edge", b), U(c, b), B.detach({
                        connection: P[b.getId()],
                        fireEvent: !1
                    }), delete P[b.getId()])
                }
            }), l.bind(j.edgeTypeChanged, function(a) {
                if (!I && a.source !== i) {
                    var b = a.obj, c = P[b.getId()];
                    if (c) {
                        var d = _.getEdgeDefinition(a.newType);
                        if (d && d.ignore===!0)
                            return;
                        c.setType(a.newType), d.connector && c.setConnector(d.connector)
                    }
                }
            }), l.bind(j.edgeTarget, function(a) {
                if (!I) {
                    var b = a.edge, c = P[b.getId()], d = J[b.target.getFullId()];
                    c ? B.silently(function() {
                        null != d ? (l.isDebugEnabled() && console.log("target change", c), B.setTarget(c, d)) : (delete P[b.getId()], B.detach({
                            connection: c,
                            forceDetach: !0,
                            fireEvent: !1
                        }))
                    }) : null != d && l.isDebugEnabled() && jsPlumbUtil.log("Target for Edge " + b.getId() + " changed to Node " + d.id + "; we have no valid connection.")
                }
            }), l.bind(j.edgeSource, function(a) {
                if (!I) {
                    var b = a.edge, c = P[b.getId()], d = J[b.source.getFullId()];
                    c ? B.silently(function() {
                        null != d ? B.setSource(c, d) : (delete P[b.getId()], B.detach({
                            connection: c,
                            forceDetach: !0,
                            fireEvent: !1
                        }))
                    }) : null != d && l.isDebugEnabled() && jsPlumbUtil.log("Source for Edge " + b.getId() + " changed to Node " + d.id + "; we have no valid connection.")
                }
            }), l.bind("graphCleared", function() {
                for (var a in J)
                    "undefined" != typeof J[a]._rotors && o.remove(J[a]), B.remove(J[a], !0), delete J[a].jtk;
                p && p.clear(), B.setSuspendEvents(!0), B.batch(B.deleteEveryEndpoint, !0), B.setSuspendEvents(!1), M.length = 0, P = {}, J = {}, K = {}, L = {}, ha = {}, ia.source = {}, ia.target = {}
            }), l.bind(j.portAdded, function(a) {
                var b = J[a.node.id], c = fa(a.port, a.data, a.node);
                L[a.node.id + l.getGraph().getPortSeparator() + a.port.id] = c, ka(jsPlumb.getElement(c), a.node, a.node.id), i.fire(j.portAdded, {
                    node: a.node,
                    nodeEl: b,
                    port: a.port,
                    portEl: c
                }), B.recalculateOffsets(b), i.refresh(!0)
            }), l.bind(j.portRemoved, function(a) {
                var b = J[a.node.id], c = a.node.id + "." + a.port.id, d = L[c];
                B.setSuspendEvents(!0), B.remove(d), B.setSuspendEvents(!1), delete L[c], i.fire(j.portRemoved, {
                    node: a.node,
                    port: a.port,
                    portEl: d,
                    nodeEl: b
                }), B.recalculateOffsets(b), i.refresh(!0)
            }), l.bind(j.edgeUpdated, function(a) {
                var b = P[a.edge.getId()];
                if (b) {
                    var c = ca(a.edge);
                    b.setType(c.type, c.data)
                }
            }), l.bind(j.portUpdated, function(a) {
                var b = L[a.port.getFullId()];
                b && ("undefined" != typeof Rotors && o.update(b, a.port.data), i.repaint(J[a.node.id]))
            }), l.bind(j.nodeUpdated, function(a) {
                var b = J[a.node.getFullId()];
                if (b) {
                    "undefined" != typeof b._rotors && o.update(b, a.node.data), ka(b, a.node, a.node.id);
                    var c = x(a.node);
                    if (null != c) {
                        var d = jsPlumbUtil.isArray(c) ? c: [c];
                        d.unshift(b), B.setPosse.apply(B, d)
                    } else
                        B.removeFromAllPosses(b);
                    i.repaint(b)
                }
            })
        }
        var _;
        this.setView = function(a) {
            var b = e.merge(l.getModel(), a || {});
            _ = new c.Model(b, B)
        }, this.setView(b.view);
        var aa = [], ba = function(a) {
            return null == a ? l : "string" == typeof a ? l.select(a, !0) : a.jtk ? l.select(a.jtk.port || a.jtk.node, !0) : a
        };
        this.activateState = function(a, b) {
            var c = _.getState(a);
            c && (b = ba(b), c.activate(b, i, l), aa.push(c))
        }, this.deactivateState = function(a, b) {
            var c = _.getState(a);
            c && (b = ba(b), c.deactivate(b, i, l), jsPlumbUtil.removeWithFunction(aa, function(a) {
                return a == c
            }))
        }, this.resetState = function() {
            for (var a = 0; a < aa.length; a++)
                aa[a].deactivate(l, i, l);
            aa.length = 0
        };
        var ca = function(a) {
            var b = l.getEdgeType(a.data), c = {
                type: b,
                connectionType: b,
                data: a.data,
                cost: a.getCost(),
                directed: a.isDirected()
            }, d = _.getEdgeDefinition(b);
            !function(a) {
                if (d)
                    for (var b = 0; b < a.length; b++)
                        d[a[b]] && (c[a[b]] = d[a[b]])
            }(["connector", "endpoints", "endpoint", "endpointStyles", "endpointStyle"]);
            var e = function(b) {
                if (a[b].getNode) {
                    var d = a[b].getNode(), e = a[b].getFullId(), f = ha[e] || ia[b][e];
                    null != f ? c[b] = f : c[b] = L[e], null == c[b] && (c[b] = J[l.getNodeId(d.data)])
                } else
                    c[b] = J[l.getNodeId(a[b].data)]
            };
            return e("source"), e("target"), c
        }, da = function(a, b, c, d, e, f, g, h) {
            return function(i, j, k) {
                var m, n = b(j), o = null, p = c(j), q = _[d](p), t = j;
                if (w) {
                    t = jsPlumb.extend({}, q ? q.parameters || {} : {}), jsPlumb.extend(t, j);
                    var u = {};
                    for (m in t)
                        t.hasOwnProperty(m) && null != t[m] && (t[m].constructor == Function ? u[m] = t[m](j) : u[m] = t[m]);
                    t = u
                }
                if (q) {
                    var x = q.template || "jtk-template-" + p;
                    o = q.templateRenderer ? q.templateRenderer(x, t, l) : v.render(x, t, l)
                } else
                    o = e(t, n);
                o = B.getElement(o), o.setAttribute(h, n), jsPlumb.addClass(o, g), o.jtk = o.jtk || {}, o.jtk[a] = i, o.jtk.node = k, f && r && na.makeDraggable && na.makeDraggable(o, q.dragOptions), s && na.makeDroppable && na.makeDroppable(o, q.dropOptions);
                var y = function(a) {
                    B.on(o, a, function(b) {
                        q.events[a]({
                            node: k,
                            el: o,
                            e: b
                        })
                    })
                };
                if (q && q.events)
                    for (m in q.events)
                        y(m);
                return o
            }
        }, ea = da("node", l.getNodeId, l.getNodeType, "getNodeDefinition", k, !0, h.NODE, f.NODE), fa = da("port", l.getPortId, l.getPortType, "getPortDefinition", k, !1, h.PORT, f.PORT);
        this.initialize = function() {
            var a, c;
            if (l.setSuspendGraph(!0), B.setSuspendDrawing(!0), b.jsPlumbInstance) {
                var d = b.jsPlumbInstance.select();
                d.each(function(a) {
                    P[a.edge.getId()] = a
                });
                var c = b.jsPlumbInstance.getManagedElements();
                for (var e in c) {
                    var f = c[e].el;
                    J[f.jtk.node.id] = f, K[b.jsPlumbInstance.getId(f)] = f.jtk.node
                }
                na.doImport && na.doImport(J, P)
            } else {
                for (a = 0; a < l.getNodeCount(); a++)
                    c = l.getNodeAt(a), Z(c);
                for (a = 0; a < l.getNodeCount(); a++)
                    if (c = l.getNodeAt(a), J[c.id])
                        for (var g = l.getAllEdgesFor(c), h = 0; h < g.length; h++)
                            if (g[h].source == c || g[h].source.getNode && g[h].source.getNode() == c) {
                                var i = _.getEdgeDefinition(l.getNodeType(g[h].data));
                                if (i && i.ignore===!0)
                                    continue;
                                var j = ca(g[h]);
                                j.doNotFireConnectionEvent=!0;
                                var k = B.connect(j);
                                null != k && (k.edge = g[h], P[g[h].getId()] = k, T(j.type, g[h], k))
                            }
            }
            this.relayout(), B.setSuspendDrawing(!1, !0), l.setSuspendGraph(!1)
        }, this.getContainer = function() {
            return q
        }, this.getContainerId = function() {
            return C
        }, this.getRenderedElement = function(a) {
            if (null == a)
                return null;
            var b = a.getFullId();
            return "Port" === a.objectType ? ia.source[b] || ia.target[b] : J[b]
        }, this.getRenderedNode = function(a) {
            return J[a]
        }, this.getRenderedPort = function(a) {
            return L[a]
        }, this.getRenderedConnection = function(a) {
            return P[a]
        };
        var ga = function(b) {
            var c = B.extend({
                container: q,
                getElementForNode: function(a) {
                    return J[a]
                }
            }, b);
            if (c.jsPlumbToolkit = l, c.adapter = i, !a.jsPlumbToolkit.Layouts[c.type])
                throw "no such layout [" + c.type + "]";
            return c.locationFunction || (c.locationFunction = function(a) {
                return [Rotors.data(a.data, y), Rotors.data(a.data, z)]
            }), new a.jsPlumbToolkit.Layouts[c.type](c)
        };
        this.adHocLayout = function(a) {
            if (a) {
                var b = p;
                this.setLayout(a), p = b
            }
        }, this.setLayout = function(a, b) {
            a && (p = ga(a), b || i.refresh())
        }, this.getLayout = function() {
            return p
        }, this.magnetize = function(a) {
            null != p && p.magnetize(a)
        }, this.refresh = function(a) {
            t || a&&!u || (p ? p.layout(function() {
                window.setTimeout(B.repaintEverything, 0)
            }) : B.repaintEverything())
        }, this.setRefreshAutomatically = function(a) {
            u = a
        }, this.relayout = function(a) {
            t || (p ? p.relayout(a, function() {
                B.repaintEverything(), this.fire("relayout", this.getBoundsInfo())
            }.bind(this)) : B.repaintEverything())
        }, this.getPath = function(a) {
            var b = l.getPath(a);
            return b && (b.setVisible = function(a) {
                i.setVisible(b, a)
            }, b.addNodeClass = function(a) {
                b.eachNode(function(b, c) {
                    B.addClass(J[c.id], a)
                })
            }, b.removeNodeClass = function(a) {
                b.eachNode(function(b, c) {
                    B.removeClass(J[c.id], a);
                })
            }, b.addEdgeClass = function(a) {
                b.eachEdge(function(b, c) {
                    P[c.getId()].addClass(a)
                })
            }, b.removeEdgeClass = function(a) {
                b.eachEdge(function(b, c) {
                    P[c.getId()].removeClass(a)
                })
            }, b.addClass = function(a) {
                this.addNodeClass(a), this.addEdgeClass(a)
            }, b.removeClass = function(a) {
                this.removeNodeClass(a), this.removeEdgeClass(a)
            }), b
        }, this.getPosition = function(a) {
            var b = this.getLayout();
            if (b) {
                var c = ma(a).id;
                return b.getPosition(c)
            }
        }, this.getSize = function(a) {
            return B.getSize(ma(a).el)
        }, this.getCoordinates = function(a) {
            var b = this.getLayout();
            if (b) {
                var c = ma(a), d = b.getPosition(c.id), e = B.getSize(c.el);
                return {
                    x: d[0],
                    y: d[1],
                    w: e[0],
                    h: e[1]
                }
            }
        };
        var ha = {}, ia = {
            source: {},
            target: {}
        }, ja = function(a, b, c) {
            var f = a.getAttribute("port-id"), g = a.getAttribute("port-type") || "default", h = a.getAttribute("scope") || B.getDefaultScope(), j = l.getNodeType(b), k = _.getNodeDefinition(j), m = _.getPortDefinition(f, k), n = _.getPortDefinition(g, k), o = e.merge(n, m), p = null == o ? {}
                : d.populate(o, b.data), q = function(a) {
                return function(d) {
                    var e = b.getPort(f), h = [{
                        portId: f,
                        nodeId: c,
                        port: e,
                        node: b,
                        portType: g,
                        endpoint: d.endpoint,
                        anchor: d.anchor
                    }
                    ];
                    a.apply(a, h)
                }
            }, r = function(a) {
                return function(b) {
                    var c = [{
                        connection: b.connection || b,
                        source: ma(b.source),
                        target: ma(b.target),
                        scope: b.scope
                    }
                    ];
                    return a.apply(a, c)
                }
            }, s = p.edgeType || a.getAttribute("edge-type") || "default", t = {
                paintStyle: "connectorStyle",
                hoverPaintStyle: "connectorHoverStyle",
                overlays: "connectorOverlays",
                endpointStyle: "paintStyle"
            }, u = _.getEdgeDefinition(s);
            if (u)
                for (var v in u) {
                    var w = t[v] || v;
                    p[w] = u[v]
                }
            if (p.connectionType = s, p.portId = f, p.portType = g, p.scope = h, p.parameters = p.parameters || {}, p.parameters.portId = f, p.parameters.portType = g, p.parameters.edgeType = s, p.parameters.scope = h, p.parameters.nodeId = c, p.events = {}, o.events)
                for (v in o.events)
                    p.events[v] = q(o.events[v]);
            if (o.interceptors)
                for (v in o.interceptors)
                    p[v] = r(o.interceptors[v]);
            return p.events.anchorChanged = function(a) {
                i.fire("anchorChanged", {
                    portId: f,
                    nodeId: c,
                    portType: g,
                    node: b,
                    port: b.getPort(f),
                    endpoint: a.endpoint,
                    anchor: a.anchor
                })
            }, p
        }, ka = function(a, b, c, d) {
            d = d || 0;
            var e;
            if (a.childNodes) {
                var f, h = [];
                for (e = 0; e < a.childNodes.length; e++)
                    if (3 != a.childNodes[e].nodeType && 8 != a.childNodes[e].nodeType) {
                        if (a.childNodes[e].tagName.toUpperCase() == g.PORT && null == a.childNodes[e].getAttribute("jtk-processed")) {
                            f = ja(a.childNodes[e], b, c);
                            var i = B.addEndpoint(a, f);
                            ha[c + "." + f.portId] = i;
                            var j = b.addPort({
                                id: f.portId
                            });
                            a.childNodes[e].setAttribute("jtk-processed", !0), i.graph = {
                                node: b,
                                port: j
                            }, "undefined" != typeof Rotors && o.onUpdate(a, function(a, b) {})
                        }
                        if (a.childNodes[e].tagName.toUpperCase() == g.SOURCE && null == a.childNodes[e].getAttribute("jtk-processed")) {
                            var k = a.childNodes[e];
                            f = ja(k, b, c);
                            var m = k.getAttribute("filter");
                            if (null != f.portId && (ia.source[c + "." + f.portId] = a, a.jtk = a.jtk || {}, a.jtk.port = l.addPort(b, {
                                    id: f.portId
                                }, !0)), m) {
                                var n = k.getAttribute("filter-exclude"), p = "true" === n;
                                f.filter = m, f.filterExclude = p
                            }
                            delete f.uniqueEndpoint, f.extract = {};
                            for (var q = 0; q < k.attributes.length; q++) {
                                var r = k.attributes[q];
                                0 === r.name.indexOf("data-") && (f.extract[r.value] = r.name.split("-")[1])
                            }
                            var s, t = a._katavorioDrop ? a._katavorioDrop.length: 0;
                            B.makeSource(a, f);
                            var u = a._katavorioDrop ? a._katavorioDrop.length: 0;
                            u > t && (s = a._katavorioDrop[a._katavorioDrop.length - 1]), a.childNodes[e].setAttribute("jtk-processed", !0), "undefined" != typeof Rotors && o.onUpdate(a, function(a, d) {
                                var e = jsPlumb.getSelector(a, "jtk-source");
                                if (1 == e.length) {
                                    var f = ja(e[0], b, c);
                                    f.scope && (B.setSourceScope(a, f.scope, f.edgeType), s && s.k.setDropScope(s, f.scope))
                                }
                            })
                        }
                        if (a.childNodes[e].tagName.toUpperCase() == g.TARGET && null == a.childNodes[e].getAttribute("jtk-processed")) {
                            f = ja(a.childNodes[e], b, c), 0 != d && (ia.target[c + "." + f.portId] = a, a.jtk = a.jtk || {}, a.jtk.port = l.addPort(b, {
                                id: f.portId
                            }, !0)), B.makeTarget(a, f);
                            var v = a._katavorioDrop[a._katavorioDrop.length - 1];
                            a.childNodes[e].setAttribute("jtk-processed", !0), "undefined" != typeof Rotors && o.onUpdate(a, function(a, d) {
                                var e = jsPlumb.getSelector(a, "jtk-target");
                                if (1 == e.length) {
                                    var f = ja(e[0], b, c);
                                    f.scope && (v.targetDef.def.scope = f.scope, v.k.setDropScope(v, f.scope))
                                }
                            })
                        }
                        ka(a.childNodes[e], b, c, d + 1)
                    }
                for (e = 0; e < h.length; e++)
                    h[e].parentNode.removeChild(h[e])
            }
        };
        this.setLayout(b.layout, !0), this.storePositionsInModel = function(a) {
            a = a || {};
            var b = a.leftAttribute || "left", c = a.topAttribute || "top", d = p.getPositions();
            for (var e in d) {
                var f = l.getNode(e);
                Rotors.data(f.data, b, d[e][0]), Rotors.data(f.data, c, d[e][1])
            }
        }, this.storePositionInModel = function(a) {
            var b = "string" == typeof a ? a: a.id, c = "string" == typeof a ? "left": a.leftAttribute || "left", d = "string" == typeof a ? "top": a.topAttribute || "top", e = p.getPosition(b), f = l.getNode(b);
            return f && (Rotors.data(f.data, c, e[0]), Rotors.data(f.data, d, e[1])), e
        };
        var la = function(a, b, c, d, e, f, g) {
            return a = a || ma(b), a && (p.setPosition(a.id, c, d), e || (B.setAbsolutePosition(a.el, [c, d], f, g), B.revalidate(a.el))), a
        };
        this.setPosition = function(a, b, c, d) {
            return la(null, a, b, c, d)
        }, this.animateToPosition = function(a, b, c, d) {
            var e = ma(a);
            if (e) {
                var f = p.getPosition(e.id);
                la(e, a, b, c, !1, [f[0], f[1]], d)
            }
        }, this.setVisible = function(a, b, c) {
            if (null != a) {
                var d = function(a) {
                    var d = Q(a);
                    d && d.setVisible(b), c || (d.endpoints[0].setVisible(b), d.endpoints[1].setVisible(b))
                }, e = function(a, e) {
                    if (e && (e.style.display = b ? "block" : "none", !c))
                        for (var f = l.getAllEdgesFor(a), g = 0; g < f.length; g++)
                            d(f[g])
                }, f = function(a) {
                    var c = a.getFullId(), d = ha[c];
                    d.setVisible(b)
                }, g = function(a) {
                    var b = ma(a);
                    switch (b.type) {
                        case"Edge":
                            d(b.obj);
                            break;
                        case"Node":
                            e(b.obj, b.el);
                            break;
                        case"Port":
                            f(b.obj)
                    }
                };
                if (a.eachNode && a.eachEdge)
                    a.eachNode(function(a, b) {
                        g(b)
                    }), a.eachEdge(function(a, b) {
                        g(b)
                    });
                else if (a.length && "string" != typeof a)
                    for (var h = 0; h < a.length; h++)
                        g(a[h]);
                else
                    g(a)
            }
        };
        var ma = function(a) {
            return a instanceof B.getDefaultConnectionType() && (a = a.edge), l.getObjectInfo(a, function(a) {
                return a.getNode ? L[a.id] : J[a.id]
            })
        };
        this.addToPosse = function(a, b, c) {
            jsPlumbToolkitUtil.each(a, function(a) {
                var d = ma(a);
                d.el && B.addToPosse(d.el, {
                    id: b,
                    active: c!==!1
                })
            })
        }, this.setPosse = function(a, b) {
            jsPlumbToolkitUtil.each(a, function(a) {
                var c = ma(a);
                c.el && B.setPosse(c.el, b)
            })
        }, this.removeFromPosse = function(a, b) {
            jsPlumbToolkitUtil.each(a, function(a) {
                var c = ma(a);
                c.el && B.removeFromPosse(c.el, b)
            })
        }, this.removeFromAllPosses = function(a) {
            jsPlumbToolkitUtil.each(a, function(a) {
                var b = ma(a);
                b.el && B.removeFromAllPosses(b.el)
            })
        }, this.setPosseState = function(a, b, c) {
            jsPlumbToolkitUtil.each(a, function(a) {
                var d = ma(a);
                d.el && B.setPosseState(d.el, b, c)
            })
        };
        var na = {
            jsPlumb: B,
            toolkit: l,
            container: q,
            containerId: C,
            getConnectionsForEdges: R,
            getConnectionForEdge: Q,
            getElement: function(a) {
                return J[a]
            },
            getNodeForElementId: function(a) {
                return K[a]
            },
            getObjectInfo: ma,
            nodeMap: J,
            reverseNodeMap: K
        };
        return na
    };
    b.DOM = function(a) {
        q.apply(this, arguments), p.apply(this, arguments)
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    var a = this, b = {
        webkit: {
            mac: function(a) {
                return a.deltaY / 120
            },
            win: function(a) {
                return a.deltaY / 100
            }
        },
        safari: function(a) {
            return a.wheelDeltaY / 120
        },
        firefox: {
            mac: function(a) {
                return - 1 * a.deltaY * (1 == a.deltaMode ? 25 : 1) / 120
            },
            win: function(a) {
                return - 1 * a.deltaY / 3
            }
        },
        ie: function(a) {
            return a.wheelDelta / 120
        },
        "default": function(a) {
            return a.deltaY || a.wheelDelta
        }
    }, c = /Mac/.test(navigator.userAgent) ? "mac": "win", d =- 1 != navigator.userAgent.indexOf("Firefox") ? "firefox" : /Safari/.test(navigator.userAgent) ? "safari" : /WebKit/.test(navigator.userAgent) ? "webkit" : /Trident/.test(navigator.userAgent) ? "ie" : "default", e = "function" == typeof b[d] ? b[d] : b[d][c], f = function(a) {
        return e(a || event)
    }, g = function(a, b) {
        return function(c) {
            b && null != c.mozInputSource && 1 !== c.mozInputSource || (c.normalizedWheelDelta = f(c), a(c))
        }
    }, h = "onwheel"in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
    a.addWheelListener = function(a, b, c) {
        var d = g(b, c);
        a.addEventListener ? a.addEventListener(h, d, !1) : a.attachEvent && a.attachEvent("onmousewheel", d)
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    var a = this;
    a.PinchListener = function(a) {
        var b = "onpointerdown"in document.documentElement, c = "ontouchstart"in document.documentElement, d = [0, 0], e = 0, f = 0, g = function(b) {
            a[b](d, f, e, e / f)
        }, h = function() {
            a.onPinchEnd()
        }, i = "onPinchStart", j = "onPinch", k = "pointerdown", l = "pointermove", m = "pointerup", n = "touchstart", o = "touchmove", p = "touchend", q = function(a, b, c, d) {
            return Math.sqrt(Math.pow(c - a, 2) + Math.pow(d - b, 2))
        }, r = {
            pointer: function() {
                var b = {}, c = [], n = 0, o=!1, p = function() {
                    2 == n && (d = [(c[1].p[0] + c[0].p[0]) / 2, (c[1].p[1] + c[0].p[1]) / 2], e = q(c[1].p[0], c[1].p[1], c[0].p[0], c[0].p[1]))
                }, r = function(a) {
                    n >= 2 || o || (c[n] = {
                        e: a,
                        p: [a.pageX, a.pageY]
                    }, b["" + a.pointerId] = n, n++, p(), 2 == n && (f = e, g(i)))
                }, s = function(a) {
                    var c = b["" + a.pointerId];
                    null != c && (delete b["" + a.pointerId], n--, o = 0 !== n, h())
                }, t = function(a) {
                    if (!o && 2 == n) {
                        var d = b[a.pointerId];
                        null != d && (c[d].p = [a.pageX, a.pageY], p(), g(j))
                    }
                };
                a.bind(a.el, k, r), a.bind(document, m, s), a.bind(document, l, t)
            },
            touch: function(a) {
                var b = function(a) {
                    return a.touches || []
                }, c = function(a, b) {
                    return a.item ? a.item(b) : a[b]
                }, k = function(a) {
                    var b = c(a, 0), d = c(a, 1);
                    return q(b.pageX, b.pageY, d.pageX, d.pageY)
                }, l = function(a) {
                    var b = c(a, 0), d = c(a, 1);
                    return [(b.pageX + d.pageX) / 2, (b.pageY + d.pageY) / 2]
                }, m=!1, r = function(c) {
                    var h = b(c);
                    2 == h.length && a.enableWheelZoom!==!1 && (d = l(h), e = f = k(h), m=!0, a.bind(document, o, t), a.bind(document, p, s), g(i))
                }, s = function(b) {
                    m=!1, a.unbind(document, o, t), a.unbind(document, p, s), h()
                }, t = function(a) {
                    if (m) {
                        var c = b(a);
                        2 == c.length && (e = k(c), d = l(c), g(j))
                    }
                };
                a.bind(a.el, n, r)
            }
        };
        b ? r.pointer(a) : c && r.touch(a)
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    this.ZoomWidget = function(b) {
        function e(a, c) {
            if (f())
                return {
                    w: 0,
                    h: 0,
                    x: 0,
                    y: 0,
                    vw: b.width(s),
                    vh: b.height(s),
                    padding: a,
                    z: 1,
                    zoom: 1
                };
            a = a || 0, c = c || .9;
            var d = Math.abs(ia.maxx[0][0][0] + ia.maxx[0][1] - ia.minx[0][0][0]), e = Math.abs(ia.maxy[0][0][1] + ia.maxy[0][2] - ia.miny[0][0][1]), g = b.width(s), h = b.height(s), i = g / ((d + 2 * a) / c), j = h / ((e + 2 * a) / c), k = Math.min(i, j);
            return {
                w: d,
                h: e,
                x: ia.minx[0][0][0],
                y: ia.miny[0][0][1],
                vw: g,
                vh: h,
                padding: a,
                z: k,
                zoom: $
            }
        }
        function f() {
            for (var a in ja)
                return !1;
            return !0
        }
        b.events = b.events || {};
        var g, h, i, j, k, l, m = this, n = function() {}, o = b.canvas, p = b.domElement || function(a) {
                return a
            }, q = p(o), r = b.viewport, s = p(r), t = b.events.zoom || n, u = (b.events.maybeZoom || function() {
            return !0
        }, b.events.pan || n), v = b.events.mousedown || n, w = b.events.mouseup || n, x = b.events.mousemove || n, y = b.events.transformOrigin || n, z=!(b.clamp===!1), A = b.clampZoom!==!1, B = b.panDistance || 50, C = b.enablePan!==!1, D = b.enableWheelZoom!==!1, E = b.enableAnimation!==!1, F = b.wheelFilter || function() {
                return !0
            }, G = b.wheelSensitivity || 10, H = b.enablePanButtons!==!1, I = b.padding || [0, 0], J = b.consumeRightClick!==!1, K = b.smartMinimumZoom, L=!1, M = "mousedown", N = "mouseup", O = "mousemove", P = ["webkit", "Moz", "ms"], Q = b.bind, R = b.unbind, S=!(b.enabled===!1), T = b.clampToBackground, U = b.clampToBackgroundExtents, V = b.filter || function(a) {
                return !1
            }, W = b.width, X = b.height, Y = 0, Z = 0, $ = b.zoom || 1, _ = [0, 0], aa=!1, ba=!1, ca=!1, da=!1, ea = b.zoomRange || [.05, 3], fa = 150, ga =- 1, ha =- 1, ia = {
            minx: [],
            maxx: [],
            miny: [],
            maxy: []
        }, ja = {}, ka = {}, la=!1, ma = function() {
            ia.minx.sort(function(a, b) {
                return a[0][0] < b[0][0]?-1 : 1
            }), ia.miny.sort(function(a, b) {
                return a[0][1] < b[0][1]?-1 : 1
            }), ia.maxx.sort(function(a, b) {
                return a[0][0] + a[1] > b[0][0] + b[1]?-1 : 1
            }), ia.maxy.sort(function(a, b) {
                return a[0][1] + a[2] > b[0][1] + b[2]?-1 : 1
            })
        }, na = function(a, b, c, d) {
            null == ja[a] && (ja[a] = [], ia.minx.push(ja[a]), ia.miny.push(ja[a]), ia.maxx.push(ja[a]), ia.maxy.push(ja[a])), ja[a][0] = b, ja[a][1] = c, ja[a][2] = d, ja[a][3] = a, L ? la=!0 : ma()
        };
        this.setSuspendRendering = function(a) {
            L = a, !a && la && ma(), la=!1
        };
        var oa = function(a, b) {
            return function(c) {
                Pa(q, a * B, b * B, null, !0, function(a) {
                    u(a[0], a[1], $, $, c), g && g.pan(), $a.pan()
                })
            }
        }, pa = 150, qa = 60, ra = 10, sa = null, ta = null, ua = null, va = function(a, c, d) {
            return function() {
                ua = d, b.addClass(ua, "jtk-surface-pan-active"), b.bind(document, "mouseup", wa), sa = window.setTimeout(function() {
                    b.bind(document, N, ya), ta = window.setInterval(xa(a, c), qa)
                }, pa)
            }
        }, wa = function() {
            window.clearTimeout(sa), ua && b.removeClass(ua, "jtk-surface-pan-active"), ua = null
        }, xa = function(a, b) {
            return function(c) {
                var d = Pa(q, a * ra, b * ra, null);
                u(d[0], d[1], $, $, c), g && g.pan(), $a.pan()
            }
        }, ya = function() {
            window.clearTimeout(ta)
        }, za = function(a, c, d, e, f) {
            var g = document.createElement("div");
            g.innerHTML = f || "", g.style.position = "absolute";
            for (var h in c)
                g.style[h] = c[h];
            return g.className = "jtk-surface-pan jtk-surface-pan-" + a, s.appendChild(g), b.bind(g, "click", oa(d, e)), b.bind(g, "mousedown", va(d, e, g)), g
        };
        H && (za("top", {
            left: "0px",
            top: "0px"
        }, 0, - 1, "&#8593;"), za("bottom", {
            left: "0px",
            bottom: "0px"
        }, 0, 1, "&#8595;"), za("left", {
            left: "0px",
            top: "0px"
        }, - 1, 0, "&#8592;"), za("right", {
            right: "0px",
            top: "0px"
        }, 1, 0, "&#8594;"));
        var Aa = function(a, b, c) {
            c = c || q;
            for (var d = 0; d < P.length; d++) {
                var e = a.replace(/([a-z]){1}/, function(a) {
                    return P[d] + a.toUpperCase()
                });
                c.style[e] = b
            }
            c.style[a] = b
        }, Ba = function(a) {
            Aa("transformOrigin", _[0] + "% " + _[1] + "%", a)
        }, Ca = function(a, c) {
            var d = Qa(), e = b.offset(s, !0), f = Oa(q), g = b.width(o), h = b.height(o), i = [(a - (e.left + f[0]) - d[0]) / $, (c - (e.top + f[1]) - d[1]) / $];
            return {
                w: g,
                h: h,
                xy: i,
                xScale: i[0] / g,
                yScale: i[1] / h,
                o: [i[0] / g * 100, i[1] / h * 100]
            }
        }, Da = function(a, b, c, d) {
            var e, f, g, h, i = _[0] / 100 * b, j = _[1] / 100 * c;
            e =- (i * (1 - $)), f =- (j * (1 - $)), _ = a, Ba(), i = _[0] / 100 * b, j = _[1] / 100 * c, g =- (i * (1 - $)), h =- (j * (1 - $));
            var k = Pa(q, g - e, h - f, d);
            y && y(_, k)
        }, Ea = function(a, b, c) {
            var d = Ca(a, b);
            Da(d.o, d.w, d.h, c)
        }, Fa = function(a) {
            var b = Ha(a);
            Ea(b[0], b[1], a)
        }, Ga = function(a, c) {
            var d = b.width(o), e = b.height(o);
            Da([a / d * 100, c / e * 100], d, e)
        }, Ha = this.pageLocation = function(a) {
            if (null != a.pageX)
                return [a.pageX, a.pageY];
            var b = Ia(Ja(a), 0);
            return b ? [b.pageX, b.pageY] : [0, 0]
        }, Ia = function(a, b) {
            return a.item ? a.item(b) : a[b]
        }, Ja = function(a) {
            return a.touches || []
        }, Ka = function(a, b, c, d, f) {
            if (!(null == a || isNaN(a) || 0 > a)) {
                var h = ea[0];
                if (K) {
                    h = .5;
                    var i = e().z, j = a / i;
                    h > j && (a = i * h)
                } else
                    h > a && (a = h);
                if (a > ea[1] && (a = ea[1]), d) {
                    var k = a > $ ? .05: - .05, l = $, m = $ > a, n = window.setInterval(function() {
                        l = Ka(l + k), m && a >= l && window.clearInterval(n), !m && l >= a && window.clearInterval(n)
                    });
                    return $
                }
                Aa("transform", "scale(" + a + ")");
                var o = $;
                if ($ = a, f || t(Y, Z, $, o, b, c), null != g && g.setZoom(a), $a && $a.pan(), A) {
                    var p = Oa(q), r = Na(p[0], p[1]);
                    (r[0] != p[0] || r[1] != p[1]) && Oa(q, r[0], r[1], null, !d)
                }
                return $
            }
        }, La = function(a, b, c, d) {
            - fa > b && (b =- fa), b > fa && (b = fa), Ma(i, b, - fa, fa, c, d)
        }, Ma = function(a, b, c, d, e, f) {
            var g = b / (b >= 0 ? d : c), h = b >= 0 ? 1: 0, i = a + g * (ea[h] - a);
            Ka(i, e, f)
        }, Na = function(a, c, d) {
            if (z || T || U) {
                var f = Qa(), h = a, i = c, j = z ? e(): {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0,
                    vw: b.width(s),
                    vh: b.height(s),
                    padding: d,
                    z: 1
                };
                if (d = (d || 20) * $, (T || U) && null != g) {
                    var k = g.getWidth(), l = g.getHeight(), m = Math.max(j.x + j.w, k), n = Math.max(j.y + j.h, l);
                    j.w = m - j.w, j.h = n - j.h;
                    var o = j.vw / j.w, p = j.vh / j.h;
                    j.z = Math.min(o, p), U && (d = Math.max(j.vw, j.vh))
                }
                var q = [j.x + j.w, j.y + j.h];
                g && (q[0] = Math.max(q[0], g.getWidth()), q[1] = Math.max(q[1], g.getHeight()));
                var r = a + f[0] + q[0] * $ - d, t = c + f[1] + q[1] * $ - d, u = a + f[0] + j.x * $ + d, v = c + f[1] + j.y * $ + d;
                return 0 > r && (h -= r), u > j.vw && (h -= u - j.vw), 0 > t && (i -= t), v > j.vh && (i -= v - j.vh), [h, i]
            }
            return [a, c]
        }, Oa = function(a, c, d, e, f, g, h) {
            if (1 == arguments.length)
                return [parseInt(a.style.left, 10) || 0, parseInt(a.style.top, 10) || 0];
            var i = Na(c, d);
            return E&&!f && b.animate ? b.animate(a, {
                left: i[0],
                top: i[1]
            }, {
                step: h,
                complete: function() {
                    g && g(i)
                }
            }) : (a.style.left = i[0] + "px", a.style.top = i[1] + "px", g && g(i)), i
        };
        q.style.left = "0px", q.style.top = "0px";
        var Pa = function(a, b, c, d, e, f) {
            var g = Oa(a);
            return Oa(a, g[0] + b, g[1] + c, d, !e, f)
        }, Qa = function() {
            var a = b.width(o), c = b.height(o), d = _[0] / 100 * a, e = _[1] / 100 * c;
            return [d * (1 - $), e * (1 - $)]
        }, Ra = {
            start: function(a, c) {
                if (!ba) {
                    var d = a.srcElement || a.target;
                    S && (d == q || d == s || d._jtkDecoration || g && g.owns(d) || V(d, a)===!0) && (da=!1, ga =- 1, ha =- 1, 3 !== a.which || b.enableWheelZoom===!1 || null != a.mozInputSource && 1 !== a.mozInputSource ? c.length <= 1 && (aa=!0, h = Ha(a), l = Oa(q)) : (ca=!0, h = Ha(a), Fa(a), l = Oa(q), i = $)), v(a, m)
                }
            },
            move: function(a, b) {
                var c, d, e;
                if (da=!1, !ba) {
                    if (ca)
                        e = Ha(a), c = e[0] - h[0], d = e[1] - h[1], La(c, d, a);
                    else if (aa && C && null != h) {
                        e = Ha(a), c = e[0] - h[0], d = e[1] - h[1];
                        var f = Oa(q, l[0] + c, l[1] + d, a, !0);
                        u(f[0], f[1], $, $, a), g && g.pan(), $a && $a.pan()
                    }
                    x(a, m)
                }
            },
            end: function(a, b) {
                ba || (ca=!1, h = null, aa=!1, da=!1, R(document, O, Ta), R(document, N, Ua), Q(document, O, Va), w(a, m))
            },
            contextmenu: function(a) {}
        }, Sa = function(a, b) {
            "contextmenu" == a && J && b.preventDefault && b.preventDefault();
            var c = Ja(b);
            Ra[a](b, c)
        }, Ta = function(a) {
            Sa("move", a)
        }, Ua = function(a) {
            Sa("end", a)
        }, Va = function(a) {
            da=!1
        };
        Q(document, O, Va);
        var Wa = this.start = function(a) {
            S && null != a && (R(document, O, Va), Q(document, O, Ta), Q(document, N, Ua), Ra.start(a, Ja(a)))
        };
        if (Q(r, M, Wa), Q(r, "contextmenu", function(a) {
                Sa("contextmenu", a)
            }), D) {
            var Xa = function(a) {
                F(a) && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), i = $, da || (Fa(a), da=!0), La(0, a.normalizedWheelDelta * G, a, !0))
            };
            addWheelListener(s, Xa, !0)
        }
        new PinchListener({
            el: r,
            bind: Q,
            unbind: R,
            enableWheelZoom: b.enableWheelZoom,
            onPinch: function(a, b, c, d) {
                Ka(d * i);
                var e = a[0] - h[0], f = a[1] - h[1];
                Oa(q, l[0] + e, l[1] + f, null, !0)
            },
            onPinchStart: function(a, b) {
                ba=!0, h = a, j = k = b, i = $, Ea(h[0], h[1]), l = Oa(q)
            },
            onPinchEnd: function() {
                ba=!1, h = null
            }
        }), Ka($, null, !1, !1, !0), Ba(), this.positionChanged = function(a, c, d) {
            d = d || b.id(a);
            var e = c || Oa(a), f = b.width(a), g = b.height(a);
            ka[d] = a, na(d, e, f, g)
        }, this.add = function(a, b, c, d) {
            this.positionChanged(a, c, b), d && (Q(a, M, Wa), a._jtkDecoration=!0)
        }, this.remove = function(a) {
            a = p(a);
            var c = b.id(a);
            delete ja[c], delete ka[c];
            for (var d in ia)
                if (ia.hasOwnProperty(d)) {
                    for (var e =- 1, f = 0; f < ia[d].length; f++)
                        if (ia[d][f][3] === c) {
                            e = f;
                            break
                        }
                    - 1 != e && ia[d].splice(e, 1)
                }
        }, this.reset = function() {
            ia.minx.length = 0, ia.miny.length = 0, ia.maxx.length = 0, ia.maxy.length = 0, ja = {}, ka = {}, Oa(q, 0, 0, null, !0)
        }, this.getBoundsInfo = e, this.zoomToFit = function(a) {
            a = a || {};
            var b = e(a.padding, a.fill);
            a.doNotZoomIfVisible && b.z > $ || Ka(b.z), m.centerContent({
                bounds: b,
                doNotAnimate: a.doNotAnimate!==!1,
                onComplete: a.onComplete,
                onStep: a.onStep,
                doNotFirePanEvent: a.doNotFirePanEvent
            })
        }, this.zoomToFitIfNecessary = function(a) {
            var b = jsPlumb.extend(a || {});
            b.doNotZoomIfVisible=!0, this.zoomToFit(b)
        }, this.zoomToElements = function(a) {
            for (var c = {
                x: 1 / 0,
                y: 1 / 0,
                xMax: - (1 / 0),
                yMax: - (1 / 0),
                z: 1,
                vw: b.width(s),
                vh: b.height(s)
            }, d = 0; d < a.elements.length; d++) {
                var e = a.elements[d], f = b.offset(e), g = b.width(e), h = b.height(e);
                c.x = Math.min(c.x, f.left), c.y = Math.min(c.y, f.top), c.xMax = Math.max(c.xMax, f.left + g), c.yMax = Math.max(c.yMax, f.top + h)
            }
            c.w = c.xMax - c.x, c.h = c.yMax - c.y, c.z = Math.min(c.vw / c.w, c.vh / c.h), a.doNotZoomIfVisible && c.z > $ || Ka(c.z), m.centerContent({
                bounds: c,
                doNotAnimate: a.doNotAnimate!==!1,
                onComplete: a.onComplete,
                onStep: a.onStep,
                doNotFirePanEvent: a.doNotFirePanEvent
            })
        }, this.zoomToBackground = function(a) {
            if (a = a || {}, null != g) {
                var b = g.getWidth(), c = g.getHeight(), d = W(s), e = X(s), f = d / b, h = e / c, i = Math.min(f, h), j = {
                    w: b,
                    h: c,
                    x: 0,
                    y: 0,
                    vw: d,
                    vh: e,
                    padding: 0,
                    z: i
                };
                Ka(j.z), m.centerContent({
                    bounds: j,
                    doNotAnimate: a.doNotAnimate,
                    onComplete: a.onComplete,
                    onStep: a.onStep
                })
            }
        }, this.setFilter = function(a) {
            V = a || function(a) {
                    return !1
                }
        }, this.centerBackground = function() {
            if (null != g) {
                var a = jsPlumb.extend({}, e());
                a.x = g.getWidth() / 2, a.y = g.getHeight() / 2, a.w = 1, a.h = 1, m.centerContent({
                    bounds: a,
                    doNotAnimate: b.doNotAnimate,
                    onComplete: b.onComplete,
                    onStep: b.onStep,
                    vertical: !0,
                    horizontal: !0
                })
            }
        }, this.alignBackground = function(a) {
            if (null != g) {
                var b = a.split(" "), c = b[0] || "left", d = b[1] || "top", f = e(), h = "left" === c ? 0: f.vw - g.getWidth() * $, i = "top" === d ? 0: f.vh - g.getHeight() * $, j = Qa();
                Oa(q, h - j[0], i - j[1]), g.pan(), $a && $a.pan()
            }
        }, this.positionElementAt = function(a, c, d, e, f, g) {
            e = e || 0, f = f || 0;
            var h = Qa(), i = Oa(q), j = p(a), k = j.parentNode, l = b.offset(k), m = b.offset(r), n = m.left - l.left + (i[0] + h[0]) + c * $ + e, o = m.top - l.top + (i[1] + h[1]) + d * $ + f;
            g && 0 > n && (n = 0), g && 0 > o && (o = 0), j.style.left = n + "px", j.style.top = o + "px"
        }, this.positionElementAtPageLocation = function(a, b, c, d, e) {
            var f = this.mapLocation(b, c);
            this.positionElementAt(a, f.left, f.top, d, e)
        }, this.positionElementAtEventLocation = function(a, b, c, d) {
            var e = this.mapEventLocation(b);
            this.positionElementAt(a, e.left, e.top, c, d)
        }, this.zoomToEvent = function(a, b) {
            Fa(a), Ka($ + b, a)
        }, this.relayout = function(a, c) {
            if (b.enablePan===!1) {
                Oa(q, - a.x + I[0], - a.y + I[1], null, c);
                var d = a.w + (a.x < 0 ? a.x : 0) + I[0], e = a.h + (a.y < 0 ? a.y : 0) + I[1];
                q.style.width = d + "px", q.style.height = e + "px";
                var f = 0 == d ? 0: (a.x - I[0]) / d * 100, g = 0 == e ? 0: (a.y - I[1]) / e * 100;
                this.setTransformOrigin(f, g)
            }
        }, this.nudgeZoom = function(a, c) {
            var d = b.offset(s, !0), e = d.left + b.width(s) / 2, f = d.top + b.height(s) / 2;
            return Ea(e, f), Ka($ + a, c)
        }, this.nudgeWheelZoom = function(a, b) {
            i = $, La(0, a, b, !0)
        }, this.centerContent = function(a) {
            a = a || {};
            var b = a.bounds || e(), c = Qa(), d = b.x * $ + b.w * $ / 2, f = b.y * $ + b.h * $ / 2, h = b.vw / 2 - d, i = b.vh / 2 - f, j = Oa(q);
            Oa(q, a.horizontal!==!1 ? h - c[0] : j[0], a.vertical!==!1 ? i - c[1] : j[1], null, a.doNotAnimate, function() {
                a.doNotFirePanEvent || u(a.horizontal!==!1 ? h - j[0] : 0, a.vertical!==!1 ? i - j[1] : 0, $, $), g && g.pan(), $a && $a.pan(), a.onComplete && a.onComplete()
            }, a.onStep)
        }, this.centerContentHorizontally = function(a) {
            this.centerContent(jsPlumb.extend({
                horizontal: !0
            }, a))
        }, this.centerContentVertically = function(a) {
            this.centerContent(jsPlumb.extend({
                vertical: !0
            }, a))
        }, this.centerOn = function(a, b) {
            b = b || {};
            var c = jsPlumb.extend({}, e()), d = Oa(a), f = W(a), g = X(a);
            c.x = d[0], c.y = d[1], c.w = f, c.h = g;
            var h = function() {
                Ga(d[0] + f / 2, d[1] + g / 2), b.onComplete && b.onComplete()
            };
            this.centerContent({
                bounds: c,
                doNotAnimate: b.doNotAnimate,
                onComplete: h,
                onStep: b.onStep,
                vertical: b.vertical!==!1,
                horizontal: b.horizontal!==!1
            })
        }, this.centerOnHorizontally = function(a) {
            this.centerOn(a, {
                vertical: !1
            })
        }, this.centerOnVertically = function(a) {
            this.centerOn(a, {
                horizontal: !1
            })
        }, this.centerOnAndZoom = function(a, b) {
            b = b || .6;
            var c = {
                w: W(a),
                h: X(a)
            }, d = Oa(a), f = e(), g = f.vw < f.vh ? [f.vw, "w"]: [f.vh, "h"], h = b * g[0], i = h / c[g[1]];
            i < ea[0] && (i = ea[0]), i > ea[1] && (i = ea[1]);
            var j = $, k = i - $;
            Ga(d[0] + c.w / 2, d[1] + c.h / 2), this.centerOn(a, {
                onStep: function(a, b) {
                    Ka(j + a / b * k)
                },
                onComplete: function() {
                    Ka(i)
                }
            })
        }, this.getViewportCenter = function() {
            var a = jsPlumb.extend({}, e()), b = Qa(), c = Oa(q), d = [a.vw / 2, a.vh / 2];
            return [(d[0] - (c[0] + b[0])) / $, (d[1] - (c[1] + b[1])) / $]
        }, this.setViewportCenter = function(a) {
            var b = jsPlumb.extend({}, e()), c = Qa(), d = [b.vw / 2, b.vh / 2], f = [c[0] + ($ * a[0] + d[0]), c[1] + ($ * a[1] + d[1])];
            Oa(q, f[0], f[1])
        }, this.setClamping = function(a) {
            z = a
        }, this.setZoom = function(a, b, c) {
            return Ka(a, null, null, b, c)
        }, this.setZoomRange = function(a, b) {
            return null != a && 2 == a.length && a[0] < a[1] && null != a[0] && null != a[1] && a[0] > 0 && a[1] > 0 && (ea = a, b || ($ < ea[0] || $ > ea[1]) && Ka($)), this
        }, this.getZoomRange = function() {
            return ea
        }, this.getZoom = function() {
            return $
        }, this.getPan = function() {
            return Oa(q)
        }, this.pan = function(a, b, c) {
            Pa(q, a, b, null, c, function(a) {
                u(a[0], a[1], $, $), g && g.pan(), $a && $a.pan()
            })
        }, this.setPan = function(a, b, c, d, e) {
            return Oa(q, a, b, null, !c, d, e)
        }, this.setTransformOrigin = function(a, b) {
            _ = [a, b], Ba()
        }, this.mapLocation = function(a, c, d) {
            var e = Qa(), f = Oa(q), g = s.scrollLeft, h = s.scrollTop, i = d ? {
                left: 0,
                top: 0
            }
                : b.offset(s);
            return {
                left: (a - (f[0] + e[0]) - i.left + g) / $,
                top: (c - (f[1] + e[1]) - i.top + h) / $
            }
        }, this.mapEventLocation = function(a, b) {
            var c = Ha(a);
            return this.mapLocation(c[0], c[1], b)
        }, this.setEnabled = function(a) {
            S = a
        }, this.showElementAt = function(a, c, d) {
            var e = p(a), f = e.parentNode, g = b.offset(f), h = b.offset(r), i = Qa(), j = g.left - h.left + i[0] + c, k = g.top - h.top + i[1] + d;
            b.offset(a, {
                left: j,
                top: k
            })
        }, this.getApparentCanvasLocation = function() {
            var a = Qa(), b = Oa(q);
            return [b[0] + a[0], b[1] + a[1]]
        }, this.setApparentCanvasLocation = function(a, b) {
            var c = Qa(), d = Oa(q, a - c[0], b - c[1], null, !0);
            return g && g.pan(), $a && $a.pan(), d
        }, this.applyZoomToElement = function(a, b) {
            b = b || $, Aa("transform", "scale(" + b + ")", a)
        }, this.setTransformOriginForElement = function(a, b) {
            Aa("transformOrigin", b[0] + " " + b[1], a)
        }, this.getTransformOrigin = function() {
            return _
        }, this.floatElement = function(a, b) {
            null != a && (a.style.position = "absolute", a.style.left = b[0] + "px", a.style.top = b[1] + "px", s.appendChild(a))
        };
        var Ya = {}, Za = function(a) {
            var b = m.getApparentCanvasLocation();
            for (var c in Ya)
                if (Ya.hasOwnProperty(c)) {
                    if (null != a && a != c)
                        continue;
                    var d = Ya[c], e = function(a, c) {
                        d[a] && (b[c] / $ + d.pos[c] < 0 ? d.el.style[a] =- (b[c] / $) + "px" : d.el.style[a] = d.pos[c] + "px")
                    };
                    e("left", 0), e("top", 1)
                }
        }, $a = {
            pan: Za
        };
        this.fixElement = function(a, c, d) {
            if (null != a) {
                var e = b.id(a);
                Ya[e] = {
                    el: a,
                    left: c.left,
                    top: c.top,
                    pos: d
                }, a.style.position = "absolute", a.style.left = d[0] + "px", a.style.top = d[1] + "px", q.appendChild(a), Za(e)
            }
        }, this.findIntersectingNodes = function(a, c, d, e) {
            var f = this.getApparentCanvasLocation(), g = b.offset(s), h = s.scrollLeft, i = s.scrollTop, j = [], k = {
                x: a[0],
                y: a[1],
                w: c[0],
                h: c[1]
            }, l = d ? Biltong.encloses: Biltong.intersects, m = [g.left + f[0] - h, g.top + f[1] - i];
            for (var n in ja) {
                var o = ja[n], p = {
                    x: m[0] + o[0][0] * $,
                    y: m[1] + o[0][1] * $,
                    w: o[1] * $,
                    h: o[2] * $
                };
                l(k, p) && (null == e || e(n, ka[n], p)) && j.push({
                    id: n,
                    el: ka[n],
                    r: p
                })
            }
            return j
        }, this.findNearbyNodes = function(a, b, c, d) {
            var e = [];
            if (!c || this.isInViewport(a[0], a[1])) {
                e = this.findIntersectingNodes([a[0] - b, a[1] - b], [2 * b, 2 * b], !1, d);
                var f = this.mapLocation(a[0], a[1]);
                e.sort(function(a, b) {
                    var c = [a.x + a.w / 2, a.y + a.h / 2], d = [b.x + b.w / 2, b.y + b.h / 2], e = Biltong.lineLength(f, c), g = Biltong.lineLength(f, d);
                    return g > e?-1 : e > g ? 1 : 0
                })
            }
            return e
        }, this.isInViewport = function(a, c) {
            var d = b.offset(s), e = b.width(s), f = b.height(s);
            return d.left <= a && a <= d.left + e && d.top <= c && c <= d.top + f
        }, this.getElementPositions = function() {
            return ja
        }, this.setFilter = function(a) {
            V = a || function(a) {
                    return !1
                }
        }, this.setWheelFilter = function(a) {
            F = a || function(a) {
                    return !0
                }
        }, this.setBackground = function(b) {
            var e = b.type || "simple", f = {
                simple: a,
                tiled: "absolute" == b.tiling ? d: c
            };
            g = new f[e]({
                canvas: q,
                viewport: s,
                getWidth: W,
                getHeight: X,
                url: b.url,
                zoomWidget: m,
                onBackgroundReady: b.onBackgroundReady,
                options: b,
                img: b.img,
                resolver: b.resolver
            })
        }, b.background && this.setBackground(b.background), this.getBackground = function() {
            return g
        }
    };
    var a = function(a) {
        var b = a.canvas, c = a.onBackgroundReady || function() {}, d = new Image;
        d.onload = function() {
            b.style.backgroundImage = "url('" + d.src + "')", b.style.backgroundRepeat = "no-repeat", b.style.width = d.width + "px", b.style.height = d.height + "px", c(this)
        }, d.src = a.img ? a.img.src : a.url, this.owns = function(a) {
            return a == b
        }, this.getWidth = function() {
            return d.width || 0
        }, this.getHeight = function() {
            return d.height || 0
        }, this.setZoom = this.pan = function(a) {}
    }, b = function(a) {
        var b = this, c = a.canvas, d = a.viewport;
        if (null == a.options.maxZoom)
            throw new TypeError("Parameter `maxZoom` not set; cannot initialize TiledBackground");
        if (!a.options.tileSize)
            throw new TypeError("Parameter `tileSize not set; cannot initialize TiledBackground. It should be an array of [x,y] values.");
        if (!a.options.width ||!a.options.height)
            throw new TypeError("Parameters `width` and `height` must be set");
        for (var e = function(c) {
            var d = document.createElement("div");
            d.style.position = "relative", d.style.height = "100%", d.style.width = "100%", d.style.display = "none", a.canvas.appendChild(d), this.zoom = c;
            var e = b.getTileSpecs(c), f = [], g = function(b, c, d) {
                return a.url.replace("{z}", b).replace("{x}", c).replace("{y}", d)
            }, h = function(b, c, d) {
                return null == a.resolver ? g(b, c, d) : a.resolver(b, c, d)
            };
            this.apparentZoom = Math.min(e[2], e[3]), this.setActive = function(a) {
                d.style.display = a ? "block" : "none"
            }, this.xTiles = e[0], this.yTiles = e[1];
            for (var i = 0; i < this.xTiles; i++) {
                f[i] = f[i] || [];
                for (var j = 0; j < this.yTiles; j++) {
                    var k = document.createElement("img");
                    k._tiledBg=!0, k.className = "jtk-surface-tile", k.ondragstart = function() {
                        return !1
                    }, d.appendChild(k), k.style.position = "absolute", k.style.opacity = 0, f[i][j] = [k, new Image, !1]
                }
            }
            var l = Math.pow(2, a.options.maxZoom - c) * a.options.tileSize[0], m = Math.pow(2, a.options.maxZoom - c) * a.options.tileSize[1];
            this.scaledImageSize = l, this.scaledImageSizeH = m;
            var n = function(a, b, d, e) {
                a.style.left = d * l + "px", a.style.top = e * m + "px", a.style.width = l + "px", a.style.height = m + "px", b.onload = function() {
                    a.setAttribute("src", b.src), a.style.opacity = 1
                }, b.src = h(c, d, e)
            };
            this.ensureLoaded = function(a, b, c, d) {
                for (var e = a; c >= e; e++)
                    for (var g = b; d >= g; g++)
                        null != f[e] && null != f[e][g] && (f[e][g][2] || (n(f[e][g][0], f[e][g][1], e, g), f[e][g][2]=!0))
            }
        }.bind(this), f = [], g = null, h = 0; h <= a.options.maxZoom; h++)
            f.push(new e(h));
        c.style.width = a.options.width + "px", c.style.height = a.options.height + "px";
        var i, j = function() {
            if (i <= f[0].apparentZoom)
                return 0;
            if (i >= f[f.length - 1].apparentZoom)
                return f.length - 1;
            for (var a = f.length - 1; a > 0; a--)
                if (f[a].apparentZoom >= i && i >= f[a - 1].apparentZoom)
                    return a
        }, k = function(a) {
            var b = f[a];
            null != g && g != b && g.setActive(!1), b.setActive(!0), g = b
        }, l = function() {
            var b = a.zoomWidget.getApparentCanvasLocation(), c = a.getWidth(d), e = a.getHeight(d), f = g.scaledImageSize * i, h = g.scaledImageSizeH * i, j = b[0] < 0 ? Math.floor( - b[0] / f): b[0] < c ? 0: null, k = b[1] < 0 ? Math.floor( - b[1] / h): b[1] < e ? 0: null, l = Math.min(g.xTiles, Math.floor((c - b[0]) / f)), m = Math.min(g.yTiles, Math.floor((e - b[1]) / h));
            null != j && null != k && g.ensureLoaded(j, k, l, m)
        };
        this.getCurrentLayer = function() {
            return g
        }, this.getWidth = function() {
            return a.options.width
        }, this.getHeight = function() {
            return a.options.height
        };
        var m = a.options.panDebounceTimeout || 50, n = a.options.zoomDebounceTimeout || 120, o = function(a, b) {
            b = b || 150;
            var c = null;
            return function() {
                window.clearTimeout(c), c = window.setTimeout(a, b)
            }
        }, p = function() {
            k(j()), l()
        }, q = o(p, n), r = o(l, m);
        this.setZoom = function(a, b) {
            i = a, b ? p() : q()
        }, this.pan = r, this.owns = function(a) {
            return a == c || 1 == a._tiledBg
        }, this.setZoom(a.zoomWidget.getZoom(), !0), null != a.onBackgroundReady && setTimeout(a.onBackgroundReady, 0)
    }, c = function(a) {
        var c = a.options.width, d = a.options.height, e = a.options.tileSize;
        this.getTileSpecs = function(a) {
            var b = c > d ? 1: c / d, f = d > c ? 1: d / c, g = Math.pow(2, a + 1) * e[0] * b, h = Math.pow(2, a + 1) * e[1] * f, i = Math.ceil(g / e[0]), j = Math.ceil(h / e[1]);
            return [i, j, g / c, h / d]
        }, b.apply(this, arguments)
    }, d = function(a) {
        var c = a.options.maxZoom, d = a.options.width, e = a.options.height, f = a.options.tileSize;
        this.getTileSpecs = function(a) {
            var b = Math.pow(2, c - a), g = Math.ceil(d / b / f[0]), h = Math.ceil(e / b / f[1]);
            return [g, h, g * f[0] / d, h * f[1] / e]
        }, b.apply(this, arguments)
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    var a = this, b = a.jsPlumbToolkit, c = b.Renderers, d = a.jsPlumb, e = a.jsPlumbUtil, f = jsPlumb.getSelector, g = jsPlumbToolkit.Classes, h = jsPlumbToolkit.Constants, i = jsPlumbToolkit.Events;
    c.Surface = function(a) {
        function j(a) {
            return null == a ? null : "string" == typeof a ? this.getRenderedConnection(a) : a.constructor == jsPlumb.Connection ? a : l.getRenderedConnection(a.getId())
        }
        function k() {
            if (!m.jsPlumb.startEditing)
                throw new TypeError("Connection editors not available.")
        }
        var l = this;
        c.Surface.SELECT = h.select, c.Surface.PAN = h.pan, c.Surface.DISABLED = h.disabled;
        var m = c.AbstractRenderer.apply(this, arguments);
        c.DOMElementAdapter.apply(this, arguments), this.getObjectInfo = m.getObjectInfo, a = a || {};
        var n, o = d.getElement(a.container), p = c.createElement({
            position: h.relative,
            width: h.nominalSize,
            height: h.nominalSize,
            left: 0,
            top: 0,
            clazz: g.SURFACE_CANVAS
        }, o), q=!(a.elementsDraggable===!1), r = a.elementsDroppable===!0, s = a.dragOptions || {}, t = a.dropOptions || {}, u = a.stateHandle, v = a.storePositionsInModel!==!1, w = a.modelLeftAttribute, x = a.modelTopAttribute, y = new ZoomWidget({
            viewport: o,
            canvas: p,
            domElement: m.jsPlumb.getElement,
            addClass: m.jsPlumb.addClass,
            removeClass: m.jsPlumb.removeClass,
            offset: this.getOffset,
            consumeRightClick: a.consumeRightClick,
            bind: function() {
                m.jsPlumb.on.apply(m.jsPlumb, arguments)
            },
            unbind: function() {
                m.jsPlumb.off.apply(m.jsPlumb, arguments)
            },
            width: function(a) {
                return m.jsPlumb.getWidth(m.jsPlumb.getElement(a))
            },
            height: function(a) {
                return m.jsPlumb.getHeight(m.jsPlumb.getElement(a))
            },
            id: m.jsPlumb.getId,
            animate: function() {
                m.jsPlumb.animate.apply(m.jsPlumb, arguments)
            },
            dragEvents: {
                stop: jsPlumb.dragEvents[h.stop],
                start: jsPlumb.dragEvents[h.start],
                drag: jsPlumb.dragEvents[h.drag]
            },
            background: a.background,
            padding: a.padding,
            panDistance: a.panDistance,
            enablePan: a.enablePan,
            enableWheelZoom: a.enableWheelZoom,
            wheelSensitivity: a.wheelSensitivity,
            enablePanButtons: a.enablePanButtons,
            enableAnimation: a.enableAnimation,
            clamp: a.clamp,
            clampZoom: a.clampZoom,
            clampToBackground: a.clampToBackground,
            clampToBackgroundExtents: a.clampToBackgroundExtents,
            zoom: a.zoom,
            zoomRange: a.zoomRange,
            extend: m.jsPlumb.extend,
            events: {
                pan: function(a, b, c, d, e) {
                    l.fire(i.pan, {
                        x: a,
                        y: b,
                        zoom: c,
                        oldZoom: d,
                        event: e
                    })
                },
                zoom: function(a, b, c, d, e) {
                    m.jsPlumb.setZoom(c), l.fire(i.zoom, {
                        x: a,
                        y: b,
                        zoom: c,
                        oldZoom: d,
                        event: e
                    })
                },
                mousedown: function() {
                    jsPlumb.addClass(o, g.SURFACE_PANNING), jsPlumb.addClass(document.body, g.SELECT_DEFEAT)
                },
                mouseup: function() {
                    jsPlumb.removeClass(o, g.SURFACE_PANNING), jsPlumb.removeClass(document.body, g.SELECT_DEFEAT)
                }
            }
        }), z = [], A = a.lassoSelectionFilter, B = a.autoExitSelectMode!==!1, C = new b.Widgets.Lasso({
            on: function() {
                m.jsPlumb.on.apply(m.jsPlumb, arguments)
            },
            off: function() {
                m.jsPlumb.off.apply(m.jsPlumb, arguments)
            },
            invert: a.lassoInvert,
            pageLocation: y.pageLocation,
            canvas: o,
            onStart: function() {
                l.setHoverSuspended(!0), z.length = 0
            },
            onSelect: function(a, b, c, d) {
                var e = [], f = y.findIntersectingNodes(a, b, !c[0]);
                m.jsPlumb.clearDragSelection && m.jsPlumb.clearDragSelection(), m.toolkit.clearSelection(), d && z.length > 0 && m.toolkit.deselect(z);
                for (var g = 0; g < f.length; g++)(null == A || A(f[g].el.jtk.node)!==!1)
                && (e.push(f[g].el.jtk.node), m.jsPlumb.addToDragSelection && m.jsPlumb.addToDragSelection(f[g].el));
                z = e, m.toolkit.addToSelection(e, d)
            },
            onEnd: function() {
                l.setHoverSuspended(!1), B && l.setMode(h.pan)
            },
            filter: a.lassoFilter
        }), D = {
            pan: function() {
                C.setEnabled(!1), y.setEnabled(!0)
            },
            select: function() {
                m.jsPlumb.clearDragSelection && m.jsPlumb.clearDragSelection(), C.setEnabled(!0), y.setEnabled(!1)
            },
            disabled: function() {
                m.jsPlumb.clearDragSelection && m.jsPlumb.clearDragSelection(), C.setEnabled(!0), y.setEnabled(!1)
            }
        }, E = a.mode || h.pan;
        l.bind(i.relayout, function(a) {
            y.relayout(a, !0)
        }), l.bind(i.nodeRemoved, function(a) {
            y.remove(a.el)
        }), m.toolkit.bind(i.graphCleared, function() {
            y.reset()
        }), m.toolkit.bind(i.dataLoadStart, function() {
            y.setSuspendRendering(!0)
        }), m.toolkit.bind(i.dataLoadEnd, function() {
            y.setSuspendRendering(!1), n && n.setVisible(!0), a.zoomToFit && l.zoomToFit()
        }), m.jsPlumb.setContainer(p), jsPlumb.addClass(o, g.SURFACE), a.enablePan===!1 && jsPlumb.addClass(o, g.SURFACE_NO_PAN);
        var F = function(a, b) {
            var c = function(a) {
                var c = a.srcElement || a.target;
                (c == o || c == p) && l.fire(b, a)
            };
            m.jsPlumb.on(p, a, c), m.jsPlumb.on(o, a, c)
        };
        F(i.tap, i.canvasClick), F(i.dblclick, i.canvasDblClick);
        var G = null;
        m.makeDraggable = function(a, b) {
            if (q) {
                var c = d.getElement(a), f = m.jsPlumb.getId(c), j = m.jsPlumb.extend({}, s), k = d.dragEvents[h.stop], n = d.dragEvents[h.start], p = function(a) {
                    var b = d.getDragObject(a), c = d.getElement(b);
                    return {
                        node: c.jtk.node,
                        el: b
                    }
                };
                null != b && m.jsPlumb.extend(j, b), j[n] = e.wrap(j[n], function() {
                    G = y.getBoundsInfo();
                    var a = p(arguments);
                    a.elementId = f, a.pos = jsPlumb.getAbsolutePosition(c), a.domEl = c, jsPlumb.addClass(o, g.SURFACE_ELEMENT_DRAGGING), l.fire(i.nodeMoveStart, a)
                }), j[k] = e.wrap(j[k], function(a) {
                    for (var b = function(a) {
                        y.positionChanged(a[0]), jsPlumb.removeClass(o, g.SURFACE_ELEMENT_DRAGGING);
                        var b = {
                            el: a[0],
                            node: a[0].jtk.node,
                            pos: [a[1].left, a[1].top]
                        };
                        l.getLayout().setPosition(b.node.id, b.pos[0], b.pos[1], !0), v!==!1 && (l.storePositionInModel({
                            id: b.node.id,
                            leftAttribute: w,
                            topAttribute: x
                        }), m.toolkit.fire("nodeUpdated", {
                            node: b.node
                        }, null)), l.fire(i.nodeMoveEnd, b)
                    }, c = 0; c < a.selection.length; c++)
                        b(a.selection[c])
                }), j.canDrag = function() {
                    return !C.isActive()
                }, j.force=!0, m.jsPlumb.draggable(c, j, !1, m.jsPlumb)
            }
        }, m.makeDroppable = function(a, b) {
            if (r) {
                var c = d.getElement(a), f = (m.jsPlumb.getId(c), m.jsPlumb.extend({}, t));
                null != b && m.jsPlumb.extend(f, b), f.drop = e.wrap(f.drop, function(a) {
                    var b = {
                        source: a.drag.el.jtk.node,
                        sourceElement: a.drag.el,
                        target: a.drop.el.jtk.node,
                        targetElement: a.drop.el,
                        e: a.e
                    };
                    l.fire(i.nodeDropped, b)
                }), m.jsPlumb.droppable(c, f)
            }
        }, m.doImport = function(b) {
            a.jsPlumbInstance.setContainer(p);
            var c = a.jsPlumbInstance.getManagedElements();
            for (var d in c) {
                var e = c[d].el;
                H(e, d)
            }
        };
        var H = this.importNode = function(b, c) {
            var d = a.jsPlumbInstance.getOffset(b), e = a.jsPlumbInstance.getId(b);
            b.style.left = d.left + h.px, b.style.top = d.top + h.px, jsPlumb.addClass(b, g.NODE), y.add(b, e, [d.left, d.top], !1), jsPlumb.isAlreadyDraggable(b) && m.makeDraggable(b), m.nodeMap[c] = b, m.reverseNodeMap[e] = b.jtk.node
        };
        this.zoomToFit = y.zoomToFit, this.zoomToFitIfNecessary = y.zoomToFitIfNecessary, this.zoomToSelection = function(a) {
            var b = m.toolkit.getSelection(), c = [];
            b.eachNode(function(a, b) {
                c.push(m.getElement(b.id))
            }), c.length > 0 && y.zoomToElements({
                elements: c
            })
        }, this.zoomToBackground = y.zoomToBackground, this.centerOn = function(a, b) {
            var c = this.getObjectInfo(a);
            c && c.el && y.centerOn(c.el, b)
        }, this.centerOnHorizontally = function(a) {
            this.centerOn(a, {
                vertical: !1
            })
        }, this.centerOnVertically = function(a) {
            this.centerOn(a, {
                horizontal: !1
            })
        }, this.centerOnAndZoom = function(a, b) {
            var c = this.getObjectInfo(a);
            c && c.el && y.centerOnAndZoom(c.el, b)
        }, this.centerContent = y.centerContent, this.centerContentHorizontally = y.centerContentHorizontally, this.centerContentVertically = y.centerContentVertically, this.getViewportCenter = y.getViewportCenter, this.setViewportCenter = y.setViewportCenter, this.setStateHandle = function(a) {
            u = a
        }, this.getStateHandle = function() {
            return u
        }, this.setLassoSelectionFilter = function(a) {
            A = a
        }, this.getApparentCanvasLocation = y.getApparentCanvasLocation, this.setApparentCanvasLocation = y.setApparentCanvasLocation, this.getBoundsInfo = y.getBoundsInfo, this.setZoom = y.setZoom, this.setZoomRange = y.setZoomRange, this.getZoomRange = y.getZoomRange, this.getZoom = y.getZoom, this.nudgeZoom = y.nudgeZoom, this.nudgeWheelZoom = y.nudgeWheelZoom, this.pageLocation = y.pageLocation, this.getPan = y.getPan, this.pan = y.pan, this.setPan = y.setPan, this.startEditing = function(a, b) {
            k();
            var c = j(a);
            null != c && m.jsPlumb.startEditing(c, b)
        }, this.stopEditing = function(a) {
            k();
            var b = j(a);
            null != b && m.jsPlumb.stopEditing(b)
        }, this.clearEdits = function(a) {
            k();
            var b = j(a);
            null != b && m.jsPlumb.clearEdits(b)
        }, this.setPanAndZoom = function(a, b, c, d) {
            this.setPan(a, b, !d), this.setZoom(c, !d)
        }, this.setPanFilter = function(a) {
            y.setFilter(a ? function(b, c) {
                return "function" == typeof a ? a.apply(a, [c]) : e.matchesSelector(b, a)
            } : null)
        }, this.setWheelFilter = function(a) {
            y.setWheelFilter(function(b) {
                if (a) {
                    var c = b.srcElement || b.target;
                    return !e.matchesSelector(c, a)
                }
                return !0
            })
        }, this.setWheelFilter(a.wheelFilter), this.setPanFilter(a.panFilter), this.mapLocation = y.mapLocation, this.mapEventLocation = y.mapEventLocation, this.findNearbyNodes = y.findNearbyNodes, this.findIntersectingNodes = y.findIntersectingNodes, this.isInViewport = y.isInViewport, this.positionElementAt = y.positionElementAt, this.positionElementAtEventLocation = y.positionElementAtEventLocation, this.positionElementAtPageLocation = y.positionElementAtPageLocation, this.setFilter = y.setFilter, this.floatElement = y.floatElement, this.fixElement = y.fixElement;
        var I = this.setPosition, J = this.animateToPosition, K = function(a, b, c) {
            a && (y.positionChanged(a.el, [b, c]), l.fire(i.nodeMoveEnd, {
                el: a.el,
                id: a.id,
                pos: [b, c],
                node: a.obj,
                bounds: y.getBoundsInfo()
            }))
        };
        this.setPosition = function(a, b, c, d) {
            var e = I.apply(this, arguments);
            K(e, b, c)
        }, this.animateToPosition = function(a, b, c, d) {
            var e = J.apply(this, arguments);
            K(e, b, c)
        }, this.tracePath = function(a) {
            var b = a.path || function() {
                    var b = m.getObjectInfo(a.source), c = m.getObjectInfo(a.target);
                    return m.toolkit.getPath({
                        source: b,
                        target: c
                    })
                }();
            if (b.exists()) {
                for (var c = function(b, c) {
                    this.fire(b, {
                        edge: c.edge,
                        connection: c,
                        options: a.options
                    })
                }.bind(this), d = [], e = null, f = null, g = b.path.path.length, h = 1; g > h; h++) {
                    var i = b.path.path[h].vertex.id, j = b.path.previous[i], k=!0, l = b.path.path[h].edge;
                    null != j && (k = j === l.source), e = m.getConnectionForEdge(l), f = e.animateOverlay(a.overlay, jsPlumb.extend(a.options || {}, {
                        previous: f,
                        isFinal: h === g - 1,
                        forwards: k
                    })), d.push({
                        handler: f,
                        connection: e
                    })
                }
                return d.length > 0 && (d[0].handler.bind(jsPlumbToolkit.Events.startOverlayAnimation, function() {
                    c(jsPlumbToolkit.Events.startOverlayAnimation, d[0].connection)
                }), d[d.length - 1].handler.bind(jsPlumbToolkit.Events.endOverlayAnimation, function() {
                    c(jsPlumbToolkit.Events.endOverlayAnimation, d[d.length - 1].connection)
                })), !0
            }
            return m.toolkit.isDebugEnabled() && jsPlumbUtil.log("Cannot trace non existent path"), !1
        }, this.getNodePositions = function() {
            var a = {}, b = y.getElementPositions();
            for (var c in b) {
                var d = m.getNodeForElementId(c);
                a[d.id] = [b[c][0][0], b[c][0][1]]
            }
            return a
        }, this.append = function(a, b, c, d) {
            p.appendChild(a), c && (c = [c.left, c.top]), y.add(a, b, c, d)
        };
        var L = this.setLayout;
        this.setLayout = function(a, b) {
            L(a, b), n && n.setHostLayout(this.getLayout())
        };
        for (var M = function(a) {
            m.jsPlumb.on(p, a, ".jtk-node, .jtk-node *", function(b) {
                var c = b.srcElement || b.target;
                if (null == c && (b = d.getOriginalEvent(b), c = b.srcElement || b.target), null != c && c.jtk) {
                    var e = d.extend({
                        e: b,
                        el: c
                    }, c.jtk);
                    l.fire(a, e, b)
                }
            })
        }, N = 0; N < c.mouseEvents.length; N++)
            M(c.mouseEvents[N]);
        m.toolkit.bind(h.select, function(a) {
            if (a.obj.objectType == h.nodeType) {
                var b = m.getElement(a.obj.id);
                b && (jsPlumb.addClass(b, g.SURFACE_SELECTED_ELEMENT), m.jsPlumb.addToDragSelection && m.jsPlumb.addToDragSelection(b))
            } else if (a.obj.objectType == h.edgeType) {
                var c = m.getConnectionForEdge(a.obj);
                c && c.addClass(g.SURFACE_SELECTED_CONNECTION)
            }
        }), m.toolkit.bind(i.selectionCleared, function() {
            m.jsPlumb.clearDragSelection && m.jsPlumb.clearDragSelection(), jsPlumb.removeClass(f("." + g.SURFACE_SELECTED_CONNECTION), g.SURFACE_SELECTED_CONNECTION), jsPlumb.removeClass(f("." + g.SURFACE_SELECTED_ELEMENT), g.SURFACE_SELECTED_ELEMENT)
        }), m.toolkit.bind(i.deselect, function(a) {
            if (a.obj.objectType == h.nodeType) {
                var b = m.getElement(a.obj.id);
                b && (jsPlumb.removeClass(b, g.SURFACE_SELECTED_ELEMENT), m.jsPlumb.removeFromDragSelection && m.jsPlumb.removeFromDragSelection(b))
            } else if (a.obj.objectType == h.edgeType) {
                var c = m.getConnectionForEdge(a.obj);
                c && c.removeClass(g.SURFACE_SELECTED_CONNECTION)
            }
        });
        var O = this.setOffset;
        this.setOffset = function(a, b) {
            O.apply(this, arguments), y.positionChanged(a, [b.left, b.top])
        };
        var P = this.setAbsolutePosition;
        this.setAbsolutePosition = function(a, b, c) {
            P.call(this, a, b);
            var d = l.getObjectInfo(a);
            d && d.id && l.getLayout().setPosition(d.id, b[0], b[1]), y.positionChanged(a, b), m.jsPlumb.revalidate(a), c && c()
        }, this.setMode = function(a, b, c) {
            if (!D[a])
                throw new TypeError("Surface: unknown mode '" + a + "'");
            E = a, D[a](), a !== h.select || b || m.toolkit.clearSelection(), c && a === h.select && c.lassoSelectionFilter && (A = c.lassoSelectionFilter), l.fire(i.modeChanged, a)
        };
        var Q = function(a, b) {
            var c = jsPlumb.extend({}, a);
            c.source = m.getObjectInfo(a.source).obj, c.target = m.getObjectInfo(a.target).obj, c.element = m.getObjectInfo(a.element).obj;
            var d = m.toolkit[b](c), e = m.getConnectionsForEdges(d);
            return m.jsPlumb.select({
                connections: e
            })
        };
        this.selectEdges = function(a) {
            return Q(a, "getEdges")
        }, this.selectAllEdges = function(a) {
            return Q(a, "getAllEdges")
        }, this.repaint = function(a) {
            var b = m.getObjectInfo(a);
            b.el && (m.jsPlumb.recalculateOffsets(b.el), m.jsPlumb.revalidate(m.jsPlumb.getId(b.el)), l.fire(i.objectRepainted, b))
        }, this.repaintEverything = m.jsPlumb.repaintEverything, this.setElementsDraggable = function(a) {
            q = a!==!1
        };
        var R = function(a) {
            function b(a) {
                m.jsPlumb.hasClass(a, g.SURFACE_DROPPABLE_NODE) || (m.jsPlumb.addClass(a, g.SURFACE_DROPPABLE_NODE), m.jsPlumb.initDraggable(a, p, h.surfaceNodeDragScope, m.jsPlumb))
            }
            if (!(a && (a.droppables || a.source && a.selector || a.allowNative===!0)))
                throw new TypeError("Cannot configure droppables: you must specify either `droppables`, `source` + `selector` or `allowNative:true`");
            var c, f = a.dataGenerator || function() {
                    return {}
                }, j = a.typeExtractor, k = a.locationSetter || function(a, b, c) {
                    c.left = a, c.top = b
                }, n = a.droppables ? a.droppables: a.source ? a.source.querySelectorAll(a.selector): [], p = a.dragOptions || {}, q = a.dropOptions || {}, r = "scope_" + (new Date).getTime(), s = function(b, c, d) {
                var e=!0;
                if (a.drop && (e = a.drop.apply(this, arguments)!==!1), e) {
                    var g = m.jsPlumb.getDragObject(arguments), h = l.getJsPlumb().getOffset(d ? C : g, !0), i = y.mapLocation(h.left, h.top), n = j ? j(g, b, d, i): null, o = f ? f(n, g, b, i): {};
                    o = o || {}, null != n && (o.type = n), k(i.left, i.top, o), m.toolkit.getNodeFactory()(n, o, function(c) {
                        var d = m.toolkit.addNode(c, {
                            position: i
                        });
                        a.onDrop && a.onDrop(d, b, i)
                    }, b, d)
                }
            }, t = d.dragEvents[h.start], u = d.dragEvents[h.drag], v = d.dragEvents[h.stop], w = d.dragEvents[h.drop], x = function() {}, z = a.nativeFilter || [], A = a.allowNative, B = {};
            if (p[t] = e.wrap(p[t], a.start || x), p[u] = e.wrap(p[u], a.drag || x), p[v] = e.wrap(p[v], a.stop || x), q.scope = r, q[w] = e.wrap(q[w], s), A) {
                var C = document.createElement(h.div);
                for (C.style.position = h.absolute, c = 0; c < z.length; c++)
                    B[z[c]]=!0;
                var D = function(a) {
                    return null != a.dataTransfer && 1 === a.dataTransfer.items.length ? 0 == z.length || B[a.dataTransfer.items[0].type] : !1
                };
                document.addEventListener(i.dragover, function(a) {
                    a.stopPropagation(), a.preventDefault(), D(a) && (jsPlumb.setAbsolutePosition(C, [a.pageX, a.pageY]), p[u].apply(null, [a, {
                        helper: C,
                        offset: {
                            left: a.pageX,
                            top: a.pageY
                        }
                    }, !0]))
                }, !1), document.addEventListener(i.drop, function(a) {
                    a.stopPropagation(), a.preventDefault(), D(a) && (q[w].apply(null, [a, {
                        helper: C,
                        offset: {
                            left: a.pageX,
                            top: a.pageY
                        }
                    }, !0]), p[v].apply(null))
                }, !1), document.addEventListener(i.dragend, function(a) {})
            }
            for (m.jsPlumb.initDroppable(o, q, h.surfaceNodeDragScope), p.scope = r, p.ignoreZoom=!0, p.doNotRemoveHelper=!0, c = 0; c < n.length; c++) {
                var E = m.jsPlumb.getElement(n[c]);
                b(E)
            }
            return {
                refresh: function() {
                    if (!a.source ||!a.selector)
                        throw new TypeError("Cannot refresh droppables; `source` and `selector` required in constructor.");
                    for (var c = a.source.querySelectorAll(a.selector), d = 0; d < c.length; d++)
                        b(c[d])
                }
            }
        };
        this.registerDroppableNodes = function(a) {
            return new R(a)
        }, this.createMiniview = function(a) {
            if (null != n) {
                var c = m.jsPlumb.getId(m.jsPlumb.getElement(a.container));
                if (n.getContainerId() == c)
                    return !1
            }
            var e = d.extend({
                surface: l,
                toolkit: m.toolkit,
                surfaceContainerElement: o,
                bounds: y.getBoundsInfo(),
                visible: a.initiallyVisible!==!1 || m.toolkit.getNodeCount() > 0,
                layout: {
                    type: h.mistletoeLayoutType,
                    parameters: {
                        layout: l.getLayout()
                    }
                }
            }, a);
            n = new b.Renderers.Miniview(e);
            for (var f in m.nodeMap) {
                var g = m.nodeMap[f];
                n.registerNode({
                    el: g,
                    node: g.jtk.node,
                    pos: jsPlumb.getAbsolutePosition(g)
                })
            }
            return n
        }, a.miniview && this.createMiniview(a.miniview), this.getMiniview = function() {
            return n
        }, this.State = {
            save: function(a, c) {
                if (a = 2 == arguments.length ? arguments[0] : 1 == arguments.length && "string" == typeof arguments[0] ? arguments[0] : u, c = 2 == arguments.length ? arguments[1] : 1 == arguments.length && "function" == typeof arguments[0] ? arguments[0] : function(a, b) {
                        return b(a)
                    }, a)
                    try {
                        c(l.State.serialize(), function(c) {
                            b.util.Storage.set(h.jtkStatePrefix + a, c)
                        })
                    } catch (d) {
                        e.log(g.msgCannotSaveState, d)
                    }
            },
            serialize: function() {
                var a = y.getPan();
                a.push(y.getZoom()), a.push.apply(a, y.getTransformOrigin());
                var b = a.join(","), c = l.getLayout().getPositions(), d = [];
                for (var e in c)
                    d.push(e + " " + c[e][0] + " " + c[e][1]);
                return b += "," + d.join("|")
            },
            restore: function(a, c) {
                if (a = 2 == arguments.length ? arguments[0] : 1 == arguments.length && "string" == typeof arguments[0] ? arguments[0] : u, c = 2 == arguments.length ? arguments[1] : 1 == arguments.length && "function" == typeof arguments[0] ? arguments[0] : function(a, b) {
                        return b(a)
                    }, a)
                    try {
                        var d = b.util.Storage.get(h.jtkStatePrefix + a);
                        d && c(d, l.State.deserialize)
                    } catch (f) {
                        e.log(g.msgCannotRestoreState, f)
                    }
            },
            deserialize: function(a) {
                for (var b = a.split(","), c = b[5].split("|"), d = l.getLayout(), e = 0; e < c.length; e++) {
                    var f = c[e].split(" ");
                    try {
                        l.setPosition(f[0], parseFloat(f[1]), parseFloat(f[2]))
                    } catch (g) {}
                }
                d.draw()
            },
            clear: function(a) {
                a = a || u, a && b.util.Storage.clear(h.jtkStatePrefix + a)
            },
            clearAll: function() {
                b.util.Storage.clearAll()
            }
        }, l.saveState = l.State.save, l.store = b.util.Storage.set, l.retrieve = b.util.Storage.get, l.storeJSON = b.util.Storage.setJSON, l.retrieveJSON = b.util.Storage.getJSON, l.restoreState = function(a) {
            l.State.restore(a), l.getJsPlumb().repaintEverything(), l.fire(i.stateRestored)
        }, l.clearState = function(a) {
            l.state.clear(a)
        }, l.initialize(), a.zoomToFitIfNecessary ? l.zoomToFitIfNecessary() : a.zoomToFit && l.zoomToFit()
    }, b.DefaultRendererType = h.surfaceType
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    var a = this, b = a.jsPlumbToolkit, c = b.Renderers, d = jsPlumbUtil, e = jsPlumb, f = jsPlumbToolkit.Classes, g = jsPlumbToolkit.Constants, h = jsPlumbToolkit.Events, i = jsPlumbToolkit.Attributes, j = jsPlumbToolkit.Methods;
    c.Miniview = function(a) {
        function b(a) {
            if (o && y&&!t) {
                s = o.getBoundsInfo();
                var b = o.getApparentCanvasLocation(), c = y.getApparentCanvasLocation(), d = y.getZoom(), e = d / s.zoom;
                r.style.width = s.vw + g.px, r.style.height = s.vh + g.px, y.applyZoomToElement(r, e);
                var f = [b[0] * e, b[1] * e];
                n = [c[0] - f[0], c[1] - f[1]], jsPlumb.setAbsolutePosition(r, n)
            }
        }
        function k(a) {
            if (null != y) {
                s = o.getBoundsInfo(), a = a || jsPlumb.getAbsolutePosition(r);
                var b = y.getApparentCanvasLocation(), c = y.getZoom(), d = c / s.zoom, e = (b[0] - a[0]) / d, f = (b[1] - a[1]) / d, g = o.setApparentCanvasLocation(e, f);
                return [b[0] - g[0] * d, b[1] - g[1] * d]
            }
        }
        this.bindToolkitEvents=!1;
        var l = c.AbstractRenderer.apply(this, arguments), m = this;
        c.DOMElementAdapter.apply(this, arguments);
        var n, o = a.surface, p = e.getElement(a.container), q = c.createElement({
            position: g.relative,
            width: g.nominalSize,
            height: g.nominalSize,
            left: 0,
            top: 0,
            clazz: f.MINIVIEW_CANVAS
        }, p), r = c.createElement({
            position: g.absolute,
            width: g.nominalSize,
            height: g.nominalSize,
            left: 0,
            top: 0,
            clazz: f.MINIVIEW_PANNER
        }, p), s = a.bounds, t = a.suspended===!0, u = a.collapsible!==!1, v = null, w=!1, x = a.wheelSensitivity || 10, y = new ZoomWidget({
            viewport: p,
            canvas: q,
            domElement: e.getElement,
            offset: this.getOffset,
            bind: function() {
                l.jsPlumb.on.apply(l.jsPlumb, arguments)
            },
            unbind: function() {
                l.jsPlumb.off.apply(l.jsPlumb, arguments)
            },
            enableWheelZoom: !1,
            enablePanButtons: !1,
            enablePan: !1,
            enableAnimation: !1,
            width: function(a) {
                return l.jsPlumb.getWidth(l.jsPlumb.getElement(a))
            },
            height: function(a) {
                return l.jsPlumb.getHeight(l.jsPlumb.getElement(a))
            },
            id: l.jsPlumb.getId,
            animate: l.jsPlumb.animate,
            dragEvents: {
                stop: e.dragEvents[g.stop],
                start: e.dragEvents[g.start],
                drag: e.dragEvents[g.drag]
            },
            extend: e.extend,
            events: {
                pan: function() {
                    k()
                },
                mousedown: function() {
                    jsPlumb.addClass(r, f.MINIVIEW_PANNING)
                },
                mouseup: function() {
                    jsPlumb.removeClass(r, f.MINIVIEW_PANNING)
                }
            },
            zoomRange: [ - (1 / 0), 1 / 0]
        }), z=!1, A = null, B = null, C=!1, D = function(a) {
            z=!0, A = y.pageLocation(a), B = jsPlumb.getAbsolutePosition(r), e.on(document, h.mouseup, F), e.on(document, h.mousemove, E), d.consume(a)
        }, E = function(a) {
            if (C=!1, z) {
                var b = y.pageLocation(a), c = b[0] - A[0], d = b[1] - A[1], e = [B[0] + c, B[1] + d];
                k(e);
                jsPlumb.setAbsolutePosition(r, e)
            }
        }, F = function(a) {
            z=!1, A = null, e.off(document, h.mouseup, F), e.off(document, h.mousemove, E)
        }, G=!0, H = function(a) {
            d.consume(a), o.nudgeWheelZoom(a.normalizedWheelDelta * x, a)
        };
        e.on(window, h.resize, jsPlumbToolkitUtil.debounce(function() {
            b()
        }, 100)), a.enableWheelZoom!==!1 && addWheelListener(p, H), y.setTransformOriginForElement(r, [0, 0]), jsPlumb.addClass(p, f.MINIVIEW), e.on(r, h.mousedown, D), u && (v = jsPlumb.createElement("div"), v.className = f.MINIVIEW_COLLAPSE, p.appendChild(v), e.on(v, g.click, function(a) {
            w=!w, jsPlumb[w ? j.addClass: j.removeClass](p, f.MINIVIEW_COLLAPSED), I(!0)
        }));
        var I = function(a) {
            y.zoomToFit({
                onComplete: b,
                onStep: b,
                doNotFirePanEvent: a
            })
        };
        a.toolkit.bind(h.dataLoadEnd, I);
        var J = function(a) {
            s = a.bounds, y.positionChanged(a.el, a.pos), jsPlumb.setAbsolutePosition(l.nodeMap[a.node.id], a.pos), I(!0),
                this.fire(h.nodeMoveEnd, a)
        }.bind(this), K = function(a) {
            var d = e.getSize(a.el), h = c.createElement({
                position: g.absolute,
                width: d[0] + g.px,
                height: d[1] + g.px,
                left: 0,
                top: 0,
                clazz: f.MINIVIEW_ELEMENT
            });
            h.relatedElement = a.el, s = o.getBoundsInfo(), h.setAttribute(i.jtkNodeId, a.node.id), h.setAttribute(i.relatedNodeId, a.el.getAttribute(g.id)), q.appendChild(h), y.add(h), l.nodeMap[a.node.id] = h, m.getLayout().map(a.node.id, h), b()
        };
        this.registerNode = function(a) {
            K(a), J(a)
        };
        var L = this.setOffset;
        this.setOffset = function(a, b) {
            L.apply(this, arguments), y.positionChanged(a, [b.left, b.top])
        };
        var M = this.setAbsolutePosition;
        this.setAbsolutePosition = function(a, b) {
            M.call(this, a, b), y.positionChanged(a, b)
        }, this.setVisible = function(a) {
            G = a, p.style.display = a ? g.block : g.none
        }, this.setVisible(a.visible!==!1), this.getPan = y.getPan;
        var N = function(a) {
            var c = l.nodeMap[a.id];
            if (c) {
                var d = e.getSize(c.relatedElement);
                c.style.width = d[0] + g.px, c.style.height = d[1] + g.px, b()
            }
        };
        this.invalidate = function(a) {
            if (a)
                N({
                    id: a
                });
            else
                for (var b in l.nodeMap)
                    N({
                        id: b
                    })
        }, this.setSuspended = function(a, b) {
            t = a, b && this.update()
        }, this.update = b;
        var O = function(a) {
            var c = a.node, d = l.nodeMap[c];
            d && (y.remove(d), delete l.nodeMap[c], l.jsPlumb.removeElement(d)), a.dontUpdatePanner || b()
        }, P = function() {
            for (var a in l.nodeMap)
                O({
                    node: a,
                    dontUpdatePanner: !0
                });
            b()
        };
        o.bind(h.pan, b), o.bind(h.zoom, b), o.bind(h.nodeMoveEnd, J), o.bind(h.nodeRemoved, O), o.bind(h.nodeAdded, K), o.bind(h.nodeRendered, K), o.bind(h.relayout, b), o.bind(h.objectRepainted, N), o.bind(h.stateRestored, b), a.toolkit.bind(h.graphCleared, P);
        var Q = function() {
            I(!0)
        };
        m.getLayout().bind(h.redraw, Q), this.setHostLayout = function(a) {
            var b = m.getLayout();
            b && b.setHostLayout(a)
        }, this.setZoom = y.setZoom, this.getZoom = y.getZoom, this.getTransformOrigin = y.getTransformOrigin
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    var a = this, b = a.jsPlumbToolkit, c = b.Widgets, d = jsPlumbUtil, e = "ontouchstart"in document.documentElement, f = e ? "touchstart": "mousedown", g = e ? "touchend": "mouseup", h = e ? "touchmove": "mousemove", i = function(a, b) {
        a.style.width = b[0] + "px", a.style.height = b[1] + "px"
    }, j = {
        SELECT_DEFEAT: "jtk-lasso-select-defeat",
        LASSO: "jtk-lasso",
        LASSO_MASK: "jtk-lasso-mask",
        LASSO_MASK_LEFT: "jtk-lasso-mask-left",
        LASSO_MASK_TOP: "jtk-lasso-mask-top",
        LASSO_MASK_RIGHT: "jtk-lasso-mask-right",
        LASSO_MASK_BOTTOM: "jtk-lasso-mask-bottom"
    }, k = {
        SELECT_START: "onselectstart"
    }, l = function() {};
    c.Lasso = function(a) {
        var b, c = a.canvas, e=!1, m = {}, n = [0, 0], o = a.onStart || l, p = a.onEnd || l, q = a.onSelect || l, r=!1, s=!1, t = a.invert===!0, u = function(a, c) {
            if (t) {
                var d = window.innerWidth, e = window.innerHeight, f = window.scrollX, g = window.scrollY, h = e - a[1] + g, j = e - h + c[1], k = d - a[0] + f, l = d - k + c[0];
                m.top.style.bottom = h + "px", m.bottom.style.top = j + "px", m.left.style.right = k + "px", m.right.style.left = l + "px", m.top.style.left = d - k + "px", m.top.style.right = d - l + "px", m.bottom.style.left = d - k + "px", m.bottom.style.right = d - l + "px"
            } else
                jsPlumb.setAbsolutePosition(b, a), i(b, c)
        }, v = function(a) {
            var c = a ? "block": "none";
            t ? (m.top.style.display = c, m.left.style.display = c, m.right.style.display = c, m.bottom.style.display = c) : b.style.display = c, jsPlumb[a ? "addClass": "removeClass"](document.body, j.SELECT_DEFEAT)
        }, w = function(b) {
            e&&!A(b) && (d.consume(b), r=!0, a.on(document, g, y), a.on(document, h, x), a.on(document, k.SELECT_START, z), n = a.pageLocation(b), u(n, [1, 1]), o(n, b.shiftKey))
        }, x = function(b) {
            if (r) {
                s || (v(!0), s=!0), d.consume(b);
                var c = a.pageLocation(b), e = [Math.abs(c[0] - n[0]), Math.abs(c[1] - n[1])], f = [Math.min(n[0], c[0]), Math.min(n[1], c[1])];
                u(f, e), q(f, e, [n[0] < c[0], n[1] < c[1]], b.shiftKey)
            }
        }, y = function(b) {
            r && (r=!1, s=!1, d.consume(b), a.off(document, g, y), a.off(document, h, x), a.off(document, k.SELECT_START, z), v(!1), p())
        }, z = function() {
            return !1
        }, A = a.filter ? function(b) {
            var c = b.srcElement || b.target;
            return d.matchesSelector(c, a.filter)
        } : function() {
            return !1
        }, B = function(a) {
            var b = document.createElement("div");
            return b.className = a.join(" "), document.body.appendChild(b), b
        }, C = function() {
            m.top = B([j.LASSO_MASK, j.LASSO_MASK_TOP]), m.bottom = B([j.LASSO_MASK, j.LASSO_MASK_BOTTOM]), m.left = B([j.LASSO_MASK, j.LASSO_MASK_LEFT]), m.right = B([j.LASSO_MASK, j.LASSO_MASK_RIGHT])
        };
        t ? C() : b = B([j.LASSO]), a.on(c, f, w), this.isActive = function() {
            return r
        }, this.setEnabled = function(a) {
            e = a
        }
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n = this, o = {}, p = {
        ok: "OK",
        cancel: "Cancel"
    }, q = document.body, r=!1, s = Rotors.newInstance(), t = {}, u=!0;
    jsPlumb.ready(function() {
        b = document.createElement("div"), b.className = "jtk-dialog-underlay", jsPlumb.on(b, "click", function() {
            I(!0)
        }), c = document.createElement("div"), c.className = "jtk-dialog-overlay", d = document.createElement("div"), d.className = "jtk-dialog-title", c.appendChild(d), e = document.createElement("div"), e.className = "jtk-dialog-content", c.appendChild(e), f = document.createElement("div"), f.className = "jtk-dialog-buttons", c.appendChild(f)
    });
    var v = function() {
        f.innerHTML = "", l = document.createElement("button"), l.className = "jtk-dialog-button jtk-dialog-button-ok", l.innerHTML = p.ok, f.appendChild(l), jsPlumb.on(l, "click", function() {
            I()
        }), m = document.createElement("button"), m.className = "jtk-dialog-button jtk-dialog-button-cancel", m.innerHTML = p.cancel, f.appendChild(m), jsPlumb.on(m, "click", function() {
            I(!0)
        })
    }, w = {
        x: function(a, b, d) {
            var e = q.clientWidth, f = (e - d[0]) / 2, g = window.pageXOffset || a.scrollLeft || document.body.scrollLeft;
            0 > f && (f = 10), g = b ? g : q.scrollLeft, c.style.left = f + g + "px"
        },
        y: function(a, b, d) {
            var e = q.clientHeight, f = .1 * e, g = window.pageYOffset || a.scrollTop || document.body.scrollTop;
            0 > f && (f = 10), g = b ? g : q.scrollTop, c.style.top = f + g + "px"
        }
    }, x = function() {
        if (r) {
            var a = document.documentElement, d = jsPlumb.getSize(c), e = q == document.body, f = c.getAttribute("data-axis");
            b.style.position = e ? "fixed" : "absolute", w[f](a, e, d)
        }
    }, y = function(a) {
        27 == a.keyCode && I(!0)
    }, z = function(a) {
        return null == a ? document.body : "string" == typeof a ? document.getElementById(a) : a
    }, A = function(a) {
        if (a.id && o[a.id]) {
            u = a.reposition!==!1, g = a.onOK, h = a.onCancel, i = a.onOpen, j = a.onMaybeClose, k = a.onClose;
            var f = a.position || "top", n = "jtk-dialog-overlay-" + f, w = "top" === f || "bottom" === f ? "x": "y", A = "jtk-dialog-overlay-" + w;
            v(), l.innerHTML = a.labels ? a.labels.ok || p.ok : p.ok, m.innerHTML = a.labels ? a.labels.cancel || p.cancel : p.cancel, q = z(a.container);
            var C = a.data || {}, D = s.template(a.id, C);
            d.innerHTML = a.title || o[a.id].title || "", e.innerHTML = "";
            for (var E = D.childNodes.length, G = 0; E > G; G++)
                e.appendChild(D.childNodes[0]);
            q.appendChild(b), q.appendChild(c), jsPlumb.addClass(c, n), jsPlumb.addClass(c, A), b.style.display = "block", c.style.display = "block", c.setAttribute("data-position", f), c.setAttribute("data-axis", w), m.style.visibility = o[a.id].cancelable ? "visible" : "hidden", r=!0, x(), B(C), t.onOpen && t.onOpen(c), i && i(c), jsPlumb.addClass(c, "jtk-dialog-overlay-visible"), jsPlumb.on(document, "keyup", y), u && (jsPlumb.on(window, "resize", x), jsPlumb.on(window, "scroll", x)), jsPlumb.on(c, "click", "[jtk-clear]", function(a) {
                var b = this.getAttribute("jtk-att");
                b && F(c.querySelectorAll("[jtk-att='" + b + "']:not([jtk-clear])"), this)
            }), jsPlumb.on(c, "click", "[jtk-clear-all]", function(a) {
                F(c.querySelectorAll("[jtk-att]:not([jtk-clear])"), this)
            });
            try {
                var H = e.querySelector("[jtk-focus]");
                H && setTimeout(function() {
                    H.focus()
                }, 0)
            } catch (I) {}
        }
    }, B = function(a) {
        for (var b = e.querySelectorAll("[jtk-att]"), c = 0; c < b.length; c++) {
            var d = b[c].tagName.toUpperCase(), f = "INPUT" === d ? (b[c].getAttribute("type") || "TEXT").toUpperCase(): d, g = b[c].getAttribute("jtk-att"), h = s.data(a, g);
            null != h && C[f](b[c], h), b[c].getAttribute("jtk-commit") && ("INPUT" === d ? jsPlumb.on(b[c], "keyup", function(a) {
                (10 == a.keyCode || 13 == a.keyCode) && I()
            }) : "TEXTAREA" === d && jsPlumb.on(b[c], "keyup", function(a) {
                !a.ctrlKey || 10 != a.keyCode && 13 != a.keyCode || I()
            }))
        }
    }, C = {
        TEXT: function(a, b) {
            a.value = b
        },
        RADIO: function(a, b) {
            a.checked = a.value == b
        },
        CHECKBOX: function(a, b) {
            a.checked = 1 == b
        },
        SELECT: function(a, b) {
            for (var c = 0; c < a.options.length; c++)
                if (a.options[c].value == b)
                    return void(a.selectedIndex = c)
        },
        TEXTAREA: function(a, b) {
            a.value = b
        }
    }, D = {
        TEXT: function(a) {
            return a.value
        },
        RADIO: function(a) {
            return a.checked ? a.value : void 0
        },
        CHECKBOX: function(a) {
            return a.checked?!0 : void 0
        },
        SELECT: function(a) {
            return - 1 != a.selectedIndex ? a.options[a.selectedIndex].value : null
        },
        TEXTAREA: function(a) {
            return a.value
        }
    }, E = {
        TEXT: function(a) {
            a.value = ""
        },
        RADIO: function(a) {
            a.checked=!1
        },
        CHECKBOX: function(a) {
            a.checked=!1
        },
        SELECT: function(a) {
            a.selectedIndex =- 1
        },
        TEXTAREA: function(a) {
            a.value = ""
        }
    }, F = function(a, b) {
        for (var c = 0; c < a.length; c++)
            if (a[c] !== b) {
                var d = a[c].tagName.toUpperCase(), e = "INPUT" === d ? (a[c].getAttribute("type") || "TEXT").toUpperCase(): d, f = E[e];
                f && f(a[c])
            }
    }, G = function() {
        for (var a = e.querySelectorAll("[jtk-att]"), b = {}, c = 0; c < a.length; c++) {
            var d = a[c].tagName.toUpperCase(), f = "INPUT" === d ? (a[c].getAttribute("type") || "TEXT").toUpperCase(): d, g = D[f](a[c]), h = a[c].getAttribute("jtk-att");
            if (null != g) {
                var i = s.data(b, h);
                null != i ? (jsPlumbUtil.isArray(i) || s.data(b, h, [i]), i.push(g)) : s.data(b, h, g)
            }
        }
        return b
    }, H = function(a, b) {
        try {
            null != a && a.apply(a, Array.prototype.slice.apply(arguments, [1]))
        } catch (c) {}
    }, I = function(d) {
        var f = d ? null: G();
        (d || null == j || j(f)!==!1) && (r=!1, b.style.display = "none", c.style.display = "none", jsPlumb.off(document, "keyup", y), jsPlumb.off(window, "resize", x), jsPlumb.off(window, "scroll", x), jsPlumb.removeClass(c, "jtk-dialog-overlay-visible"), jsPlumb.removeClass(c, "jtk-dialog-overlay-top"), jsPlumb.removeClass(c, "jtk-dialog-overlay-bottom"), jsPlumb.removeClass(c, "jtk-dialog-overlay-left"), jsPlumb.removeClass(c, "jtk-dialog-overlay-right"), jsPlumb.removeClass(c, "jtk-dialog-overlay-x"), jsPlumb.removeClass(c, "jtk-dialog-overlay-y"), c.setAttribute("data-position", ""), c.setAttribute("data-axis", ""), q.removeChild(b), q.removeChild(c), l.parentNode.removeChild(l), m.parentNode.removeChild(m), d ? (H(t.onCancel, e), H(h, e)) : (H(t.onOK, f, e), H(g, f, e)), H(t.onClose), H(k), g = h = i = k = j = a = null)
    };
    n.jsPlumbToolkit.Dialogs = {
        initialize: function(a) {
            a = a || {};
            for (var b = a.selector || ".jtk-dialog", c = jsPlumb.getSelector(b), d = 0; d < c.length; d++) {
                var e = c[d].getAttribute("id");
                null != e && (o[e] = {
                    content: c[d].innerHTML,
                    title: c[d].getAttribute("title") || "",
                    el: c[d],
                    cancelable: "false" !== c[d].getAttribute("cancel")
                })
            }
            a.labels && jsPlumb.extend(p, a.labels), a.globals && jsPlumb.extend(t, a.globals)
        },
        show: A,
        hide: function() {
            I(!0)
        },
        clear: F
    }
}.call("undefined" != typeof window ? window : this), null, function() {
    "use strict";
    var a = this;
    a.jsPlumbToolkit.DrawingTools = function(a) {
        var b, c, d, e, f, g, h, i, j, k = a.renderer, l = k.getToolkit(), m = k.getJsPlumb(), n = {}, o = a.widthAttribute || "w", p = a.heightAttribute || "h", q = a.leftAttribute || "left", r = a.topAttribute || "top", s = function() {
            for (var a in n) {
                var b = n[a];
                b[0] && b[0].parentNode && b[0].parentNode.removeChild(b[0]), delete n[a]
            }
        }, t = function(a, b, c, d) {
            var e = document.createElement(a);
            if (b && (e.className = b), c && c.appendChild(e), d)
                for (var f in d)
                    e.setAttribute(f, d[f]);
            return e
        }, u = function(a) {
            var b = n[a];
            b && b[0] && b[0].parentNode && b[0].parentNode.removeChild(b[0]), delete n[a]
        }, v = function(a, b) {
            var c = b.getRenderedNode(a.id);
            return u(a.id), c
        }, w = function(a, b) {
            var c = v(a, b);
            if (null != c) {
                var d = t("div", "jtk-draw-skeleton", c), e = c.getAttribute("jtk-x-resize"), f = c.getAttribute("jtk-y-resize");
                t("div", "jtk-draw-drag", d), t("div", "jtk-draw-handle jtk-draw-handle-tl", d, {
                    "data-dir": "tl",
                    "data-node-id": a.id
                }), t("div", "jtk-draw-handle jtk-draw-handle-tr", d, {
                    "data-dir": "tr",
                    "data-node-id": a.id
                }), t("div", "jtk-draw-handle jtk-draw-handle-bl", d, {
                    "data-dir": "bl",
                    "data-node-id": a.id
                }), t("div", "jtk-draw-handle jtk-draw-handle-br", d, {
                    "data-dir": "br",
                    "data-node-id": a.id
                }), n[a.id] = [d, "false" !== e, "false" !== f]
            }
        }, x = function(a, d, e, f) {
            var k = {};
            return k[o] = b ? e : h - g, k[p] = c ? f : j - i, k[q] = b ? a : g, k[r] = c ? d : i, k
        }, y = {
            tl: function(a, b) {
                var c = g + a, d = i + b, e = h - c, f = j - d;
                return c >= h && (e = c - h, c = h), d >= j && (f = d - j, d = j), x(c, d, e, f)
            },
            tr: function(a, b) {
                var c = h - g + a, d = i + b, e = j - d, f = g;
                return 0 >= c && (f = g + c, c*=-1), d >= j && (e = d - j, d = j), x(f, d, c, e)
            },
            bl: function(a, b) {
                var c = g + a, d = j - i + b, e = h - c, f = i;
                return c >= h && (e = c - h, c = h), 0 >= d && (f += d, d*=-1), x(c, f, e, d)
            },
            br: function(a, b) {
                var c = h - g + a, d = j - i + b, e = g, f = i;
                return 0 >= c && (e = g + c, c*=-1), 0 >= d && (f += d, d*=-1), x(e, f, c, d)
            }
        };
        l.bind("selectionCleared", function() {
            s()
        }), l.bind("select", function(a) {
            w(a.obj, k)
        }), l.bind("deselect", function(a) {
            v(a.obj, k)
        });
        var z = function(a) {
            var b = k.mapEventLocation(a), c = b.left - d.left, g = b.top - d.top, h = e(c, g, "");
            l.updateNode(f, h), k.setPosition(f, h[q], h[r], !0)
        }, A = function(a) {
            k.storePositionInModel(f.id), m.removeClass(document.body, "jtk-drag-select-defeat"), m.off(document, "mousemove", z), m.off(document, "mouseup", A), jsPlumbUtil.consume(a)
        };
        m.on(document, "mousedown", ".jtk-draw-handle", function(a) {
            var o = this.getAttribute("data-dir"), p = this.getAttribute("data-node-id");
            f = l.getNode(p), b = n[p][1], c = n[p][2], d = k.mapEventLocation(a);
            var q = k.getCoordinates(f);
            g = q.x, i = q.y, h = g + q.w, j = i + q.h, e = y[o], m.addClass(document.body, "jtk-drag-select-defeat"), m.on(document, "mousemove", z), m.on(document, "mouseup", A)
        })
    }
}.call("undefined" != typeof window ? window : this);

