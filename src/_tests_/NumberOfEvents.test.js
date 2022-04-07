import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;

    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />)
    });

		test('render text input', () => {
			expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
		});

		test('change numberOfEvents state when number input changes', () => {
			NumberOfEventsWrapper.setState({numberOfEvents: '32'});
			NumberOfEventsWrapper.find('.numberOfEvents').simulate('change', {target: {value: "11"}});
			expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual("11");
		});
})