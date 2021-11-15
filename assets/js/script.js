// arrays for password criteria
var charSet = ['!','"','#','$','%','&','(',')','*','+','-','/','[',']','@','?','>','<','=',';',':','\'','\\','^','_','|','{','}','~']
var numSet = ['1','2','3','4','5','6','7','8','9','0']
var upperSet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
var lowerSet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

// empty array to later concat confirmed criteria together
var passSet = [];
// empty variable to later randomly add characters to create the password
var passCreate = "";

// function that prompts for password criteria
var generatePassword = function(){

  //prompt user for length of password (must be at least 8 and no more than 128)
  var promptLength = window.prompt("How many characters would you like your password to contain?");
  if(promptLength < 8 || promptLength > 128){
    window.alert("Bad length. Please provide a number between 8 and 128 inclusive");
    generatePassword();
  }
 

  /* prompt user if they wish to include Uppercase letters
    if true, add uppercase letters to the password set
  */
 var confirmUppercase = window.confirm("Click OK to confirm including uppercase letters");
 if(confirmUppercase){
   passSet = passSet.concat(upperSet);
 }

  /* prompt user for lowercase letters
    if true, add lowercase letters to the password set
  */
 var confirmLowercase = window.confirm("Click OK to confirm including lowercase letters");
 if(confirmLowercase){
   passSet = passSet.concat(lowerSet);
 }

  /* prompt user for numbers
  if true, add numbers to password set
  */
 var confirmNum = window.confirm("Click OK to confirm including numeric characters");
 if(confirmNum){
   passSet = passSet.concat(numSet);
 }

  /* prompt user for special characters
    "Click OK to confirm including special characters"
    if true, randomly choose special characters
  */
 var confirmChar = window.confirm("Click OK to confirm including special characters");
 if(confirmChar){
   passSet = passSet.concat(charSet);
 }

    // cycle through the passSet to add random characters to create the password
    for(var i = 0; i < promptLength; i++){
    passCreate += passSet[(Math.floor(Math.random() * passSet.length))];
  }

  //return the created password 
  return passCreate;
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
