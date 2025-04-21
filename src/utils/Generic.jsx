export const reducer = (state, action) => {
  switch (action.type) {
    case "pagesize":
      return { ...state, pagesize: action.value };
    case "pageno":
      return { ...state, pageno: action.value };
    case "search":
      return { ...state, ...action.value };
    default:
      return state;
  }
};

export const userDetails = (propName = null) => {
  let UserInfo = localStorage.getItem("UserData");
  UserInfo = UserInfo ? JSON.parse(UserInfo) : null;
  if (!UserInfo) return null;
  return propName ? UserInfo[propName] : UserInfo;
};
