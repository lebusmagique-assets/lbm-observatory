import fetchWithRetry from './fetchWithRetry'

async function getDoneQuests (link,version,lang,token,character) {
    try {
        // fetch data with retry logic
        const response = await fetchWithRetry(`${link}${version}/characters/${character}/quests?access_token=${token}&lang=${lang}`, {
            method : 'GET',
            mode : 'cors'
        })
        
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error fetching quests for ${character}:`, error)
        return { text: error.message }
    }
}

export default getDoneQuests