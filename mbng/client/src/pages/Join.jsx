import React from "react";

function Join() {
    return (
    <div id="join_wrap">
        <h1 class="A1">회원가입</h1>
        <form name="" method="get" action="aaa.html">
            <fieldset>
                 <legend class="title">* 필수입력정보</legend>  
                 <table class="joinTable">
                    <caption>회원가입 필수 입력표</caption>
                    <tr>
                        <th class="first"><label for="user_id">아이디</label></th>
                        <td class="first"><input type="text" id="user_id" class="textForm" required autofocus/>
                        <input type="button" value="중복확인" class="btn"/></td>
                    </tr>
                    <tr>
                        <th><label for="user_pwd">비밀번호</label></th>
                        <td class="pw"><input type="password" id="user_pwd" class="textForm" placeholder="10자이상의 영문과 숫자 조합"/> 
                        </td>
                    </tr>
                    <tr>
                        <th><label for="user_name">이름</label></th>
                        <td><input type="text" id="user_name" class="textForm"/></td>
                    </tr>
                    <tr>
                        <th><label for="user_tel">연락처</label></th>
                        <td><input type="tel" id="user_tel" class="textForm"/></td>
                    </tr>
                    <tr>
                        <th><label for="user_email">이메일</label></th>
                        <td><input type="email" id="user_email" class="textForm"/></td>
                    </tr>
                    <tr>
                        <th>전자우편신청</th>
                        <td><input type="radio" name="mail" checked id="mail_yes"/>
                            <label for="mail_yes">예 신청합니다.</label>
                            <input type="radio" name="mail" id="mail_no"/>
                            <label for="mail_no">아니오 신청하지 않습니다.</label>
                        </td>
                    </tr>
                 </table> 
            </fieldset>

            <fieldset>
                <legend class="title">* 선택입력정보</legend>
                <table class="joinTable">
                    <caption>회원가입 선택 입력표</caption>
                    <tr>
                        <th class="first">프로필사진</th>
                        <td class="first"><input type="file"/></td>
                    </tr>
                    <tr>
                        <th>생년월일</th>
                        <td><input type="date" class="textForm"/></td>
                    </tr>
                    <tr>
                        <th>성별</th>
                        <td><input type="radio" name="gender" id="male"/>
                            <label for="male">남</label>
                            <input type="radio" name="gender" id="female"/>
                            <label for="female">여</label>
                        </td>
                    </tr>
                    <tr>
                        <th>직업</th>
                        <td>
                            <select name="user_job" class="textForm">
                                <option>회사원</option>
                                <option>기술자</option>
                                <option selected>학생</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>자기소개</th>
                        <td> <textarea name="user_intro" class="textForm"></textarea>
                        </td>
                    </tr>
                </table>
            </fieldset>
            <div class="btn_area">
                <button type="reset" class="can">취소</button>
                <button type="submit" class="btn_join">회원가입</button>
            </div>
        </form>
    </div>
    );
}

export default Join;