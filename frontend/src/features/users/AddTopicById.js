import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';

import { addUsersTopic } from "./usersSlice";

export default function AddTopicById ({id}) {
    const [text, setText] = useState('')
    const [imageList, setImageList] = useState([])
    const [imageURLs, setImageURLs] = useState([])
    const [link, setLink] = useState('')

    useEffect(() => {
        if(imageList.length < 1) return;
        const newImageUrls = []
        imageList.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
        setImageURLs(newImageUrls)
    }, [imageList])

    const dispatch = useDispatch()

    const handleImagesChange = (e) => {
        setImageList([...imageList, ...e.target.files])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageList) return;

        // send here images to cloudinary, and send images links to db(UsersTopic)
        try {
            const formData = new FormData()
            formData.append('images', [...imageList])
            formData.append('upload_preset', 'remindemyTopicsImages')
            const dataRes = await axios.post(
                process.env.REACT_APP_CLOUDINARY_URL,
                formData,
            )
            let imagesLinks = dataRes.data.url;
            dispatch(addUsersTopic({id, imagesLinks, text, link}))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="form mg-none">
                <div className="form-block form-input">
                    <label htmlFor="text">Enter the text u want to remember: </label>
                    <textarea onChange={(e) => setText(e.target.value)} value={text} name="text" rows="15" cols="53"></textarea>
                </div>
                <div className="form-block form-input">
                    <label htmlFor="images">Add images u want to study later: </label>
                    <input type="file" onChange={handleImagesChange} accept="image/*" multiple name="images" id="images" />
                    <div className="form-uploaded-images">
                        { imageURLs.map((imageSrc, index) => <img key={index} src={imageSrc} className="form-uploaded-img" />) }
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