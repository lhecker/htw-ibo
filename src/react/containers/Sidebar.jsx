import React from "react";
import { connect } from "react-redux";

import { previewState } from "../actions";

class Sidebar extends React.PureComponent {
    state = {
        history: undefined,
        historyIndex: 1,
    };

    componentWillReceiveProps(props) {
        if (this.state.history !== props.history) {
            this.setState({
                history: props.history,
                historyIndex: props.history.size - 1,
            });
        }
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="history">History ({this.maxValue + 1} entries)</label>
                    <input id="history" className="form-control" type="range" min="0" max={this.maxValue} value={this.state.historyIndex} onChange={this.onChange} />
                    <small className="form-text text-muted">Currently viewing entry {this.state.historyIndex + 1}</small>
                </div>
            </form>
        );
    }

    get maxValue() {
        return this.props.history.size - 1;
    }

    onChange = event => {
        const index = event.target.valueAsNumber;

        this.setState({ historyIndex: index });
        this.props.previewState(index);
    };
}

function mapStateToProps(state) {
    return {
        history: state.history,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        previewState(index) {
            dispatch(previewState(index));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
