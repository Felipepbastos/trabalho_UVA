import express from 'express'
import prisma from '../prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

// Registro de paciente
router.post('/register', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) return res.status(400).json({ message: 'Preencha todos os campos' })

  // Verifica se usuário já existe
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return res.status(400).json({ message: 'Usuário já existe' })

  // Criptografa a senha
  const hashed = await bcrypt.hash(password, 10)

  // Cria usuário
  const user = await prisma.user.create({
    data: { email, password: hashed, role: 'PATIENT' } // ou 'SECRETARY' se quiser
  })

  res.json({ message: 'Cadastro realizado', userId: user.id })
})

export default router
