import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsersList } from '../../store/actions/User';
import { PostItemAccordion } from './PostItemAccordion';
const PostsList = () => {

    const UsersList = useSelector(state => state.user) 
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getUsersList())
    },[dispatch])

    return (
        <div>
            { UsersList?.map(user=>{
                return <PostItemAccordion key={user?.uid} user={user}/>

            })}
        </div>
    )
}

export default PostsList
