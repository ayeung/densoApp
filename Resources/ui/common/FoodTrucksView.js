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
		{title:'RoliRoti', hasChild:true, color: '#000'}
	];

	var table = Ti.UI.createTableView({
		data:tableData
	});
	self.add(table);
	
	//add behavior
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			name:e.rowData.title,
		});
	});
	
	return self;
};

module.exports = FoodTrucksView;