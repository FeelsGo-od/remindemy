import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "./usersSlice";

export default function Topic ({id}) {
    const [openPopup, setOpenPopup] = useState(null)
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

    let images;

    const handlePopupOpen = (e) => {
        setOpenPopup(e.target.src)
    }
    const handlePopupClose = () => {
        setOpenPopup(null)
    }

    if(topic.imageURLs) {
        images = Object.entries(topic.imageURLs).map((img, i) => {
            return (
                <div key={i}>
                    <img onClick={(e) => handlePopupOpen(e)} className="topic-img" src={img[1].url} />
                </div>
            )
        })
    }
    
    return (
        openPopup ? (
            <div className="imgPopup">
                <div className="container">
                    <button onClick={handlePopupClose} className="popup-close-btn">x</button>
                    <img src={openPopup} alt="full screen image" />
                </div>
            </div>
        ) : (
            <div className="pt-23 pl-23 align-left">
                <h1>Current topic</h1>
                <div>
                    <p>{topic.text}</p>
                    <a href={`//${topic.link}`}>{String(topic.link)}</a>
                    <p className="pt-23">(Click image to open it on full screen)</p>
                    <div className="topicImgs-block">
                        {images ? images : ''}
                    </div>
                </div>
                <b>{topic.date}</b>
            </div>
        )
    )
}