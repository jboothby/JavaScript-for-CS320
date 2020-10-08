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

class Pizza{

    constructor(menuItem, size, crust){
        this.item = menuItem;
        this.size = size;
        this.crust = crust;
    }
}

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


//create instances of Menu Item for each pizza type
let regina = new MenuItem('Regina', ['beef ham', 'mushroom'], {'small': 650, 'medium': 850, 'large': 1050});
let hawaiian = new MenuItem( 'Hawaiian', ['beef ham', 'pineapple'],{'small': 650, 'medium': 850, 'large': 1050});
let veggie = new MenuItem( 'Veggie', ['red onion', 'mixed pepper', 'mushroom', 'black olive', 'fresh tomato'], {'small': 750, 'medium': 950, 'large': 1150});
let zpp = new MenuItem( 'Zzesty Pepperoni Passion', ['pepperoni', 'red chili'],{'small': 750, 'medium': 950, 'large': 1150});
let chickenBali = new MenuItem( 'Chicken Bali', ['grilled chicken', 'pineapple', 'mushroom', 'red chili'], {'small': 750, 'medium': 950, 'large': 1150});
let bbqChicken = new MenuItem ('BBQ Chicken', ['grilled chicken', 'red onions', 'sweet corn', 'bbq sauce'], {'small': 950, 'medium': 1150, 'large': 1350});
let menu = new Menu();

//add each pizza to the menu
menu.addMenuItem(regina);
menu.addMenuItem(veggie);
menu.addMenuItem(hawaiian);
menu.addMenuItem(zpp);
menu.addMenuItem(bbqChicken);
menu.addMenuItem(chickenBali);


//test phase 1
console.log('Searching for pineapple...')
console.log(menu.findMenuItem('pineapple'));


//create instances of Pizza for each menu item
let regPizza = new Pizza( regina, 'small', 'thin crust' );
let vegPizza = new Pizza( veggie, 'large', 'hand tossed');

//create an instance or order to hold this order
let order1 = new Order();

//add each pizza to the order
order1.addPizza(regPizza);
order1.addPizza(vegPizza);

//output the cost of the order (test phase 2)
console.log('The cost of a small Regina and a large Veggie is', order1.checkCost(), 'KES');
