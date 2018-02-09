document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '');

(function($){
    
    // IE Detect
    if (document.documentMode===10){
        document.documentElement.className+=' ie10';
    } else if (document.documentMode===11){
        document.documentElement.className+=' ie11';
    } else if (document.documentMode || /Edge/.test(navigator.userAgent)) {
        document.documentElement.className+=' edge';
    }

    // Viewport
    var viewport = document.querySelector("meta[name=viewport]");

    if (window.screen.availWidth === 320){
        //viewport.setAttribute('content', 'width=375, user-scalable=no');

        var swidth = window.screen.width;

        updateOrientation();

        window.addEventListener('orientationchange', updateOrientation, false);

        function updateOrientation() {
            //var viewport = document.querySelector("meta[name=viewport]");

            //var mq = window.matchMedia("(orientation: landscape)");

            if (!window.matchMedia("(orientation: landscape)").matches){
                viewport.setAttribute('content', 'width=device-width');
                $(".header-title").text("1");
            } else {
                viewport.setAttribute('content', 'width=375, user-scalable=no');
            }

            // switch (window.orientation){
            //     case 0: 
            //         viewport.setAttribute('content', 'width=375, user-scalable=no');
            //     break;

            //     case 90: case -90: 
            //         viewport.setAttribute('content', 'width=device-width');
            //     break;

            //     default:
            //         viewport.setAttribute('content', 'width=375, user-scalable=no')
            //     break;
            // }
        }
    }


    

    window.onload = function(){
        var $sectionAnimate = document.querySelector(".section-animate");

        $("html, body").animate({scrollTop: 0}, 10);   

        setTimeout( function() {
            $(".preloader").fadeOut(500);

            if (document.body.contains($sectionAnimate)) 
                $sectionAnimate.classList.add("animate");
                
        }, 500);
    }

    $(document).ready(function(){

        var $btnMenu     = document.querySelector(".btn-menu");
        var $btnFeedback = document.querySelector(".btn-feedback");
        var $menu        = document.querySelector(".menu");
        var $menuExt     = document.querySelector(".menu-ext");
        var $html        = document.querySelector("html");
        var $body        = document.querySelector("body");

        // HEADER
        (function(){

            // Skip Video    
            var $skip = document.querySelector(".skip");

            if (document.body.contains($skip)){
                $skip.addEventListener("click", function() {

                    document.querySelector(".header-mask").classList.add("return"); 

                    setTimeout( function() { menu.addScroll() }, 2000);

                    menu.close();
                });
            };    
            
            // Menu    
            var menu = {
                scroll: false,

                open: function(){
                    
                    if ($body.className.match(/\bscroll\b/)) this.scroll = true;

                    $html.classList.add("menu-open");
                    this.remScroll()
                },

                close: function(){
                    
                    if ($html.className.match(/\bmenu-ext-open\b/)){
                        textToggle($btnExt);
                        this.closeExt();

                        setTimeout( function(){
                            menu.remClassMenuOpen();
                        }, 1100);

                    } else {
                        this.remClassMenuOpen();
                    }

                    if (this.scroll) setTimeout( function() { menu.addScroll() }, 1200);

                },

                openExt: function(){
                    $html.classList.add("menu-ext-open");
                    $html.classList.remove("menu-ext-close");
                    
                    setTimeout(
                        function() {
                            lineMaker.animateLinesIn();
                            $menu.style.background = "none";
                            $menuExt.style.background = "none";
                        }, 600
                    );
                    
                },

                closeExt: function(){
                    
                    $html.classList.add("menu-ext-close");
                    $menu.style.background = "";
                    $menuExt.style.background = "";
                   
                    lineMaker.animateLinesOut();

                    setTimeout( function() {
                        $html.classList.remove("menu-ext-open");
                    }, 250);

                },

                remClassMenuOpen: function(){
                    $html.classList.remove("menu-open");
                },

                remScroll: function(){
                    //$body.classList.remove("scroll");

                    $("body").on("scroll mousewheel touchmove", function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    });
                },

                addScroll: function(){
                    $body.classList.add("scroll");
                    $("body").off("scroll mousewheel touchmove");
                }
            }

            if (document.body.contains($btnMenu)){
                $btnMenu.addEventListener("click", function() {
                    ($html.className.match(/\bmenu-open\b/)) ? menu.close() : menu.open()
                });
            } 

            if (document.body.contains($btnFeedback)){ 

                $btnFeedback.addEventListener("click", function() {
                    
                    if ($html.className.match(/\bmenu-open\b/)){
                        menu.close();
                        menu.closeExt();
                    } else {
                        menu.open();
                        menu.openExt();
                        menu.scroll = true;
                        textToggle($btnExt);
                    }
                });
            }

            // Menu Extend   
            var $btnExt = document.getElementById("btn-feedback");

            if (document.body.contains($btnExt)){
                $btnExt.addEventListener("click", function(){
                    textToggle(this);

                    ($html.className.match(/\bmenu-ext-open\b/)) ? menu.closeExt() : menu.openExt()
                });

            }
            
            function textToggle(btn){
                var textBtnCont = btn.querySelector("i");
                var textBtn     = textBtnCont.innerHTML; 
                var textClose   = textBtnCont.getAttribute("data-close-text");

                setTimeout(function(){
                    textBtnCont.innerHTML = textClose;
                }, 1400);

                textBtnCont.setAttribute("data-close-text", textBtn);
            };

            // Lines
            if (document.body.contains($btnMenu)){
                var lineCol = 'rgba(255,255,255,0.2)';
                var lineMaker = new LineMaker({
                    parent: { element: document.querySelector(".menu-wrap"), position: 'append' },
                    lines: [
                        {top: 0, left: '49vw', width: 1, height: '100%', color: lineCol, hidden: true, animation: { duration: 400, easing: 'easeInOutSine', delay: 0, direction: 'TopBottom' }},
                        {top: 0, right: '330px', width: 1, height: '100%', color: lineCol, hidden: true, animation: { duration: 400, easing: 'easeInOutSine', delay: 0, direction: 'TopBottom' }},
                        
                        {top: '17vh', left: 0, width: '100%', height: 1, color: lineCol, hidden: true, animation: { duration: 700, easing: 'easeInOutExpo', delay: 500, direction: 'LeftRight' }},
                        {left: 0, width: '100%', height: 1, color: lineCol, hidden: true, animation: { duration: 700, easing: 'easeInOutExpo', delay: 500, direction: 'LeftRight' }}
                    ]
                });
            };
            

            // Form Send
            if (document.body.contains($btnSend)){ 
                var $btnSend  = document.querySelector(".btn-send");

                $btnSend.addEventListener("click", function(e){
                    $html.classList.add("thanks");

                    e.preventDefault();
                });
            }

        }());

        // Full Page
        $("#one-scroll-page").length && $("#one-scroll-page").singlefull();

        // Placeholder Hide
        $("input, textarea").focus(function(){
           $(this).data("placeholder",$(this).attr("placeholder")).attr("placeholder","");
        }).blur(function(){
           $(this).attr("placeholder",$(this).data("placeholder"));
        });

    });


    // forEach for IE
    (function(){
        if ( typeof NodeList.prototype.forEach === "function" ) return false;
        NodeList.prototype.forEach = Array.prototype.forEach;
    }());

    // Scroll
    if (!$("html").hasClass("ie11") && !$("html").hasClass("edge")){
        var win = $(window)
                , target = $('body')
                , wrapper = target.find('.scroll-wrap')
                , easing = "cubic-bezier(0.165, 0.84, 0.44, 1)" 
                , duration = "1.2s" 
                , top = 0
                , resizeTimeout
                , jmScroll = {
                    _init: function() {
                        if( wrapper.length == 1 ) {
                            target.css({
                                margin: '0',
                                padding: '0',
                                width: '100%',
                                height: wrapper.height() + 'px'
                            });
                            
                            wrapper.css({
                                transition: 'transform ' + duration + ' ' + easing,
                                position: 'fixed',
                                top: '0',
                                left: '0',
                                width: '100%',
                                padding: '0',
                                zIndex: '2',
                                display: 'block',
                                backfaceVisibility: 'hidden'
                            });

                            jmScroll._reFlow(function() {
                                jmScroll._scroll();
                            });
                        }
                    },

                    _scroll: function() {
                        top = win.scrollTop();
                        wrapper.css('transform', 'translateY(-' + top + 'px)');
                    },

                    _reFlow: function(callback) {
                        clearTimeout(resizeTimeout);
                        resizeTimeout = setTimeout(function() {
                            target.height(wrapper.height());

                            var getType = {};
                            var isCallback = callback && getType.toString.call(callback) === '[object Function]';

                            if(isCallback) {
                                callback();
                            }
                        }, 200);
                    }
                };

        startMomentumScroll();

        function startMomentumScroll(){
            if (typeof window.ontouchstart == 'undefined') {
                win.on({
                    scroll: function () {
                        jmScroll._scroll();
                    }
                    , resize: function() {
                        jmScroll._reFlow();
                    }
                    , load: function() {
                        jmScroll._init();
                    }
                });
            }
        }        
    }  

    // Like
    $(".panel-like").on("click", function(){
        $(this).next().toggleClass("open");
    });  
    
    
}(jQuery));


