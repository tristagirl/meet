import React from 'react';
import { shallow } from 'enzyme';
import  Event  from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let EventWrapper;

    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[1]} />);
    });

    test('render an event', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1);
    })

    test('render a location', () => {
        expect(EventWrapper.find('.location')).toHaveLength(1);
    })

    test('render the summary', () => {
        expect(EventWrapper.find('.summary')).toHaveLength(1);
    })

    test('render the date', () => {
        expect(EventWrapper.find('.start-date')).toHaveLength(1);
    })

    //collapse button

    test('render the show details button', () => {
        expect(EventWrapper.find('.show-details')).toHaveLength(1);
    })

    test('details are collapsed by default', () => {
        expect(EventWrapper.state('collapsed')).toBe(true);
    })

    test('open details when show details is clicked', () => {
        EventWrapper.setState({
            collapsed: true
        });
        EventWrapper.find('.show-details').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(false);
    });

    test('hide details when clicking button again after showing details', () => {
        EventWrapper.setState({
            collapsed: false
        });
        EventWrapper.find('.hide-details').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(true);
    });
})