import { getPerson } from './Data';
import React from 'react';
import ReactDOM from 'react-dom';
import { NavigationBackLink } from 'navigation-react';

/**
 * Registers the component creator for the Details State.
 */
function registerComponent(stateNavigator) {
    stateNavigator.states.person.createComponent = function(data) {
        var person = getPerson(data.id);
        return <Details person={person} stateNavigator={stateNavigator} />
    }
}

var Details = ({ person, stateNavigator }) => (
    <div>
        <NavigationBackLink
            distance={1}
            stateNavigator={stateNavigator}>
            Person Search
        </NavigationBackLink>
        <div>
            <h2>{person.name}</h2>
            <div className="label">Date of Birth</div>
            <div>{person.dateOfBirth}</div>
            <div className="label">Email</div>
            <div>{person.email}</div>
            <div className="label">Phone</div>
            <div>{person.phone}</div>
        </div>
    </div>
);

export { registerComponent };
