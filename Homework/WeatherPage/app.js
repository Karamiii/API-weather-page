var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name')
var desc = document.querySelector('.desc')
var temp = document.querySelector('.temp')

   button.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ inputValue.value +'&lang=fi&appid=c734ea84dfe38c5a08e6c54fd946ee1f&units=metric')
    .then(response => response.json())
    .then(data => {
        const nameValue = data['name'];
        const tempValue = data['main']['temp'];
        const descValue = data['weather'][0]['description'];
      
        name.innerHTML = nameValue;
        temp.innerHTML = tempValue + ' C';
        desc.innerHTML = descValue;

       
    })




    .catch(() => alert("Wrong city name!"))


   })     