import { FileSyntaxHighlighterProps } from "../../../commons/models/catalogueModels";
import { useEffect, useState } from "react";
import { getFile } from "../../../apis/catalogueApis";

export const FileSyntaxHighlighter = (props: FileSyntaxHighlighterProps) => {
  const [codeString, setCodeString] = useState<string>("");
  const [codeType, setCodeType] = useState<string>("html");

  useEffect(() => window.Prism.highlightAll(), [codeString]);

  useEffect(() => {
    document.title = `File Viewer | NAS`;

    (async () => {
      const res: string = await getFile(props.path || "");
      setCodeType(
        props.path?.substring(props.path?.lastIndexOf(".") + 1) || "html"
      );
      setCodeString(res);
    })();
  }, [props.path]);

  return (
    <pre className="line-numbers">
      <code className={`language-${codeType.toLowerCase()}`}>{codeString}</code>
    </pre>
  );
};
