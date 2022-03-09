var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var name2 = document.querySelector('.name')
var desc = document.querySelector('.desc')
var temp = document.querySelector('.temp')
var sorry2 = document.querySelector('.sorry')
var start2 = document.querySelector('.start')


   button.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ inputValue.value +'&lang=fi&appid=c734ea84dfe38c5a08e6c54fd946ee1f&units=metric')
    .then(response => response.json())
    .then(data => {
        const nameValue = data['name'];
        const tempValue = data['main']['temp'];
        const descValue = data['weather'][0]['description'];
      
        name2.innerHTML = nameValue;
        temp.innerHTML = tempValue + ' C';
        desc.innerHTML = descValue;

        sorry2.innerHTML = "I tried to use math.round() but it didn't work and i don't know why :("
        start2.style.display = "none"
        
        
       
    })

    


    .catch(() => alert("Wrong city name!"))

    
   })     