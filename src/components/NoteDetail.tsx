import RX = require('reactxp')

type NoteDetailProps = {
    onNavigateBack: () => void
}
type NoteDetailState  = {}

const styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
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
                <RX.Text style={styles.text}>
                    Hello world
                </RX.Text>
                <RX.Button style={styles.roundButton} onPress={this._onPressBack}>
                    <RX.Text style={styles.buttonText}>
                        Go Back
                    </RX.Text>
                </RX.Button>
            </RX.View>
        )
    }

    private _onPressBack = () => {
        this.props.onNavigateBack()
    }

}

export default NoteDetail