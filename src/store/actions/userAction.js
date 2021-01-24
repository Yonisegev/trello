import { userService } from "../../services/userService";

export function setUser(user, isNewUser, isGoogle) {
  return async (dispatch) => {
    let loggedUser;
    try {
      console.log("from action", user);
      if (isNewUser) loggedUser = await userService.signup(user, isGoogle);
      else loggedUser = await userService.login(user);
      if (!loggedUser) throw new Error("error");
      delete loggedUser.password;
      const action = {
        type: "SET_USER",
        loggedUser,
      };
      dispatch(action);
    } catch (err) {
      console.log("had problem seting the user", err);
    }
  };
}

export function clearUser() {
  return (dispatch) => {
    const action = {
      type: "CLEAR_USER",
    };
    dispatch(action);
  };
}
