import fetchWithRetry from './fetchWithRetry'

async function getInfoCharacter (link,version,lang,token,character) {
    // over lang
    lang = 'en'
    
    try {
        // fetch data with retry logic
        const response = await fetchWithRetry(`${link}${version}/characters/${character}/core?access_token=${token}&lang=${lang}`, {
            method : 'GET',
            mode : 'cors'
        })
        
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error fetching info for ${character}:`, error)
        return { text: error.message }
    }
}

export default getInfoCharacter