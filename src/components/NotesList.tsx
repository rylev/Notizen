import RX = require('reactxp')
import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview'
import Note from '../models/Note'

interface NotesListProps {
    notes: Note[],
    onPressNavigate: (note: Note) => void
    onPressCreateNote: () => void
}

class NoteItem implements VirtualListViewItemInfo {
    height = 80
    measureHeight = true
    template = 'note'
    key: string
    readonly note: Note
    constructor(key: string, note: Note) {
        this.key = key
        this.note = note
    }
}

const listStyle = RX.Styles.createViewStyle({
    backgroundColor: '#fff',
    flex: 1
})
const buttonStyle = RX.Styles.createButtonStyle({
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    marginTop: -80,
    marginBottom: 8,
    backgroundColor: '#eef7ff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    shadowColor: '#ccc',
    shadowRadius: 4
})
const buttonTextStyle = RX.Styles.createTextStyle({
    color: '#0078d7',
    fontSize: 24
})

class NotesList extends RX.Component<NotesListProps, null> {
    render() {
        const itemList = this.props.notes.map((note, i) => {
            return new NoteItem(i.toString(), note)
        })
        return (
            <RX.View id={ "NoteList" } style={ listStyle }>
                <VirtualListView
                    itemList={itemList}
                    renderItem={this._renderItem}
                    animateChanges={true}
                    skipRenderIfItemUnchanged={false}
                >
                </VirtualListView>
                <RX.Button 
                    style={ buttonStyle }
                    onPress={this.props.onPressCreateNote} >
                    <RX.Text style= { buttonTextStyle } >+</RX.Text>
                </RX.Button>
            </RX.View>
        )
    }

    private _renderItem = (item: NoteItem, hasFocus?: boolean) => {
        const viewStyle = RX.Styles.createViewStyle({
            minHeight: 20,
            backgroundColor: '#eef9ec',
            borderColor: '#99d694',
            borderWidth: 1,
            borderTopWidth: 8,
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginHorizontal: 8,
            marginVertical: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 5
        }, false);

        return (
            <RX.View id={ "NoteItem" } onPress={ _ => this.props.onPressNavigate(item.note) } style={ viewStyle }>
                <RX.Text>
                    { item.note.text }
                </RX.Text>
            </RX.View>
        );
    }
    
}

export default NotesList
