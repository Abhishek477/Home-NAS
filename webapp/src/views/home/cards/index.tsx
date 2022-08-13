import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import FolderIcon from "@mui/icons-material/Folder";
import JavascriptIcon from "@mui/icons-material/Javascript";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import HtmlIcon from "@mui/icons-material/Html";
import CssIcon from "@mui/icons-material/Css";
import ImageIcon from "@mui/icons-material/Image";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import CodeIcon from "@mui/icons-material/Code";
import GifBoxIcon from "@mui/icons-material/GifBox";
import { ActionAreaCardProps } from "../../../commons/models/catalogueModels";
import MaxWidthDialog from "../dialog";
import React from "react";

const PRISM_SUPPORTED_DOCS_TYPES =
  "js+html+gitignore+ts+txt+md" +
  "+markup+css+clike+javascript+abap+abnf+actionscript+ada+agda+al+antlr4+apacheconf+apex+apl+applescript+aql+arduino+arff+armasm+arturo+asciidoc+aspnet+asm6502+asmatmel+autohotkey+autoit+avisynth+avro-idl+awk+bash+basic+batch+bbcode+bbj+bicep+birb+bison+bnf+bqn+brainfuck+brightscript+bro+bsl+c+csharp+cpp+cfscript+chaiscript+cil+clojure+cmake+cobol+coffeescript+concurnas+csp+cooklang+coq+crystal+css-extras+csv+cue+cypher+d+dart+dataweave+dax+dhall+diff+django+dns-zone-file+docker+dot+ebnf+editorconfig+eiffel+ejs+elixir+elm+etlua+erb+erlang+excel-formula+fsharp+factor+false+firestore-security-rules+flow+fortran+ftl+gml+gap+gcode+gdscript+gedcom+gettext+gherkin+git+glsl+gn+linker-script+go+go-module+gradle+graphql+groovy+haml+handlebars+haskell+haxe+hcl+hlsl+hoon+http+hpkp+hsts+ichigojam+icon+icu-message-format+idris+ignore+inform7+ini+io+j+java+javadoc+javadoclike+javastacktrace+jexl+jolie+jq+jsdoc+js-extras+json+json5+jsonp+jsstacktrace+js-templates+julia+keepalived+keyman+kotlin+kumir+kusto+latex+latte+less+lilypond+liquid+lisp+livescript+llvm+log+lolcode+lua+magma+makefile+markdown+markup-templating+mata+matlab+maxscript+mel+mermaid+metafont+mizar+mongodb+monkey+moonscript+n1ql+n4js+nand2tetris-hdl+naniscript+nasm+neon+nevod+nginx+nim+nix+nsis+objectivec+ocaml+odin+opencl+openqasm+oz+parigp+parser+pascal+pascaligo+psl+pcaxis+peoplecode+perl+php+phpdoc+php-extras+plant-uml+plsql+powerquery+powershell+processing+prolog+promql+properties+protobuf+pug+puppet+pure+purebasic+purescript+python+qsharp+q+qml+qore+r+racket+cshtml+jsx+tsx+reason+regex+rego+renpy+rescript+rest+rip+roboconf+robotframework+ruby+rust+sas+sass+scss+scala+scheme+shell-session+smali+smalltalk+smarty+sml+solidity+solution-file+soy+sparql+splunk-spl+sqf+sql+squirrel+stan+stata+iecst+stylus+supercollider+swift+systemd+t4-templating+t4-cs+t4-vb+tap+tcl+tt2+textile+toml+tremor+turtle+twig+typescript+typoscript+unrealscript+uorazor+uri+v+vala+vbnet+velocity+verilog+vhdl+vim+visual-basic+warpscript+wasm+web-idl+wgsl+wiki+wolfram+wren+xeora+xml-doc+xojo+xquery+yaml+yang+zig";

export default function ActionAreaCard(props: ActionAreaCardProps) {
  let location = useLocation();
  let navigate = useNavigate();

  const [showViewer, setShowViewer] = React.useState<boolean>(false);

  const handleCardClick = () => {
    const url: string = location.pathname + "/" + props.metaData.name;
    if (props.metaData.type === "Folder") navigate(url, { replace: true });
    else {
      if (
        PRISM_SUPPORTED_DOCS_TYPES.split("+").includes(
          props.metaData.extension || "-"
        )
      )
        setShowViewer(true);
      else
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
    <>
      <Card
        sx={{ maxWidth: 345, height: "100%" }}
        onClick={handleCardClick}
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
      <MaxWidthDialog
        open={showViewer}
        setOpen={setShowViewer}
        title={"File Viewer"}
        width={"lg"}
        path={location.pathname + "/" + props.metaData.name}
      />
    </>
  );
}
