⌨  Keyboard Shortcut Library for Angular
========================================

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
    function to be called, receives original DOM event as parameter,
    with the additional properties ``element`` -- the event target, or its
    parent for text nodes -- and ``isInput`` -- true iff the target was an
    input element (see ''ignore_input'' below for a list of tags)

event_filter
    only execute callback when the properties in this object match the
    event properties. supported: *keyCode* for the actual character,
    *ctrlKey*, *shiftKey*, *altKey*, *metaKey*, *altGraphKey* for the
    modifier keys, and the custom *isInput* property (see below).

    A character in property *key* is automatically converted to the
    corresponding *keyCode*,
    e.g. ``key: 'a'`` is equivalent to ``keyCode: 65``. See the source code
    or the demo app for a list of aliases for non-printable keys like *escape*
    or *return*.

    *isInput* is a virtual property. It is *true* when fired on a HTML input
    element (``<input>``, ``<textarea>``, ``<select>``). default is *true* if
    *ctrlKey* is *false*, and *false* if *ctrlKey* is *true*.


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
        function(e) { console.log("Enter in " + e.element); },
        {keyCode: 13}, $scope);

    $hotkeyregistry(
        function() { console.log("j"); },
        {key: 'j', shiftKey: false, isInput: false}, $scope);

    $hotkeyregistry(
        function() { console.log("Ctrl Shift H"); },
        {keyCode: 72, ctrlKey: true, shiftKey: true}, $scope);


Module setup::

    angular.module('demoApp', ['hotkeyregistry']).
    controller('demoCtrl', function($scope, $hotkeyregistry) {
       ...
    });

See the demo application for an example of automatic display of a keyboard
binding map.
