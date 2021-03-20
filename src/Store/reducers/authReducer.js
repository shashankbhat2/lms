const initState = {
    authError: null,
    authSuccess: null
  }
  
  const authReducer = (state = initState, action) => {
    switch(action.type){
      case 'LOGIN_ERROR':
        return {
          ...state,
          authError: action.err.message === "The password is invalid or the user does not have a password." ? "Invalid Password" : 'Try Again Later'
        }
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          authError: null,
          authSuccess: 'Login Success'
        }
  
      case 'SIGNOUT_SUCCESS':
        return state;
        
      case 'SIGNUP_SUCCESS':
        return {
          ...state,
          authError: null,
          authSuccess: 'Signup Success'
        }
  
      case 'SIGNUP_ERROR':
        return {
          ...state,
          authError: action.err.message
        }
  
      default:
        return state
    }
  };
  
  export default authReducer;
  