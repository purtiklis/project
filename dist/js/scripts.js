/*!
 * Project (https://github.com/purtiklis/project)
 * Version: 0.0.1-6
 * Generated on: 2017-11-03 13:13:06
 * Author: Deivydas Vaseris
 */

var test = 1;
document.documentElement.classList.remove('no-js');
//document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('.article').addEventListener('click', function(e){
        console.log(e, this);
    });
//});
var test2 = function(a, b){
    return a + b;
};