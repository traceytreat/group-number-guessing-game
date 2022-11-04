// Generating a number from min to max.
function generateRandomNumber(min, max){
    
    return Math.floor(Math.random() * max) + min
}


// Returning a number value for any GET method.
module.exports = generateRandomNumber;
