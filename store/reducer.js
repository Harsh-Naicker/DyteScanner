const initialState = {
    user: {
        uid: 'guest'
    },
    img: {}
}

export const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.payload}
        case 'SET_IMAGE':
            return {...state, img: action.payload}
        
    }
}