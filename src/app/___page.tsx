"use client";

import classes from "./home.module.scss";
import SurveySlide from "@/app/_main/SurveySlide";
import Grid from "@/components/ui/Grid";
import MainGsap from "@/components/_aniPage/MainGsap";

export default function Home() {
  //공백 arr
  const arr = Array.from({ length: 1 }, (_, idx) => idx);

  return (
    <MainGsap>
      <Grid.center>
        <div className={classes.mainGrid}>
          <div className={classes.leftSection}>
            <h1 className={`title ${classes.title}`}>
              <div className={classes.titleSection}>
                <div className="char">나</div>
                <div className="char">만</div>
                <div className="char">의</div>
                <div className="char">&nbsp;</div>
                <div className="char">설</div>
                <div className="char">문</div>
                <div className="char">조</div>
                <div className="char">사</div>
                <div className="char">를</div>
              </div>

              <div className={classes.titleSection}>
                <div className="char"></div>
                <div className="char"> </div>
                <div className="char"></div>
                <div className="char">만</div>
                <div className="char">들</div>
                <div className="char">어</div>
                <div className="char">보</div>
                <div className="char">세</div>
                <div className="char">요</div>
                <div className="char">.</div>
              </div>
            </h1>
            <p className={classes.mainDescription}>100% 익명을 보장합니다.</p>
            <p className={classes.mainDescription}>
              익명의 장점을 살려 물어보기 어려웠던 정보를 공유해보세요!
            </p>
            <button className={classes.btnMove}>설문조사 만들기</button>
            <button className={classes.btnGray}>자세히보기</button>
          </div>
          <div className={classes.rightSection}>
            {/* 순위별 List */}
            {arr.map((_, idx) => {
              return (
                <div className={classes.slideWrap} key={`slideWrap-${idx}`}>
                  <SurveySlide idx={idx} />
                </div>
              );
            })}
          </div>
        </div>
      </Grid.center>
    </MainGsap>
  );
}
