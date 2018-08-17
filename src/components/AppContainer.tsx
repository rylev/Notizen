import * as RX from 'reactxp'
import Navigator, { Types, NavigatorDelegateSelector as DelegateSelector } from 'reactxp-navigation';
import NotesList from './NotesList'
import NoteDetail from './NoteDetail'
import Note from '../models/Note'

type AppContainerProps = {
    navigatorRoute: Types.NavigatorRoute
    onPressNavigate: (note: Note) => void
    onPressBack: () => void
}

type AppContainerState = {
    notes: {[key: string]: Note}
    currentNoteId: string | undefined
}

enum NavigationRouteId {
    NotesList,
    NoteDetail
}

class AppContainer extends RX.Component <AppContainerProps, AppContainerState> {
    constructor(props: AppContainerProps) {
        super(props)
        this.state = {notes: {}, currentNoteId: undefined}
    }

    render () {
        console.log("AppContainer.render()", this.state, this.props)
        switch (this.props.navigatorRoute.routeId) {
            case NavigationRouteId.NotesList:
                return <NotesList notes={ notes(this.state.notes) } onPressCreateNote={ this._onPressCreateNote} onPressNavigate={ this.props.onPressNavigate } />;

            case NavigationRouteId.NoteDetail:
                return <NoteDetail 
                note={this.state.notes[this.state.currentNoteId]}
                onNavigateBack={ this.props.onPressBack }
                onUpdateNote={ this._onUpdateNote }/>;
        }

        return null;
    }

    private _onPressCreateNote = () => {
        const newNote = new Note("Nothing")
        const newNotes = Object.assign({}, this.state.notes, {[newNote.id]: newNote})
        const newState = Object.assign({}, this.state, {notes: newNotes})
        this.setState(newState)
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

export default AppContainer
