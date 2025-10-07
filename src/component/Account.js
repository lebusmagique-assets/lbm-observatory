import React, {Component} from 'react'
import env from '../env'
import getAccount from '../function/getAccount'
import getPvp from '../function/getPvp'
import M from 'materialize-css'

class Account extends Component {

    constructor (props) {
        super(props)
        this.state = {
            loading: true,
            error: false,
            account: null,
            pvp: null,
            apiKey : localStorage.getItem('apiKey') ? localStorage.getItem('apiKey') : this.props.apiKey,
            lang : localStorage.getItem('lang') ? localStorage.getItem('lang') : this.props.lang,
            apiKeyError: null
        }
    }

    componentWillMount() {
        getAccount(env.apiLink,env.apiVersion,this.state.apiKey).then((res) => {
            if (res['text'] || res['text'] === 'Invalid access token') {
                this.setState({
                    apiKeyError : 'Invalid key',
                    loading: false
                })
            } else {
                this.setState({
                    account : res
                })
                getPvp(env.apiLink,env.apiVersion,this.state.apiKey).then((res) => {
                    this.setState({
                        loading : false,
                        pvp : res
                    })
                })
            }
        })
    }

    // init js
    // DidUpdate because the elem is not render if fetch is null
    componentDidUpdate () {
        const elems_modal = document.querySelectorAll('.modal')
        const options_modal = {}
        M.Modal.init(elems_modal, options_modal)
    }

