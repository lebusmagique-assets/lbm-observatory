import fetchWithRetry from './fetchWithRetry'

// Give the list of the characters of a player
// link string the api fqd
// version string api version
// token string api key

async function getCharacters (link,version,lang,token) {
    try {
        // fetch data with retry logic
        const response = await fetchWithRetry(`${link}${version}/characters?access_token=${token}&lang=${lang}`, {
            method : 'GET',
            mode : 'cors'
        })
        
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching characters:', error)
        return { text: error.message }
    }
}

export default getCharacters