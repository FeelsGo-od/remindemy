import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "./usersSlice";

export default function Topic ({id}) {
    const userId = JSON.parse(localStorage.getItem('userId'))

    const dispatch = useDispatch()

    const usersStatus = useSelector(state => state.users.status)
    const dataFetchedRef = useRef(false)

    useEffect(() => {
        if(dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        if(usersStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, [usersStatus, dispatch])

    let topic
    const currentUser = useSelector(state => [...state.users.users].find(user => user._id === userId))
    
    if(usersStatus === 'loading') {
        topic = 'Loading...'
    } else if (usersStatus === 'succeeded') {
        topic = currentUser.topics.find(topic => topic.topicId === id)
    } else {
        topic = 'Error'
    }
    
    return (
        <div className="pt-23 pl-23 align-left">
            <h1>Current topic</h1>
            <div>
                <p>{topic.text}</p>
                <a href={`//${topic.link}`}>{String(topic.link)}</a>
            </div>
            <b>{topic.date}</b>
        </div>
    )
}