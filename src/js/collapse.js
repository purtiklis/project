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