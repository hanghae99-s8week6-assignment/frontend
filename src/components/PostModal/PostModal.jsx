import React, { useState, useRef, useCallback } from "react";
import {
  Label,
  Input,
  Button,
  TextArea,
  ImageWrapper,
  ImageInput,
} from "./styles";
import useInput from "../../hooks/useInput";
import { useDispatch } from "react-redux";
import { postPostAysnc } from "../../app/modules/postSlice";

const PostModal = () => {
  const [ImageLoading, setImageLoading] = useState(false);
  const [title, onChangeTitle, setTitle] = useInput("");
  const [body, onChangeBody, setBody] = useInput("");

  const dispatch = useDispatch();
  const ImgInput = useRef();

  const onImgChange = (event) => {
    setImageLoading(true);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    setImageLoading(false);
  };

  const onSubmitPost = useCallback(() => {
    dispatch(postPostAysnc({ title: title, body: body }));
  }, [title, body, ImageLoading]);

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
            ref={ImgInput}
            onChange={onImgChange}
            id="upload-img"
            name="file"
          />
        </Label>
        <ImageWrapper>
          {/* <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHcAvwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAACBQEGB//EAD0QAAICAQIEBAIGCAQHAAAAAAECAAMRBCEFEjFRIkFhcRORBhQygZKhFSNCVHKCseEzRFLBB0NjotHw8f/EABoBAAMBAQEBAAAAAAAAAAAAAAACAwEEBQb/xAAlEQACAgIBBQACAwEAAAAAAAAAAQIDERIhBBMxQVFSkRQjMiL/2gAMAwEAAhEDEQA/APkBS2vwt0hKRyE5XIIwYwbqdSMstaHuoIEVJKN4QfbMsi7iovKeQ1dVZJDty9vUQpKbBsj+LeLo45dwPTOdoXLMgyB794NDRkscFjpEuTmXl9x5RVqXqP2sjPzjlItG9bcrDynXcuf1wHvyQSZsoxaz4YrSOUh1wc9YWtaQwFmQM/siVCZY8oGPSG02ne2zGPnNwJFPwU1ADJ2wdvaJhCH6ee007uerwHDDON/KCdVdcj7Q8sQSNnDLLWUFaUvU5z19D2i4ZriSR6iF5rfsDOG6jvGTp/q1as+4YYPpA1x28FakFlBRuuMiBZfhcyspwQCN+k0tDXVYLi5wAvhJHnFdTVv4QcDyPaZ7wVlX/wAKQjWeU47S1y4O3mJZ6uVjjoekIAG5VP3xiGvoz8Yh1XNeTJcvKdp1tkA9IyI4w2CA3lMbmGUeHmlCN5orK1JncnGJZwWPTww6NWlfiGW8vSDVed84279oBgZXGn0xwd2Xl298xGzL2sWO0OmbM5zyg5zKvSXycgRHwVbckgPIVPXIl15kOR/WRG2x1ENzL8MKQdjkHtAxJMutRZM+WcYnUBXw48PmINLGxjcCOUgWVsTnI/OYXglLwEVFXBPnBclbuwJI7Gcd8Q1ZHIjjr2iluG8FatP8M8w3EKmXyqjGep7Q1N4OVZdmlqqijFlGR3mZLqtcakqppK8z743aL3U/ruajvgjuI18HnfCb5GCAITSMlbbjxqdszcjdtPCYvXTXU2LVIYDpAq1lt2LehHTsI/dUTa1qD7Zyc/nAW6ZhdlMAe8FIydLXjwE1dC02KKs/BVR4h+1nqYPW1ryAp1Me0aVtX8GxgCDhTnvOXDldKwgBIwOYdd4uSzrTi39Mtals0/IR4g3XtBKnw33wwHnNW3SvU5NXLylfEo84gqoWcNsI6Zy2V4wIatOawbbRdgXbE07fEn2cH1hOF6QWC69lyiqR95EfbCyzmdDsswjLcYUL2giMRpkIOO0l1YStCOrDJjZIOAn5wtfQ+/8AsZFTmbPlCogByD7DvASKKBOVCep2ldWnIqkn7W/tG1HwtMxsUh89O0Qufm23x6yby2XlrGPJwI3kJceUoMjoYQP3UGUIo6gzjOwjVVPwyQ+QQIBVUnKnHvGK2ygRjnHSY0WhhFr6LAgdRzp5sB0g6id8dIy2rsUKHGF88HZpW1KbB8WolRndRMx9KvXOYhUtTGVGMdQY/obGz41yh3zj85ilmQ4wCD98f0+pRUCscY7xJQ4OinqEpcja2GjWWZwyHcY/2jKV0X1o4DAjqW2mdYRYRYCceREl+tuVQObI8jM0b8F49RGOdvA/VeEtFVgHIRjIP5zliivXorKeUjY56es7w3V0unLbswOxwNv7RnV6R2Su6jDIv7QO2JPw+TpX9leYvJR9GL2Z0sUvzeXWL8RrYVKzBuZG3I846t9OmVRioO/V0JOT/tJrblZW+sBGVvssrbD0gtkxrI1uD+i1TWXUM5NZrOw6c2RMuwmt3H+rqO09DoqGOlX9XUyE4ynURPVcKtNrEZYAZOOsN0pPJKdEp1xaMkU2PUGw3hHnH+EeHhGrB2PNke2II4rBQr6Hm6iH0YRFuTfDJsI03mPInTw0tyvjMtauXx2LlBnPrErXN1hJ65m7qNMq0nceHHMM95jtWEbONsysJHnX1OPBRagE3lGq5fFzYxuMQrOPlBOCfMw2yI60kV1NvxNl2X+sUK5jLKBBMuTN4SITUpPLL8h7ToQ9pqjSEjpOjRntM3RfsMyxWe0IqsNhNH6me0sukPaNugVMkZ5QsMTqoRtNJdIe0INGe0N0b2ZMy1U46SGok5muNGe0jaQqMnYdTDuI3sszE+IgwGOIVl+LUoOM+kS1vFKUzXpxzv3I2EQbiOqPS3l/hGIrsRJzS4NlWFDdcIT0abWl4ppdPVyrdVmwYCcwwPz954Juaw8zEsfMk5M6KiPKSnYpeilN9lf+T01+pouclLE9g8i3vZSK/i8yLuo5szzRqYdBOLz14ZW5T5EGarRJWTy2e04bqHprZXt5Kz5A9Yd+NXjUfFrTcdDPHV8R1FY+3zZ/1TY4bxPS6kpTchrvY4z+yx9O0G4N5aOirqZYUU8HqxXTxWn4oCC3Hi5eufUQNei+BXZdZzYUe3t+cWrqt09gevKkTTSxtbUaWAHh8R9JCeYrjwezTOFnE1yYFm2nezJIOwHc+fymXf8AZ27+c9JxPQLVTWKrSVUYB2JP/onnLBmzlAL4Pks2NmTm6mjXCK0aZnVnY4UDrKlAdljqAOvKylUHr1kfwpipAAfnNUuSUqVqjPZAggiI01L2MebOJR661lMnJKDPTLp5cUCMDEsFB7Tn2PSUIgBpxLrph2EOMS647iGzKKEQA0o7Q6aUdoasAxqtM+URzY6hEWXRA+UyvpRZTw7hdnOwWy4FKxy5yZ6bkKrmKanSU61Vr1VQsRXDgHyI6RY2PIt1e0Go+T5LTpwVA8TWN0rAOfnGlpoZjU9b1PnAL/sdc5z/APZ67in0Uvs1zanSW1V1tgcipy8gxvuOu4itf0R1uH8dbrhieVyGc5yMk/d5CX7iZ4f8W2L5Rg/oshwFIxttkZI7j+80tJwVm5GsXKk8viHKM+87ptDr9OiJdTetbnIDfZc9wQfTvPo/0Q4BpuJt8DUL9X8A2Izn1HvtOW23Dwj0KKIRg5z9HzLU8HKLzAHDEgBRnPfyia8KBy1hAwoJPXE+k/S7hNejt1NGmqW5Kxu42Cb9f6fKeN/QfF+IBBTpbmqViVLtyouevU7jbqI1V2fIvUdOmlKHs878OuywV06dnbGwU5LEdYC5PhcrqWFqkFlI6Hvv1nsz9AuJWBQ91IwdyAScdoar/hze/wCs1mtIU7Fak+W5PpLd6C8s4v4d0nxEe4O9XEtDXqa25gRjGMbjrmaen4a+pOQQir1OI1pOHJo6K6NOvJVWMKM+UYT4lOSD4SckSLu+M9mNTwlIy9Vp9DQjCxix9Zi6iilAU01XKH67HP3z0VraYEt8NCc5ztErbVOwxj+Uzl7rb5Z69dcIwwonnvqVjvlVI+6Mrwi+3HO4Gexmn4D1tK+gIH9BIG067fEfPvK97BF9PkQbgNSb22jPvM/U6LS0nqDNq1tMc5LNmZupGlJ/w/m3/mPC5s5bulilweSHE9f++XfOWHFNd+93fiiQlxPTaPllOX0d/Seu/e7vxSw4jrfPV3fiiQIlwYaodTf0eXiOu/fLvxGGTiOv/fb/AMZmcrCGRvebqvg6m/ppJrteeutu++wxyjU61v8AN25/iMx63UekcptC7529T/eY4L4dFduPLNmuzVnrrbSP4jGarNSv+as/GZmVXDG5+WIyt2AcnGJGUcHoVXI19NfazgtczkHbLdI7xniuo0XBL76biLKwvK3mu46TyLcc02msIa0EjqFEU4v9J6dbw+3S1VuOccvMenWck69njBefU1KD5WT6M2tufS1YuYeEHr6TNv1GqGcahx/MZ5jSfS/S16ZK7a7OZQBsMxur6RaDVgBbQjHor9ZldevorHqaXFYaHbtbxAbLrLB2w0Ut4jxTGPr9v4oK7UAjKkN7HpE7NSMEc35ZnXGtfDktvSL38T4qv+dtH80Su4rxM7NrrsfxQd1oJijuM/2llXH4efZfJ+Gwlmv1373Z84FtfrT11Vp/mgncQTPN7cPhCV9n5P8AYc8Q1g6amwffBniGs/ebfnAkypxF7cfgnfs/J/sI2u1R66iz5wbaq89bn+coxlZukfhOVtn5M4DOwfOo85xrgNgMma2iQwJC6r1YCJtYzdScekp77+8Tc3I6dTWvdvYSfXVHRDEpJm7DLHhxAjpX/wB0InFnU/4Y/FM2SGzNUmjUbjNx6Vp6Z3il2s1N327Xx2B2gMyTG8j7yfs7kzvPKyRWZsX5zKkkzkkAywtOoupwa7WHpnaM/pfVefwz/LEczhMbIbtex5uKWsMFF+ZlPr7H/lr84nJN2YuzGvrv/T/OdGqU9QRFJIbszI8tiN9k/MyExCXWxl6GaphkaJlSYMXZ6id51PnH2RgCSSSRAkkkkAJJJJACSSSQAk6JJIGo7OGdkgMcnMySQFZJJJIGEkkkgBJJJIASSSSAEkkkgB//2Q==" /> */}
        </ImageWrapper>
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
