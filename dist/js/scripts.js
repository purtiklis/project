/*!
 * Project (https://github.com/purtiklis/project)
 * Version: 0.0.1
 * Generated on: 2017-11-09 10:27:01
 * Author: Deivydas Vaseris
 */

var toggleCollapse = function(element) {

    element = document.querySelector(element);

    if (!element)
        return;
    
    if (element.classList.contains('in')) {
        element.classList.add('collapsing');
        element.style.height = element.offsetHeight + 'px';
        var reflow = element.offsetHeight; // needs reflow, dunno why
        element.classList.remove('collapse', 'in');
        var complete = function() {
            element.classList.remove('collapsing');
            element.classList.add('collapse');
            element.removeEventListener('transitionend', complete);
            element.style.height = null;
        };
        element.addEventListener('transitionend', complete);
        element.style.height = 0;
    }
    else {
        element.style.height = 0;
        element.classList.add('collapsing');
        element.classList.remove('collapse');
        var complete = function() {
            element.classList.remove('collapsing');
            element.classList.add('collapse', 'in');
            element.removeEventListener('transitionend', complete);
            element.style.height = null;
        };
//        var e = $.Event(Event.SHOW);
//        $(this._element).trigger(e)
        element.addEventListener('transitionend', complete);
        element.style.height = element.scrollHeight + 'px';
    }
};

//.collapse {
//    display: none;
//    &.in {
//        display: block;
//    }
//
//    padding-top: 0 !important;
//    padding-bottom: 0 !important;
//    margin-top: 0 !important;
//    margin-bottom: 0 !important;
//    border-top-width: 0 !important;
//    border-bottom-width: 0 !important; 
//}
//.collapsing {
//    position: relative;
//    overflow: hidden;
//    transition: height .3s ease;
//
//    padding-top: 0 !important;
//    padding-bottom: 0 !important;
//    margin-top: 0 !important;
//    margin-bottom: 0 !important;
//    border-top-width: 0 !important;
//    border-bottom-width: 0 !important; 
//}
//show(relatedTarget) {
//    if (this._isTransitioning || this._isShown) {
//        return
//    }
//
//    if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
//        this._isTransitioning = true
//    }
//
//    const showEvent = $.Event(Event.SHOW, {
//        relatedTarget
//    })
//
//    $(this._element).trigger(showEvent)
//
//    if (this._isShown || showEvent.isDefaultPrevented()) {
//        return
//    }
//
//    this._isShown = true
//
//    this._checkScrollbar()
//    this._setScrollbar()
//
//    this._adjustDialog()
//
//    $(document.body).addClass(ClassName.OPEN)
//
//    this._setEscapeEvent()
//    this._setResizeEvent()
//
//    $(this._element).on(
//        Event.CLICK_DISMISS,
//        Selector.DATA_DISMISS,
//        (event) => this.hide(event)
//    )
//
//    $(this._dialog).on(Event.MOUSEDOWN_DISMISS, () => {
//        $(this._element).one(Event.MOUSEUP_DISMISS, (event) => {
//            if ($(event.target).is(this._element)) {
//                this._ignoreBackdropClick = true
//            }
//        })
//    })
//
//    this._showBackdrop(() => this._showElement(relatedTarget))
//}
"use strict";

//var test2 = function(a, b){
//    return a + b;
//};
////var test = 1;
////document.documentElement.classList.remove('no-js');
////document.addEventListener('DOMContentLoaded', function(){
////    document.querySelector('.article').addEventListener('click', function(e){
////        console.log(e, this);
////    });
////});
//
//if (true){
//    var i = 5;
//    let j = 5;
//}
//console.log(i); // ok
////console.log(j); // not defined
//
//// This has led to a common pattern of "immediately-executing anonymous
//// functions", which prevent temporary variables from leaking into the global
//// scope.
//(function(){
//    var temporary = 5;
//    // We can access the global scope by assigning to the "global object", which
//    // in a web browser is always `window`. The global object may have a
//    // different name in non-browser environments such as Node.js.
//    window.permanent = 10;
//    console.log('fx');
//})();
////console.log(temporary); // raises ReferenceError
//console.log(permanent); // = 10

console.log('Init', (new Date()).getTime(), document.body, document.readyState); 
(function(){
    console.log('Anonymous FX', (new Date()).getTime(), document.body, document.readyState); 
})();
document.addEventListener('DOMContentLoaded', function(){
    console.log('DOMContentLoaded', (new Date()).getTime(), document.body, document.readyState); 
});

document.readyState == 'loading' ? document.addEventListener('DOMContentLoaded', universal) : universal();
function universal() {
    console.log('Universal', (new Date()).getTime(), document.body, document.readyState); 
}


var x = function() {
    return (new Date()).valueOf()
};

//var x = 5;
//var myObj = {
//    myString: "Hello world!",
//    myFunc: function(value){
//        console.log(value, this.myString, this);
//    }
//};
//var obj = {
//    myString: "Goodbye world"
//};
//myObj.myFunc('myObj');x = Math.pow(x, x);x -= 100;var fx = myObj.myFunc;fx('fx');fx.call(obj, 'obj');var fx2 = myObj.myFunc.bind(obj);fx2('fx2');