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