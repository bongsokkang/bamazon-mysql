var mysql      = require('mysql');
var inquirer = require('inquirer');
require('console.table');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bamazon'
});

connection.connect(function(err){
  if (!err) {
    startApp();
  }
});
 
 function startApp(){
  connection.query('SELECT * FROM products', function (error, results, fields) {
    for (var i = 0; i < results.length; i++){
      console.table(results[i]);
    }
    inquirer.prompt([
    {
    type: "input",
    name: "id",
    message: "What is the id of the product you would like to purchase?",
    validate: function(num) {
                    if (isNaN(num) || num < 1) {
                        return false;
                    } 

                    else {
                        return true;
                    }
                }
    },	
	      {
	        type: "input",
	        name: "units",
	        message: "How many units would you like to purchase?",
	        validate: function(value) {
	          if (isNaN(value) === false) {
	            return true;
	          }
	          return false;
	        }
	      },
    ]).then(function(answer){
    	console.table(answer.id);
    	 connection.query("SELECT * FROM products WHERE ?", { id: answer.id }, function(err, res) {
        console.table(
        	"You chose " +
          res[0].product_name + " in "
         + res[0].department_name + ", priced at $" + res[0].price + "."
         + " There are " + res[0].stock_quantity + " left in stock."
        );
	     
	      
	  })
    	// 	inquirer.prompt([
    	// 	{
    	// 	type: "input",
    	// 	type: "quantity",
    	// 	message: "How many of this item would you like to buy?",
    	// 	validate: function(num) {
     //                if (isNaN(num) || num < 1) {
     //                    return false;
     //                } 

     //                else {
     //                    return true;
     //                }
     //            }
    	// 	}
    	// ])
    		// .then(function(input){
    			
    		// })
   
});
})
}

