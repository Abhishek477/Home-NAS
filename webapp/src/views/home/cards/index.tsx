import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import FolderIcon from "@mui/icons-material/Folder";
import JavascriptIcon from "@mui/icons-material/Javascript";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { DirMetaData } from "../catalogue";
import HtmlIcon from "@mui/icons-material/Html";
import CssIcon from "@mui/icons-material/Css";
import ImageIcon from "@mui/icons-material/Image";
import AudioFileIcon from '@mui/icons-material/AudioFile';
import CodeIcon from '@mui/icons-material/Code';
import GifBoxIcon from '@mui/icons-material/GifBox';

interface Props {
  outline?: boolean;
  metaData: DirMetaData;
}

export default function ActionAreaCard(props: Props) {
  let location = useLocation();
  let navigate = useNavigate();

  const handleCardClick = () => {
    const url: string = location.pathname + "/" + props.metaData.name;
    if (props.metaData.type === "Folder") navigate(url, { replace: true });
    else {
      window.open(
        process.env.REACT_APP_HOST + `/fs` + url.replace("/catalogue", ""),
        "_blank"
      );
    }
  };

  const getIconByFileType = (ext: string) => {
    switch (ext.toLowerCase()) {
      case "js":
        return <JavascriptIcon color={"inherit"} />;
      case "pdf":
        return <PictureAsPdfIcon color={"inherit"} />;
      case "html":
        return <HtmlIcon color={"inherit"} />;
      case "css":
        return <CssIcon color={"inherit"} />;
      case "img":
      case "svg":
      case "png":
        return <ImageIcon color={"inherit"} />;
      case "mp3":
      case "ogg":
        return <AudioFileIcon color={"inherit"} />;
      case "java":
      case "c":
      case "py":
      case "cpp":
        return <CodeIcon color={"inherit"} />;
      case "gif":
        return <GifBoxIcon color={"inherit"} />;
      default:
        return <InsertDriveFileIcon color={"inherit"} />;
    }
  };

  return (
    <Card
      sx={{ maxWidth: 345, height: "100%" }}
      onClick={handleCardClick}
      variant={props.outline ? "outlined" : "elevation"}
      raised={true}
    >
      <CardActionArea sx={{ height: "100%" }}>
        <CardContent
          sx={{
            height: "100%",
            backgroundColor: props.outline ? "action.active" : "inherit",
            color: props.outline ? "background.paper" : "inherit",
            "&:hover": {
              backgroundColor: props.outline ? "action.disabled" : "inherit",
            },
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex" }}>
            <>
              {props.metaData.type === "Folder" ? (
                <FolderIcon color={"inherit"} />
              ) : (
                getIconByFileType(props.metaData.extension || "")
              )}
              <Typography
                variant="body2"
                color={props.outline ? "background.paper" : "inherit"}
                ml={2}
                style={{
                  alignSelf: "flex-end",
                  wordBreak: "break-all",
                  whiteSpace: "normal",
                }}
              >
                {props.metaData.name}
              </Typography>
            </>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
