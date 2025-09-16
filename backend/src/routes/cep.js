import express from 'express'
import axios from 'axios'

const router = express.Router()

router.get('/:cep', async (req, res) => {
  const { cep } = req.params
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    res.json(response.data)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao consultar CEP' })
  }
})

export default router
