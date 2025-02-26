import "react-quill/dist/quill.snow.css";

export default function QuillViewer({ contents }: { contents: string }) {
  return (
    <div className="ql-snow">
      <div
        className={`min-h-[200px] leading-1 p-0 ql-editor`}
        dangerouslySetInnerHTML={{ __html: contents }}
      />
    </div>
  );
}
