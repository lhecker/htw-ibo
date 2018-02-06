import Immutable from "immutable";

import * as actions from "../actions";

const HistorizedState = Immutable.Record({
    history: Immutable.List([]),
    current: undefined,
    previewIndex: undefined,
});

export default function historize(reducer) {
    return (state = HistorizedState(), action) => {
        if (action.type === actions.PREVIEW_STATE) {
            return state.withMutations(s => {
                s.current = s.history.get(action.index);
                s.previewIndex = action.index;
            });
        }

        const oldState = state.current;
        const newState = reducer(oldState, action);

        if (oldState === newState) {
            return state;
        }

        return state.withMutations(s => {
            s.current = newState;

            if (s.previewIndex !== undefined) {
                s.history = s.history.splice(
                    s.previewIndex + 1,
                    Infinity,
                    newState
                );
                s.previewIndex = undefined;
            } else {
                s.history = s.history.push(newState);
            }
        });
    };
}
