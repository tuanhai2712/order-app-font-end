import React from "react";
// react plugins that creates an input with a date picker
import {
  FormGroup,
} from "reactstrap";
//image upload library
import ImageUploader from "react-images-upload";
import regex from "constants/regex"

function FileUpload(props) {
  const [fileName, setFileName] = React.useState("");
  const onDrop = (file) => {
    if (file.length) {
      props.getFile(file[0])
      if (regex.fileImport.test(file[0].name)) {
        setFileName(file[0].name)
      }
    }
  };

  return (
    <FormGroup>
      <ImageUploader
        withIcon={true}
        buttonText='Chọn file'
        label={fileName ? fileName : 'Vui lòng upload file có định dạng xls, xlsx'}
        onChange={onDrop}
        className="file-upload-container"
        singleImage={true}
        imgExtension={[".xls", ".xlsx"]}
      />
    </FormGroup>
  );
}

export default FileUpload;
