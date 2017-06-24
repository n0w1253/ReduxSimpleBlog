import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions'   //samse as ../actions/index
import _ from 'lodash'


export default function(state = {}, action) {
    switch (action.type) {
        case DELETE_POST:
            return _.omit(state, action.payload)  //drop by key return a new state object

        case FETCH_POSTS:
            //console.log(action.payload); // [ post1, post2]
            // { 4: post }
            return _.mapKeys(action.payload, 'id')

        case FETCH_POST:
            //ES5
         //   const post = action.payload
         //   const newState ={ ....state}
         //   newState[post.id] = post
         //   return newState
            return { ...state, [action.payload.id]:action.payload}  //ES6


        default:
            return state;
    }
}

