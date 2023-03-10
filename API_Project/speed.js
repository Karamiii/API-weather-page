"use strict";

const resetTable = () => {

    document.getElementById("collectors").innerHTML = " ";

}


const populateTable = (data) => {
    
    
    

    const table = document.getElementById("collectors")
  

    data.map(item => {
        const row = document.createElement("tr");

       const time = new Date(item.date_time)
       
        const NewTime = time.toLocaleString('fi-FI')
        time.toLocaleString('fi-FI')

        const windspeed = Math.round(item.wind_speed)

        //console.log(time)

        const dateColumn = document.createElement("td");
        dateColumn.className = "date-column";
        dateColumn.innerHTML = NewTime;
        row.appendChild(dateColumn);

        const valueColumn = document.createElement("td");
        valueColumn.className = "value-column";
        valueColumn.innerHTML = windspeed + ' m/s';
        row.appendChild(valueColumn)
        
        table.appendChild(row)
    })

    

    const chart = Chart.getChart("speedChart");
    if (chart != undefined) {
        chart.destroy();
    }
    
    new Chart("speedChart", {
        
        type: "line",
        data: {
            datasets: [{
                label: "Wind speed",
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
                legend: {display: true},
                title: {
                    display: true,
                    text: "Wind speed Chart"
                }
            }

        }
    })  
}    
    


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
        resetTable()
        fetchCollectors2()


    }
    else {
        resetTable()
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


