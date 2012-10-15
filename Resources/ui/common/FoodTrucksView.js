//Master View Component Constructor
function FoodTrucksView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	//some dummy data for our table view
	var tableData = [
		{title:'MogoBBQ', hasChild:true, color: '#000'},
		{title:'chairmantruck', hasChild:true, color: '#000'},
		{title:'CurryUpNow', hasChild:true, color: '#000'},
		{title:'seoulonwheels', hasChild:true, color: '#000'},
		{title:'chowdermobile', hasChild:true, color: '#000'},
		{title:'cremebruleecart', hasChild:true, color: '#000'},
		{title:'magiccurrykart', hasChild:true, color: '#000'},
		{title:'AmuseBoucheSF', hasChild:true, color: '#000'},
		{title:'whatthepho ', hasChild:true, color: '#000'},
		{title:'urbanectar', hasChild:true, color: '#000'},
		{title:'chezspencergo', hasChild:true, color: '#000'},
		{title:'cookiewagsf', hasChild:true, color: '#000'},
		{title:'tamalelady', hasChild:true, color: '#000'},
		{title:'leftcoastsmoke', hasChild:true, color: '#000'},
		{title:'streetfoodsf', hasChild:true, color: '#000'},
		{title:'RoliRoti', hasChild:true, color: '#000'},
		{title:'Add Food Truck', hasChild:true, color: '#000'}

	];

	var table = Ti.UI.createTableView({
		data:tableData
	});
	self.add(table);
	
	//add behavior
	table.addEventListener('click', function(e) {
		if (e.index && e.index === (table.data[0].rowCount -1)) {
			addFoodTruck(table);
		} else {
			self.fireEvent('itemSelected', {
				name : e.rowData.title,
			});
		}
	});
	
	return self;
};

function addFoodTruck(tableview) {
	var addWindow = Ti.UI.createWindow({
		modal: true,
		layout: 'vertical',
		title: 'Add food truck'
	});

	var foodTruckLabel = Ti.UI.createLabel({
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		color : 'white',
		text : 'Please enter the Twitter ID if the food truck'
	}); 

	var textField = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		top : 30,
		width : 250,
		height : 60
	});

	var buttonView = Ti.UI.createView({
		top : 30,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		layout : 'horizontal'
	});

	var addButton = Ti.UI.createButton({
		title : "Add",
		left : 50
	});
	var cancelButton = Ti.UI.createButton({
		title : "Cancel"
	});

	buttonView.add(cancelButton);
	buttonView.add(addButton);

	cancelButton.addEventListener('click', function() {
		addWindow.close();
	}); 

	addButton.addEventListener('click', function() {
		var xhr = Ti.Network.createHTTPClient();

		xhr.timeout = 1000000;
		xhr.open("GET", "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + textField.value);
		xhr.onload = function(e) {
			if (!foodTruckExists(tableview, textField.value)) {
				var row = Ti.UI.createTableViewRow({
					title : textField.value,
					hasChild : true,
					color : '#000'
				});
				tableview.insertRowBefore(tableview.data[0].rowCount - 1, row);
				addWindow.close();
			} else {
				alert('The food truck ' + textField.value + ' has already been added.');
			}
		};
		xhr.onerror = function() {
			alert("Invalid twitter id: " + textField.value);
		};
		xhr.send(); 
	}); 

	addWindow.add(foodTruckLabel);
	addWindow.add(textField);
	addWindow.add(buttonView);

	addWindow.open();

}

function foodTruckExists(tableview, name) {
	var rows = tableview.data[0].rows,
		i;
	for( i = 0; i < rows.length; ++i) {
		if (rows[i].title === name) {
			return true;
		}
	}
	return false;
}

module.exports = FoodTrucksView;