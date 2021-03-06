app.config(function($stateProvider){

	$stateProvider.state('productList', {
		url: '/admin/products',
		controller: 'ProductListCtrl',
		templateUrl: 'js/admin/products/products.html',
		resolve: {
			products: function(ProductsFactory){
				return ProductsFactory.fetchAll();
			},
			fields: function(ProductsFactory){
				return ProductsFactory.fetchFields();
			}
		}
	});

	$stateProvider.state('productHistory', {
		url: '/admin/products/:origId/history',
		controller: 'HistoryCtrl',
		templateUrl: 'js/admin/history/history.html',
		resolve: {
			history: function(ProductsFactory, $stateParams){
				return ProductsFactory.fetchHistory($stateParams.origId);
			},
			fields: function(ProductsFactory){
				return ProductsFactory.fetchFields();
			},
			origId: function($stateParams) {
				return $stateParams.origId
			},
			model: function() {
				return "Product"
			}
		}
	});
});

	
app.controller('ProductListCtrl', function($scope, products, ProductsFactory, fields, $state){
	
	$scope.products = products.map(function(product) {
		var filteredProduct = {};
		fields.forEach(function(field) {
			if(typeof product[field] !== 'object') {
				filteredProduct[field] = product[field];
				if(field === 'averageStars')
					filteredProduct[field] = Math.round(filteredProduct[field]*10)/10;
			}
		});
		return filteredProduct;
	});

	$scope.goToProduct = function(index) {
		console.log("going to index", index);
		if(index == -1)
		 	return $state.go('adminProduct', {id: "NEW"});
		$state.go('adminProduct', {id: products[index]._id});
	}

});


