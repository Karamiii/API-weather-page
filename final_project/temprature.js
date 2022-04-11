"use strict";


const resetTable = () => {

    document.getElementById("collectors").innerHTML = " ";

}


const populateTable = (data) => {

    const table = document.getElementById("collectors")
    



    
    data.map(item => {
        
        
        const row = document.createElement("tr");
        row.id = "work";
        
        const time = new Date(item.date_time)

       
        const NewTime = time.toLocaleString('fi-FI')
        time.toLocaleString('fi-FI')
            // console.log(data)


        //console.log(time)

        

        const temp = Math.round(item.temperature)
        const parseData = (item)
       // console.log(temp)

        const dateColumn = document.createElement("td");
        dateColumn.id = "date-column";
        dateColumn.innerHTML = NewTime;
        row.appendChild(dateColumn);

        const valueColumn = document.createElement("td");
        valueColumn.id = "value-column";
        valueColumn.innerHTML = temp + " °C";
        row.appendChild(valueColumn)
        
        table.appendChild(row)
        
        
       
    })
    

    const chart = Chart.getChart("tempChart");
    if (chart != undefined) {
        chart.destroy();
        
    }
    new Chart("tempChart", {
        
        type: "bar",
        data: {
            datasets: [{
                label: "Temperature",
                data: data,
                backgroundColor: "#0082e6"

            }]
        },
        options: {
            parsing: {
                xAxisKey: "date_time",
                yAxisKey: "temperature",
                key: "temperature"
            },
            plugins: {
                legend: {display: true},
                title: {
                    display: true,
                    text: "Temperatures"
                }
            }

        }
    })
    


    
}
const fetchCollectors = async (time) => {
    try { 
        const response = await fetch ('https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/' + time);
        const jsonData = await response.json();
       // console.log(jsonData)
        populateTable(jsonData)
       
       

        
    } catch (error) {
        console.error(error);
    }
    
}

const selectTime = document.getElementById("timespanSelect");
selectTime.addEventListener('change', (event) => {
    console.log(selectTime.value)
    
    if (selectTime.value === "0") {
        
        fetchCollectors2()
        resetTable()
        
    }
    else {     
    fetchCollectors(selectTime.value)
    resetTable()
    }
    
})

const fetchCollectors2 = async () => {
    try { 
        const response = await fetch ('https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature');
        const jsonData = await response.json();
       // console.log(jsonData)
        populateTable(jsonData)

        
    } catch (error) {
        console.error(error);
    }
    
}

fetchCollectors2();

