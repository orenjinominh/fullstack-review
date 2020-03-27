import React from 'react';

class RepoList extends React.Component {
  constructor(props) {
    super(props);

    this.renderRepoData = this.renderRepoData.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
  }


  renderTableHeader() {
    let headers = Object.keys(this.props.repos);

    this.props.repos.forEach(repo => {
      headers = Object.keys(repo);

    })

    // remove mongoDB keys
    headers.shift();
    headers.pop();
    headers.pop();

    return headers.map((key, index) => {
      return <th key={index}>{key}</th>
    })

  }

  renderRepoData() {
    return this.props.repos.map((repo, index) => {
      const {name, owner, stars, id, url} = repo;
      return (
        <tr key = {id}>
          <td><a href={url}>{name}</a></td>
          <td>{owner}</td>
          <td>{stars}</td>
          <td>{id}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <h4> Here are the top 25 repos by star count.</h4>
        <table>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderRepoData()}
          </tbody>
        </table>
      </div>
    )
  }


}

export default RepoList;