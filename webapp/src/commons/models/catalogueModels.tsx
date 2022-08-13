import { Breakpoint } from "@mui/material";

type DirObjType = "Folder" | "File";

export interface FileMetaData {
  fileName: string;
  fileType: string;
  fileContent: string;
}

export interface MaxWdDialogProps {
  open: boolean;
  setOpen: (o: boolean) => void;
  width?: Breakpoint;
  title: string;
  path: string;
}

export interface ActionAreaCardProps {
  outline?: boolean;
  metaData: DirMetaData;
}

export interface DirMetaData {
  name: string;
  type: DirObjType;
  extension?: string;
}

export interface FileSyntaxHighlighterProps {
    path: string;
}