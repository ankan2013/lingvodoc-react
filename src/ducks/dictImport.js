import { OrderedMap, Map, Set, List, fromJS, is } from 'immutable';

// Actions
const SET_BLOBS = '@import/SET_BLOBS';
const LINKING_SELECT = '@import/LINKING_SELECT';
const LINKING_SET_COLUMN = '@import/LINKING_SET_COLUMN';

// Reducers
function replaceSelect(state, payload) {
  const id = fromJS(payload);
  const blob = state.get('blobs').find(x => is(x.get('id'), id));
  return state.set('linking', new OrderedMap([[id, blob]]));
}

function addBlobSelect(state, payload) {
  const id = fromJS(payload);
  const blob = state.get('blobs').find(x => is(x.get('id'), id));
  return state.setIn(['linking', id], blob);
}

function setColumn(state, { id, column, value }) {
  let subState = state;

  if (value && value.includes('/')) {
    subState = addBlobSelect(state, value.split('/').map(x => parseInt(x, 10)));
  }
  return subState.setIn(['linking', id, 'values', column], value);
}

function updateSingleSpread(result, blob) {
  const spreadColumns = blob
    .get('values')
    .filter(value => value === 'spread')
    .keySeq()
    .map(column => new Map({
      from: blob.get('id'),
      column,
    }));
  const spreadTo = blob
    .get('values')
    .filter(value => value && value.includes('/'))
    .valueSeq()
    .map(value => fromJS([
      parseInt(value.split('/')[0], 10),
      parseInt(value.split('/')[1], 10),
    ]));

  return result.withMutations((map) => {
    spreadTo.forEach((id) => {
      if (!map.get(id, false)) {
        map.set(id, new Set());
      }
      map.update(
        id,
        v => v.withMutations(set => spreadColumns.forEach(col => set.add(col)))
      );
    });
  });
}

function cleanLinking(state, linkedTo) {
  const first = state.get('linking').first();

  return state.update(
    'linking',
    v => v.filter((blob, id) => is(blob, first) || linkedTo.includes(id))
  );
}

function updateSpread(state) {
  const extractedSpreads = state.get('linking').reduce(
    (acc, blob) => updateSingleSpread(acc, blob),
    new Map()
  );

  return cleanLinking(
    state.set('spreads', extractedSpreads),
    extractedSpreads.keySeq().toSet()
  );
}

const initial = new Map({
  step: 'LINKING',
  blobs: new List(),
  linking: new OrderedMap(),
  spreads: new Map(),
});

export default function (state = initial, { type, payload }) {
  let newState = state;
  switch (type) {
    case SET_BLOBS:
      newState = initial.set('blobs', payload);
      break;
    case LINKING_SELECT:
      newState = replaceSelect(state, payload);
      break;
    case LINKING_SET_COLUMN:
      newState = setColumn(state, payload);
      break;
    default:
      newState = state;
  }

  return updateSpread(newState);
}

// Action Creators
export function setBlobs(payload) {
  return { type: SET_BLOBS, payload };
}

export function linkingSelect(payload) {
  return { type: LINKING_SELECT, payload };
}

export function updateColumn(id, column, value, oldValue) {
  return {
    type: LINKING_SET_COLUMN,
    payload: {
      id, column, value, oldValue,
    },
  };
}
