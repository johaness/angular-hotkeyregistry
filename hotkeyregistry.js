angular.module('hotkeyregistry', []).

factory('$hotkeyregistry', ['$document', '$rootScope', function($document, $rootScope) {
    var registered = [],
        filters = ['ctrlKey', 'shiftKey', 'keyCode'];
    $document.bind('keydown', function(e) {
        function match(ftr) {
            for (var f in filters) {
                var filter = filters[f];
                if (ftr && ftr.hasOwnProperty(filter) && ftr[filter] != e[filter]) {
                    return false;
                }
            }
            return true;
        }
        for (var r in registered) {
            if (match(registered[r].filter)) {
                $rootScope.$apply(function(s) {
                    registered[r].cb(e); });
            }
        }
    });
    return function(callback, evtfilter, scope) {
        if (evtfilter.key) {
            evtfilter.keyCode = evtfilter.key.toUpperCase().charCodeAt(0);
        }
        var reg = {cb: callback, filter: evtfilter},
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
}]);
