var app = angular.module("countdown", ['ngRoute','firebase']);
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/',{
    controller: 'homeController' ,
    templateUrl: 'views/home.html'
  }).when('/store',{
    controller: 'storeController',
    templateUrl: 'views/store.html'
  }).when('/store', {
        controller: 'storeController',
        templateUrl: 'views/store.html'        
}).when('/products/:productdetail', {
        controller: 'storeController',
        templateUrl: 'views/product.html'
        
}).when('/cart', {
        controller: 'storeController',
        templateUrl: 'views/shoppingCart.html'        
});        
}]);

//home page controller
app.controller('homeController', ['$scope', '$firebase', function($scope, $firebase){
	//store firebase database URL
	var url = "https://cntdown.firebaseio.com/users";
	//open connection
	var ref = new Firebase(url);

	//passes connection to angular fire
	//you have to specificly tell it is an array, or an object
	$scope.users = $firebase(ref).$asArray
    
//CRUD Functions for articles
  var url1 = 'https://cntdown.firebaseio.com/posts';
  var ref1 = new Firebase(url1);

  $scope.posts = $firebase(ref1).$asArray();

  $scope.addPost1 = function()
   {
      $scope.posts.$add($scope.newPost1);
		//new post
      $scope.newPost1 = {};
      
  }
  var url3 = 'https://cntdown.firebaseio.com/donc';
  var ref3 = new Firebase(url3);

  $scope.donc = $firebase(ref3).$asArray();

  $scope.addPost2 = function()
    {
      $scope.donc.$add($scope.newPost2);
      $scope.newPost2 = {};
  }

  var url4 = 'https://cntdown.firebaseio.com/release';
  var ref4 = new Firebase(url4);

  $scope.release = $firebase(ref4).$asArray();

  $scope.addPost3 = function()
  {
			//add function
      $scope.release.$add($scope.newPost3);
		$scope.newPost3 = {};
      
  }
  	//Chat Functions
	var url4 = "https://cntdown.firebaseio.com/messages";
	//open connection
	var ref4 = new Firebase(url4); 
	//you have to specificly tell it is an array, or an object
	$scope.messages = $firebase(ref4).$asArray();

	//send message function in chatroom
	$scope.sendMessage = function(){
        //if twitter username is defined
		if($scope.user.twitter.username && $scope.user.twitter.username != " " || $scope.user.twitter.username != undefined){
            //make twitter user name show 
			$scope.newMessage.author = "@"+ $scope.user.twitter.username;
			//add message to database
			$scope.messages.$add($scope.newMessage);
		}else{
			//if no user twitter name make them defult name of kick master
			$scope.newMessage.author = "Kick Master";
			//add message to datbase
			$scope.messages.$add($scope.newMessage);
		}
		//empty message inputs
		$scope.newMessage = {};
	} 
}]);

//app.run controls the twitter login functionallity
//got from clas demo
app.run(['$rootScope', '$firebase', '$firebaseAuth',function ($rootScope, $firebase, $firebaseAuth) {
	
    //store URL in variable
 	var url = "https://cntdown.firebaseio.com";
 	//new reference variable, passing url in
 	var ref = new Firebase(url);
 	//new auth object created with reference
 	$rootScope.authObj = $firebaseAuth(ref);
 	$rootScope.authObj.$onAuth(function(data){
 		//console log login data
    	 console.log('data',data);

    	//if the data exists
    	if(data){
			var url2 = 'https://cntdown.firebaseio.com/users/'+data.uid;
			var ref2 = new Firebase(url2);
			//put user in object
			$rootScope.user = data;
			
            //put varaible in scop
			$rootScope.userloggedin.username = $rootScope.user.twitter.username;
            //console.log($rootScope.userloggedin.username);
            //console.log($rootScope.user.twitter.username);
			$rootScope.users = $firebase(ref2).$asArray();
			$rootScope.users.$add($rootScope.user.twitter.username);
    	}
  	});
}]);
  //controoler for cop or drop section
