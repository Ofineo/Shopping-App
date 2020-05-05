import { AsyncStorage } from "react-native";
// export const SIGN_UP = "SIGN_UP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, token: token, userId: userId };
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9hTLLxMl2bs5tnQwg2469PJHv4pnUVZI`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message;
      switch (errorId) {
        case "EMAIL_EXISTS":
          message = "this email is already in use";
          throw new Error(message);
        default:
          message = "Something went wrong!";
          throw new Error(message);
      }
    }

    const resData = await response.json();

    dispatch(authenticate(resData.localId, resData.idToken));
    //save to internal storage
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};
export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9hTLLxMl2bs5tnQwg2469PJHv4pnUVZI`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message;
      switch (errorId) {
        case "EMAIL_NOT_FOUND":
          message = "this email could not be found!";
          throw new Error(message);
        case "INVALID_PASSWORD":
          message = "Password is not correct muppet";
          throw new Error(message);
        default:
          message = "Something went wrong!";
          throw new Error(message);
      }
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(authenticate(resData.localId, resData.idToken));
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