// Single Full Scroll
;
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
        var k;
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = +fromIndex || 0;

        if (Math.abs(n) === Infinity) {
            n = 0;
        }
        if (n >= len) {
            return -1;
        }
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        while (k < len) {
            if (k in O && O[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };
};

(function($, window) {

    $.fn.singlefull = function(options) {

        var opts = $.extend({}, $.fn.singlefull.defaults, options);

        var sectionList = []; 
        $("[" + opts.section + "]").each(function(index, elem) {
            sectionList.push($(this).attr(opts.section));
        });

        var currentIndex = 0; 
        var isAnimating = false; 


        $(document).on("mousewheel DOMMouseScroll MozMousePixelScroll", scrollPage);

        if (opts.keyboard) {

            $(document).on("keydown", function(event) {
                var code = event.keyCode;
                if (code == 38 || code == 40) {
                    var sectionListLength = sectionList.length;
                    var nextIndex = (code == 38) ? ((sectionListLength + currentIndex - 1) % sectionListLength) : ((sectionListLength + currentIndex + 1) % sectionListLength);
                    goToSection(sectionList[nextIndex], opts);
                }

            });
        }

        if (!opts.navigation) {
            $('#fp-nav').css('display', 'none');
        } else {
            $('#fp-nav').addClass(opts.navigationPosition);
        }


        return this.each(function() {

            // Get the instance
            var element = $(this);

            // Resize the "data-target" divs
            changeCSS(element);
            // Resize all the "data-img='true'" images
            changeIMG(opts);

            // Bind the methods changeCSS and changeIMG to the resize window event
            $(window).on("resize", function() {
                changeCSS(element);
                changeIMG(opts);
            });


            $('[' + opts.anchor + ']').bind("click", function(event) {
                event.preventDefault();
                var target = $(this).attr(opts.anchor);
                var targetIndex = sectionList.indexOf(target);
                goToSection(sectionList[targetIndex], opts);
            });



        });

        // function to handle mousewheel event
        function scrollPage(event) {
            
            event.preventDefault();
            var sectionListLength = sectionList.length;
            var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
            var nextIndex = delta > 0 ?
                ((sectionListLength + currentIndex - 1) % sectionListLength) :
                ((sectionListLength + currentIndex + 1) % sectionListLength);

            var isCanScroll = opts.loopScroll;
            if (currentIndex == 0 && nextIndex == sectionListLength - 1) {
                isCanScroll = isCanScroll && opts.loopTop;
            }

            if (nextIndex == 0 && currentIndex == sectionListLength - 1) {
                isCanScroll = isCanScroll && opts.loopBottom;
            }
            if (isCanScroll) {
                goToSection(sectionList[nextIndex], opts);
            }
        }


        // function to scroll the page to a section
        function goToSection(secName, opts) {
            // get the position of the target
            var targetPosition = $('[' + opts.section + '="' + secName + '"]').position().top;
            if (!isAnimating) {
                isAnimating = true;
                currentIndex = sectionList.indexOf(secName);
                changeAnchorClass();

                // jQuery Easing animation
                $("html,body").animate({
                    scrollTop: targetPosition
                }, {
                    duration: opts.scrollingSpeed,
                    easing: opts.easing,
                    
                    complete: function() {
                        isAnimating = false; 

                        
                    }
                });
            }
        }


        function changeAnchorClass() {
            if ($('[' + opts.anchor + ']').length) {
                $('[' + opts.anchor + ']').removeClass('active');
                $('[' + opts.anchor + '= "' + sectionList[currentIndex] + '"]').addClass('active');
            }
        }


        // function to resize all the "data-target" divs
        function changeCSS(element) {

            // Grab the screen resolution
            var windowWidth = "100%";
            var windowHeight = $(window).height();
            // Count how many targets the div has
            var targetsSize = $("[" + opts.section + "]").length;

            // Resize the parent div
            $(element).css({
                "width": windowWidth,
                "height": windowHeight * targetsSize
            });

            // Resize all the targets div
            $(element).children("div[" + opts.section + "]").each(function() {
                $(this).css({
                    "width": windowWidth,
                    "height": windowHeight
                });
            });
        }

        // function to resize the images
        function changeIMG(opts) {
            // Grab the screen resolution
            windowWidth = $(window).width();
            $("img[data-img='true']").each(function(index, element) {
                src = $(element).attr('src');
                imgName = "";
                imgFinal = "";
                imgSplit = {};
                imagePrefix = checkResolution(windowWidth, opts);
                if (src.match("/")) { // Match if there's a full URL at the IMG src and cut it
                    re = new RegExp(".*\/(.*)$");
                    m = re.exec(src);
                    imgName = m[1];
                } else {
                    // Just the img without an URL
                    imgName = src;
                }
                if (imgName.match(/\-\w+/)) {
                    src = src.replace(/\-\w+/, imagePrefix);
                } else {
                    // Split the name of the extension
                    imgSplit = imgName.split('.');
                    // Replace the name with the image prefix
                    imgFinal = imgSplit[0] + imagePrefix + '.' + imgSplit[1];
                    src = src.replace(imgName, imgFinal);
                }
                // Replace the image
                $(element).attr('src', src);
            });

        }

        // function to check the resolution and return the prefix for the image
        function checkResolution(windowWidth, opts) {

            if (windowWidth <= 480) {
                return opts.sufixes.smallest;
            }

            if (windowWidth > 480 && windowWidth <= 767) {
                return opts.sufixes.small;
            }

            if (windowWidth > 767 && windowWidth <= 979) {
                return opts.sufixes.medium;
            }

            if (windowWidth > 979) {
                return opts.sufixes.normal;
            }

        }

    };

    // Plugin defaults
    $.fn.singlefull.defaults = {
        scrollingSpeed: 1000,
        easing: "easeOutExpo",
        section: 'data-target',
        anchor: 'data-anchor',

        // ************  Scrolling  **********//
        keyboard: true, 
        loopScroll: true,  
        loopTop: true, 
        loopBottom: true, 

        // ************  Navigation  **********//
        navigation: true, 
        navigationPosition: 'right', 

        sufixes: {
            smallest: "-smallest",
            small: "-small",
            medium: "-medium",
            normal: "" // Leave blank for no prefix
        }
    };
})(jQuery, window);



