const initialState = {
    suspend: '',
    edited: '',
    upload: '',
}


const studentReducer = (state= initialState, action) => {
    switch(action.type){
        case 'SUSPEND_STUDENT_SUCESSS': {
            return {
                ...state,
                suspend: action.suspend,
            }
        };
        case 'SUSPEND_ERROR': {
            return{
                ...state,
                suspend: action.error            
            }
        };
        case 'STUDENT_UPDATE_FAILED': {
            return{
                ...state,
                edited: action.error
            }
        };
        case 'STUDENT_UPDATED': {
            return{
                ...state,
                edited: action.success
            }
        };
        case 'IMAGE_UPLOADED': {
            return{
                ...state,
                upload: action.success
            }
        };
        case 'IMAGE_UPLOAD_ERROR': {
            return{
                ...state,
                upload: action.error
            }
        };
        default: 
        return state;
    }
}

export default studentReducer;


