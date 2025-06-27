const express = require("express");
const mainRouter = require("./routes/index");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.post('/api/v1/recommendation', async (req, res) => {
    const { N, P, K, pH, Rain, Temp, Humid, Crop } = req.body;

    try {
        const response = await axios.post('http://localhost:8000/predict/', { N, P, K, pH, Rain, Temp, Humid, Crop });
        res.json(response.data[0]);
    } catch (error) {
        console.error('Error making prediction:', error.message);
        res.status(500).send(`Error making prediction: ${error.message}`);
    }
});


app.listen(8080);

