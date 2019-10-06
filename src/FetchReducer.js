import React , {useReducer ,useEffect} from 'react'
import axios from 'axios'

const INITIAL_STATE = {
    loading : true,
    error : '',
    post:{}
}

const Reducer = (state,action) => {
    switch(action.type)
    {
        case "FETCH_DATA":
            return {
                loading : false,
                error : '',
                post : action.payload
            }
        case "ERROR":
            return{
                loading:false,
                error: 'SomeThing Went Wrong',
                post : {}
                
            }    
    }
}

function FetchReducer() {

    const [state, dispatch] = useReducer(Reducer , INITIAL_STATE)

    useEffect ( () => {
        axios.get('https://jsonplaceholder.typicode.com/posts/1')
        .then(response =>
            dispatch({type : "FETCH_DATA" , payload : response.data})
            )
        .catch(error =>
            dispatch({type:"ERROR" })
            )
    },[])
    return (
        <div>
            <p> { state.loading ? 'Loading..' : state.post.title } </p>
            { state.error ? state.error : null }
        </div>
    )
}

export default FetchReducer