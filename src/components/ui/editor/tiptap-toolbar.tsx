import { Code2, Heading1, Heading2, Heading3 } from "lucide-react";

import { Editor } from "@tiptap/react";
import YoutubeIcon from "/public/asset/icon/youtube.svg";
export default function TipTapToolbar({ editor }: { editor: Editor }) {
  const addYoutubeVideo = () => {
    const url = prompt("삽입하실 Youtube Url을 입력해주세요");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
      });
    }
  };

  return (
    <div className="table-row">
      <div className=" border button-group">
        <div className="table-cell">
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            <Heading1 />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            <Heading2 />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            <Heading3 />
          </button>
        </div>
        <div className="table-cell ">
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
          >
            <Code2 />
          </button>
        </div>
        <div className="table-cell">
          <div className="button-group">
            <button id="add" onClick={addYoutubeVideo}>
              <div className="w-10 h-10 [&>svg]:w-10 [&>svg]:h-10 dark:[&>svg]:fill-[#ffffff] [&>svg]:fill-[#000] ">
                <YoutubeIcon />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
