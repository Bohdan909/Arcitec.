document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '');

(function($){

    $(document).ready(function(){

        $("html,body").animate({scrollTop: 0}, 50);    

        var $btnMenu  = document.querySelector(".btn-menu");
        var $menu     = document.querySelector(".menu");
        var $menuExt  = document.querySelector(".menu-ext");
        var $html     = document.querySelector("html");
        var $body     = document.querySelector("body");


        // HEADER
        (function(){

            // Skip Video    
            var $skip = document.querySelector(".skip");

            $skip.addEventListener("click", () => {

                document.querySelector(".header-mask").classList.add("return"); 

                setTimeout( () => { 
                    menu.addScroll();
                    //startMomentumScroll(); 
                }, 2000);

                menu.close();
            });

            // Menu    
            var menu = {
                scroll: false,

                open: function(){

                    if ($body.className.match(/\bscroll\b/)) this.scroll = true;

                    $("html, body").animate({scrollTop: 0}, 100);
                    $html.classList.add("menu-open");
                    this.remScroll()
                },

                close: function(){
                    
                    if ($html.className.match(/\bmenu-ext-open\b/)){
                        textToggle($btnExt);
                        this.closeExt();

                        setTimeout( () => {
                            this.remClassMenuOpen();
                        }, 1100);

                    } else {
                        this.remClassMenuOpen();
                    }

                    if (this.scroll) setTimeout( () => { this.addScroll() }, 1200);

                },

                openExt: function(){
                    $html.classList.add("menu-ext-open");
                    $html.classList.remove("menu-ext-close");
                    
                    setTimeout(
                        () => {
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

                    setTimeout( () => {
                        $html.classList.remove("menu-ext-open");
                    }, 500);

                },

                remClassMenuOpen: function(){
                    $html.classList.remove("menu-open");
                },

                remScroll: function(){
                    $body.classList.remove("scroll");
                },

                addScroll: function(){
                    $body.classList.add("scroll");
                }
            }


            $btnMenu.addEventListener("click", () => {
                ($html.className.match(/\bmenu-open\b/)) ? menu.close() : menu.open()
            });


            // Menu Extend    
            var $btnExt = document.getElementById("btn-feedback");

            $btnExt.addEventListener("click", function(){

                textToggle(this);

                ($html.className.match(/\bmenu-ext-open\b/)) ? menu.closeExt() : menu.openExt()
            });

            function textToggle(btn){
                var textBtnCont = btn.querySelector("i");
                var textBtn     = textBtnCont.innerHTML; 
                var textClose   = textBtnCont.getAttribute("data-close-text");

                textBtnCont.innerHTML = textClose;
                textBtnCont.setAttribute("data-close-text", textBtn);
            }

            // Lines
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
 
        }());


        // Placeholder Hide
        $("input, textarea").focus(function(){
           $(this).data("placeholder",$(this).attr("placeholder")).attr("placeholder","");
        }).blur(function(){
           $(this).attr("placeholder",$(this).data("placeholder"));
        });

        


        windowSize();   
        $(window).resize(windowSize); 
        
    });


    var cachedWidth = window.innerWidth;

    function windowSize(){
        var winWidth = window.innerWidth,
            docWidth = $(document).width();

        // Resize Mobile
        if (winWidth !== cachedWidth){
            

            cachedWidth = winWidth;
        }   

        // Mobile Viewport
        if (winWidth >= 767){
            $("").attr("style", "");
        } 
            
    };

    // forEach for IE
    (function(){
        if ( typeof NodeList.prototype.forEach === "function" ) return false;
        NodeList.prototype.forEach = Array.prototype.forEach;
    }());

    // Scroll
    var win = $(window)
            , target = $('body')
            , wrapper = target.find('> div')
            , easing = "ease-out" //css easing
            , duration = "0.8s" //duration ms(millisecond) or s(second)
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

    //startMomentumScroll();

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
            
    
    
}(jQuery))
