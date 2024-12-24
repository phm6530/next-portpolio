import "react-quill/dist/quill.snow.css";
import classes from "./QuillViewer.module.scss";

export default function QuillViewer({ contents }: { contents: string }) {
  return (
    <div className="ql-snow">
      <div
        className={`${classes.customQuillViewer} ql-editor`}
        dangerouslySetInnerHTML={{ __html: contents }}
      />
    </div>
  );
}
