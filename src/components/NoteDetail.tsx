import RX = require('reactxp')

import Note from '../models/Note'

type NoteDetailProps = {
    note: Note,
    onNavigateBack: () => void
    onUpdateNote: (text: string) => void
}
type NoteDetailState  = {}

const styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
    }),
    header: RX.Styles.createViewStyle({
        flexDirection: 'row',
        backgroundColor: '#5f5f5f',
        justifyContent: 'space-between',
        paddingBottom: 30,
    }),
    backButton: RX.Styles.createViewStyle({
        margin: 16,
        borderRadius: 16,
    }),
    overflowButton: RX.Styles.createViewStyle({
        margin: 16,
        borderRadius: 16,
    }),
    overflowButtonText: RX.Styles.createTextStyle({
        fontSize: 24,
        marginVertical: 6,
        marginHorizontal: 12,
        color: 'white'
    }),
    backButtonText: RX.Styles.createTextStyle({
        fontSize: 24,
        marginVertical: 6,
        marginHorizontal: 12,
        color: 'white'
    }),
    noteBody: RX.Styles.createViewStyle({
        marginTop: -30,
        paddingTop: 30,
        paddingHorizontal: 30,
        backgroundColor: '#eef9ec',
        borderTopWidth: 10,
        borderColor: '#99d694',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        flex: 1,
    }),
    text: RX.Styles.createTextStyle({
        flex: 1,
        fontSize: 24,
        marginVertical: 6,
        marginHorizontal: 12,
        color: 'black',
        backgroundColor: '#eef9ec'
    }),
    timeBar: RX.Styles.createViewStyle({
        backgroundColor: '#eef9ec',
        borderTopWidth: 1,
        justifyContent: 'center',
        height: 80,
        borderColor: '#5f5f5f',
    }),
    timeBarText: RX.Styles.createTextStyle({
        textAlign: 'center',
        color: '#5f5f5f',
        fontSize: 18,
    })
}

class NoteDetail extends RX.Component<NoteDetailProps, NoteDetailState> {
    constructor(props: NoteDetailProps) {
        super(props)

        this.state = {}
    }

    header(): JSX.Element {
        return (
            <RX.View id={"header"} style={styles.header} >
                <RX.Button style={styles.backButton} onPress={this._onPressBack}>
                    <RX.Text style={styles.backButtonText}>
                        ∨
                    </RX.Text>
                </RX.Button>
                <RX.Button style={styles.overflowButton}>
                    <RX.Text style={styles.overflowButtonText}>
                        ...
                    </RX.Text>
                </RX.Button>
            </RX.View>
        )
    }

    footer(): JSX.Element {
        return (
            <RX.View style={styles.timeBar} >
                <RX.Text style={styles.timeBarText}>
                    11.April 2018 12:10 AM
                </RX.Text>
            </RX.View>
        )
    }

    noteBody(): JSX.Element {
        return (
            <RX.View style={styles.noteBody} >
                <RX.TextInput multiline={true} style={styles.text} value={this.props.note.text} onChangeText={this._onChangeText}>
                </RX.TextInput>
            </RX.View>
        )
    }

    render(): JSX.Element {
        return (
            <RX.View style={styles.container} useSafeInsets={true}>
                {this.header()}
                {this.noteBody()}
                {this.footer()}
            </RX.View>
        )
    }

    private _onPressBack = () => {
        this.props.onNavigateBack()
    }

    private _onChangeText = (newValue: string) => {
        this.props.onUpdateNote(newValue)
    }
}

export default NoteDetail