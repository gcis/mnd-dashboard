angular.module("mnd.dashboard", ["mnd.multi-transclude"])

.directive("mndSidebar", function () {
	return {
		restrict: "EA",
		templateUrl: "template/sidebar.html",
		transclude: true,
		scope: {
			menu: "="
		},
		link: function ($scope) {
			$scope.isSubmenu = function (item) {
				return item.type === "submenu";
			};
			$scope.toggleSubmenu = function (item) {
				if (item.type === "submenu") {
					item.open = !item.open;
				}
			};
		}
	};
})

.directive("mndToggleSidebar", function () {
	return {
		restrict: "EA",
		templateUrl: "template/toggle-sidebar.html",
		scope: {},
		link: function ($scope) {
			$scope.toggle = function () {
				var gebi = document.getElementById;
				var sidebar = angular.element(gebi("mnd-sidebar"));
				var toggle  = angular.element(gebi("mnd-toggle-sidebar"));
				var content = angular.element(gebi("mnd-content"));
				if (sidebar.hasClass("show-sidebar")) {
					sidebar.removeClass("show-sidebar");
					toggle.removeClass("show-sidebar");
					content.removeClass("show-sidebar");
				} else {
					sidebar.addClass("show-sidebar");
					toggle.addClass("show-sidebar");
					content.addClass("show-sidebar");
				}
			};
		}
	};
})

.directive("mndContent", function () {
	return {
		restrict: "EA",
		templateUrl: "template/content.html",
		transclude: true
	};
});
