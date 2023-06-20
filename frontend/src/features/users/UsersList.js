import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./usersSlice";

export default function UsersList () {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    const usersStatus = useSelector(state => state.users.status)
    const dataFetchedRef = useRef(false)

    useEffect(() => {
        if(dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        if(usersStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, [usersStatus, dispatch])

    let listUsers

    if(usersStatus === 'loading') {
        listUsers = 'Loading...'
    } else if (usersStatus === 'succeeded') {
        listUsers = users.users.slice().map((user) => (
            <p key={user._id}>{user.name}</p>
        ))
    }

    return (
        <>
            <div className="users-content">
                <h3 className="title">{listUsers && listUsers.length} Users using this app:</h3>
                {listUsers}
            </div>
        </>
    )
}