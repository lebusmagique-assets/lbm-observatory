import React, {Component} from 'react'
import Guardian from '../style/img/Guardian_icon.png'
import Warrior from '../style/img/Warrior_icon.png'
import Necromancer from '../style/img/Necromancer_icon.png'
import Elementalist from '../style/img/Elementalist_icon.png'
import Thief from '../style/img/Thief_icon.png'
import Engineer from '../style/img/Engineer_icon.png'
import Ranger from '../style/img/Ranger_icon.png'
import Revenant from '../style/img/Revenant_icon.png'
import Mesmer from '../style/img/Mesmer_icon.png'

class CharacterView extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            selectedCharacter: null,
            filterStatus: 'all', // 'all', 'completed', 'accessible', 'locked'
            filterSeason: 'all',
            searchQuery: ''
        }
    }
    
    getProfessionIcon = (profession) => {
        const icons = {
            Guardian, Warrior, Necromancer, Elementalist,
            Thief, Engineer, Ranger, Revenant, Mesmer
        }
        return icons[profession] || null
    }
    
    getCharacterQuests = (characterName) => {
        const {map, data} = this.props
        const quests = []
        
        if (!map || !data) return quests
        
        Object.keys(map).forEach(seasonName => {
            const season = map[seasonName]
            
            Object.keys(season.story).forEach(storyName => {
                const story = season.story[storyName]
                
                Object.keys(story.quests).forEach(questId => {
                    const quest = story.quests[questId]
                    
                    if (quest.status && quest.status[characterName] !== undefined) {
                        quests.push({
                            id: questId,
                            name: quest.Qname,
                            level: quest.Qlevel,
                            season: seasonName,
                            story: storyName,
                            completed: quest.status[characterName] === 1,
                            hasAccess: quest.authorization ? quest.authorization[characterName] : false,
                            accessReason: quest.accessReason ? quest.accessReason[characterName] : null
                        })
                    }
                })
            })
        })
        
        return quests
    }
    
    getFilteredQuests = (quests) => {
        const {filterStatus, filterSeason, searchQuery} = this.state
        
        return quests.filter(quest => {
            // Filter by status
            if (filterStatus === 'completed' && !quest.completed) return false
            if (filterStatus === 'accessible' && (quest.completed || !quest.hasAccess)) return false
            if (filterStatus === 'locked' && (quest.completed || quest.hasAccess)) return false
            
            // Filter by season
            if (filterSeason !== 'all' && quest.season !== filterSeason) return false
            
            // Filter by search query
            if (searchQuery && !quest.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
            
            return true
        })
    }
    
    getSeasonsList = () => {
        const {map} = this.props
        if (!map) return []
        return Object.keys(map)
    }
    
    render() {
        const {data, lang} = this.props
        const {selectedCharacter, filterStatus, filterSeason, searchQuery} = this.state
        
        if (!data || !data.characters || data.characters.length === 0) {
            return <div className="center-align">{lang === 'fr' ? 'Aucune donnée disponible' : 'No data available'}</div>
        }
        
        const seasons = this.getSeasonsList()
        
        return (
            <div className="row container character-view">
                <div className="col s12">
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">
                                <i className="material-icons left">people</i>
                                {lang === 'fr' ? 'Vue par personnage' : 'Character View'}
                            </span>
                            
                            {/* Character Selection */}
                            <div className="row">
                                <div className="col s12">
                                    <label>{lang === 'fr' ? 'Sélectionner un personnage :' : 'Select a character:'}</label>
                                    <select 
                                        className="browser-default" 
                                        value={selectedCharacter || ''}
                                        onChange={(e) => this.setState({selectedCharacter: e.target.value})}
                                    >
                                        <option value="">{lang === 'fr' ? '-- Choisir un personnage --' : '-- Choose a character --'}</option>
                                        {data.characters.map(char => (
                                            <option key={char} value={char}>
                                                {char} 
                                                {data.characterId && data.characterId[char] && 
                                                    ` (${data.characterId[char].profession} - Lvl ${data.characterId[char].level})`
                                                }
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            {selectedCharacter && (
                                <>
                                    {/* Character Info */}
                                    {data.characterId && data.characterId[selectedCharacter] && (
                                        <div className="row character-info" style={{marginTop: '20px', padding: '15px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '5px'}}>
                                            <div className="col s12">
                                                <img 
                                                    src={this.getProfessionIcon(data.characterId[selectedCharacter].profession)} 
                                                    alt={data.characterId[selectedCharacter].profession}
                                                    style={{width: '40px', height: '40px', marginRight: '15px', verticalAlign: 'middle'}}
                                                />
                                                <strong style={{fontSize: '1.3em'}}>{selectedCharacter}</strong>
                                                <span style={{marginLeft: '10px'}}>
                                                    {data.characterId[selectedCharacter].race} - {data.characterId[selectedCharacter].profession} - Lvl {data.characterId[selectedCharacter].level}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Filters */}
                                    <div className="row" style={{marginTop: '20px'}}>
                                        <div className="col s12 m4">
                                            <label>{lang === 'fr' ? 'Statut :' : 'Status:'}</label>
                                            <select 
                                                className="browser-default"
                                                value={filterStatus}
                                                onChange={(e) => this.setState({filterStatus: e.target.value})}
                                            >
                                                <option value="all">{lang === 'fr' ? 'Toutes' : 'All'}</option>
                                                <option value="completed">{lang === 'fr' ? 'Terminées' : 'Completed'}</option>
                                                <option value="accessible">{lang === 'fr' ? 'Accessibles' : 'Accessible'}</option>
                                                <option value="locked">{lang === 'fr' ? 'Verrouillées' : 'Locked'}</option>
                                            </select>
                                        </div>
                                        <div className="col s12 m4">
                                            <label>{lang === 'fr' ? 'Extension :' : 'Expansion:'}</label>
                                            <select 
                                                className="browser-default"
                                                value={filterSeason}
                                                onChange={(e) => this.setState({filterSeason: e.target.value})}
                                            >
                                                <option value="all">{lang === 'fr' ? 'Toutes' : 'All'}</option>
                                                {seasons.map(season => (
                                                    <option key={season} value={season}>{season}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col s12 m4">
                                            <label>{lang === 'fr' ? 'Rechercher :' : 'Search:'}</label>
                                            <input 
                                                type="text" 
                                                value={searchQuery}
                                                onChange={(e) => this.setState({searchQuery: e.target.value})}
                                                placeholder={lang === 'fr' ? 'Nom de la quête...' : 'Quest name...'}
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Quest List */}
                                    {(() => {
                                        const allQuests = this.getCharacterQuests(selectedCharacter)
                                        const filteredQuests = this.getFilteredQuests(allQuests)
                                        
                                        const completed = filteredQuests.filter(q => q.completed).length
                                        const accessible = filteredQuests.filter(q => !q.completed && q.hasAccess).length
                                        const locked = filteredQuests.filter(q => !q.completed && !q.hasAccess).length
                                        
                                        return (
                                            <>
                                                <div className="row" style={{marginTop: '10px'}}>
                                                    <div className="col s12">
                                                        <p>
                                                            <strong>{filteredQuests.length}</strong> {lang === 'fr' ? 'quêtes trouvées' : 'quests found'} 
                                                            {filterStatus === 'all' && ` (${completed} ${lang === 'fr' ? 'terminées' : 'completed'}, ${accessible} ${lang === 'fr' ? 'accessibles' : 'accessible'}, ${locked} ${lang === 'fr' ? 'verrouillées' : 'locked'})`}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <table className="striped highlight responsive-table">
                                                    <thead>
                                                        <tr>
                                                            <th>{lang === 'fr' ? 'Nom' : 'Name'}</th>
                                                            <th>{lang === 'fr' ? 'Extension' : 'Expansion'}</th>
                                                            <th>{lang === 'fr' ? 'Histoire' : 'Story'}</th>
                                                            <th className="center-align">{lang === 'fr' ? 'Niveau' : 'Level'}</th>
                                                            <th className="center-align">{lang === 'fr' ? 'Statut' : 'Status'}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredQuests.length === 0 ? (
                                                            <tr>
                                                                <td colSpan="5" className="center-align">
                                                                    {lang === 'fr' ? 'Aucune quête trouvée' : 'No quests found'}
                                                                </td>
                                                            </tr>
                                                        ) : (
                                                            filteredQuests.map(quest => (
                                                                <tr key={quest.id}>
                                                                    <td>{quest.name}</td>
                                                                    <td>{quest.season}</td>
                                                                    <td>{quest.story}</td>
                                                                    <td className="center-align">{quest.level}</td>
                                                                    <td className="center-align">
                                                                        {quest.completed ? (
                                                                            <span className="badge green white-text">✓ {lang === 'fr' ? 'Terminé' : 'Done'}</span>
                                                                        ) : quest.hasAccess ? (
                                                                            <span className="badge red white-text">{lang === 'fr' ? 'À faire' : 'To do'}</span>
                                                                        ) : (
                                                                            <span className="badge grey white-text">
                                                                                🔒 {quest.accessReason === 'expansion' ? (lang === 'fr' ? 'Extension' : 'Expansion') : 
                                                                                     quest.accessReason === 'level' ? (lang === 'fr' ? 'Niveau' : 'Level') :
                                                                                     (lang === 'fr' ? 'Bloqué' : 'Locked')}
                                                                            </span>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        )}
                                                    </tbody>
                                                </table>
                                            </>
                                        )
                                    })()}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CharacterView

