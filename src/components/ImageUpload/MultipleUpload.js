import React from "react";
// react plugins that creates an input with a date picker
import {
  FormGroup,
  Form,
} from "reactstrap";
//image upload library
import ImageUploader from "react-images-upload";
//image viewer
import ImageViewer from "react-simple-image-viewer";
import CloseIcon from '@material-ui/icons/Close';


function MultipleUpload(props) {
  const [pictures, setPictures] = React.useState([]);
  const [currentImage, setCurrentImage] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const imgContainer = React.useRef()
  const imageUploader = React.useRef()
  
  const onDrop = (pictureFiles, pictureDataURLs) => {
    imageUploader.current.clearPictures()
    props.getPictureFiles(pictureFiles)
    setWidth(imgContainer.current.offsetWidth)
    if (pictures.length) {
      let img = [...pictures]
      img = img.concat(pictureDataURLs)
      setPictures(img);
    } else {
      setPictures(pictureDataURLs);
    }
  };

  const openImageViewer = React.useCallback(index => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const removeImg = (src, idx) => {
    const filteredFiles = props.pictureFiles.filter((e, index) => index !== idx);
    props.getPictureFiles(filteredFiles)
    let prvImg = pictures.filter(item => item !== src);
    setPictures(prvImg)
  }

  return (
    <>
      <FormGroup>
        <ImageUploader
          withIcon={true}
          buttonText='Chọn ảnh'
          label='Vui lòng upload ảnh có định dạng jpg jpeg png'
          onChange={onDrop}
          imgExtension={[".jpg", ".png", "jpeg"]}
          maxFileSize={5000000}
          ref={imageUploader}
          className="file-upload-container"
        />
      </FormGroup>
      <div className="img-upload-container" ref={imgContainer}>
        {pictures.map((src, index) => {
          return (
            <div className="simple-img" key={index}>
              <CloseIcon onClick={() => removeImg(src, index)} />
              <img
                src={src}
                width={width/4}
                height={width/4}
                onClick={() => openImageViewer(index)}
              />
            </div>
        )})}
      </div>
      {isViewerOpen && (
        <ImageViewer
          src={pictures}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)"
          }}
        />
      )}
    </>
  );
}

export default MultipleUpload;
