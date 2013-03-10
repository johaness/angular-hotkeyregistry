Keyboard Shortcut Library for Angular
=====================================

Setup
-----

 * Add ``hotkeyregistry.js`` to your scripts,
 * import the ``hotkeyregistry`` module,
 * and inject the ``$hotkeyregistry`` service into your controller.

Usage
-----

Register a handler for each hotkey::

    $hotkeyregistry(callback, event_filter, scope)

callback
    function to be called, receives original DOM event as parameter

event_filter
    only execute callback when the properties in this object match the
    event properties. supported: *keyCode*, *ctrlKey*, *shiftKey*.

    A character in property *key* is automatically converted to the
    corresponding *keyCode*,
    e.g. ``key: 'a'`` is equivalent to ``keyCode: 65``.

    Use an empty object to capture all keyboard events

scope
    optional: remove the callback registration once ``scope`` is destroyed;
    useful for controller-specific hotkeys


Examples
--------

Sample usage::

    $hotkeyregistry(
        function() { console.log("Pressed the any key"); },
        {}, $scope);

    $hotkeyregistry(
        function(e) { console.log("Enter in " + e.target); },
        {keyCode: 13}, $scope);

    $hotkeyregistry(
        function() { console.log("j"); },
        {key: 'j', shiftKey: false}, $scope);

    $hotkeyregistry(
        function() { console.log("Ctrl Shift H"); },
        {keyCode: 72, ctrlKey: true, shiftKey: true}, $scope);


Module setup::

    angular.module('demoApp', ['hotkeyregistry']).
    controller('demoCtrl', function($scope, $hotkeyregistry) {
       ...
    });

