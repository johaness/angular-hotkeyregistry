angular.module('hotkeyregistry', []).

factory('$hotkeyregistry', ['$document', '$rootScope', function($document, $rootScope) {
    var registered = [],
        filters = ['isInput', 'ctrlKey', 'shiftKey', 'keyCode', 'altKey', 'metaKey', 'altGraphKey'],
        symbols = {
            8 : ["\u232b", "backspace"],
            9 : ["\u21b9", "tab"],
            13: ["\u23ce", "enter"],
            16: ["\u21e7", "shift"],
            17: ["\u2303", "control"],
            18: ["\u2325", "alt"],
            20: ["\u21ea", "capslock"],
            27: ["\u238b", "escape"],
            33: ["\u21de", "page up"],
            34: ["\u21df", "page down"],
            35: ["\u21f2", "end"],
            36: ["\u21f1", "home"],
            37: ["\u2190", "arrow left"],
            38: ["\u2191", "arrow up"],
            39: ["\u2192", "arrow right"],
            40: ["\u2193", "arrow down"],
            45: ["\u2324", "insert"],
            46: ["\u2326", "delete"],
            undefined: ["*", "Any Key"]
        },
        codes = {};
    // 0 - 9
    for (var i = 48; i < 58; i++)
        symbols[i] = [String.fromCharCode(i), String.fromCharCode(i)];
    // a - z
    for (var i = 65; i < 91; i++)
        symbols[i] = [String.fromCharCode(i), String.fromCharCode(i)];
    angular.forEach(symbols, function(v, k) {
        codes[v[1]] = k;
    });
    $document.bind('keydown', function(e) {
        console.log(e);
        function match(ftr) {
            for (var f in filters) {
                var filter = filters[f];
                if (ftr && ftr.hasOwnProperty(filter) && ftr[filter] != e[filter]) {
                    return false;
                }
            }
            return true;
        }
        var elem = e.target;
        if (elem) {
            if (elem.nodeType == 3) elem = elem.parentNode;
            e.isInput = elem.tagName == 'INPUT' || elem.tagName == 'SELECT' || elem.tagName == 'TEXTAREA';
            e.element = elem;
        } else {
            e.isInput = false;
        }
        for (var r in registered) {
            if (match(registered[r].filter)) {
                $rootScope.$apply(function(s) {
                    registered[r].cb(e); });
            }
        }
    });
    function register(callback, ftr, scope) {
        // translate key to keyCode
        if (ftr.key) {
            ftr.keyCode = codes[ftr.key] || ftr.key.toUpperCase().charCodeAt(0);
        }
        // translate keyCode to key
        var syms = [];
        if (ftr.shiftKey)
            syms.push(symbols[16]);
        if (ftr.ctrlKey)
            syms.push(symbols[17]);
        if (ftr.altKey)
            syms.push(symbols[18]);
        syms.push(symbols[ftr.keyCode]);

        var reg = {cb: callback, filter: ftr, symbols: syms},
            unregister = function() {
                var idx = registered.indexOf(reg);
                return idx > -1 ? registered.splice(idx, 1) : [];
            };
        if (scope) {
            scope.$on('$destroy', unregister);
        }
        registered.push(reg);
        return unregister;
    }
    register.registered = registered;
    register.symbols = symbols;
    return register;
}]);
