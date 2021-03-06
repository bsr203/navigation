import React from "react";
import ReactDOM from "react-dom";
import { QueryRenderer } from "react-relay";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import People from "./People.js";
import Person from "./Person.js";
import { StateNavigator } from "Navigation";

/**
 * Configures the states for the two views. Adds the Relay query and Component
 * to each state so that a generic function can render the Relay QueryRenderer.
 */
var stateNavigator = new StateNavigator([
    {
        key: "people",
        route: "{pageNumber?}",
        defaults: { pageNumber: 1 },
        component: People,
        query: graphql`
            query relayModernPeopleQuery($pageNumber: Int) {
                people(pageNumber: $pageNumber) {
                    ...People_people
                }
            }
        `
    },
    {
        key: "person",
        route: "person/{id}",
        defaults: { id: 0 },
        trackCrumbTrail: true,
        component: Person,
        query: graphql`
            query relayModernPersonQuery($id: Int!) {
                person(id: $id) {
                    ...Person_person
                }
            }
        `
    }
]);

function fetchQuery(operation, variables) {
    return fetch("/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: operation.text,
            variables
        })
    }).then(response => {
        return response.json();
    });
}

const modernEnvironment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource())
});

/**
 * Listens for navigation events and renders the root of Relay tree. It fetches
 * the data specified with the query in the state and renders the Component on
 * render callback.
 */
stateNavigator.onNavigate((oldState, state, data) => {
    var Component = state.component;
    ReactDOM.render(
        <QueryRenderer
            environment={modernEnvironment}
            query={state.query}
            variables={data}
            render={({ error, props }) => {
                if (props) {
                    return (
                        <Component {...props} stateNavigator={stateNavigator} />
                    );
                } else {
                    return <div>Loading</div>;
                }
            }}
        />,
        document.getElementById("content")
    );
});

stateNavigator.start();
