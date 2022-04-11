import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  })

  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  })

});

describe('<App /> integration', () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleSuggestionClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  })

  /* Specify number of events */
  test('The number of events loaded initially should be 32', async () => {
    const AppWrapper = mount(<App />);
    expect(AppWrapper.state('numberOfEvents')).toBe('32');
    AppWrapper.unmount();
  })

  test('The state of "numberOfEvents" within App changes when number input changes', async () => {
    const AppWrapper = mount(<App />);
    const numberInput = AppWrapper.find(NumberOfEvents).find('#number-of-events__input');
    const eventObject = { target: { value: '15' } };
    numberInput.at(0).simulate('change', eventObject);
    expect(AppWrapper.state('numberOfEvents')).toBe('15');
    AppWrapper.unmount();
  })

  test('The EventList is passed a list of events that is not longer than the App\'s state.numberOfEvents', async () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({ 'numberOfEvents': 1 });
    await getEvents();
    expect(AppWrapper.state('events')).toHaveLength(1);
    AppWrapper.unmount();
  })

  test('When the specified number of events is greater than the number of available events, all events show', async () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({ 'numberOfEvents': 55 });
    await getEvents();
    expect(AppWrapper.state('events')).toHaveLength(2);
    AppWrapper.unmount();
  })

  test('When the number of events field changes, the number of events changes', async () => {
    const AppWrapper = mount(<App />);
    const numberInput = AppWrapper.find(NumberOfEvents).find('#number-of-events__input');
    const eventObject = { target: { value: '2' } };
    await numberInput.at(0).simulate('change', eventObject);
    expect(AppWrapper.state('events')).toHaveLength(2);
    AppWrapper.unmount();
  })

});