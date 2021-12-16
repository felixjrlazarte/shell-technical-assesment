import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { IConfirmDelete } from "../interfaces";

const ConfirmDelete = (props: IConfirmDelete) => {
  const { open, handleClose, handleDelete } = props;

  return (
    <Dialog
      open={ open }
      onClose={ handleClose }
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Confirm Delete
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleClose }>Cancel</Button>
        <Button onClick={ handleDelete } autoFocus data-testid="confirm-delete">Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDelete;