import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { nanoid } from 'nanoid'

import { addUsersTopic, deleteImageFromCloudinary } from "./usersSlice";

export default function AddTopicById ({id}) {
    const [text, setText] = useState('')
    const [imageList, setImageList] = useState([])
    const [imageURLs, setImageURLs] = useState([])
    const [link, setLink] = useState('')

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
            let images = [];
            cloudinaryRef.current = window.cloudinary;
            widgetRef.current = cloudinaryRef.current.createUploadWidget({
                cloudName: 'dillpvxn8',
                uploadPreset: 'remindemyTopicsImages',
            }, (error, result) => { 
                if(error) console.log(error)
                if(result.info['secure_url']) {
                    images = [...images, {"url": result.info['secure_url'], "id": result.info['public_id']}]
                    setImageURLs(images)
                }
                // if(result.event === 'close') {
                //     setImageURLs([])
                //     images = []
                // }
            });

    }, [])

    const dispatch = useDispatch()

    const handleImagesChange = () => {
        widgetRef.current.open()
    }

    const deleteCurrentImg = async (id) => {
        dispatch(deleteImageFromCloudinary(id))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageList) return;

        try {
            const topicId = nanoid();
            const date = new Date().toLocaleDateString();
            console.log(imageURLs)
            dispatch(addUsersTopic({id, topicId, text, imageURLs, link, date}))
            window.location.reload()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="form w-40 mg-none">
                <div className="form-block form-input">
                    <label htmlFor="text">Enter the text u want to remember: </label>
                    <textarea onChange={(e) => setText(e.target.value)} value={text} name="text" rows="15" cols="53"></textarea>
                </div>
                <div className="form-block">
                    <p>Add images u want to study later:</p>
                    <p onClick={handleImagesChange}>Upload images</p>
                    <div className="form-uploaded-images">
                        { imageURLs.map(image => <div><img key={image.id} src={image.url} id={image.id} className="form-uploaded-img" /><p onClick={() => deleteCurrentImg(image.id)}>Delete image</p></div>) }
                    </div>
                </div>
                <div className="form-block form-input">
                    <label htmlFor="link">Add the link to repeat it later: </label>
                    <input onChange={(e) => setLink(e.target.value)} type="text" name="link" id="link" />
                </div>
                <div className="form-block">
                    <input className="button" type="submit" value="Add Topic" />
                </div>
            </form>
        </>
    )
}