


//Generating a number from 1 to 25.
function generateRandomNumber(){
    return Math.floor(Math.random() * 25) + 1
}


//returning a number value for any GET method.
module.exports = generateRandomNumber;
