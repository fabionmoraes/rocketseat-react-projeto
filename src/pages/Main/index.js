import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaGit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Form, SubmitButton, List } from './styles';
import Container from '../../components/Container';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositorios: [],
    loading: false,
  };

  // Para receber dados no localstore
  componentDidMount() {
    const repositorios = localStorage.getItem('repositorios');

    if (repositorios) {
      this.setState({ repositorios: JSON.parse(repositorios) });
    }
  }

  // Salvar os dados no localstore
  componentDidUpdate(_, prevState) {
    const { repositorios } = this.state;

    if (prevState.repositorios !== repositorios) {
      localStorage.setItem('repositorios', JSON.stringify(repositorios));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositorios } = this.state;

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositorios: [...repositorios, data],
      newRepo: '',
      loading: false,
    });
  };

  render() {
    const { newRepo, repositorios, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositorios.map(data => (
            <li key={data.name} className="lista-repo">
              <span>
                <FaGit /> {data.name}
              </span>{' '}
              <Link to={`/repository/${encodeURIComponent(data.name)}`}>
                Detalhe
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
