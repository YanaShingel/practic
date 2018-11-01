import React, { PureComponent } from 'react';
import {
  getSeriesRequest,
  getSeries,
  isLoaded,
  isError,
  isLoading,
} from './ducks/series';
import { connect } from 'react-redux';
import './App.css';


class App extends PureComponent {
  fetchData = () => {
    this.props.getSeriesRequest(1);
  };

  render() {
    const { series, isError, isLoading, isLoaded } = this.props;

    if (isLoading) {
      return <p>Данные загружаются...</p>;
    }

    if (isError) {
      return <p>Произошла сетевая ошибка</p>;
    }

    return (
      <div>
        <h1>Firefly</h1>
        {isLoaded && <button onClick={this.fetchData}>Загрузить серии</button>}
        {series.map(this.renderEpisode)}
      </div>
    );
  }

  renderEpisode = ep => {
    return (
      <div key={ep.id}>
        <img src={ep.image} alt={ep.name} />
        <div dangerouslySetInnerHTML={{ __html: ep.summary }} />
      </div>
    );
  };
}

const mapStateToProps = state => ({
  isLoaded: isLoaded(state),
  isError: isError(state),
  isLoading: isLoading(state),
  series: getSeries(state),
});

const mapDispatchToProps = { getSeriesRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
