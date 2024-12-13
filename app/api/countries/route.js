import axios from 'axios';
import https from 'https';

export const GET = async (req) => {
    try {
        const agent = new https.Agent({
            rejectUnauthorized: false, // ปิดการตรวจสอบ SSL
        });

        const response = await axios.get('https://partnerdemo.tracthai.com/api/countries', {
            httpsAgent: agent,
        });

        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        console.error('Details:', error.response?.data || error);
        return new Response(JSON.stringify({ error: 'Unable to fetch data', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
