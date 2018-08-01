import RX = require('reactxp')
import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview'
import Note from '../models/Note'

interface NotesListProps {
    notes: Note[],
    onPressNavigate: () => void
}

class NoteItem implements VirtualListViewItemInfo {
    height = 20
    template = 'foo'
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
        console.log(itemList)
        return (
            <VirtualListView
                itemList={itemList}
                renderItem={this._renderItem}
                animateChanges={true}
                skipRenderIfItemUnchanged={true}
            />
        )
    }

    private _renderItem = (item: NoteItem, hasFocus?: boolean) => {
        const viewStyle = RX.Styles.createViewStyle({
            height: item.height,
            backgroundColor: '#ddd',
            alignItems: 'center'
        }, false);

        return (
            <RX.View style={ viewStyle }>
                <RX.Text>
                    { item.note.text }
                </RX.Text>
            </RX.View>
        );
    }
    
    private _onPressNavigate = () => {
        this.props.onPressNavigate()
    }
}

export default NotesList
