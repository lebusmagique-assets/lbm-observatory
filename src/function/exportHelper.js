// Export helper for downloading data as JSON or CSV

const exportHelper = {
    // Export data as JSON
    exportJSON: (data, filename = 'gw2-quest-data.json') => {
        const jsonStr = JSON.stringify(data, null, 2)
        const blob = new Blob([jsonStr], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    },
    
    // Export data as CSV
    exportCSV: (map, data, filename = 'gw2-quest-data.csv') => {
        if (!map || !data) return
        
        // CSV header
        let csv = 'Character,Season,Story,Quest Name,Quest ID,Level,Completed,Has Access,Access Reason\n'
        
        // Build CSV rows
        Object.keys(map).forEach(seasonName => {
            const season = map[seasonName]
            
            Object.keys(season.story).forEach(storyName => {
                const story = season.story[storyName]
                
                Object.keys(story.quests).forEach(questId => {
                    const quest = story.quests[questId]
                    
                    data.characters.forEach(character => {
                        if (quest.status && quest.status[character] !== undefined) {
                            const completed = quest.status[character] === 1 ? 'Yes' : 'No'
                            const hasAccess = quest.authorization && quest.authorization[character] ? 'Yes' : 'No'
                            const accessReason = quest.accessReason && quest.accessReason[character] ? quest.accessReason[character] : ''
                            
                            // Escape quotes in quest name
                            const questName = quest.Qname ? quest.Qname.replace(/"/g, '""') : ''
                            
                            csv += `"${character}","${seasonName}","${storyName}","${questName}","${questId}",${quest.Qlevel},${completed},${hasAccess},"${accessReason}"\n`
                        }
                    })
                })
            })
        })
        
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    },
    
    // Export character summary as CSV
    exportCharacterSummary: (map, data, filename = 'gw2-character-summary.csv') => {
        if (!map || !data) return
        
        // CSV header
        let csv = 'Character,Profession,Race,Level,Total Quests,Completed,Accessible,Locked,Completion Rate\n'
        
        // Calculate stats for each character
        data.characters.forEach(character => {
            if (!data.characterId || !data.characterId[character]) return
            
            const charInfo = data.characterId[character]
            let total = 0, completed = 0, accessible = 0, locked = 0
            
            Object.keys(map).forEach(seasonName => {
                const season = map[seasonName]
                
                Object.keys(season.story).forEach(storyName => {
                    const story = season.story[storyName]
                    
                    Object.keys(story.quests).forEach(questId => {
                        const quest = story.quests[questId]
                        
                        if (quest.status && quest.status[character] !== undefined) {
                            total++
                            if (quest.status[character] === 1) {
                                completed++
                            } else if (quest.authorization && quest.authorization[character]) {
                                accessible++
                            } else {
                                locked++
                            }
                        }
                    })
                })
            })
            
            const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0
            
            csv += `"${character}","${charInfo.profession}","${charInfo.race}",${charInfo.level},${total},${completed},${accessible},${locked},${completionRate}%\n`
        })
        
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }
}

export default exportHelper

