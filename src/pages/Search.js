import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      btn: true,
    };

    this.validateBtn = this.validateBtn.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  validateBtn() {
    const LOWEST_NUMBER = 2;
    const { name } = this.state;
    const btnEnable = name.length < LOWEST_NUMBER;
    this.setState({ btn: btnEnable });
  }

  inputChange({ target }) {
    this.setState({ name: target.value }, () => this.validateBtn());
  }

  render() {
    const { btn } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="input-music">
            <input
              id="input-music"
              type="text"
              data-testid="search-artist-input"
              onChange={ this.inputChange }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ btn }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
