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

const styles = {
    // Standard navigator style should be an object. So we have to disable caching here.
    navCardStyle: RX.Styles.createViewStyle({
        backgroundColor: '#f00',
    }, false)
};

class App extends RX.Component<{}, null> {
    private _navigator: Navigator;
    private _notes: Note[] = []

    constructor(props: {}) {
        super(props);
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
                return <NotesList notes={this._notes} onPressNavigate={ this._onPressNavigate } />;

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

    private _onPressBack = () => {
        this._navigator.pop();
    }
}

export = App;
