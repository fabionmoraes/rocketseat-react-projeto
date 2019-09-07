import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import { Loading, Owner, IssueList } from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repositorios: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repositorios: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repositorios);

    const [repositorios, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repositorios: repositorios.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repositorios, issues, loading } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar ao repositórios</Link>
          <img
            src={repositorios.owner.avatar_url}
            alt={repositorios.owner.login}
          />
          <h1>{repositorios.name}</h1>
          <p>{repositorios.description}</p>
        </Owner>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <a href={issue.html_url}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    {issue.title}
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </a>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
