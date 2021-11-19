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
function generatePassword(){

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

  // we want to check if at least one of each criteria is met in the final password, if not, fix it so there is
  passCreate = checkCriteria(passCreate, confirmChar, confirmLowercase, confirmUppercase, confirmNum, promptLength);

  //return the created password 
  return passCreate;
};

// checks to ensure at least one of each criteria chosen is met. if not, fixes it
function checkCriteria(passCreated, confirmChar, confirmLowercase, confirmUppercase, confirmNum, userLength){
  // empty string in case a new password needs to be written
  var passNew = "";


  // checks for at least one of the criteria needed, if none exist, creates new password
  if(confirmChar && !(charSet.some(v => passCreated.includes(v)))){
    passNew += charSet[(Math.floor(Math.random() * charSet.length))];
  }
  else if(confirmNum && !(numSet.some(v => passCreated.includes(v)))){
    passNew += numSet[(Math.floor(Math.random() * numSet.length))]; 
  }
  else  if(confirmLowercase && !(lowerSet.some(v => passCreated.includes(v)))){
    passNew += lowerSet[(Math.floor(Math.random() * lowerSet.length))];
  }
  else if(confirmUppercase && !(upperSet.some(v => passCreated.includes(v)))){
    passNew += upperSet[(Math.floor(Math.random() * upperSet.length))];
  }
  else {
    // else returns original password as it has at least one of all criteria picked
    return passCreated;
  }
  
  // if the new password created isn't the length it needs to be, randomly add the criteria chosen until it is the length requested
  if(passNew.length < userLength){
    for(var i = passNew.length; i < userLength; i++){
      passNew += passSet[(Math.floor(Math.random() * passSet.length))];
    }
    // recursive call to ensure newly created password meets at least one of each criteria chosen
    checkCriteria(passNew, confirmChar, confirmLowercase, confirmUppercase, confirmNum, userLength)
  }
 return passNew;
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

// Upon clicking the copy button, it provides and easier way to copy the password
var copyBtn = document.querySelector("#copy");
copyBtn.addEventListener("click", function(event) {
  navigator.clipboard.writeText(passCreate);
  window.confirm("Copied to clipboard!");
});

// Upon clicking the clear button, it clears the password field
var clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", function(event){
  document.querySelector("#password").value = "";
  passCreate = "";
  passSet = [];
});
