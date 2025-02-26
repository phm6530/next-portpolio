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
    <div className="table-row border">
      <div className="flex gap-3 p-2">
        <div className="flex gap-1">
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            <Heading1 className="w-5 h-5" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            <Heading2 className="w-5 h-5" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            <Heading3 className="w-5 h-5" />
          </button>
        </div>
        <div className="flex ">
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
          >
            <Code2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center items-center">
          <button id="add" onClick={addYoutubeVideo}>
            <div className="w-5 h-5 flex justify-center items-center  [&>svg]:w-5 [&>svg]:h-5 [&>svg]:fill-white ">
              <YoutubeIcon />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
