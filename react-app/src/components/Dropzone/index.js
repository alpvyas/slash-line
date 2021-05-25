import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropzoneArea, DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import "./Dropzone.css";

const Dropzone = () => {

  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const isOpen = useSelector(state => state.open);

  const handleSave = files => {
    setFiles(files);
    setOpen(false);
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
        onSave={() => handleSave()}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={() => handleClose()}
      />
    </>
  );
};

export default Dropzone;