// jQuery plugin to enable dropdown component to work
// --------------------------------------------------
(function($){
	var DROPDOWN_TOGGLE = "[data-toggle=dropdown]";

	/**
	 * Open the dropdown if toggled been click
	 * @param  {[Event]} e:click event
	 * @context {[this]} element match '[data-toggle=dropdown]' selector
	 */
	function toggle(e) {
		var $toggle = $(this),
			$dropdown = getDropdown($toggle),
			isOpen = $dropdown.hasClass("open");

		// clear all opened dropdown before open the new one
		clearDropdown();

		if (isOpen) {
			return false;
		}

		if (e.isDefaultPrevented()) {
			return;
		}

		$dropdown.toggleClass("open");
		$toggle.focus();
		return false;
	}

	/**
	 * Clear all opened dropdown on DOM to achieve singleton
	 * @param  {[Event]} e:click event
	 * @return {[type]}   [description]
	 */
	function clearDropdown(e) {
		$(DROPDOWN_TOGGLE).each(function() {
			var $toggle = $(this),
				$dropdown = getDropdown($toggle),
				isOpen = $dropdown.hasClass("open");

			if (e && e.isDefaultPrevented()) {
				return;
			}

			if (isOpen) {
				$dropdown.removeClass("open");
			}

		});
	}

	/**
	 * Helper method to get dropdown wrapper with given $toggle object
	 * @param  {[$ object]} $toggle, $object matches '[data-toggle=dropdown]'
	 */
	function getDropdown($toggle) {
		return $($toggle.attr("data-target")).length ?
					$($toggle.attr("data-target")).eq(0) :
					$toggle.closest(".dropdown");
	}

	$(document)
		.on("click.bone.dropdown", clearDropdown)
		.on("click.bone.dropdown", DROPDOWN_TOGGLE, toggle);

}(jQuery));