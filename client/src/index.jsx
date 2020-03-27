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

  }

  componentDidMount() {
    this.fetchRepos();
  }

  fetchRepos() {
    return axios.get('/repos')
      .then(data => {
        this.setState({repos: data});
      });
  }

  search (term) {
    console.log(`${term} was searched`);
    // $.ajax({
    //   url: '/repos',
    //   type: 'POST',
    //   data: {username: term},
    //   success: () => {
    //     console.log('AJAX post GOOD!');
    //   },
    //   error: (err) => {
    //     console.log('AJAX post FAILED: ', err);
    //   }
    // });
    axios
      .post('/repos', {username: term})
      .then(() => {
        this.fetchRepos();
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