app.controller('copDrop',['$scope', "$firebase", function($scope, $firebase){
    //functions for polls on cop or drop section 
    	$scope.coppoll1 = function(){
        //firebase url 
		var url = "https://cntdown.firebaseio.com/peral4s";
 		//new reference variable, passing url in
 		var ref = new Firebase(url);
 		//connected to database
		$scope.copDrop1 = $firebase(ref).$asArray();
		//console log result
		console.log($scope.poll1.result);
		//add pick to database
		$scope.copDrop1.$add($scope.poll1);
	}
        
    	$scope.coppoll2 = function(){
        //firebase url 
		var url1 = "https://cntdown.firebaseio.com/aj5tiffany";
 		//new reference variable, passing url in
 		var ref1 = new Firebase(url1);
 		//connected to database
		$scope.copDrop2 = $firebase(ref1).$asArray();
		//console log result
		console.log($scope.poll2.result);
		//add pick to database
		$scope.copDrop2.$add($scope.poll2);
	}
       
        
    $scope.coppoll3 = function(){
        //firebase url 
		var url2 = "https://cntdown.firebaseio.com/elime";
 		//new reference variable, passing url in
 		var ref2 = new Firebase(url2);
 		//connected to database
		$scope.copDrop3 = $firebase(ref2).$asArray();
		//console log result
		console.log($scope.poll3.result);
		//add pick to database
		$scope.copDrop3.$add($scope.poll3);
	}
}]);
/*
the next parts in the js is the shop functinatly using the local storge example form my fwf midterm 
so i added my old midterm then connected to paypal using my tgfc merchent account the product funtcion is all the indivual info about a product. The stor function holds all the indivual products the array holds an image of the product(1st itemin array), the shoe size(2nd item in the array), and the shoe rating(3rd item in array)
www.paypal.com/cgi-bin/webscr?cmd=p/pdn/howto_checkout-outside shows you how to check out using papypal
*/

//function for products in store
function product(detail, name, description, price, size, ovc) {
    this.detail = detail; // product code (detail = stock keeping unit)
    this.name = name;
    this.description = description;
    this.price = price;
    this.size = size;
    this.box = {
         "Overall Condition": ovc
    };
} 

  //function for the store the products array holds all the items in the store
function store() {
    this.products = [
        new product('AF1Mint', 'Nike Mint Air Force One', 'Size 12 Dead Stock Never Been Worn Only Taken Out The Box', 190,12,4),
        new product('AJ1Lace', 'Air Jordan Lace Retro 1', 'Size 7 Extremely Rare With Lace Accents 8/10 Wore Them In The Rain But Nubuck Is Still Falwless', 180,5.5,4),            
        new product('AJ1Melo', 'Air Jordan Melo Retro 1', 'Size 7.5 Dead Stock OG All', 300,9,2),
        new product('AJ3', 'Air Jordan Joker Retro 3', 'Size 6.5 9/10 OG All No Scuffs or Paint Cracks', 240,6.5,3),
        new product('AJ5', 'Air Jordan "Fire Red" Retro 5 ', 'Released 2012 9/10', 190,10,2),
        new product('AJ', 'General', 'Released summer 2011 9/10', 350,6,4),
        new product('AJ7', 'Air Jordan "Olympic" Retro 7 ', 'Released 2012 9/10', 590,7,3),
        new product('AJ8', 'Air Jordan "Bugs Bunny" Retro 8 ', 'Released 2013 9/10', 100,6,3),
        new product('AJ4Cavs', 'Air Jordan Cav Retro 4', 'Size 7 Very Near Dead Stock 10/10 Only Worn Once No Lint Balls Or Paint Cracks', 750,7),
        new product('AJ10', 'Air Jordan "Stealth" Retro 10 ', 'Released 2011 9/10', 90,8,3),
        new product('AJ11', 'Air Jordan "Zen Grey" Retro 11 ', 'Released 2009 9/10', 150,10,4),
        new product('AJ12', 'Air Jordan "Taxi" Retro 12 ', 'Released 2013 9/10', 120,8,3),
        new product('AJ9Olive', 'Air Jordan Olive Rero 9', 'Size 8 Very Near Dead Stock No Flaws OG All 10/10', 870,12,4),
        new product('AJ9Olive', 'Air Jordan Olive Rero 9', 'Size 8 Very Near Dead Stock No Flaws OG All 10/10', 870,10,4),
        new product('AJ9Olive', 'Air Jordan Olive Rero 9', 'Size 8 Very Near Dead Stock No Flaws OG All 10/10', 870,7,3),
        new product('AJ9Olive', 'Air Jordan Olive Rero 9', 'Size 8 Very Near Dead Stock No Flaws OG All 10/10', 870,11,4),
        new product('AJ9Olive', 'Air Jordan Olive Rero 9', 'Size 8 Very Near Dead Stock No Flaws OG All 10/10', 870,9.5,4),
        new product('AJ9Olive', 'Air Jordan Olive Rero 9', 'Size 8 Very Near Dead Stock No Flaws OG All 10/10', 870,7.5,4),
        new product('AJ9Olive', 'Air Jordan Olive Rero 9', 'Size 8 Very Near Dead Stock No Flaws OG All 10/10', 870,8.5,3),
        new product('AJ9Olive', 'Air Jordan Olive Rero 9', 'Size 8 Very Near Dead Stock No Flaws OG All 10/10', 870,10.5,4),
        new product('AJ9Olive', 'Air Jordan Olive Rero 9', 'Size 8 Very Near Dead Stock No Flaws OG All 10/10', 870,6,4)
       
    ];
  
    this.resaleRange = [
        "below 5%",
        "between 5 and 10%",
        "between 10 and 20%",
        "between 20 and 40%",
        "above 40%"
    ];
}
store.prototype.getProduct = function (detail) {
    for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].detail == detail)
            return this.products[i];
    }
    return null;
}
  
