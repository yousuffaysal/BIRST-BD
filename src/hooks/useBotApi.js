import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_AI_API_URL || 'https://birstbd-conf-bt.onrender.com';

export const useBotApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const executeBot = async (botId, formData) => {
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            // Use form-data for file uploads and consistency
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && formData[key] !== undefined) {
                    data.append(key, formData[key]);
                }
            });

            // Stream response if supported (or just simple post)
            // For now, we use standard POST and await full result, 
            // but ready for streaming integration if needed.
            const res = await axios.post(`${API_BASE_URL}/bot/${botId}`, data, {
                headers: {
                    'Accept': 'application/json', // Request JSON from backend
                },
            });

            // Simple HTML parsing or returning text - app.py currently returns HTML
            // ideally backend should return JSON. 
            // For fast integration, we might parse the HTML or updated backend to return JSON.
            // Let's assume we update backend or parse here.
            // Actually, looking at app.py, it returns TemplateResponse ("bot.html").
            // We should ideally update backend to return JSON if "Accept: application/json" header is present.
            // Or we can just extract the "result" from the returned HTML (messy).

            // Better approach: I will update app.py to return JSON.
            // Assuming backend returns JSON { result: "...", error: "..." }

            setResponse(res.data.result || res.data);
            return res.data;

        } catch (err) {
            console.error("Bot API Error:", err);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return { executeBot, loading, error, response };
};
