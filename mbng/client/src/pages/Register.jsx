import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Register = ({ history }) => {
    const navigate = useNavigate(); //
    const [form, setForm] = useState({
        email1: '',
        email2: '',
        password: '',
        confirmPassword: '',
        name: '',
        organization: '',
        major: '',
        phone1: '',
        phone2: '',
        phone3: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const mustNumber = (value) => value.replace(/[^0-9]/g, '');

    const sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({ title, text: contents, icon, confirmButtonText });
    };

    const validateForm = () => {
        const pattern1 = /[0-9]/;
        const pattern2 = /[a-zA-Z]/;
        const pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;

        if (!form.email1.trim() || !form.email2.trim()) {
            sweetalert('이메일 주소를 다시 확인해주세요.', '', 'info', '닫기');
            return false;
        }

        if (!form.password.trim()) {
            sweetalert('비밀번호를 입력해주세요.', '', 'info', '닫기');
            return false;
        }

        if (form.password !== form.confirmPassword) {
            sweetalert('비밀번호가 일치하지 않습니다.', '', 'info', '닫기');
            return false;
        }

        if (
            !pattern1.test(form.password) ||
            !pattern2.test(form.password) ||
            // !pattern3.test(form.password) ||
            form.password.length < 2 ||
            form.password.length > 16
        ) {
            sweetalert('8~16자 영문 대소문자, 숫자, 특수문자를 사용하세요.', '', 'info', '닫기');
            return false;
        }

        if (!form.name.trim()) {
            sweetalert('성명을 입력해주세요.', '', 'info', '닫기');
            return false;
        }

        if (!form.organization.trim()) {
            sweetalert('소속기관을 입력해주세요.', '', 'info', '닫기');
            return false;
        }

        if (!form.major.trim()) {
            sweetalert('전공을 입력해주세요.', '', 'info', '닫기');
            return false;
        }

        if (!form.phone1 || !form.phone2 || !form.phone3) {
            sweetalert('휴대전화 번호를 입력해주세요.', '', 'info', '닫기');
            return false;
        }

        return true;
    };

    const submitClick = async (type, e) => {
        e.preventDefault(); // 새로고침 안되도록 보호해줌
        if (!validateForm()) return;

        const email = `${form.email1}@${form.email2}`;

        try {
            console.log(email);

            const dupRes = await fetch('http://localhost:5000/api/register?type=dplicheck', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_Email: email })
            });

            if (!dupRes.ok) {
                throw new Error(`이메일 중복 확인 요청 실패 ${dupRes.status}`);
            }

            const dupResult = await dupRes.json();
            console.log('중복확인 응답:', dupResult);

            const isDuplicate = dupResult[0]?.num !== 0;

            if (isDuplicate) {
                sweetalert('이미 존재하는 이메일입니다.', '', 'info', '닫기');
                return;
            }


            const payload = {
                is_Useremail1: form.email1,
                is_Useremail2: form.email2,
                is_Password: form.password,
                is_Username: form.name,
                is_Organization: form.organization,
                is_Usermajor: form.major,
                is_Userphone1: form.phone1,
                is_Userphone2: form.phone2,
                is_Userphone3: form.phone3,
            };

            const response = await fetch('http://localhost:5000/api/register?type=signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (result.affectedRows > 0) {              // affectedRows는 데이터베이스에서 영향을 받은 행(row)의 수
                sweetalert('회원가입이 완료되었습니다.', '', 'info', '닫기');
                navigate('/LoginForm');
            } else {
                sweetalert('작업중 오류가 발생하였습니다.', '작업오류', 'error', '닫기');

            }
        } catch (err) {
            sweetalert('작업중 오류가 발생하였습니다.', err.message, 'error', '닫기');
            console.log(err.message);
        }

    };

    return (
        <div>
            <section className="sub_wrap">
                <article className="s_cnt re_1 ct1">
                    <div className="li_top">
                        <h2 className="s_tit1">회원가입</h2>
                        <form method="post" name="frm">
                            <div className="re1_wrap">
                                <div className="re_cnt ct2">
                                    <table className="table_ty1">
                                        <tbody>
                                            <tr className="re_email">
                                                <th>이메일</th>
                                                <td>
                                                    <input type="text" name="email1" placeholder="이메일을 입력해주세요." value={form.email1} onChange={handleChange} />
                                                    <span className="e_goll">@</span>
                                                    <select name="email2" value={form.email2} onChange={handleChange}>
                                                        <option value="">선택하세요</option>
                                                        <option value='naver.com'>naver.com</option>
                                                        <option value='hanmail.net'>hanmail.net</option>
                                                        <option value='nate.com'>nate.com</option>
                                                        <option value='hotmail.com'>hotmail.com</option>
                                                        <option value='gmail.com'>gmail.com</option>
                                                        <option value='yahoo.co.kr'>yahoo.co.kr</option>
                                                        <option value='yahoo.com'>yahoo.com</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>비밀번호</th>
                                                <td>
                                                    <input type="password" name="password" placeholder="비밀번호를 입력해주세요." value={form.password} onChange={handleChange} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>비밀번호 확인</th>
                                                <td>
                                                    <input type="password" name="confirmPassword" placeholder="비밀번호를 다시 입력해주세요." value={form.confirmPassword} onChange={handleChange} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>성명</th>
                                                <td>
                                                    <input type="text" name="name" placeholder="성명을 입력해주세요." value={form.name} onChange={handleChange} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>소속 기관</th>
                                                <td>
                                                    <input type="text" name="organization" placeholder="소속 기관명을 입력해주세요." value={form.organization} onChange={handleChange} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>전공</th>
                                                <td>
                                                    <input type="text" name="major" placeholder="전공을 입력해주세요." value={form.major} onChange={handleChange} />
                                                </td>
                                            </tr>
                                            <tr className="tr_tel">
                                                <th>핸드폰</th>
                                                <td>
                                                    <select name="phone1" className="select_ty1" value={form.phone1} onChange={handleChange}>
                                                        <option value="">선택</option>
                                                        <option value="010">010</option>
                                                        <option value="011">011</option>
                                                        <option value="016">016</option>
                                                        <option value="017">017</option>
                                                        <option value="018">018</option>
                                                        <option value="019">019</option>
                                                    </select>
                                                    <span className="tel_dot">-</span>
                                                    <input name="phone2" maxLength="4" value={form.phone2} onChange={(e) => handleChange({ target: { name: 'phone2', value: mustNumber(e.target.value) } })} />
                                                    <span className="tel_dot">-</span>
                                                    <input name="phone3" maxLength="4" value={form.phone3} onChange={(e) => handleChange({ target: { name: 'phone3', value: mustNumber(e.target.value) } })} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="btn_confirm">
                                <div className="bt_ty bt_ty2 submit_ty1" onClick={(e) => submitClick('signup', e)}>
                                    회원가입
                                </div>
                            </div>
                        </form>
                    </div>
                </article>
            </section>
        </div>
    );
};

export default Register;