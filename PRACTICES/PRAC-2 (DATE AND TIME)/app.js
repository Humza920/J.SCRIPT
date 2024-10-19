let date = new Date() 
console.log(date);
console.log(date.getDate());

var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
console.log(weekdays[date.getDay()]);

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
console.log(months[date.getMonth()]);

console.log(date.getFullYear());
console.log(date.getHours() );
console.log(date.getMinutes() );
console.log(date.getSeconds())
console.log(date.getMilliseconds())
console.log(Math.floor(date.getTime()/(1000*60*60*24*365)));

var doomsday = new Date("Jun 30, 2035")
console.log(doomsday);
var currms = date.getTime()
console.log(doomsday.getTime());


