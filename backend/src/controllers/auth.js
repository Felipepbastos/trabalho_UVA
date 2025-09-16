import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prismaClient.js';

const ACCESS_EXPIRES = '15m';
const REFRESH_EXPIRES = '7d';

export async function register(req, res) {
  const { name, email, password, phone } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const exists = await prisma.user.findUnique({ where: { email }});
  if (exists) return res.status(409).json({ error: 'Email already registered' });
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, passwordHash: hash, phone }});
  return res.status(201).json({ id: user.id, email: user.email, name: user.name });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email }});
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const accessToken = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
  const refreshToken = jwt.sign({ sub: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
  // store refresh token
  await prisma.refreshToken.create({ data: { userId: user.id, token: refreshToken, expiresAt: new Date(Date.now() + 7*24*3600*1000) }});
  return res.json({ accessToken, refreshToken });
}

export async function refresh(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Missing token' });
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const tokenRow = await prisma.refreshToken.findUnique({ where: { token: refreshToken }});
    if (!tokenRow || tokenRow.revoked) return res.status(401).json({ error: 'Invalid token' });
    const user = await prisma.user.findUnique({ where: { id: payload.sub }});
    const accessToken = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
    return res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
}

export async function logout(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Missing token' });
  await prisma.refreshToken.updateMany({ where: { token: refreshToken }, data: { revoked: true }});
  return res.json({ ok: true });
}

export async function me(req, res) {
  const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: { id: true, name: true, email: true, role: true, phone: true }});
  return res.json(user);
}
