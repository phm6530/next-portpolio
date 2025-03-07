import NotFoundContents from "@/components/ui/error/notfound-contents";
import { MSG_PARAM_PATH, CommentReponse } from "@/types/comment.type";
import MessageContainer from "@/components/comment/message-container";
import { withFetchRevaildationAction } from "@/action/with-fetch-revaildation";

//tempalte ID
export default async function ResultCommentSection({
  id,
  type,
}: {
  id: number;
  type: MSG_PARAM_PATH;
}) {
  const {
    success,
    result,
    message,
  }: {
    success: boolean;
    result?: CommentReponse[];
    message?: string;
  } = await withFetchRevaildationAction({
    endPoint: `comment/${type}/${id}`,
    options: {
      cache: "force-cache",
      next: { tags: [`comment-${type}-${id}`] },
    },
  });

  if (!success) {
    throw new Error(message);
  }

  return (
    <div className="my-10">
      <div className="text-lg border-b pb-2 mb-6">
        댓글 <span className="font-bold">{result?.length}</span> 개
      </div>

      {/* 댓글 리스트 */}
      <div className="animate-fadein">
        {result && result.length > 0 ? (
          <MessageContainer listData={result} />
        ) : (
          //댓글 없음ㅇㅇㅇ
          <NotFoundContents>아직 등록된 댓글이 없습니다.</NotFoundContents>
        )}
      </div>
    </div>
  );
}
