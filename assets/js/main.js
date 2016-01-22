
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
    insertLists: function () {

      $('.insert-list').each(function() {
        if ($(this).hasClass('-1')) {
          $(this).html(
              $('.master-list.-1').html()
            );
        }
        if ($(this).hasClass('-2')) {
          $(this).html(
            $('.master-list.-2').html()
          );
        }
      });

      $('.insert-list').toggleClass('insert-list list');

      //convert .row into 3 duplicate rows .-upper, .-middle, .-lower
      // $('.row').addClass('-upper');
      // $('.-upper').after(function() {
      //     return $(this).clone().toggleClass('-upper -middle');
      // });
      // $('.-middle').after(function() {
      //     return $(this).clone().toggleClass('-middle -lower');
      // });


    },
    randomizeLists: function () {
      //jquery function fo randomize order of elements
      // http://stackoverflow.com/questions/14555415/how-to-randomly-sort-list-items
      $.fn.randomize = function(selector){
          var $elems = selector ? $(this).find(selector) : $(this).children(),
              $parents = $elems.parent();

          $parents.each(function(){
              $(this).children(selector).sort(function(){
                  return Math.round(Math.random()) - 0.5;
              }).detach().appendTo(this);
          });

          return this;
      };
      
      // //randomize .lists
      $('.randomize').randomize('li');
      $('.randomize').removeClass('randomize')

    },
    scrollAnim: function () {

      //clone .scroll div contents and append to the end for seamless infinite scrolling
      $('.scroll').each(function() {
          clone1=$(this).children().clone();
          clone2=$(this).children().clone();
          $(this).append(clone1);
          $(this).append(clone2);
      });

      function loopScroll($obj,speed,rand,dir,width) {

        //some vars
        var stepTime = 10; //duration in ms of animate()
        var b1 = -width; //first boundary
        var b2 = 0; //second boundary
        var maxSpeed = 20000; //how fast can we go max?
        var accel = 20; //how fast do we accellerate?
        var decel = 15; //deccelerate?
        var restSpeed = 30*rand; //what speed do we default to?
          
        //change speed appropriately if scrolling
        if( window.globalWheel > 0 ) { speed += accel*rand*dir; }
        if( window.globalWheel < 0 ) { speed -= accel*rand*dir; }
        //deccelerate to restSpeed if not accellerating
        if( window.globalWheel == 0 ) {
          if (speed > restSpeed*-dir) { speed-=decel*rand; }
          if (speed < -restSpeed*-dir) { speed+=decel*rand; }
        }

        //window.globalWheel = 0;

        //don't exceed max speed
        speed = speed > maxSpeed ? maxSpeed : speed;
        speed = speed < -maxSpeed ? -maxSpeed : speed;

        //where are we?
        pos = $obj.position().left
        //check if we crossed the finish (going either direction)
        if ( speed > 0 && pos > b2 ) {
          //if so, reset us (factor in any amount we passed over)
          $obj.css({ left : (b1+(pos-b2))+"px" }); 
        }
        if ( speed < 0 && pos < b1 ) {
          //if so, reset us (factor in any amount we passed over)
          $obj.css({ left : (b2+(pos-b1))+"px" }); 
        }

        //move us forward stepTime
        $obj.animate (
          {
            left: '+='+(speed/(1000/stepTime)),
          }, 
          {
            duration:stepTime, 
            easing:'linear',
            complete: function() {
              loopScroll($obj,speed,rand,dir,width);
            }
          }
        );
      }


      //check the scroll and relay with a global variable.    –I know, I know.... I'll try to do this better....
      window.globalWheel = 0;
      // $(window).bind('mousewheel', function(event) {
      //   window.globalWheel = event.originalEvent.wheelDelta;
      // });
       $("body").mousewheel(function(event, delta) {

          window.globalWheel = delta;
          clearTimeout($.data(this, 'timer'));
          $.data(this, 'timer', setTimeout(function() {
             window.globalWheel = 0;
             console.log(window.globalWheel);
          }, 250));
          console.log(window.globalWheel);
          //thanks:  http://stackoverflow.com/questions/3515446/jquery-mousewheel-detecting-when-the-wheel-stops
        
          //event.preventDefault();

       });

      $('.scroll').each(function() {
        //some vars to pass to animation function

        //figure out scroll direction based on class
        dir = $(this).hasClass("-right") ? -1 : 1; //starting direction?

        //choose these
        rand = (.4+Math.random()*.8); //pick random factor to give each slightly different speed
        speed = 30*rand*-dir;  //pick initial speed


        //figure out the width of 1 list
        numLi = $(this).find('li').length/3; //need this to get width
        width = 500*numLi //(of single list) -- had to set this by hand as jQuery.width() was returning bad numbers

        //place it
        $(this).css({ left : -( Math.random()*width )+"px" }); 

        //start animating
        loopScroll($(this),speed,rand,dir,width);
      });


    },
		initMain: function () {
			$(document).ready(function () {
        Main.altToggle();
        Main.submitToggle();
        Main.insertLists();
        Main.randomizeLists();
        Main.scrollAnim();
			})
		}
	};
// Pass in jQuery.
})(jQuery);

Main.initMain();