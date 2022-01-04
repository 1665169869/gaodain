$(document).ready(function(){
    $('#login').click(function(){
       $.post("https://v3.yungao-tech.com/api/login", 
           {
           mobile: "13232469869",
           password: "xiaoshuai666",
       }, function(data, status){
           console.log(data, status)
       })
    })
})