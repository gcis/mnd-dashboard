angular.module("mnd.dashboard", ["ui.bootstrap", "mnd.multi-transclude"])

.factory("MndSidebarService", function () {
	var sidebarOpen = false;
	return {
		getSidebarStatus: function () {
			return sidebarOpen;
		},
		toggleSidebarStatus: function () {
			sidebarOpen = !sidebarOpen;
		}
	};
})

.directive("mndSidebar", function (MndSidebarService) {
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
			$scope.sidebarOpen = MndSidebarService.getSidebarStatus();
			$scope.$on("sidebarStatusChanged", function () {
				$scope.sidebarOpen = MndSidebarService.getSidebarStatus();
			});
		}
	};
})

.directive("mndToggleSidebar", function (MndSidebarService) {
	return {
		restrict: "EA",
		templateUrl: "template/toggle-sidebar.html",
		scope: {},
		link: function ($scope) {
			$scope.sidebarOpen = MndSidebarService.getSidebarStatus();
			$scope.toggle = function () {
				MndSidebarService.toggleSidebarStatus();
				$scope.$parent.$broadcast("sidebarStatusChanged");
			};
			$scope.$on("sidebarStatusChanged", function () {
				$scope.sidebarOpen = MndSidebarService.getSidebarStatus();
			});
		}
	};
})

.directive("mndContent", function (MndSidebarService) {
	return {
		restrict: "EA",
		templateUrl: "template/content.html",
		scope: {},
		transclude: true,
		link: function ($scope) {
			$scope.sidebarOpen = MndSidebarService.getSidebarStatus();
			$scope.$on("sidebarStatusChanged", function () {
				$scope.sidebarOpen = MndSidebarService.getSidebarStatus();
			});
		}
	};
});
