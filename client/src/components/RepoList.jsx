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

    return headers.map((key, index) => {
      return <th key={index}>{key}</th>
    })

  }

  renderRepoData() {
    return this.props.repos.map((repo, index) => {
      const {id, name, owner, stars} = repo;
      return (
        <tr key = {id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{owner}</td>
          <td>{stars}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <h1> Here are the top 25 repos by star count.</h1>
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