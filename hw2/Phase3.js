/*  Joseph Boothby
    CS 320
    Homework #2
    23 September 2020
 */

//create class for describing objects of type Menu Item
class MenuItem{
    constructor(name, ingredients, price) {
        this.name = name;
        this.ingredients = ingredients;
        this.price = price;
    }
}

/*Create class that allows for manipulation of MenuItems including
addMenuItem() to add a MenuItem to the menu
findMenuItem(ingredient) will find all menu items with the associated ingredient
 */
class Menu{

    //constructor method just creates the itemList array
    constructor(){
        //class variable that holds the Menu Items
        this.itemList = [];
    }

    //add Menu Items to the Menu Item List array
    addMenuItem( item ){
        this.itemList.push(item);
    }

    //method that returns an array of MenuItems that contain ingredient supplied by the parameter
    findMenuItem( ingredient ){

        //init empty return array to hold menu items that contained specified ingredient
        this.returnList = [];

        //iterate over each Menu Item in the Menu
        for(let i = 0; i < this.itemList.length ; i++){
            //iterate over the ingredients in each Menu Item
            this.itemList[i].ingredients.forEach(check => {
                //if the item being checked matches the ingredient, push the menu item onto the return array
                if( check === ingredient){
                    this.returnList.push( this.itemList[i]);
                }
            });
        }

        return(this.returnList);

    }
}

/* This class just defines a pizza. It takes a menu item and adds the size and crust*/
class Pizza{

    constructor(menuItem, size, crust){
        this.item = menuItem;
        this.size = size;
        this.crust = crust;
    }
}

/* this class groups pizzas into an array and then checks the cost of the completed order*/
class Order{

    constructor(){
        //init empty array to hold list of pizzas
        this.itemList = [];
    }

    //add the pizza onto the itemList array
    addPizza( pizza ){
        this.itemList.push(pizza);
    }

    checkCost(){

        //initialize a cost counter
        this.cost = 0;

        //iterate through each item in the itemList
        for( let i = 0; i < this.itemList.length; i++){
            //increment the cost by the amount associated with the size of the item in the MenuItem's price dictionary
            this.cost += this.itemList[i].item.price[this.itemList[i].size];
        }

        return(this.cost);

    }
}

//inventory class keeps track of how many servings of each ingredient using a dictionary
class Inventory{
    constructor(){
        this.ingredientDict = {};
    }

    addIngredient(name, servings){
        this.ingredientDict[name] = servings;
    }
}

//store class checks to see if there is enough ingredients in the inventory to make a pizza
class Store{

    //constructor takes an instance of inventory and uses it to create a local variable called this.inventory
    constructor(inv){
        this.inventory = inv;
    }
    //checks to see if there are enough ingredients in the inventory to make the supplied pizza
    //It will decrement the amount of available ingredients if the pizza can be made because it assumes the pizza is made
    haveEnough(pizza){

        //init a flag. this flag is true if pizza can be made, or false if it can't
        this.flag = true;

        //switch statement determines the multiplier to apply to each ingredient based on the size of the pizza
        switch(pizza.size){
            case 'small':
                this.multiplier = 1;
                break;
            case 'medium':
                this.multiplier = 2;
                break;
            case 'large':
                this.multiplier = 3;
                break;
            default:
                console.log('The pizza size is not correct. Please choose: small, medium, large');
        }

        //iterate over each ingredient in the pizza
        pizza.item.ingredients.forEach( check => {
            //check to see if the ingredient needed for the pizza exists in the inventory in an amount equal to the size multiplier
            if( this.inventory.ingredientDict[check] < this.multiplier){
                //if there is not enough in the inventory, return false
                console.log('Not enough ingredients to make', pizza.size, pizza.item.name, 'pizza');
                this.flag = false;
            }
            //if there is enough ingredients to make the pizza, decrement the amount of ingredients and make the pizza
            else{
            this.inventory.ingredientDict[check] -= this.multiplier;
            }

        });

        //return the flag. should be true if the pizza was made, and false if it was not
        return (this.flag);
    }
    //method attempts to fill an order with as many pizzas as possible
    placeOrder(order) {
        //init empty return list
        this.returnList = [];
        //iterate over each pizza in the order
        for( let i = 0; i < order.itemList.length; i++){
            //console.log(order.itemList[i]);
            //if the store has enough ingredients to make the pizza
            if( this.haveEnough(order.itemList[i])){
                //console.log(order.itemList[i]);
                this.returnList.push(order.itemList[i]);
            }
        }
        return( this.returnList );
    }
}

//create instances of Menu Item for each pizza type
let regina = new MenuItem('Regina', ['beef ham', 'mushroom'], {'small': 650, 'medium': 850, 'large': 1050});
let hawaiian = new MenuItem( 'Hawaiian', ['beef ham', 'pineapple'],{'small': 650, 'medium': 850, 'large': 1050});
let veggie = new MenuItem( 'Veggie', ['red onion', 'mixed pepper', 'mushroom', 'black olive', 'fresh tomato'], {'small': 750, 'medium': 950, 'large': 1150});
let zpp = new MenuItem( 'Zzesty Pepperoni Passion', ['pepperoni', 'red chili'],{'small': 750, 'medium': 950, 'large': 1150});
let chickenBali = new MenuItem( 'Chicken Bali', ['grilled chicken', 'pineapple', 'mushroom', 'red chili'], {'small': 750, 'medium': 950, 'large': 1150});
let bbqChicken = new MenuItem ('BBQ Chicken', ['grilled chicken', 'red onions', 'sweet corn', 'bbq sauce'], {'small': 950, 'medium': 1150, 'large': 1350});

//create instance of menu
let menu = new Menu();

//add each pizza to the menu
menu.addMenuItem(regina);
menu.addMenuItem(veggie);
menu.addMenuItem(hawaiian);
menu.addMenuItem(zpp);
menu.addMenuItem(bbqChicken);
menu.addMenuItem(chickenBali);

//create instances of Pizza for each menu item
let regPizza = new Pizza( regina, 'small', 'thin crust' );
let vegPizza = new Pizza( veggie, 'large', 'hand tossed');

//create an instance or order to hold this order
let order1 = new Order();

//add each pizza to the order
order1.addPizza(regPizza);
order1.addPizza(vegPizza);

//populate the inventory dictionary
let inventory = new Inventory();
inventory.addIngredient('pineapple', 20);
inventory.addIngredient('beef ham', 20);
inventory.addIngredient('red onion', 20);
inventory.addIngredient('mushroom', 1);
inventory.addIngredient('mixed pepper', 20);
inventory.addIngredient('black olive', 20);
inventory.addIngredient('fresh tomato', 20);
inventory.addIngredient('pepperoni', 20);
inventory.addIngredient('red chili', 20);
inventory.addIngredient('grilled chicken', 20);
inventory.addIngredient('sweet corn', 20);

//crate instance of store and using the inventory from above
let store = new Store( inventory);

//attempt to place the order and print the call to the console
console.log(store.placeOrder(order1));