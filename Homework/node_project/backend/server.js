import express from 'express';
import cors from 'cors';



const COLLECTORS = [
    {
    id: 1,
    name: "Emerald Vega",
    email: "proin.ultrices@yahoo.org",
    cars: ["JLR", "Mahindra", "Mahindra"],
    slogan: "et netus et malesuada fames ac turpis egestas. Fusce aliquet",
    trading: true
    },
    {
    id: 2,
    name: "Philip Walters",
    email: "augue.porttitor@aol.ca",
    cars: ["Acura", "Hyundai", "Motors"],
    slogan: "justo nec ante. Maecenas mi felis, adipiscing fringilla, porttitor vulputate,",
    trading: false
    },
    {
    id: 3,
    name: "Catherine Burgess",
    email: "sodales.nisi.magna@google.couk",
    cars: ["Ford", "Vauxhall", "Daihatsu"],
    slogan: "diam nunc, ullamcorper eu, euismod ac, fermentum vel, mauris. Integer",
    trading: true
    }
]
const app = express()
app.use(cors())
const port = 5000

app.get('/api/', (req, res) => {
    res.send('Hello Backend API!')
})

app.listen(port, () => {
    console.log(`Backend API listening on port ${port}`)
})

app.get('/api/collectors/', (req, res) => {
    res.status(200).json({data: COLLECTORS})
})

app.get('/api/collectors/', (req, res) => {
    const id = req.params.id
    console.log(id)
})

app.get('/api/collectors/:id', (req, res) => {
    const collectorId = parseInt(req.params.id)

    const collector = COLLECTORS.find(item => {
        return item.id ===collectorId
    })

    console.log(collector)
    if(!collector) {
        res.status(404).json({message: "Collector not found"})
    }

    res.status(200).send(collector)
})
