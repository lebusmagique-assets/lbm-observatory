import fetchWithRetry from './fetchWithRetry'

async function getBackstories (link,version,token,character) {
    try {
        // fetch data with retry logic
        const response = await fetchWithRetry(`${link}${version}/characters/${character}/backstory?access_token=${token}`, {
            method : 'GET',
            mode : 'cors'
        })
        
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error fetching backstory for ${character}:`, error)
        return { text: error.message }
    }
}

export default getBackstories