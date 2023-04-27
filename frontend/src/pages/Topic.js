import React from "react";
import { useParams } from 'react-router-dom'

import TopicById from '../features/users/TopicById'

export default function Topic () {
    const params = useParams();

    return (
        <div className="pt-23 pl-23 align-left">
            <TopicById id={params.id} />
        </div>
    )
}