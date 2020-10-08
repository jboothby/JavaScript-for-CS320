/* Joseph Boothby
* 07 October, 2020
* CS320, HW3
* Practice with Functional Programming using the JS Underscore Library
* and a dataset that can be found at:
* https://xinghuizhao.github.io/wsudata/wsudgrs.js
*/

console.log("The number of entries in the data structure is " + wsudgrs.length);

/* Returns the total number of degrees in the data set
* _.pluck first creates a list of all the award properties in the dataset
* _.reduce then adds up each of these award values according to the iteratee function
*/
function totalDegrees( data ){
    //_.reduce sums up the values supplied by _pluck, which is a list of all numbers of awards
    return ( _.reduce( _.pluck( data, "AWARDS"),
            function( memo, awardNum){ //iteratee that defines what to do with each value (num) from the awards
                return ( memo + awardNum );
            }) //the memo is not defined, so the first value in the data is used as the starting point
    );
}

console.log("The total number of degrees obtained is " + totalDegrees(wsudgrs));

/* Returns the percentage of degrees awarded that were PhD's
* _.where first returns a list of all values where Level = "Doctoral", then
* _.pluck returns the number of Awards associated with each value in the list supplied by _.where, then
* _.reduce defines the function that sums up each of the award numbers in the list supplied by _.pluck
* lastly, the total number of Doctoral Degrees is divided by the total number of degrees, and 
* multiplied by 100 to obtain the percentage
*/
function percentagePhD( data ){
    return( (_.reduce(
            _.pluck( _.where( data, {Level: "Doctoral"} ), "AWARDS"),//list for _.reduce
            function( memo, awardNum){ //iteratee for _.reduce
                return( memo + awardNum);
            }) / totalDegrees(data) * 100) //after total number of doctoral is found, divide by total and * 100
    );
}

console.log("The percentage of PhD's is " +  percentagePhD(wsudgrs) + "%");

/* Returns the total number of degrees awarded in a given year
* _.where first return a list of all values where FISCAL_YEAR = yea ( the paramter), then
* _.pluck returns the number of awards for each value supplied by _.where, then
* _.reduce sums up each number supplied by _.pluck. This number is then returned
*/
function totalDegreesByYear( data, year ){
    return( _.reduce(
            _.pluck( _.where( data, {FISCAL_YEAR: year}), "AWARDS"),// list for _.reduce
            function( memo, awardNum){	//iteratee for _.reduce
                return( memo + awardNum );
            })
    );
}

console.log("The total number of degrees in 2009 was " + totalDegreesByYear( wsudgrs, 2009));

/* Returns a list of all campuses referenced in the dataset
* _.uniq first returns a list of the values containing first occurance of each unique campus, then
* _.pluck pulls the name of the campus out for each value supplied by _.uniq
*/
function listCampuses( data ){
    //the false indicates that the data is not sorted
    return( _.pluck( _.uniq( data, "CAMPUS", false), "CAMPUS"));
}

console.log("The Unique campuses referenced in the data set are " , listCampuses(wsudgrs));

/* Returns an object where the keys are campuses and the values are
* The number of degrees awarded by the campus
* First create an empty object to hold the key/value pairs 
* Next, fill this object with unique campues as keys, and initilize values to 0
* Last, iterate over each peice of data in the set and increment the awards associated with each campus
*/
function listCampusDegrees( data ){
    let returnList = {};
    //first add an entry in the return list for each unique campus
    _.each( listCampuses (data), function (element, index){
        returnList[ element ] = 0; //initialize the value for each key to 0
    });

    //next iterate over all values, and sum the awards by campus, then assign as value in returnList
    _.each( data, function( element, index ){
        returnList[ element.CAMPUS ] += element.AWARDS
    });

    return( returnList );

}

console.log("The amount of awards by campus is ",  listCampusDegrees(wsudgrs));

/*Returns an integer that is the number of degrees earned in the year where the most
* degrees were earned in the data set.
* First: _.uniq creates a list of the first value with each unique year, then
* _.pluck grabs the associated years and creates a list of just the unique years, then
* _.each iterates through each unique year and create an entry in yearList with the year and the awards
* 
* Second: _.findKey returns the key associated with the value that is the highest in the set
* This is the year where the most degrees were awarded.
*/
function maxDegrees( data ){
    let yearList = {};
    //first populate the yearList with each unique year in the data set and it's associated total degrees
    _.each( _.pluck( _.uniq( data, "FISCAL_YEAR", false), "FISCAL_YEAR"), function( element, index){
        yearList[ element ] = totalDegreesByYear( data, element );
    });

    //return the key associated the value that is equal to the max value in the list
    return( _.findKey( yearList, function( value, key ){
        return value === _.max(yearList);
    }));
}

console.log("The year with the most degrees is " + maxDegrees( wsudgrs ));
