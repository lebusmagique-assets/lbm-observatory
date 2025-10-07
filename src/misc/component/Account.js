import React, {Component} from 'react'
import env from '../../misc/env'
import getAccount from '../../misc/function/getAccount'
import getPvp from '../../misc/function/getPvp'
import 'materialize-css'

class Account extends Component {
  constructor (props) {
    super(props)
    this.state = { loading: true, error: false, account: null, pvp: null, apiKey: localStorage.getItem('apiKey') ? localStorage.getItem('apiKey') : this.props.apiKey, lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : this.props.lang, apiKeyError: null }
  }
  componentWillMount(){
    getAccount(env.apiLink,env.apiVersion,this.state.apiKey).then((res)=>{
      if (res['text'] || res['text'] === 'Invalid access token') {
        this.setState({ apiKeyError: 'Invalid key', loading: false })
      } else {
        this.setState({ account: res })
        getPvp(env.apiLink,env.apiVersion,this.state.apiKey).then((p)=>{ this.setState({ loading:false, pvp:p }) })
      }
    })
  }
  componentDidUpdate(){
    const elems_modal = document.querySelectorAll('.modal')
    const options_modal = {}
    window.M && window.M.Modal && window.M.Modal.init(elems_modal, options_modal)
  }
  render(){
    const {loading, account, lang, pvp, apiKeyError} = this.state
    let tab = []
    if (account) {
      account['access'].includes('GuildWars2') ? tab.push({'name':'Guild Wars 2','status':true}) : tab.push({'name':'Guild Wars 2','status':false})
      account['access'].includes('HeartOfThorns') ? tab.push({'name':'Heart Of Thorns','status':true}) : tab.push({'name':'Heart Of Thorns','status':false})
      account['access'].includes('PathOfFire') ? tab.push({'name':'Path Of Fire','status':true}) : tab.push({'name':'Path Of Fire','status':false})
    }
    return (
      <div className="row">
        {(!loading && apiKeyError) && (<div><div className="red-text">{lang==='fr' ? 'Une erreur c\'est produite, vérifiez votre clé api. \n Cliquez sur le bouton reset pour revenir a la page d\'avant.' : 'An error occurred, check your API key. \n Click on the reset button to return to the previous page.'}</div></div>)}
        {loading && (<div className="progress"><div className="indeterminate"> </div></div>)}
        {(account && pvp) && (
          <div className={'row col s12'}>
            <div className="col s12">
              <div className="card id col s12">
                <div className="card-content white-text">
                  <h5 className="card-title">{account['name']}</h5>
                  <h6>{lang === 'en' ? 'Your access' : 'Vos accès'}</h6>
                  <div className="access">{tab.map(el => (<div key={el['name']} className={"badge-access " + (el['status'] ? "green" : "red")}>{el['name']}</div>))}</div>
                  <h6>{lang === 'en' ? 'Level' : 'Niveaux'}</h6>
                  <div className="level">
                    <p className="valign-wrapper"><span className="wvw tooltipped" data-position="top" data-tooltip={lang === 'en' ? 'WvW' : 'McM'}> </span><span>{account['wvw_rank']}</span></p>
                    <p className="valign-wrapper"><span className="pvp tooltipped" data-position="top" data-tooltip={lang === 'en' ? 'PvP' : 'JcJ'}> </span><span>{pvp['pvp_rank']}</span></p>
                    <p className="valign-wrapper"><span className="fractal tooltipped" data-position="top" data-tooltip={'Fractal'}> </span><span>{account['fractal_level']}</span></p>
                  </div>
                </div>
                <div className="card-action">
                  <button data-target="modal1" className="btn modal-trigger">{lang === 'en' ? 'Legend' : 'Légende' }</button>
                  <button data-target="modal2" className="btn modal-trigger">{lang === 'en' ? 'Warning' : 'Important' }</button>
                </div>
              </div>
            </div>
            <div id="modal1" className="modal"><div className="modal-content"><h4 className="modal-title">{lang === 'en' ? 'Legend' : 'Légende' }</h4></div></div>
            <div id="modal2" className="modal"><div className="modal-content"><h4 className="modal-title">{lang === 'en' ? 'Warning' : 'Important' }</h4></div></div>
          </div>
        )}
      </div>
    )
  }
}

export default Account


