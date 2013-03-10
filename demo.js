angular.module('demo', ['hotkeyregistry']).

controller('ctl', ['$scope', function($scope) {
    $scope.incl = '';
    $scope.toggle = function() {
        $scope.incl = $scope.incl ? '' : 'partial.html';
    };
    $scope.toggle();
}]).

controller('hotkeys', ['$scope', '$hotkeyregistry', function($scope, $hotkeyregistry) {
    $scope.log = [];
    function cnsl(text) {
        return function(e) {
           $scope.log.push({t: text, ts: e.timeStamp});
        }
    }
    $hotkeyregistry(cnsl("Any Key"), {}, $scope);
    $hotkeyregistry(cnsl("Enter"), {keyCode: 13}, $scope);
    $hotkeyregistry(cnsl("Escape"), {keyCode: 27}, $scope);
    $hotkeyregistry(cnsl("j"), {key: 'j', shiftKey: false}, $scope);
    $hotkeyregistry(cnsl("Ctrl Shift H"), {keyCode: 72, ctrlKey: true, shiftKey: true}, $scope);
}]);
