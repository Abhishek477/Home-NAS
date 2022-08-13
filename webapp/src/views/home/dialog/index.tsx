import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FileSyntaxHighlighter } from "../viewer";
import { MaxWdDialogProps } from "../../../commons/models/catalogueModels";

export default function MaxWidthDialog(props: MaxWdDialogProps) {
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>(
    props.width || "sm"
  );

  React.useEffect(() => setMaxWidth(props.width || "sm"), [props.width]);

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={maxWidth}
        open={!!props.open}
        onClose={handleClose}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              padding: "16px",
              backgroundColor: "background.paper",
            }}
          >{`${props.path}`}</DialogContentText>
          <FileSyntaxHighlighter path={props.path?.replace("/catalogue", "")} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
