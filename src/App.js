import React from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';

class App extends React.Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: '32',
    location: 'all'
  };
  
  updateNumberOfEvents = (eventCount) => {
    this.setState({
      numberOfEvents: eventCount
    })
    this.updateEvents(this.state.currentLocation, eventCount);
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events => {
      if (eventCount !== undefined) {
        this.setState({
          numberOfEvents: eventCount
        })
      }
      // filter event list by location
      let eventList = location !== 'all' ?
        events.filter(event => event.location === location) :
        events

      // Shorten event list
      let shortEventList = eventList.slice(0, this.state.numberOfEvents)

      // Assign value to events state, assign currentLocation
      this.setState({
        events: shortEventList,
        currentLocation: location
      });
    }));
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events,
          locations: extractLocations(events)
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }


  render() {
    const { events, locations, numberOfEvents } = this.state;
    return (
      <div className="App">
        <div id="App__header">
          <h1>Search for tech events</h1>
          <p>This app uses the Google Calendar API in conjunction with a CareerFoundry calendar to fetch and filter events based on the city and number of events desired. Give it a try!</p>
        </div>
        <CitySearch locations={locations} numberOfEvents={numberOfEvents} updateEvents={this.updateEvents} />
        <NumberOfEvents updateNumberOfEvents={number => { this.updateNumberOfEvents(number) }} />
        <EventList events={events} numberOfEvents={numberOfEvents} />
      </div >
    );
  }
}

export default App;