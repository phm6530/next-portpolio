export default function SurveyItem({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  return (
    <>
      <div>id : {id}</div>
      <div>title : {title}</div>
    </>
  );
}
