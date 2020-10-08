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

//test
console.log('Searching for pineapple...')
console.log(menu.findMenuItem('pineapple'));
