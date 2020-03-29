import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

    this.fetchRepos = this.fetchRepos.bind(this);
    this.search = this.search.bind(this);

  }

  componentDidMount() {
    this.fetchRepos();
  }

  fetchRepos() {
    $.ajax({
      url: '/repos',
      type: 'GET',
      success: (results) => {
        this.setState({repos: [...results]}, () => {
          console.log('state updated:', this.state.repos);
        });
      },
      error: (err) => {
        console.log('AJAX get FAILED: ', err);
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);

    $.ajax({
      url: '/repos',
      type: 'POST',
      data: {username: term},
      success: () => {
        console.log('AJAX post GOOD!');
        this.fetchRepos();
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
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));