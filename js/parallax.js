$(window).on("scroll", function(e){
    parallaxScroll();
    animate();
});

function parallaxScroll(){

    var scrolled = $(window).scrollTop();

    $(".parallax").each(function(){
    	var speed = $(this).data("speed") * 0.01;

    	$(this).css({
    		"transform": "translate3d(0px," + (0 - ( scrolled * speed )) + "px, 0px)"
    	});
    });
 
}

window.onload = function(){
	// var wow = new WOW ({
	//     boxClass:     'wow',      
	//     animateClass: 'animated', 
	//     offset:       50,          
	//     mobile:       false,       
	//     live:         true,      

	//     callback:     function(box) {
	      
	//     },
	//     scrollContainer: null 
	// });

	// wow.init();

	animate();

	$("body, html").scrollTop(0);
    $("#page-wrap").attr("style","");
};


// Animate
function animate(){

    $.fn.isOnScreen = function(x, y){
        if(x == null || typeof x == 'undefined') x = 1;
        if(y == null || typeof y == 'undefined') y = 1;

        var win = $(window);

        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };

        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var height = this.outerHeight();
        var width = this.outerWidth();

        if(!width || !height){
            return false;
        }

        var bounds = this.offset();
        bounds.right = bounds.left + width;
        bounds.bottom = bounds.top + height;

        var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

        if(!visible){
            return false;
        }

        var deltas = {
            top : Math.min( 1, ( bounds.bottom - viewport.top ) / height),
            bottom : Math.min(1, ( viewport.bottom - bounds.top ) / height),
            left : Math.min(1, ( bounds.right - viewport.left ) / width),
            right : Math.min(1, ( viewport.right - bounds.left ) / width)
        };


        return (deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y;
    };

    $("*[data-delay]").each(function(){

        $(this).css({
            "animation-delay":  $(this).data("delay")
        });
    });

    $(".animate-item").each(function(){

        if (!$(this).hasClass("animate")){
            var screen = $(this).attr("data-screen") || 0.5;  

            if ($(this).isOnScreen(0, screen)){
                $(this).addClass("animate");

                if ($(".section-projects").length){
                    $(".projects-img:nth-child(1)").each(function(){
                        $(this).addClass("slide-down");
                    });
                } 
            }

            // prevAnimate();
        } 
    });
    
};



