import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { upload_files } from "../../store/uploads";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import "./Dropzone.css";

const Dropzone = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const handleSave = files => {
    setFiles(files);
    console.log("FRONTEND FILES: ", files)
    setOpen(false);

    const response = dispatch(upload_files(files));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => handleOpen()}>
        Add Image
      </Button>
      <DropzoneDialog
        open={open}
        onSave={(files) => handleSave(files)}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={() => handleClose()}
      />
    </>
  );
};

export default Dropzone;