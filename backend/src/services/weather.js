import axios from 'axios';
import { prisma } from '../prismaClient.js';

// Very small, best-effort implementation:
export async function getClinicCoords(doctorId) {
  // In this skeleton we don't have clinic coords per doctor.
  // Fallback: return a default coordinate (São Paulo)
  return { latitude: -23.55052, longitude: -46.633308 };
}

export async function getRainForecastForDatetime(doctorId, date) {
  const { latitude, longitude } = await getClinicCoords(doctorId);
  const apiKey = process.env.OPENWEATHER_KEY;
  if (!apiKey) throw new Error('OPENWEATHER_KEY missing');
  const resp = await axios.get('https://api.openweathermap.org/data/2.5/onecall', {
    params: { lat: latitude, lon: longitude, exclude: 'minutely,hourly', appid: apiKey }
  });
  const daily = resp.data.daily || [];
  // Find nearest day
  const targetDay = new Date(date).setHours(0,0,0,0);
  for (const d of daily) {
    const dayTs = d.dt * 1000;
    if (new Date(dayTs).setHours(0,0,0,0) === targetDay) {
      // OpenWeather provides 'pop' probability of precipitation (0..1)
      const pop = d.pop || 0;
      return pop >= 0.4;
    }
  }
  return false;
}
