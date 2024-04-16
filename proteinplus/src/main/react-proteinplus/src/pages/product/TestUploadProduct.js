import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/product/css/TestUploadProduct.scoped.css';
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid'

function UploadProduct(){
    const [imageUpload, setImageUpload] =useState(null);
    const [imageList, setImageList] = useState([]);

    const imageListRef = ref(storage, "product_images/")

    useEffect(() => {
        loadImageList();
    }, []);

    const loadImageList = () => {
        listAll(imageListRef).then((response) => {
            const urls = [];
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    urls.push(url);
                    if (urls.length === response.items.length) {
                        setImageList(urls);
                    }
                });
            });
            setImageList(urls);
        });
    };

    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `product_images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snaphsot) => {
            getDownloadURL(snaphsot.ref).then((url) => {
                setImageList((prev) => [...prev, url])
                alert("이미지 업로드 성공");
            })
        })
    };


    return(
        <div className="upload-product-container">
            <input type="file" onChange={(event) => {
            setImageUpload(event.target.files[0]);
            }}
            />
            <button className="upload-btn" onClick={uploadImage} > 이미지 업로드 </button>

            {imageList.map((url, index) => {
                return <img key={index} src={url}/>
            })}
        </div>
    );

}

export default UploadProduct;