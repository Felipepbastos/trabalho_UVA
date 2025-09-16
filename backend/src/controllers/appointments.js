import { prisma } from '../prismaClient.js';
import { getRainForecastForDatetime } from '../services/weather.js';

export async function createAppointment(req, res) {
  const { patientId, doctorId, scheduledAt, durationMinutes = 30, notes } = req.body;
  const start = new Date(scheduledAt);
  const end = new Date(start.getTime() + durationMinutes*60000);
  // conflict check
  const conflict = await prisma.appointment.findFirst({
    where: {
      doctorId: doctorId,
      AND: [
        { scheduledAt: { lt: end } },
        { scheduledAtEnd: { gt: start } }
      ],
      NOT: { status: 'CANCELLED' }
    }
  });
  if (conflict) return res.status(409).json({ error: 'Horário ocupado' });
  // weather check (best-effort)
  let rain = null;
  try { rain = await getRainForecastForDatetime(doctorId, start); } catch(e) { /* ignore */ }
  const appt = await prisma.appointment.create({
    data: {
      patientId: patientId || req.user.id,
      doctorId,
      scheduledAt: start,
      scheduledAtEnd: end,
      durationMinutes,
      status: 'SCHEDULED',
      createdBy: req.user.id,
      rainForecast: rain,
      notes
    }
  });
  return res.status(201).json(appt);
}

export async function listAppointments(req, res) {
  const appts = await prisma.appointment.findMany({ orderBy: { scheduledAt: 'asc' }});
  return res.json(appts);
}
