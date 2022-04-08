"use strict";

const populateTable = (data) => {
    
    
    // Creating a table of elements from APi data

    const table = document.getElementById("collectors")
  

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
        valueColumn.innerHTML = item.wind_speed;
        row.appendChild(valueColumn)
        
        table.appendChild(row)
    })

    // Drawing a chart from fetched API data

    const chart = Chart.getChart("speedChart");
    if (chart != undefined) {
        chart.destroy();
    }
    
    new Chart("speedChart", {
        
        type: "line",
        data: {
            datasets: [{
                data: data,
                backgroundColor: "#0082e6"
            }]
        },
        options: {
            parsing: {
                xAxisKey: "date_time",
                yAxisKey: "wind_speed",
                key: "wind_speed"
            },
            plugins: {
                legend: {display: false},
                title: {
                    display: true,
                    text: "Wind speed"
                }
            }

        }
    })  
}    
    
// Fething data from an API and sending in forwards to function(s)

const fetchCollectors = async (time) => {
    try { 
        const response = await fetch ('https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/' + time);
        const jsonData = await response.json();
       
        populateTable(jsonData)
        //drawChart(jsonData)

        
    } catch (error) {
        console.error(error);
    }
}

const selectTime = document.getElementById("timespanSelect");
selectTime.addEventListener('change', (event) => {
    
    if (selectTime.value === "0") {
        fetchCollectors2()

    }
    else {
    fetchCollectors(selectTime.value)
    }

})

const fetchCollectors2 = async () => {
    try { 
        const response = await fetch ('https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/');
        const jsonData = await response.json();
       // console.log(jsonData)
        populateTable(jsonData)

        
    } catch (error) {
        console.error(error);
    }
}

fetchCollectors2();


