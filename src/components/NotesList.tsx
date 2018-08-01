import RX = require('reactxp')
import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview'
import Note from '../models/Note'
import { start } from 'repl';

interface NotesListProps {
    notes: Note[],
    onPressNavigate: () => void
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

class NotesList extends RX.Component<NotesListProps, null> {
    private _translationValue: RX.Animated.Value
    private _animatedStyle: RX.Types.AnimatedTextStyleRuleSet

    constructor(props: NotesListProps) {
        super(props)

        this._translationValue = RX.Animated.createValue(-100)
        this._animatedStyle = RX.Styles.createAnimatedTextStyle({
            transform: [
                {
                    translateY: this._translationValue
                }
            ]
        })
    }

    componentDidMount() {
        const animation = RX.Animated.timing(this._translationValue, {
              toValue: 0,
              easing: RX.Animated.Easing.OutBack(),
              duration: 500
            }
        )

        animation.start()
    }

    render() {
        const itemList = this.props.notes.map((note, i) => {
            return new NoteItem(i.toString(), note)
        })
        const listStyle = RX.Styles.createViewStyle({
            flex: 1
        })
        const buttonStyle = RX.Styles.createButtonStyle({
            width: 60,
            height: 60,
            borderRadius: 30,
            marginLeft: 12,
            marginTop: -80,
            marginBottom: 8,
            backgroundColor: '#eef7ff',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#ccc',
            shadowRadius: 4
        })
        const buttonTextStyle = RX.Styles.createTextStyle({
            color: '#0078d7',
            fontSize: 24
        })

        return (
            <RX.View id={ "NoteList" } style={ listStyle }>
                <VirtualListView
                    itemList={itemList}
                    renderItem={this._renderItem}
                    animateChanges={true}
                    skipRenderIfItemUnchanged={true}
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
            <RX.View id={ "NoteItem" } style={ viewStyle }>
                <RX.Text>
                    { item.note.text }
                </RX.Text>
            </RX.View>
        );
    }

    private _onNewNote = () => {
        this.props.onPressCreateNote()
    }
    
    private _onPressNavigate = () => {
        this.props.onPressNavigate()
    }
}

export default NotesList
