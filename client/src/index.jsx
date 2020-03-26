import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({username: term}),
      success: (data) => {
        console.log('AJAX post GOOD!');
        $.ajax({
          url: '/repos',
          type: 'GET',
          contentType: 'application/json',
          data: JSON.stringify({username: term}),
          success: (data) => {
            this.setState({repos: data});
          },
          error: (err) => {
            console.log('AJAX get FAILED: ', err);
          }
        });
      },
      error: (err) => {
        console.log('AJAX post FAILED: ', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));