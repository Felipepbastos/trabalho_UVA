import express from 'express'
import axios from 'axios'
import { OPENWEATHER_KEY } from '../config.js' 

const router = express.Router()

router.get('/:city', async (req, res) => {
  const { city } = req.params
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_KEY}&units=metric`)
    const { weather, main } = response.data
    res.json({ description: weather[0].description, temp: main.temp })
  } catch (err) {
    res.status(500).json({ message: 'Erro ao consultar clima' })
  }
})

export default router
