import React, {Component} from 'react'
import SearchInput, {createFilter} from 'react-search-input'
 
import emails from './mails'
 
const KEYS_TO_FILTERS = ['user?.name', 'subject', 'dest.name']
 
class IndexComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.searchUpdated = this.searchUpdated.bind(this)
  }
 
  render () {
    const filteredEmails = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
 
    return (
     <React.Fragment>
         <div className="form-group">
         <SearchInput className="search-input" placeholder="Role"  onChange={this.searchUpdated} />
                
                  {this.state.searchTerm?filteredEmails.map(email => {
          return (
            <div className="mail" key={email.id}>
              <div className="from">{email.user?.name}</div>
              <div className="subject">{email.subject}</div>
            </div>
          )
        }):''}
                </div>
       
       
     </React.Fragment>
    )
  }
 
  searchUpdated (term) {
    this.setState({searchTerm: term})
  }
}
 export default IndexComponent;