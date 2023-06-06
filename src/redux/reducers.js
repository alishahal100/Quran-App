// reducers.js
import { SET_SELECTED_SURAH,SET_SELECTED_Modal_SURAH } from './action';

const initialState = {
  selectedSurah: null,
  selectedModalSurah:null
}

const surahReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_SURAH':
      return {
        ...state,
        selectedSurah: action.payload
      }
    
    default:
      return state
  }
}

export default surahReducer;