// shopping cart
function shoppingCart(cartName) {
    this.cartName = cartName;
    this.clearCart = false;
    this.checkoutParameters = {};
    this.items = [];

    // load items from local storage when initializing
    this.loadItems();

    // save items to local storage when unloading
    var self = this;
    $(window).unload(function () {
        if (self.clearCart) {
            self.clearItems();
        }
        self.saveItems();
        self.clearCart = false;
    });
}

// load items from local storage
shoppingCart.prototype.loadItems = function () {
    var items = localStorage != null ? localStorage[this.cartName + "_items"] : null;
    if (items != null && JSON != null) {
        try {
            var items = JSON.parse(items);
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.detail != null && item.name != null && item.price != null) {
                    item = new cartItem(item.detail, item.name, item.price);
                    this.items.push(item);
                }
            }
        }
        catch (err) {
            // ignore errors while loading...
        }
    }
}

// save items to local storage
shoppingCart.prototype.saveItems = function () {
    if (localStorage != null && JSON != null) {
        localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
    }
}

// adds an item to the cart
shoppingCart.prototype.addItem = function (detail, name, price, quantity) {
    quantity = this.toNumber(quantity);
    if (quantity != 0) {

        // update quantity for existing item
        var found = false;
        for (var i = 0; i < this.items.length && !found; i++) {
            var item = this.items[i];
            if (item.detail == detail) {
                found = true;
                item.quantity = this.toNumber(item.quantity + quantity);
                if (item.quantity <= 0) {
                    this.items.splice(i, 1);
                }
            }
        }

        // new item, add now
        if (!found) {
            var item = new cartItem(detail, name, price, quantity);
            this.items.push(item);
        }

        // save changes
        this.saveItems();
    }
}

// get the total price for all items currently in the cart
shoppingCart.prototype.getTotalPrice = function (detail) {
    var total = 0;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (detail == null || item.detail == detail) {
            total += this.toNumber(item.quantity * item.price);
        }
    }
    return total;
}

// get the total price for all items currently in the cart
shoppingCart.prototype.getTotalCount = function (detail) {
    var count = 0;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (detail == null || item.detail == detail) {
            count += this.toNumber(item.quantity);
        }
    }
    return count;
}

