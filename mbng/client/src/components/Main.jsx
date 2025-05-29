import React from "react";

function Main() {
    return (
        <div>
            <div className="section1">
                <b>모집중인 과정</b>
                <p></p>
                <div className="container">
                    <div className="quick super">
                        <a href="#">
                            <h3>IT·웹·풀스텍</h3>
                            <p>프론트/백 풀스택 <br/>개발자 과정</p>
                        </a>
                    </div>
                    <div className="quick golf">
                        <a href="#">
                            <h3>영상·게임</h3>
                            <p>영상편집 영상특수 효과</p>
                        </a>
                    </div>
                    <div className="quick taek">
                        <a href="#">
                            <h3>쇼핑몰·마케팅</h3>
                            <p>AI 데이터분석 국내외 <br/>채널 활용 및 마케팅</p>
                        </a>
                    </div>
                    <div className="quick last jabbar">
                        <a href="#">
                            <h3>세무회계·사무</h3>
                            <p>회개원리 및 회계프로그램 기능</p>
                        </a>
                    </div>
                </div>
            </div>
            <div className="section2">
                <h5>기관 소개</h5>
                <div className="intro1">
                    <a href="#">
                        <h3>사람과 교육이 만드는 세상</h3>
                        <p>사람과 교육이 만드는 더 나은 꿈이 현실이 되는<br/>
                           세상에서부터 출발합니다.</p>
                    </a>
                </div>
                <div className="intro2">
                    <a href="#">
                        <h3>스스로 몰입하고 주도적 교육 환경</h3>
                        <p>교육생이 먼저 생각하고 질문하고 움직일 수 있는<br/>
                           교육과 교육환경을 통해 새롭고 가치있는 교육을 만듭니다.</p>
                    </a>
                </div>
            </div>
            <div className="section3">
            </div>
        </div>
    );
}

export default Main;