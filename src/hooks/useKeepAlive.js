import { useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_AI_API_URL || 'https://birstbd-conf-bt.onrender.com';

const useKeepAlive = () => {
    useEffect(() => {
        // Ping immediately on mount
        const pingBackend = async () => {
            try {
                await axios.get(`${API_BASE_URL}/`);
                // console.log("Keep-alive ping sent");
            } catch (error) {
                // Silently fail, it's just a keep-alive
                // console.warn("Keep-alive ping failed", error);
            }
        };

        pingBackend();

        // Set up interval for every 5 minutes (Render sleeps after 15 mins inactive)
        const interval = setInterval(pingBackend, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);
};

export default useKeepAlive;
