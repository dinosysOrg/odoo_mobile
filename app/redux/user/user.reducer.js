// The default user state.
let userState = {
  data: [],
  error: null,
  page: 0,
  limit: 10,
  isLoading: false,
  isFinish: false
};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case "RESET_ALL_DATA":
      return {
        ...userState
      };
    case "LOADING_USER":
      return {
        ...state,
        isLoading: true
      };
    case "RESET_USER_DATA":
      return {
        ...state,
        data: [],
        page: 0,
        isLoading: false,
        isFinish: false
      };
    case "LOAD_USER_SUCCESSFULLY":
      if (action.page > 0 && action.data.length == 0) {
        return {
          ...state,
          isLoading: false,
          isFinish: true
        };
      }
      let currentPage = ++action.page;
      let userList = [...state.data, ...action.data];
      return {
        ...state,
        data: userList,
        isLoading: false,
        page: currentPage
      };
    case "LOAD_USER_FAILURE":
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
  }
  return state;
};

export default userReducer;
