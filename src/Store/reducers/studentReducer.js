const studentReducer = (state={}, action) => {
    switch(action.type){
        case 'SUSPEND_STUDENT': {
            console.log('SUSPENDED STUDENT')
            return state
        }
        default: 
        return state;
    }
}

export default studentReducer;


