export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";

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

    dispatch({
      type: SIGN_UP,
      token: resData.idToken,
      userId: resData.localId,
    });
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
    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
  };
};
