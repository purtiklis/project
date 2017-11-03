var test = 1;
document.documentElement.classList.remove('no-js');
//document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('.article').addEventListener('click', function(e){
        console.log(e, this);
    });
//});