    render() {

        const {loading, account, lang, pvp, apiKeyError} = this.state
        let tab = []

        if (account) {
            account['access'].includes('GuildWars2') ? tab.push({'name':'Guild Wars 2','status':true}) : tab.push({'name':'Guild Wars 2','status':false})
            account['access'].includes('HeartOfThorns') ? tab.push({'name':'Heart Of Thorns','status':true}) : tab.push({'name':'Heart Of Thorns','status':false})
            account['access'].includes('PathOfFire') ? tab.push({'name':'Path Of Fire','status':true}) : tab.push({'name':'Path Of Fire','status':false})
            account['access'].includes('EndOfDragons') ? tab.push({'name':'End Of Dragons','status':true}) : tab.push({'name':'End Of Dragons','status':false})
            account['access'].includes('SecretsOfTheObscure') ? tab.push({'name':'Secrets Of The Obscure','status':true}) : tab.push({'name':'Secrets Of The Obscure','status':false})
            account['access'].includes('JanthirWilds') ? tab.push({'name':'Janthir Wilds','status':true}) : tab.push({'name':'Janthir Wilds','status':false})
        }

        return (
            <div className="row">
                {(!loading && apiKeyError) &&
                <div>
                    <div className="red-text">{lang==='fr' ? 'Une erreur c\'est produite, vérifiez votre clé api. \n Cliquez sur le bouton reset pour revenir a la page d\'avant.' : 'An error occurred, check your API key. \n Click on the reset button to return to the previous page.'}</div>
                </div>
                }
                {loading &&
                <div className="progress">
                    <div className="indeterminate"> </div>
                </div>
                }
                {(account && pvp) &&
                <div className={'row col s12'}>

                    <div className="col s12">

                        <div className="card id col s12">

                            <div className="card-content white-text">
                                <h5 className="card-title">{account['name']}</h5>
                                <h6>{lang === 'en' ? 'Your access' : 'Vos accès'}</h6>
                                <div className="access">
                                    {tab.map(el => (
                                        <div key={el['name']} className={"badge-access " + (el['status'] ? "green" : "red")}>{el['name']}</div>
                                    ))}
                                </div>
                                <h6>{lang === 'en' ? 'Level' : 'Niveaux'}</h6>
                                <div className="level">
                                    <p className="valign-wrapper">
                                        <span className="wvw tooltipped" data-position="top" data-tooltip={lang === 'en' ? 'WvW' : 'McM'}> </span>
                                        <span>{account['wvw_rank']}</span>
                                    </p>
                                    <p className="valign-wrapper">
                                        <span className="pvp tooltipped" data-position="top" data-tooltip={lang === 'en' ? 'PvP' : 'JcJ'}> </span>
                                        <span>{pvp['pvp_rank']}</span>
                                    </p>
                                    <p className="valign-wrapper">
                                        <span className="fractal tooltipped" data-position="top" data-tooltip={"Fractal"}> </span>
                                        <span>{account['fractal_level']}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="card-action">
                                <button data-target="modal1" className="btn modal-trigger">{lang === 'en' ? 'Legend' : 'Légende' }</button>
                                <button data-target="modal2" className="btn modal-trigger">{lang === 'en' ? 'Warning' : 'Important' }</button>
                            </div>

                        </div>

                    </div>

                    {/*Modal Structure*/}
                    <div id="modal1" className="modal">
                        <div className="modal-content">
                            <h4 className="modal-title">{lang === 'en' ? 'Legend' : 'Légende' }</h4>
                            <table className="legend">
                                <tbody>
                                <tr>
                                    <td className="center-align"><span className="status green" aria-label={lang === 'en' ? 'Completed' : 'Terminée'}>Name</span></td>
                                    <td>{lang === 'en' ? 'Quest completed' : 'Quête terminée'}</td>
                                </tr>
                                <tr>
                                    <td className="center-align"><span className="status red" aria-label={lang === 'en' ? 'Accessible' : 'Accessible'}>Name</span></td>
                                    <td>{lang === 'en' ? 'Quest accessible but not completed' : 'Quête accessible mais non terminée'}</td>
                                </tr>
                                <tr>
                                    <td className="center-align"><span className="status orange" aria-label={lang === 'en' ? 'Missing expansion' : 'Extension manquante'}>Name</span></td>
                                    <td>{lang === 'en' ? 'Required expansion missing' : 'Extension requise manquante'}</td>
                                </tr>
                                <tr>
                                    <td className="center-align"><span className="status blue" aria-label={lang === 'en' ? 'Level too low' : 'Niveau insuffisant'}>Name</span></td>
                                    <td>{lang === 'en' ? 'Character level too low' : 'Niveau du personnage insuffisant'}</td>
                                </tr>
                                <tr>
                                    <td className="center-align"><span className="status grey" aria-label={lang === 'en' ? 'Locked' : 'Verrouillée'}><del>Name</del></span></td>
                                    <td>{lang === 'en' ? 'Quest locked (backstory choice or race incompatible)' : 'Quête verrouillée (choix de backstory ou race incompatible)'}</td>
                                </tr>
                                <tr>
                                    <td className="center-align"><span><i className="material-icons" aria-label={lang === 'en' ? 'Choice between 2 quests' : 'Choix entre 2 quêtes'}>looks_two</i></span></td>
                                    <td>{lang === 'en' ? 'After this quest, choose one of the 2 quests below' : 'Après cette quête, il faudra choisir parmi les 2 quêtes ci-dessous'}</td>
                                </tr>
                                <tr>
                                    <td className="center-align"><div className="durmand" role="img" aria-label={lang === 'en' ? 'Faction specific' : 'Spécifique à la faction'}></div></td>
                                    <td>{lang === 'en' ? 'Quest only available for this faction' : 'Quête accessible uniquement pour cette faction'}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div id="modal2" className="modal">
                        <div className="modal-content">
                            <h4 className="modal-title">{lang === 'en' ? 'Warning' : 'Important' }</h4>
                            <p>{lang === 'en' ? ' Completed but restarted quests are considered unrealized!' : ' Le système de fonctionnement de l\'API détermine qu\'un épisode d\'histoire relancé est par définition non terminé. Ce qui explique que certains épisodes soient considérés par cette dernière comme non fait alors qu\'ils ont certainement été relancés mais terminés par le passé.' }</p>
                        </div>
                    </div>

                </div>
                }
            </div>
        )
    }

}

export default Account