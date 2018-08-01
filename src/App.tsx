/*
* This file demonstrates a basic ReactXP app.
*/
// This example uses ExperimentalNavigation on iOS and Android
import Navigator, { Types, NavigatorDelegateSelector as DelegateSelector } from 'reactxp-navigation';
import RX = require('reactxp');

import NotesList from './components/NotesList'
import NoteDetail from './components/NoteDetail'
import Note from './models/Note'

enum NavigationRouteId {
    MainPanel,
    SecondPanel
}

type AppState = {
    notes: Note[]
}

const styles = {
    // Standard navigator style should be an object. So we have to disable caching here.
    navCardStyle: RX.Styles.createViewStyle({
        backgroundColor: '#f00',
    }, false)
};

class App extends RX.Component<{}, AppState> {
    private _navigator: Navigator;

    constructor(props: {}) {
        super(props);
        this.state = {notes: []}
    }

    componentDidMount() {
        this._navigator.immediatelyResetRouteStack([{
            routeId: NavigationRouteId.MainPanel,
            sceneConfigType: Types.NavigatorSceneConfigType.Fade
        }]);
    }

    render() {
        return (
            <Navigator
                ref={ this._onNavigatorRef }
                renderScene={ this._renderScene }
                cardStyle={ styles.navCardStyle }
                delegateSelector={ DelegateSelector }
            />
        );
    }

    private _onNavigatorRef = (navigator: Navigator) => {
        this._navigator = navigator;
    }

    private _renderScene = (navigatorRoute: Types.NavigatorRoute) => {
        switch (navigatorRoute.routeId) {
            case NavigationRouteId.MainPanel:
                return <NotesList notes={this.state.notes} onPressCreateNote={ this._onPressCreateNote} onPressNavigate={ this._onPressNavigate } />;

            case NavigationRouteId.SecondPanel:
                return <NoteDetail onNavigateBack={ this._onPressBack } />;
        }

        return null;
    }

    private _onPressNavigate = () => {
        this._navigator.push({
            routeId: NavigationRouteId.SecondPanel,
            sceneConfigType: Types.NavigatorSceneConfigType.FloatFromRight
        });
    }

    private _onPressCreateNote = () => {
        console.log(this.state)
        this.setState({notes: this.state.notes.concat(new Note("Ryan is such a great guy, don't you think? Ryan is such a great guy, don't you think? Ryan is such a great guy, don't you think? Ryan is such a great guy, don't you think? Ryan is such a great guy, don't you think? Ryan is such a great guy, don't you think?"))})
    }

    private _onPressBack = () => {
        this._navigator.pop();
    }
}

export = App;
