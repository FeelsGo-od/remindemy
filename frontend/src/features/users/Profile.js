import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "./usersSlice";
import AddTopicById from "./AddTopicById";

export default function Profile ({id, email}) {
    // *** this code is not "dry" -> ps. refactor it
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

    let topics
    const currentUser = useSelector(state => [...state.users.users].find(user => user._id === id))
    let userData

    if(usersStatus === 'loading') {
        topics = 'Loading...'
    } else if (usersStatus === 'succeeded') {
        if(currentUser.topics.length !== 0) {
            topics = currentUser.topics.map((topic) => 
                <div key={topic.topicId}>
                    <a href={`topics/${topic.topicId}`}>{topic.text}</a>
                    <span> {topic.date}</span>
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
        <div className="pt-23 pl-23 profile-content">
            {userData 
            ? 
            <div>
                <p><b>Name:</b> {userData.name}</p>
                <p><b>Email:</b> {userData.email}</p>
            </div> : ''}
            <div className="flex mt-23 wrap gap-23">
                <AddTopicById id={id} email={email} />
                <div className="pt-23 w-40 topics-container">
                    <h3>All Topics:</h3>
                    {topics}
                </div>
            </div>
        </div>
    )
}