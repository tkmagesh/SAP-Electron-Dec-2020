function memoize(fn){
    var cache = {};
    return function(){ 
        var key = JSON.stringify(arguments);
        if (!cache.hasOwnProperty(key))
            cache[key] = fn.apply(this, arguments);
        return cache[key];
    }
}

var add = memoize(function(x,y){
    console.log('processing ', x , ' and ', y);
    return x + y;
})

add(10,20) // => 30
add(10,'20') // => 30
add(10,'abc') // => 10
add([10,20], [30,40]) // => 100
add([10,20], [30,'40']) // => 100
add([10,20], [30,'abc']) // => 60
add([10,20], [30,['40',50]]) // => 150
add(function(){ return [10,20]; }, function(){ return [30,['40',50]]; }) // => 150
add([function(){ return [10,20]; }, function(){ return [30,['40',50]]; }]) // => 150
add(function(){ return [function(){ return [10,20]; }, function(){ return [30,['40',50]]; }]; }) // => 150
add(10) // => 10
add(10,20,30,40,50) // => 150
add() // => 0