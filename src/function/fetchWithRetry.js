// Fetch with retry logic for handling 504 Gateway Timeout errors

const fetchWithRetry = async (url, options = {}, maxRetries = 3, delay = 1000) => {
    let lastError
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options)
            
            // If we get a 504, retry
            if (response.status === 504) {
                console.warn(`504 timeout for ${url}, retry ${i + 1}/${maxRetries}`)
                lastError = new Error(`504 Gateway Timeout`)
                
                // Wait before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
                continue
            }
            
            // If we get a 429 (rate limit), wait longer
            if (response.status === 429) {
                console.warn(`429 rate limit for ${url}, waiting longer...`)
                await new Promise(resolve => setTimeout(resolve, delay * 3 * (i + 1)))
                continue
            }
            
            // For other errors, try to parse JSON
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.text || `HTTP ${response.status}`)
            }
            
            // Success - return the response
            return response
            
        } catch (error) {
            lastError = error
            
            // Network errors can be retried
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                console.warn(`Network error for ${url}, retry ${i + 1}/${maxRetries}`)
                await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
                continue
            }
            
            // For other errors, don't retry
            throw error
        }
    }
    
    // All retries failed
    throw lastError || new Error('Max retries reached')
}

export default fetchWithRetry

