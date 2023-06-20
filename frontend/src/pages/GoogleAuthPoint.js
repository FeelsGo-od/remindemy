import React from 'react'
import { useDispatch } from 'react-redux'

import { retrieveGoogleAuthToken } from '../features/users/usersSlice'

export default function GoogleAuthPoint() {
    const dispatch = useDispatch()
    const code = window.location.search.slice(6)
    console.log(code)

    dispatch(retrieveGoogleAuthToken({ code })).then((result) => {
        console.log(result)
    })

  return (
    <div>GoogleAuthPoint</div>
  )
}
