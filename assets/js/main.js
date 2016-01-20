
var Main = (function ($) {

  // Esc handlers
  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      Main._submitClose();
    }
  });

  return {
		altToggle: function () {
      // Alternate character toggle
      $('.alt-toggle').on('click', function() {
        $(this).toggleClass('-alt');
      });
		},
    _submitClose: function () {
      if ($('.submit-modal').is('.-active')) {
        $('.submit-modal').removeClass('-active');
      }
    },
    submitToggle: function () {
      $('.submit-toggle').on('click', function(e) {
        e.preventDefault();
        $('.submit-modal').toggleClass('-active');
      })
    },
		initMain: function () {
			$(document).ready(function () {
        Main.altToggle();
        Main.submitToggle();
			})
		}
	};
// Pass in jQuery.
})(jQuery);

Main.initMain();