import {GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, ADD_FRIEND_ERROR, ADD_FRIEND_SUCCESS, GET_PROFILES, GET_POSTS, ADD_POST} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  posts:[],
  loading:true,
  error:{}
}

export default function(state = initialState, action){
  const {type, payload} = action;
  switch(type){
    case GET_PROFILE:
      return{
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return{
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return{
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return{
        ...state,
        profile:null,
        posts: [],
        loading: false
      }
    case GET_POSTS:
      return{
        ...state,
        posts: payload,
        loading: false
      }
    case ADD_POST:
    return{
      ...state,
      posts:[payload, ...state.posts],
      loading:false
    }
    case ADD_FRIEND_SUCCESS:
     return{
       ...state
     }
   case ADD_FRIEND_ERROR:
     return{
       ...state
     }
    default:
      return state;
  }
}
