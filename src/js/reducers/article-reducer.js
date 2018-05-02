const initialState = {
  articles: [],
}

const articleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_ARTICLE':
      return {
        ...state,
        articles: [...state.articles, payload]
      };

    default:
      return state;
  }
}

export default articleReducer;