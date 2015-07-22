﻿import LinkUtility = require('./LinkUtility');
import Navigation = require('navigation');
import React = require('react');

var NavigationLink = React.createClass({
    onNavigate() {
        this.forceUpdate();
    },
    getNavigationLink(): string {
        var toData = LinkUtility.getData(this.props.toData, this.props.includeCurrentData, this.props.currentDataKeys);
        return LinkUtility.getLink(() => Navigation.StateController.getNavigationLink(this.props.action, toData));
    },
    componentDidMount() {
        if (!this.props.lazy)
            Navigation.StateController.onNavigate(this.onNavigate);
    },
    componentWillUnmount() {
        if (!this.props.lazy)
            Navigation.StateController.offNavigate(this.onNavigate);
    },
    render() {
        var props: any = {};
        for(var key in this.props)
            props[key] = this.props[key];
        props.href = this.getNavigationLink();
        LinkUtility.addListeners(this, props, () => this.setNavigationLink(), !!this.props.lazy);
        return React.createElement(props.href ? 'a' : 'span', props);
    }
});
export = NavigationLink;
