"use strict";

const populateTable = (data) => {
    const table = document.getElementById("collectors")
   // console.log(data)

    data.map(item => {
        const row = document.createElement("tr");
      
       const time = new Date(item.date_time)
       
        const NewTime = time.toLocaleString('fi-FI')
        time.toLocaleString('fi-FI')
        

        //console.log(time)

        const dateColumn = document.createElement("td");
        dateColumn.className = "date-column";
        dateColumn.innerHTML = NewTime;
        row.appendChild(dateColumn);

        const valueColumn = document.createElement("td");
        valueColumn.className = "value-column";
        valueColumn.innerHTML = item.data.wind_speed || item.data.temperature || item.data.Air_pres_1
        || item.data.BMP_temp_1 || item.data.DHT11_hum_1 || item.data.DHT11__temp_1 || item.data.DS1820_temp_1
        || item.data.humidity_in || item.data.humidity_out || item.data.JollyCooperation || item.data.light
        || item.data.rain || item.data.wind_direction;
        row.appendChild(valueColumn)
        
        table.appendChild(row)
    })
    
}
const fetchCollectors = async () => {
    try { 
        const response = await fetch ('https://webapi19sa-1.course.tamk.cloud/v1/weather/limit/50');
        const jsonData = await response.json();
       // console.log(jsonData)
        populateTable(jsonData)

        
    } catch (error) {
        console.error(error);
    }
}
fetchCollectors()