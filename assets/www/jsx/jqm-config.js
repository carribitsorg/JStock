$(document).bind("mobileinit", function () {
return;
  // Disable jQueryMobile routing.
  $.mobile.ajaxEnabled = false;
  $.mobile.linkBindingEnabled = false;
  $.mobile.hashListeningEnabled = false;
  $.mobile.pushStateEnabled = false;

  // Setup transitions and effects.
  $.extend($.mobile, {
    slideText: "slide",
    slideUpText: "slideup",
    defaultPageTransition: "slide",
    defaultDialogTransition: "slideup"
  });

  // Remove page from the DOM when it's being replaced
  $('div[data-role="page"]').live('pagehide', function (event, ui) {
      $(event.currentTarget).remove();
  });
});
