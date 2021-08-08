var menuList = document.getElementById("menuList");
menuList.style.maxHeight = "0px";
function togglemenu() {
  if (menuList.style.maxHeight == "0px") {
    menuList.style.maxHeight = "130px";
  } else {
    menuList.style.maxHeight = "0px";
  }
}
const birthDate = document.querySelector("#date-input");
const checkBtn = document.querySelector("#check-btn");
function reverseString(word){
  word = word.split("");
  var rev = "";
  while(word.length !=0){
      rev += word.pop();
  }
  return rev;
 
}

function checkPalindrome(date){
  const [year,month,day] = date.split("-");
  const yyyymmdd = year+month+day;
  const ddmmyyyy = day+month+year;
  const mmddyyyy = month+day+year;
  const ddmmyy = day+month+year.slice(-2);
  const yymmdd = year.slice(-2)+month+day;
  const mmddyy = month+day+year.slice(-2);

 if(yyyymmdd === reverseString(yyyymmdd)) return [year+"/"+month+"/"+day,true];
 if(ddmmyyyy === reverseString(ddmmyyyy)) return [day+"/"+month+"/"+year,true];
 if(mmddyyyy === reverseString(mmddyyyy)) return [month+"/"+day+"/"+year,true];
 if(ddmmyy === reverseString(ddmmyy)) return [day+"/"+month+"/"+year.slice(-2),true];
 if(yymmdd === reverseString(yymmdd)) return [year.slice(-2)+"/"+month+"/"+day,true];
 if(mmddyy === reverseString(mmddyy)) return [month+"/"+day+"/"+year.slice(-2),true];

 return ["",false];

}

function checkLeapYear(year){
  if(year%4==0){
      if(year%100==0){
          if(year%400==0){
              return true;
          }
      }
  }
  return false;
}

var noOfDays=0;
function findNextNearPalindromeDate(date){
  noOfDays=0;
  console.log(date);
  var [year , month , day] = date.split("-"); 
  var daysInMonth = [31,checkLeapYear(year)?29:28, 31,30,31,30,31,31,30,31,30,31];
  var nextDate;
  day = Number(day);
  month = Number(month);
  year = Number(year);

  while(true){
      noOfDays++;
      ++day;
      if(day === daysInMonth[month-1]+1){
          day = 1;
          ++month;
      }
      if(month === 13){
          month = 1;
          ++year;
      }
     
      var yyyymmdd = year +"-"+ (month<=9?("0".concat(month)):month).toString() +"-"+ ( day<=9?"0".concat(day.toString()):day ).toString() ;
      var [formate , flag] = checkPalindrome(yyyymmdd);
      if(flag){
          nextDate = formate;
          console.log("palindrome next: "+nextDate);
          return nextDate;
      }
     
  }
  return nextDate;
}
function clickHandler(){

  document.getElementById("loader").style.display = "none";
  document.getElementById("output").style.display = "block";
  
  
      var [formate,state] = checkPalindrome(birthDate.value);
      var outputDate = formate;
      if(state){
          document.getElementById("output").innerText = "Woohooo!!! You Birthday is Palindrome 🎊🥳 in "+ outputDate;
      }
      else{
           var nearDate = findNextNearPalindromeDate(birthDate.value);
           document.getElementById("output").innerText = "Ufff!!! Date is not palindrome . Next palindrome date is "+ nearDate +" which comes after "+noOfDays + "days 😊";
      }
  
}
function clickHandler(){

  document.getElementById("loader").style.display = "none";
  document.getElementById("output").style.display = "block";
  
  
      var [formate,state] = checkPalindrome(birthDate.value);
      var outputDate = formate;
      if(state){
         document.getElementById("output").style.border = "2px solid #ff54a2";
          document.getElementById("output").innerText = "Woohooo!!! You Birthday is a Palindrome 🎊🥳 in "+ outputDate + "format";
      }
      else{
           var nearDate = findNextNearPalindromeDate(birthDate.value);
           document.getElementById("output").style.border = "2px solid #ff54a2";
           document.getElementById("output").innerText = "Oops!!! Your birthday is not a palindrome . Nearest palindrome date is "+ nearDate +" which comes after "+noOfDays + " days 😊";
      }
  
}

checkBtn.addEventListener("click",()=>{
 
  if(birthDate.value === "") {
      document.getElementById("output").style.display = "block";
      document.getElementById("output").innerText = "date cannot be empty";
  }
  else{
      document.getElementById("output").style.display = "none";
  document.getElementById("loader").style.display = "block";

  setTimeout(clickHandler,2*1000);
  }
});