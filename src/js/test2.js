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