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
    NotesList,
    NoteDetail
}

type AppState = {
    notes: Note[]
    currentNote?: Note
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
            routeId: NavigationRouteId.NotesList,
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
            case NavigationRouteId.NotesList:
                return <NotesList notes={this.state.notes} onPressCreateNote={ this._onPressCreateNote} onPressNavigate={ this._onPressNavigate } />;

            case NavigationRouteId.NoteDetail:
                return <NoteDetail note={this.state.currentNote!!} onNavigateBack={ this._onPressBack } />;
        }

        return null;
    }

    private _onPressNavigate = (note: Note) => {
        this.setState({currentNote: note}, () => {
            this._navigator.push({
                routeId: NavigationRouteId.NoteDetail,
                sceneConfigType: Types.NavigatorSceneConfigType.FloatFromRight
            });
        })
    }

    private _onPressCreateNote = () => {
        this.setState({notes: this.state.notes.concat(new Note(Math.random().toString(36).substring(7)))})
    }

    private _onPressBack = () => {
        this.setState({currentNote: undefined})
        this._navigator.pop();
    }
}

export = App;
