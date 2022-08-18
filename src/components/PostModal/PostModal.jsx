import React, { useState, useCallback, useRef } from "react";
import {
  Label,
  Input,
  Button,
  TextArea,
  ImageInput,
  ImagePreview,
  Spinner,
  LoadingText,
  Error,
} from "./styles";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { postPostAysnc } from "../../app/modules/postSlice";
import S3upload from "react-aws-s3";
import imageCompression from "browser-image-compression";
import spinner from "./spinner.gif";

window.Buffer = window.Buffer || require("buffer").Buffer;

const PostModal = ({ setShowWriteModal }) => {
  const [title, onChangeTitle] = useInput("");
  const [body, onChangeBody] = useInput("");
  const [fileUrl, setFileUrl] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [titleCheck, setTitleCheck] = useState(false);
  const [bodyCheck, setBodyCheck] = useState(false);

  const dispatch = useDispatch();
  const imgUpload = useRef();
  const Posts = useSelector((state) => state.posts);

  const onImgChange = async (e) => {
    setLoading(true);
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
      setLoading(false);
    } catch (error) {}
  };

  const onSubmitPost = useCallback(
    (e) => {
      e.preventDefault();
      setTitleCheck(false);
      setBodyCheck(false);
      if (title.trim() === "") {
        setTitleCheck(true);
        return null;
      }
      if (body.trim() === "") {
        setBodyCheck(true);
        return null;
      }
      setLoading(true);
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
        ReactS3Client.uploadFile(file, newFileName).then((data) => {
          if (data.status === 204) {
            let imgUrl = data.location;
            dispatch(postPostAysnc({ title, content: body, Images: imgUrl }));
            setLoading(false);
          }
        });
      } else {
        setLoading(true);
        dispatch(postPostAysnc({ title, content: body }));
      }
    },
    [title, body, fileUrl]
  );

  if (Posts.postLoading) {
    window.location.reload();
  }

  return (
    <>
      {Loading ? (
        <Spinner>
          <LoadingText>업로드 중입니다 ...</LoadingText>
          <img src={spinner} alt="로딩중" />
        </Spinner>
      ) : null}
      <form onSubmit={onSubmitPost}>
        <Label>
          <span>제목</span>
          <Input
            value={title}
            onChange={onChangeTitle}
            placeholder="20글자 이하로 작성해주세요."
            maxLength="20"
          />
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
          <TextArea
            value={body}
            onChange={onChangeBody}
            placeholder="200글자 이하로 작성해주세요."
            maxLength="200"
          />
        </Label>
        {titleCheck && <Error>제목을 입력해주세요</Error>}
        {bodyCheck && <Error>내용을 입력해주세요</Error>}
        <Button>작성하기</Button>
      </form>
    </>
  );
};

export default PostModal;