// clear the cart
shoppingCart.prototype.clearItems = function () {
    this.items = [];
    this.saveItems();
}

// define checkout parameters
shoppingCart.prototype.addCheckoutParameters = function (serviceName, merchantID, options) {

    // check parameters
    if (serviceName != "PayPal" && serviceName != "Google") {
        throw "serviceName must be 'PayPal' or 'Google'.";
    }
    if (merchantID == null) {
        throw "A merchantID is required in order to checkout.";
    }

    // save parameters
    this.checkoutParameters[serviceName] = new checkoutParameters(serviceName, merchantID, options);
}

// check out
shoppingCart.prototype.checkout = function (serviceName, clearCart) {

    // select serviceName if we have to
    if (serviceName == null) {
        var p = this.checkoutParameters[Object.keys(this.checkoutParameters)[0]];
        serviceName = p.serviceName;
    }

    // sanity
    if (serviceName == null) {
        throw "Use the 'addCheckoutParameters' method to define at least one checkout service.";
    }

    // go to work
    var parms = this.checkoutParameters[serviceName];
    if (parms == null) {
        throw "Cannot get checkout parameters for '" + serviceName + "'.";
    }
    switch (parms.serviceName) {
        case "PayPal":
            this.checkoutPayPal(parms, clearCart);
            break;
        case "Google":
            this.checkoutGoogle(parms, clearCart);
            break;
        default:
            throw "Unknown checkout service: " + parms.serviceName;
    }
}

// check out using PayPal
shoppingCart.prototype.checkoutPayPal = function (parms, clearCart) {

    // global data
    var data = {
        cmd: "_cart",
        business: parms.merchantID,
        upload: "1",
        rm: "2",
        charset: "utf-8"
    };

    // item data
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        var ctr = i + 1;
        data["item_number_" + ctr] = item.detail;
        data["item_name_" + ctr] = item.name;
        data["quantity_" + ctr] = item.quantity;
        data["amount_" + ctr] = item.price.toFixed(2);
    }

    // build form
    var form = $('<form/></form>');
    form.attr("action", "https://www.paypal.com/cgi-bin/webscr");
    form.attr("method", "POST");
    form.attr("style", "display:none;");
    this.addFormFields(form, data);
    this.addFormFields(form, parms.options);
    $("body").append(form);

    // submit form
    this.clearCart = clearCart == null || clearCart;
    form.submit();
    form.remove();
}

// utility methods
shoppingCart.prototype.addFormFields = function (form, data) {
    if (data != null) {
        $.each(data, function (name, value) {
            if (value != null) {
                var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value);
                form.append(input);
            }
        });
    }
}
shoppingCart.prototype.toNumber = function (value) {
    value = value * 1;
    return isNaN(value) ? 0 : value;
}

// checkout parameters (one per supported payment service)
function checkoutParameters(serviceName, merchantID, options) {
    this.serviceName = serviceName;
    this.merchantID = merchantID;
    this.options = options;
}

// items in the cart
function cartItem(detail, name, price, quantity) {
    this.detail = detail;
    this.name = name;
    this.price = price * 1;
    this.quantity = quantity * 1;
}

//data service for shopping functionlty of app
//a dataservice so that the store and cart is avalible by all views no need to make one for each view
app.factory("DataService",function () {
    // create store
    var myStore = new store();
    // create shopping cart
    var myCart = new shoppingCart("countdown"); 
    //connect to paypal
    myCart.addCheckoutParameters("PayPal", "highfashionentertainment@gmail.com");
    // return data object with store and cart
    return {
        store: myStore,
        cart: myCart
    };
});

//controller for the store gets the store and cart from dataservice 
app.controller('storeController',['$scope','$routeParams','DataService',function($scope,$routeParams, DataService) {
     // get store and cart from service
    $scope.store = DataService.store;
    $scope.cart = DataService.cart;

    // use routing to pick the selected product
    if ($routeParams.productdetail != null) {
        $scope.product = $scope.store.getProduct($routeParams.productdetail);
    }
    
}]);