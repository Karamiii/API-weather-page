"use strict";

const populateCollector = (details) => {
    
    document.getElementById("collector-name").innerHTML = details.name
    document.getElementById("collector-email").innerHTML = details.email
    document.getElementById("collector-cars").innerHTML = details.cars
    document.getElementById("collector-slogan").innerHTML = details.slogan
    document.getElementById("collector-trading").innerHTML = details.trading
    //console.log(details)    
}


const fetchCollectorDetails = async (id) => {
    try {
        const response = 
        await fetch('http://localhost:5000/api/collectors/' + id);
        const data = await response.json();
        populateCollector(data);
    } catch (error) {
        console.error(error);
    }
}



window.onload = function() {
    const collectorId = 
    sessionStorage.getItem("collectorId");
    //console.log(collectorId);
    fetchCollectorDetails(collectorId);
}