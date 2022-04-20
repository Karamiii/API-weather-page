"use strict";

const resetTable = () => {

    document.getElementById("collectors").innerHTML = "";

}

const populateTable = (data, value) => {
    const table = document.getElementById("collectors")
   
    console.log("populate table value:", value)

    data.map(item => {

        const temp = item.temperature?Math.round(item.temperature) + " °C": ""
        const windSpeed = item.wind_speed?Math.round(item.wind_speed) + " m/s": ""
        const airPres1 = item.Air_pres_1?Math.round(item.Air_pres_1)+ " Pa": ""
        const BMPtemp = item.BMP_temp_1?Math.round(item.BMP_temp_1) + " °C": ""
        const DHT11Hum = item.DHT11_hum_1?Math.round(item.DHT11_hum_1) + " %": ""
        const DHTtemp = item.DHT11__temp_1?Math.round(item.DHT11__temp_1)+ " °C": ""
        const DStemp = item.DS1820_temp_1?Math.round(item.DS1820_temp_1)+ " °C": ""
        const HumidityIn = item.humidity_in?Math.round(item.humidity_in) + " %": ""
        const HumidityOut = item.humidity_out?Math.round(item.humidity_out) + " %": ""
        const Rainbow = item.RAINBOW?Math.round(item.RAINBOW) + " ??": ""
        const Light = item.light?Math.round(item.light) + " lx": ""
        const Rain = item.rain?Math.round(item.rain) + " mm": ""
        const WindDIrection = item.wind_direction?Math.round(item.wind_direction) + " °":""
        
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
        valueColumn.innerHTML =  windSpeed || temp|| airPres1
        || BMPtemp || DHT11Hum || DHTtemp || DStemp
        || HumidityIn || HumidityOut || Rainbow || Light
        || Rain || WindDIrection; 
        
        row.appendChild(valueColumn)
        
        table.appendChild(row)

       
        
    })

   
        
}

const drawChart = (data, value) => {
const chart = Chart.getChart("valueChart");
document.getElementById("name").innerHTML = value
if (chart != undefined) {
    chart.destroy();
    
}
new Chart("valueChart", {
    
    type: "line",
    data: {
        datasets: [{
            label: value,
            data: data,
            backgroundColor: "#0082e6",
            fill: true,
            pointStyle: 'cross'

        }]
    },
    options: {
        parsing: {
            xAxisKey: "date_time",
            yAxisKey: value,
            key: value
        },
        plugins: {
            legend: {
                display: true,
                
            },
            title: {
                display: true,
                text: value + ' Chart'
            }
        }

    }
})

}
const fetchCollectors = async (value, valueTime) => {
    try { 
        console.log("Value:",value)
        console.log("time:", valueTime)
        const response = await fetch ('https://webapi19sa-1.course.tamk.cloud/v1/weather/' + value + '/' + valueTime);
        const jsonData = await response.json();
       // console.log(jsonData)
        populateTable(jsonData, value)
        drawChart(jsonData, value)
        

        
    } catch (error) {
        console.error(error);
    }
}

const selectValue = document.getElementById("valueSelect");
selectValue.addEventListener('change', (event) => {
   
    fetchCollectors(selectValue.value, selectTime.value)

    console.log("time Inside select value: " ,selectTime.value)

    resetTable();
    
 
})

const selectTime = document.getElementById("timespanSelect");
selectTime.addEventListener('change', (event) => {

    fetchCollectors(selectValue.value, selectTime.value)
    console.log("value Inside select time: " ,selectValue.value)

    resetTable()


})




const holder1 = "temperature";
const holder2 = " ";


fetchCollectors(holder1, holder2)

