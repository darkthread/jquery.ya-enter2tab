/*!
 * jQuery Yet Another Enter To Tab plugin
 * Version 0.9
 * @requires jQuery v1.9 or later
 *
 * by Jeffrey Lee, http://blog.darkthread.net/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
(function () {
	function focusPrev(pool) {
		var a = document.activeElement;
		if (!a || pool.index(a) == -1) {
			pool.first().focus();
			return;
		}
		var currIdx = pool.index(a);
		if (currIdx > 0) pool.eq(currIdx - 1).focus();
		else pool.last().focus();
	};
	function focusNext(pool) {
		var a = document.activeElement;
		if (!a || pool.index(a) == -1) {
			pool.first().focus();
			return;
		}
		var currIdx = pool.index(a);
		if (currIdx < pool.length - 1) pool.eq(currIdx + 1).focus();
		else pool.first().focus();
	};
	var INPUT_SELECTOR = "input,select,textarea,button", IGNORE_CSS = "e2t-ignore";
	jQuery.fn.getFocusCandidates = function () {
		return this.find(INPUT_SELECTOR).filter("[tabindex]:not([tabindex=-1])")
			//ignore disabled, readonly or invisible inputs
			.filter(":not([disabled]):not([readonly]):visible")
            //ignore input not joining enter to tab
            .filter(":not(." + IGNORE_CSS + ")")
			//order by tabindex
			.sort(function (a, b) { return a.tabIndex > b.tabIndex ? 1 : -1; });
	};
	function hideTabIndex($container) {
		$container.find(INPUT_SELECTOR).filter("[tabindex]").each(function () {
			var $elem = $(this), tabIdx = $elem.attr("tabindex");
			if (tabIdx == "-1") return;
			$elem.attr("data-tab-index", tabIdx).attr("tabindex", -1);
		});
	};
	function restoreTabIndex($container) {
		$container.find(INPUT_SELECTOR).filter("[data-tab-index]").each(function () {
			var $elem = $(this), storedTabIndex = $elem.attr("data-tab-index");
			$elem.attr("tabindex", storedTabIndex).removeAttr("data-tab-index");
		});
	};

	var CONTAINER_CSS = "e2t-container", ACTIVE_CSS = "e2t-active";
	jQuery.fn.enableEnterToTab = function () {
		return this.each(function () {
			var $container = $(this);
			$container.addClass(CONTAINER_CSS)
            .on("keydown", "[tabindex]:not(textarea,.e2t-ignore,.e2t-keyoff)", function (e) {
            	if (e.which == 13) {
            		e.preventDefault();
            		focusNext($container.getFocusCandidates());
            	}
            })
            .on("click", function () {
            	var $container = $(this).closest("." + CONTAINER_CSS);
            	if ($container.hasClass(ACTIVE_CSS)) return;
            	hideTabIndex($("." + CONTAINER_CSS).not(this).removeClass(ACTIVE_CSS).filter(":visible"));
            	restoreTabIndex($container.addClass(ACTIVE_CSS));
            });
		});
	};

})(jQuery);