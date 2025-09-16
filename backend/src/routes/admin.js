import express from 'express'
import prisma from '../prisma.js'

const router = express.Router()

// Retorna todos agendamentos
router.get('/appointments', async (req, res) => {
  const appointments = await prisma.appointment.findMany({
    include: { patient: true }
  })
  res.json(appointments)
})

export default router
