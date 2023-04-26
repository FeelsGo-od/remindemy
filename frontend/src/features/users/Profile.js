import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { fetchUsers } from "./usersSlice";
import AddTopicById from "./AddTopicById";

export default function Profile ({id}) {
    // *** this code is not "dry" -> ps. refactor it
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const usersStatus = useSelector(state => state.users.status)
    const dataFetchedRef = useRef(false)

    useEffect(() => {
        if(dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        if(usersStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, [usersStatus, dispatch])

    let topics
    const currentUser = useSelector(state => [...state.users.users].find(user => user._id === id))
    let userData

    if(usersStatus === 'loading') {
        topics = 'Loading...'
    } else if (usersStatus === 'succeeded') {
        console.log(currentUser.topics);
        if(currentUser.topics.length !== 1) {
            topics = currentUser.topics.map((topic) => 
                <div>
                    <a href={`topics/${topic.id}`}>{topic.text}</a>
                </div>
            )
        } else {
            topics = `You do not have topics at the moment`
        }

        userData = {
            name: currentUser.name,
            email: currentUser.email
        }
    }

    return (
        <div className="pt-23 pl-23 align-left">
            {userData 
            ? 
            <div>
                <p><b>Name:</b> {userData.name}</p>
                <p><b>Email:</b> {userData.email}</p>
            </div> : ''}
            <div className="pt-23">
                {topics}
            </div>
            <AddTopicById id={id} />
        </div>
    )
}