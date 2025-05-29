import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import cookie from 'react-cookies';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title,
            text: contents,
            icon,
            confirmButtonText
        });
    };

    const submitClick = async () => {
        if (email.trim() === '' || password.trim() === '') {
            sweetalert('이메일과 비밀번호를 입력해주세요.', '', 'info', '닫기');
            return;
        }

        try {
            const loginRes = await fetch('http://localhost:5000/api/LoginForm?type=signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_Email: email, is_Password: password })
            });

            const user = await loginRes.json();
            var useremail = user.useremail;
            var username = user.username;
            var userpassword = user.userpassword;
            if (user?.useremail) {
                console.log("LoginForm useremail=" + user.useremail);
                console.log("LoginForm username=" + user.username);
                sweetalert('로그인 되었습니다.', user.useremail, 'info', '닫기');

                const expires = new Date();
                expires.setMinutes(expires.getMinutes() + 60);
                cookie.save('useremail', useremail, { path: '/', expires });
                cookie.save('username', username, { path: '/', expires });
                cookie.save('userpassword', userpassword, { path: '/', expires });
                // setUser({ name: username, email: useremail });

                setTimeout(() => {
                    navigate('/');
                    window.location.reload(); // 강제 새로고침
                }, 1000);
            } else {
                sweetalert('이메일과 비밀번호를 확인해주세요.', '에러', 'info', '닫기');
            }
        } catch (error) {
            sweetalert('이메일과 비밀번호를 확인해주세요.', error, 'info', '닫기');
        }
    };

    return (
        <section className="main">
            <div className="m_login">
                <h3><span><img src={require("../img/login/log_img.png")} alt="" />
                </span>LOGIN</h3>
                <div className="log_box">
                    <form>
                        <div className="in_ty1">
                            <span><img src={require("../img/login/m_log_i3.png")} alt="" /></span>
                            <input type="text" id="email_val" placeholder="이메일" value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="in_ty1">
                            <span className="ic_2">
                                <img src={require("../img/login/m_log_i2.png")} alt="" />
                            </span>
                            <input type="password" placeholder="비밀번호" value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <ul className="af">
                            <li><Link to={'/register_check'}>회원가입</Link></li>
                            <li className="pwr_b"><a href="#n">비밀번호 재설정</a></li>
                        </ul>
                        <div className="s_bt" onClick={submitClick}>로그인</div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;