import React, { Component } from 'react';

class NumberOfEvents extends Component {
	state = {
		numberOfEvents: '32',
	}

	handleInputChange = (event) => {
		const value = event.target.value;
		this.setState({
			numberOfEvents: event.target.value,
		});
	}

    render() {
			const { numberOfEvents } = this.state;
      return (  
        <div className='NumberOfEvents'>
            <input
						type="number"
						onChange={this.handleInputChange} 
						value={this.state.numberOfEvents} 
						className="numberOfEvents"/>
        </div>
			)	
    }
};    

export default NumberOfEvents;