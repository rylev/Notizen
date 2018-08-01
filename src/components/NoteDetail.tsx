import RX = require('reactxp')

import Note from '../models/Note'

type NoteDetailProps = {
    note: Note,
    onNavigateBack: () => void
}
type NoteDetailState  = {}

const styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    }),
    header: RX.Styles.createViewStyle({
        flexDirection: 'row',
        justifyContent: 'flex-start'

    }),
    roundButton: RX.Styles.createViewStyle({
        margin: 16,
        borderRadius: 16,
        backgroundColor: '#7d88a9'
    }),
    text: RX.Styles.createTextStyle({
        fontSize: 48,
        marginVertical: 6,
        marginHorizontal: 12,
        color: 'black'
    }),
    buttonText: RX.Styles.createTextStyle({
        fontSize: 16,
        marginVertical: 6,
        marginHorizontal: 12,
        color: 'white'
    })
}

class NoteDetail extends RX.Component<NoteDetailProps, NoteDetailState> {
    constructor(props: NoteDetailProps) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <RX.View style={styles.container} useSafeInsets={true}>
                <RX.View id={"header"} style={styles.header} >
                    <RX.Button style={styles.roundButton} onPress={this._onPressBack}>
                        <RX.Text style={styles.buttonText}>
                            Go Back
                        </RX.Text>
                    </RX.Button>
                </RX.View>
                <RX.View style={styles.container} >
                    <RX.Text style={styles.text}>
                        {this.props.note.text}
                    </RX.Text>
                </RX.View>
            </RX.View>
        )
    }

    private _onPressBack = () => {
        this.props.onNavigateBack()
    }

}

export default NoteDetail