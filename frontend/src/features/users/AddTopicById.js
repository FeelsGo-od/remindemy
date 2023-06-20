import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from 'nanoid'

import { addUsersTopic, deleteImageFromCloudinary } from "./usersSlice";

export default function AddTopicById ({id, email}) {
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
        dispatch(deleteImageFromCloudinary({id}))

        const newArray = imageURLs.filter((imageURL) => imageURL.id !== id)
        setImageURLs(newArray)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageList) return;

        try {
            const topicId = nanoid();
            const date = new Date().toLocaleDateString();

            dispatch(addUsersTopic({id, email, topicId, text, imageURLs, link, date}))

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-40">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="form w-40 mg-none add-topic-form">
                <div className="form-block form-input column">
                    <label htmlFor="text">Enter some text for your topic:</label> {/* u want to remember: */}
                    <textarea onChange={(e) => setText(e.target.value)} value={text} name="text" rows="15" cols="53"></textarea>
                </div>
                <div className="form-block pointer">
                    <p>Add images u want to study later:</p>
                    <p onClick={handleImagesChange}>Upload images</p>
                    <div className="form-uploaded-images">
                        { imageURLs !== null && imageURLs.map(image => <div key={image.id}><img src={image.url} id={image.id} className="form-uploaded-img" /><p onClick={() => deleteCurrentImg(image.id)}>Delete image</p></div>) }
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
        </div>
    )
}