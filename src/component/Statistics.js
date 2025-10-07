import React, {Component} from 'react'

class Statistics extends Component {
    
    calculateStats = () => {
        const {data, map} = this.props
        
        if (!data || !map) return null
        
        let totalQuests = 0
        let completedQuests = 0
        let accessibleQuests = 0
        let lockedQuests = 0
        
        const statsByExpansion = {}
        
        // Parcourir toutes les saisons
        Object.keys(map).forEach(seasonName => {
            const season = map[seasonName]
            
            if (!statsByExpansion[seasonName]) {
                statsByExpansion[seasonName] = {
                    total: 0,
                    completed: 0,
                    accessible: 0,
                    locked: 0
                }
            }
            
            // Parcourir toutes les histoires de la saison
            Object.keys(season.story).forEach(storyName => {
                const story = season.story[storyName]
                
                // Parcourir toutes les quêtes de l'histoire
                Object.keys(story.quests).forEach(questId => {
                    const quest = story.quests[questId]
                    
                    // Pour chaque personnage
                    data.characters.forEach(character => {
                        if (quest.status && quest.status[character] !== undefined) {
                            totalQuests++
                            statsByExpansion[seasonName].total++
                            
                            if (quest.status[character] === 1) {
                                completedQuests++
                                statsByExpansion[seasonName].completed++
                            } else if (quest.authorization && quest.authorization[character]) {
                                accessibleQuests++
                                statsByExpansion[seasonName].accessible++
                            } else {
                                lockedQuests++
                                statsByExpansion[seasonName].locked++
                            }
                        }
                    })
                })
            })
        })
        
        return {
            totalQuests,
            completedQuests,
            accessibleQuests,
            lockedQuests,
            completionRate: totalQuests > 0 ? ((completedQuests / totalQuests) * 100).toFixed(1) : 0,
            statsByExpansion
        }
    }
    
    render() {
        const {lang} = this.props
        const stats = this.calculateStats()
        
        if (!stats) return null
        
        return (
            <div className="row container statistics-panel">
                <div className="col s12">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">
                                <i className="material-icons left">assessment</i>
                                {lang === 'fr' ? 'Statistiques globales' : 'Global Statistics'}
                            </span>
                            
                            <div className="row">
                                <div className="col s12 m3">
                                    <div className="stat-box">
                                        <h3>{stats.completedQuests}</h3>
                                        <p>{lang === 'fr' ? 'Terminées' : 'Completed'}</p>
                                    </div>
                                </div>
                                <div className="col s12 m3">
                                    <div className="stat-box">
                                        <h3>{stats.accessibleQuests}</h3>
                                        <p>{lang === 'fr' ? 'Accessibles' : 'Accessible'}</p>
                                    </div>
                                </div>
                                <div className="col s12 m3">
                                    <div className="stat-box">
                                        <h3>{stats.lockedQuests}</h3>
                                        <p>{lang === 'fr' ? 'Verrouillées' : 'Locked'}</p>
                                    </div>
                                </div>
                                <div className="col s12 m3">
                                    <div className="stat-box">
                                        <h3>{stats.completionRate}%</h3>
                                        <p>{lang === 'fr' ? 'Complétion' : 'Completion'}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="progress">
                                <div className="determinate" style={{width: `${stats.completionRate}%`}}></div>
                            </div>
                        </div>
                        <div className="card-action">
                            <p style={{margin: 0, fontSize: '0.9em'}}>
                                {lang === 'fr' 
                                    ? `Total : ${stats.totalQuests} quêtes` 
                                    : `Total: ${stats.totalQuests} quests`
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Statistics

