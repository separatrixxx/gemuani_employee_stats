import axios from 'axios';


export async function updateStats() {
    try {
        const response = await axios.post('/api/updateStats');
        
        console.log(response.data.message);
    } catch (error) {
        console.error('Ошибка при обновлении данных:', error);
    }
}
