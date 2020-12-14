//NO HTML, ONLY JAVASCRIPT

//create an object and assign it to a variable called 'spinner'

var spinner = (function(){
    var counter = 0;

    function up(){
        return ++counter;
    }

    function down(){
        return --counter;
    }

    return {
        up : up,
        down : down
    }
})();


function spinnerFactory(){
    var counter = 0;

    function up(){
        return ++counter;
    }

    function down(){
        return --counter;
    }

    return {
        up : up,
        down : down
    }
}

var spinner = spinnerFactory();




// up(), down()

spinner.up() // => 1
spinner.up() // => 2
spinner.up() // => 3
spinner.up() // => 4

spinner.down() // => 3
spinner.down() // => 2
spinner.down() // => 1
spinner.down() // => 0
spinner.down() // => -1

/* 
IMPORTANT : there should NO WAY one can influence the outcome of the methods

spinner.counter = 10000
spinner.up() // should not return 10001

window.counter = 10000
spinner.up() // should not return 10001 

*/

//As a constructor function

function Spinner(){
    var counter = 0;

    this.up = function(){
        return ++counter;
    };

    this.down = function(){
        return --counter;
    };
}