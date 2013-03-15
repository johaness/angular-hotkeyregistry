angular.module('demo', ['hotkeyregistry']).

controller('ctl', ['$scope', '$hotkeyregistry', function($scope, $hotkeyregistry) {
    $scope.incl = '';
    $scope.keys = $hotkeyregistry.registered;
    $scope.syms = $hotkeyregistry.symbols;
    $scope.toggle = function() {
        $scope.incl = $scope.incl ? '' : 'partial.html';
    };
    $scope.toggle();
}]).

controller('hotkeys', ['$scope', '$hotkeyregistry', function($scope, $hotkeyregistry) {
    $scope.log = [];
    function debug(text) {
        return function(e) {
            var hk = $hotkeyregistry.symbols[e.keyCode],
                t = hk ? text + ": " + hk[0] + "[" + hk[1] + "]" : text;
            t += " keyCode=" + e.keyCode;
            $scope.log.push({t: t, ts: e.timeStamp});
        }
    }
    $hotkeyregistry(debug("Any Key"),
        {help: "fires on any keypress"}, $scope);
    $hotkeyregistry(debug("Enter"),
        {key: 'enter', isInput: false,
         help: "fires only outside of input elements"}, $scope);
    $hotkeyregistry(debug("Escape"),
        {keyCode: 27, help: "fires anywhere"}, $scope);
    $hotkeyregistry(debug("j"),
        {key: 'j', shiftKey: false, isInput: false,
         help: "lowercase j only, not in input elements"}, $scope);
    $hotkeyregistry(function() { alert("You pressed Ctrl Shift H"); },
       {keyCode: 72, ctrlKey: true, shiftKey: true,
        help: "displays a javascript alert"}, $scope);
}]);
