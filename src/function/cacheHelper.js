// Cache helper for localStorage
// Store character data to avoid refetching on every page load

const CACHE_VERSION = '1.0'
const CACHE_DURATION = 1000 * 60 * 60 // 1 hour in milliseconds

const cacheHelper = {
    // Get cached data for a specific character
    getCharacterCache: (characterName, apiKey) => {
        try {
            const cacheKey = `gw2_char_${apiKey}_${characterName}`
            const cached = localStorage.getItem(cacheKey)
            
            if (!cached) return null
            
            const data = JSON.parse(cached)
            
            // Check if cache is still valid
            if (data.version !== CACHE_VERSION) {
                localStorage.removeItem(cacheKey)
                return null
            }
            
            const now = Date.now()
            if (now - data.timestamp > CACHE_DURATION) {
                localStorage.removeItem(cacheKey)
                return null
            }
            
            return data.content
        } catch (e) {
            console.error('Error reading cache:', e)
            return null
        }
    },

    // Store character data in cache
    setCharacterCache: (characterName, apiKey, content) => {
        try {
            const cacheKey = `gw2_char_${apiKey}_${characterName}`
            const data = {
                version: CACHE_VERSION,
                timestamp: Date.now(),
                content: content
            }
            localStorage.setItem(cacheKey, JSON.stringify(data))
        } catch (e) {
            console.error('Error writing cache:', e)
        }
    },

    // Get all characters basic info cache
    getAllCharactersCache: (apiKey) => {
        try {
            const cacheKey = `gw2_characters_${apiKey}`
            const cached = localStorage.getItem(cacheKey)
            
            if (!cached) return null
            
            const data = JSON.parse(cached)
            
            if (data.version !== CACHE_VERSION) {
                localStorage.removeItem(cacheKey)
                return null
            }
            
            const now = Date.now()
            if (now - data.timestamp > CACHE_DURATION) {
                localStorage.removeItem(cacheKey)
                return null
            }
            
            return data.content
        } catch (e) {
            console.error('Error reading characters cache:', e)
            return null
        }
    },

    // Store all characters basic info
    setAllCharactersCache: (apiKey, content) => {
        try {
            const cacheKey = `gw2_characters_${apiKey}`
            const data = {
                version: CACHE_VERSION,
                timestamp: Date.now(),
                content: content
            }
            localStorage.setItem(cacheKey, JSON.stringify(data))
        } catch (e) {
            console.error('Error writing characters cache:', e)
        }
    },

    // Clear all character caches for an API key
    clearCharacterCaches: (apiKey) => {
        try {
            const keys = Object.keys(localStorage)
            keys.forEach(key => {
                if (key.startsWith(`gw2_char_${apiKey}_`) || key.startsWith(`gw2_characters_${apiKey}`)) {
                    localStorage.removeItem(key)
                }
            })
        } catch (e) {
            console.error('Error clearing caches:', e)
        }
    },

    // Force refresh cache for a character (clear and return null)
    refreshCharacterCache: (characterName, apiKey) => {
        const cacheKey = `gw2_char_${apiKey}_${characterName}`
        localStorage.removeItem(cacheKey)
        return null
    }
}

export default cacheHelper

