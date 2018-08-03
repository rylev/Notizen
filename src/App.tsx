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
    notes: {[key: string]: Note}
    currentNoteId: string | undefined
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
        this.state = {notes: {}, currentNoteId: undefined}
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
                return <NotesList notes={ notes(this.state.notes) } onPressCreateNote={ this._onPressCreateNote} onPressNavigate={ this._onPressNavigate } />;

            case NavigationRouteId.NoteDetail:
                return <NoteDetail 
                note={this.state.notes[this.state.currentNoteId]}
                onNavigateBack={ this._onPressBack }
                onUpdateNote={ this._onUpdateNote }/>;
        }

        return null;
    }

    private _onPressNavigate = (note: Note) => {
        this.setState({currentNoteId: note.id}, () => {
            this._navigator.push({
                routeId: NavigationRouteId.NoteDetail,
                sceneConfigType: Types.NavigatorSceneConfigType.FloatFromBottom
            });
        })
    }

    private _onPressCreateNote = () => {
        const newNote = new Note("Nothing")
        const newNotes = Object.assign({}, this.state.notes, {[newNote.id]: newNote})
        const newState = Object.assign({}, this.state, {notes: newNotes})
        this.setState(newState)
    }

    private _onPressBack = () => {
        this.setState({currentNoteId: undefined})
        this._navigator.pop()
    }

    private _onUpdateNote = (text: string) => {
        const currentNote = this.state.notes[this.state.currentNoteId]
        if (currentNote) {
            const updatedNote = currentNote.setText(text)
            const newNotes = Object.assign({}, this.state.notes, { [updatedNote.id]: updatedNote })
            const newState = Object.assign({}, this.state, { notes: newNotes })
            this.setState(newState)
        }
    }
}

function notes(noteIdToNotes: {[key: string]: Note}): Array<Note> {
    const result = []
    for (let noteId of Object.keys(noteIdToNotes)) {
        const note = noteIdToNotes[noteId]
        result.push(note)
    }
    return result
}

export = App;
