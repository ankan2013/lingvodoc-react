import { combineReducers } from "redux";

// Actions
export const OPEN_BLOBS = "@blobs/OPEN_BLOBS";
export const CLOSE_BLOBS = "@blobs/CLOSE_BLOBS";

export const openBlobsModal = (dictionary, blobs) => ({
  type: OPEN_BLOBS,
  payload: {
    dictionary,
    blobs
  }
});

export const closeBlobsModal = () => ({ type: CLOSE_BLOBS });

const visible = (state = false, action) => {
  switch (action.type) {
    case OPEN_BLOBS:
      return true;
    case CLOSE_BLOBS:
      return false;
    default:
      return state;
  }
};

const blobs = (state = [], action) => {
  switch (action.type) {
    case OPEN_BLOBS:
      return action.payload.blobs;
    default:
      return state;
  }
};

const dictionary = (state = null, action) => {
  switch (action.type) {
    case OPEN_BLOBS:
      return action.payload.dictionary;
    default:
      return state;
  }
};

export default combineReducers({
  dictionary,
  blobs,
  visible
});
