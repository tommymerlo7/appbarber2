import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const app = express();
app.use(cors());
app.use(express.json());

// API Endpoints
app.post('/api/appointments', async (req, res) => {
  const { name, email, phone, date, time, service } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        { name, email, phone, date, time, service }
      ])
      .select();
    
    if (error) throw error;
    
    res.json({ id: data[0].id, success: true });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

app.get('/api/appointments', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('date')
      .order('time');
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

app.get('/api/availability', async (req, res) => {
  const { date } = req.query;
  
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('time')
      .eq('date', date);
    
    if (error) throw error;

    const bookedTimeSlots = new Set(data.map(row => row.time));
    const allTimeSlots = [
      '09:00', '10:00', '11:00', '12:00', '13:00',
      '14:00', '15:00', '16:00', '17:00'
    ];
    
    const availableSlots = allTimeSlots.filter(time => !bookedTimeSlots.has(time));
    res.json(availableSlots);
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ error: 'Failed to check availability' });
  }
});

// Vite integration
const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'spa'
});

app.use(vite.middlewares);

const port = 5173;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});