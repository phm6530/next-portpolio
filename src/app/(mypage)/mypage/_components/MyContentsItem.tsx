import Image from "next/image";
import classes from "./MyContentsItem.module.scss";
import MyContentsController from "./MycontentsController";
import {
  RespondentsAndMaxGroup,
  TemplateItemMetadata,
} from "@/types/template.type";
import TemplateStatus from "@/components/templateUtill/TemplateStatus";
import GenderChart from "@/components/Chart/GenderChart";
import Timer from "/public/asset/icon/times.svg";

export default function MyContentsItem({
  item,
}: {
  item: TemplateItemMetadata<RespondentsAndMaxGroup>;
}) {
  return (
    <div className={classes.myTemplateItem}>
      {/* {item.thumbnail && (
        <div className={classes.imgWrap}>
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      )} */}
      <div className={classes.contentWrapper}>
        <div className={classes.dopbar}>{item.templateType}</div>
        {/* <TemplateStatus
          startDate={item.startDate}
          endDate={item.endDate}
          createdAt={item.createdAt}
          maxGroup={item.respondents.maxGroup}
        /> */}
        <div className={classes.templateHeader}>
          <div className={classes.title}>
            <span>{item.title} </span>
          </div>
          <p className={classes.description}>{item.description}</p>
          {/* Gender Charts */}

          {/* <div className={classes.cnt}>
            ( {item.respondents.allCnt || 0}명 참여 )
          </div> */}

          <GenderChart
            maleCnt={item.respondents.participants.male}
            femaleCnt={item.respondents.participants.female}
          />

          <div className={classes.createdAt}>
            <Timer />
            생성일 :<span>{item.createdAt}</span>
          </div>
        </div>
        <MyContentsController templateType={item.templateType} id={item.id} />
      </div>
    </div>
  );
}
