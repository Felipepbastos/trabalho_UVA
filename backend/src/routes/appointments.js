import express from 'express'
import prisma from '../prisma.js' 

const router = express.Router()

router.post('/', async (req, res) => {
  const { patientId, date } = req.body

  const exists = await prisma.appointment.findFirst({
    where: { date: new Date(date) }
  })

  if (exists) {
    return res.status(400).json({ message: 'Horário já ocupado' })
  }


  const appointment = await prisma.appointment.create({
    data: { patientId, date: new Date(date) }
  })

  res.json(appointment)
})

export default router
