import React, { Component } from 'react';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    this.setState({
      query: event.target.value,
      suggestions
    });
  }

  handleSuggestionClicked = (suggestion, number) => {
    this.setState({
      query: suggestion,
      showSuggestions: false
    });
    this.props.updateEvents(suggestion, number);
  }

  render() {
    const { numberOfEvents } = this.props;

    return (
      <div className="citySearch">
        <label htmlFor={this.state.query}>Search for a city</label>
        <input type="text"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={() => { this.setState({ showSuggestions: true }) }}
        />
        <ul className="suggestions" style={this.state.showSuggestions ? {} : {display: 'none' }}>
          {this.state.suggestions.map((suggestion) => (
            <li key={suggestion} onClick={() => this.handleSuggestionClicked(suggestion, numberOfEvents)}>{suggestion}</li>
          ))}
          <li key="all" onClick={() => this.handleSuggestionClicked("all", numberOfEvents)}>
            <b >See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;