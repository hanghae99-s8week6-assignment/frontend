import React, { useState, useCallback, useRef } from "react";
import {
  Label,
  Input,
  Button,
  TextArea,
  ImageInput,
  ImagePreview,
} from "./styles";
import useInput from "../../hooks/useInput";
import { useDispatch } from "react-redux";
import { postPostAysnc } from "../../app/modules/postSlice";
import S3upload from "react-aws-s3";
import imageCompression from "browser-image-compression";
window.Buffer = window.Buffer || require("buffer").Buffer;

const PostModal = ({ setShowWriteModal }) => {
  const [title, onChangeTitle] = useInput("");
  const [body, onChangeBody] = useInput("");
  const [fileUrl, setFileUrl] = useState(null);

  const dispatch = useDispatch();
  const imgUpload = useRef();

  const onImgChange = async (e) => {
    const imageFile = e.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const imageUrl = URL.createObjectURL(compressedFile);
      setFileUrl(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitPost = useCallback(
    (e) => {
      e.preventDefault();
      if (fileUrl) {
        let file = imgUpload.current.files[0];
        let newFileName = imgUpload.current.files[0].name;
        const config = {
          bucketName: process.env.REACT_APP_BUCKET_NAME,
          region: process.env.REACT_APP_REGION,
          accessKeyId: process.env.REACT_APP_ACCESS_ID,
          secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
        };
        const ReactS3Client = new S3upload(config);
        ReactS3Client.uploadFile(file, newFileName)
          .then((data) => {
            console.log(data.status);
            if (data.status === 204) {
              let imgUrl = data.location;
              dispatch(postPostAysnc({ title, body, Images: imgUrl }));
            }
          })
          .then(() => {
            window.location.reload();
          });
      } else {
        dispatch(postPostAysnc({ title, body }));
        window.location.reload();
      }
    },
    [title, body, fileUrl]
  );

  return (
    <>
      <form onSubmit={onSubmitPost}>
        <Label>
          <span>제목</span>
          <Input value={title} onChange={onChangeTitle} />
        </Label>
        <Label>
          <span>이미지</span>
          <ImageInput
            type="file"
            accept="/image/*"
            onChange={onImgChange}
            id="upload-img"
            ref={imgUpload}
          />
        </Label>
        <ImagePreview src={fileUrl} />
        <Label>
          <span>내용</span>
          <TextArea value={body} onChange={onChangeBody} />
        </Label>
        <Button>작성하기</Button>
      </form>
    </>
  );
};

export default PostModal;
