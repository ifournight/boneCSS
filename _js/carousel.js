// A jQuery carousel plug-in which intimate Bootstrap-carousel behavior
// -------------------------------------------------------------------
(function($) {
	// Some constants to reuse.
	var CAROUSEL_SELECTOR = ".carousel";
	var INNERS_SELECTOR = ".carousel-inners";
	var ITEM_SELECTOR = ".carousel-inners__item";

	// Carousel object constructor
	// Init and store properties here.
	// Bind initial events handlers with options.
	var Carousel = function(element, options) {
		var that = this;
		// Properties
		// options
		this.options = options;
		// Carousel will automatically cycle or not.
		this.cycle = false;
		// Caoursel cycle animation paused or not.
		this.paused = false;
		// Current selected index
		this.currentIndex = 0;
		// The jQuery $carousel object
		this.$carousel = $(element).hasClass("carousel") ?
							$(element) : $(CAROUSEL_SELECTOR, $(element));
		// item count
		this.items = $(ITEM_SELECTOR, this.$carousel);
		this.itemCount = $(ITEM_SELECTOR, this.$carousel).length;

		// Use attr data-carousel-index to give each item count its correct index
		for (var i = 0, max = this.itemCount; i < max; i++) {
			$(this.items[i]).attr("data-carousel-index", i);
		}

		// ===============
		// Events binding
		// ==============
		$(".carousel-control.prev").on("click.boneCSS.carousel", function(e) {
			e.preventDefault();
			that.prev();
		});

		$(".carousel-control.next").on("click.boneCSS.carousel", function(e) {
			e.preventDefault();
			that.next();
		});
		
	};

	// Navigate to prev
	Carousel.prototype.prev = function() {
		var $current = this.getCurrent();
		var currentIndex = this.getCurrentIndex();
		var prevIndex = currentIndex === 0 ? this.itemCount - 1 : currentIndex - 1;
		this.goToIndex(prevIndex);
	};

	// Navigate to next
	Carousel.prototype.next = function() {
		var $current = this.getCurrent();
		var currentIndex = this.getCurrentIndex();
		var nextIndex = currentIndex === this.itemCount -1 ? 0 : currentIndex + 1;
		this.goToIndex(nextIndex);
	};

	// Core method: navigate to certain index.
	// The navigation will have a horizontal transition animation
	Carousel.prototype.goToIndex = function(goToIndex) {
		var itemCount = this.itemCount;
		var $current = this.getCurrent();
		var currentIndex = this.getCurrentIndex();
		var $goTo = $( ITEM_SELECTOR + "[data-carousel-index=" + goToIndex + "]", this.$carousel);
		// Use pre-written css and transition plugin to do the transition animation
		if (currentIndex < goToIndex) {
			$goTo.addClass("right").addClass("in");
			$goTo[0].offsetWidth; // force reflow
			
			$current.one($.support.transition.end, function() {
				$current.removeClass("in");
			});

			$goTo.removeClass("right");
			$current.addClass("left");
		}	else if (currentIndex > goToIndex) {
			$goTo.addClass("left").addClass("in");
			$goTo[0].offsetWidth; // force reflow

			$current.one($.support.transition.end, function() {
				$current.removeClass("in");
			});

			$goTo.removeClass("left");
			$current.addClass("right");
		}
	};

	Carousel.prototype.getCurrent = function() {
		return this.$current = $(ITEM_SELECTOR + ".in", this.$carousel);
	};

	Carousel.prototype.getCurrentIndex = function() {
		return this.currentIndex = Number(this.$current.attr("data-carousel-index"));
	};

	$.fn.carousel = function(options) {
		this.each(function() {
			var $this = $(this);
			var carousel = $this.data("data.carousel");

			if (!carousel) {
				$this.data("data.carousel", new Carousel(this, options));
			}

			// export methods later
		});
	};

	$(function() {
		$(".carousel").carousel();
	});
}(jQuery));