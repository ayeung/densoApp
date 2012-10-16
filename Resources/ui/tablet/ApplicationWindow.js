function ApplicationWindow() {
	//declare module dependencies
	var FoodTrucksView = require('ui/common/FoodTrucksView'),
		TwitterFeedWindow = require('ui/common/TwitterFeedWindow');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	//construct UI
	var foodTrucksView = new FoodTrucksView();
			
	//create master view container
	var foodTrucksContainerWindow = Ti.UI.createWindow({
		title:'Food Trucks'
	});
	foodTrucksContainerWindow.add(foodTrucksView);
	
	//create iOS specific NavGroup UI
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:foodTrucksContainerWindow
	});
	self.add(navGroup);
	
	//add behavior for master view
	foodTrucksView.addEventListener('itemSelected', function(e) {
		navGroup.open(new TwitterFeedWindow(e.name));
	});
	
	return self;
};

module.exports = ApplicationWindow;
