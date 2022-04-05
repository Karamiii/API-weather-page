"use strict";

const populateTable = (data) => {
    const table = document.getElementById("collectors")
   // console.log(data)

    data.map(item => {
        const row = document.createElement("tr");
/*
        const idColumn = document.createElement("td");
        idColumn.className = "id-column";
        idColumn.innerHTML = '<a href="collector.html">' + item.id + '</a>';
        idColumn.onclick = () => {
            sessionStorage.setItem("collectorId", item.id)
        }
        row.appendChild(idColumn);

*/      
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
        valueColumn.innerHTML = item.wind_speed;
        row.appendChild(valueColumn)
        
        table.appendChild(row)
    })
    
}
const fetchCollectors = async () => {
    try { 
        const response = await fetch ('https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed');
        const jsonData = await response.json();
       // console.log(jsonData)
        populateTable(jsonData)

        
    } catch (error) {
        console.error(error);
    }
}
fetchCollectors()