window.addEventListener("load", function(){

	$(document).on("mousewheel DOMMouseScroll MozMousePixelScroll", scrollPage);

	function scrollPage(event) {

		var sectionHeight;
		var section = document.querySelector(".section");
            
        event.preventDefault();

		if (event.originalEvent.wheelDelta >= 0) {
		    console.log('Scroll up');

		    sectionHeight = section.innerHeight;

		    window.scrollTo(0, sectionHeight);

		} else {
		    console.log('Scroll down');

		    sectionHeight = section.innerHeight;

		    window.scrollTo(0, sectionHeight);
		}


            // var sectionListLength = sectionList.length;
            // var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
            // var nextIndex = delta > 0 ?
            //     ((sectionListLength + currentIndex - 1) % sectionListLength) :
            //     ((sectionListLength + currentIndex + 1) % sectionListLength);

            // var isCanScroll = opts.loopScroll;

            // if (currentIndex == 0 && nextIndex == sectionListLength - 1) {
            //     isCanScroll = isCanScroll && opts.loopTop;
            // }

            // if (nextIndex == 0 && currentIndex == sectionListLength - 1) {
            //     isCanScroll = isCanScroll && opts.loopBottom;
            // }
            // if (isCanScroll) {
            //     goToSection(sectionList[nextIndex], opts);
            // }
       }
});