/*
* This file demonstrates a basic ReactXP app.
*/
// This example uses ExperimentalNavigation on iOS and Android
import Navigator, { Types, NavigatorDelegateSelector as DelegateSelector } from 'reactxp-navigation';
import RX = require('reactxp');

import AppContainer from './components/AppContainer'
import Note from './models/Note'

enum NavigationRouteId {
    NotesList,
    NoteDetail
}

const styles = {
    // Standard navigator style should be an object. So we have to disable caching here.
    navCardStyle: RX.Styles.createViewStyle({
        backgroundColor: '#f00',
    }, false)
};

class App extends RX.Component<{}> {
    private _navigator: Navigator;

    constructor(props: {}) {
        super(props);
        console.log("App.constructor()")
    }

    componentDidMount() {
        console.log("App.render()")
        this._navigator.immediatelyResetRouteStack([{
            routeId: NavigationRouteId.NotesList,
            sceneConfigType: Types.NavigatorSceneConfigType.Fade
        }]);
    }

    render() {
        console.log("App.render()")
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
        console.log("App._renderScene()")
        return (
            <AppContainer
                navigatorRoute={ navigatorRoute }
                onPressNavigate={ this._onPressNavigate }
                onPressBack={ this._onPressBack }
            />
        )
    }

    private _onPressNavigate = (note: Note) => {
        this.setState({currentNoteId: note.id}, () => {
            this._navigator.push({
                routeId: NavigationRouteId.NoteDetail,
                sceneConfigType: Types.NavigatorSceneConfigType.FloatFromBottom
            });
        })
    }

    private _onPressBack = () => {
        this.setState({currentNoteId: undefined})
        this._navigator.pop()
    }
}

export = App;
