"use strict";


const fetchCollectors = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/collectors/');
        const data = await response.json();
        console.log(data)
    }
    catch (error) {
        console.error(error);
    }
}
fetchCollectors();



const populateTable = (data) => {
    const table = document.getElementById("collectors")

    data.map(item => {
        const row = document.createElement("tr");

        const idColumn = document.createElement("td");
        idColumn.className = "id-column";
        idColumn.innerHTML = item.id;
        row.appendChild(idColumn);

        const nameColumn = document.createElement("td");
        nameColumn.className = "name-column";
        nameColumn.innerHTML = item.name;
        row.appendChild(nameColumn);

        const emailColumn = document.createElement("td");
        emailColumn.className = "email-column";
        emailColumn.innerHTML = item.email;
        row.appendChild(emailColumn)

        const carColumn = document.createElement("td");
        carColumn.className = "car-column";
        carColumn.innerHTML = item.cars.length;
        row.appendChild(carColumn);

        table.appendChild(row)
    })
}
populateTable()

