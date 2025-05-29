import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
import Swal from 'sweetalert2';

const Header = () => {
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [hoverMenu, setHoverMenu] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cookie_useremail = cookie.load('useremail');
        const cookie_username = cookie.load('username');
        const cookie_password = cookie.load('userpassword');
        if (cookie_useremail && cookie_username) {
            setUsername(cookie_username);
            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + 60);

            cookie.save('useremail', cookie_useremail, { path: '/', expires });
            cookie.save('username', cookie_username, { path: '/', expires });
            cookie.save('userpassword', cookie_password, { path: '/', expires });
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const logout = () => {
        Swal.fire({
            title: '로그아웃 하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니오',
        }).then((result) => {
            if (result.isConfirmed) {
                cookie.remove('useremail', { path: '/' });
                cookie.remove('username', { path: '/' });
                cookie.remove('userpassword', { path: '/' });
                setIsLoggedIn(false);
                navigate('/');
            }
        });
    };

    const menuItems = [
        {
            title: '소식',
            key: 'news',
            items: [
                { label: '공지 사항', path: '/story' },
                { label: '이벤트', path: '/region' },
                { label: '업데이트', path: '/characters' },
            ]
        },
        {
            title: '게임 소개',
            key: 'intro',
            items: [
                { label: '에린 이야기', path: '/story' },
                { label: '에린의 지역', path: '/region' },
                { label: '클래스 소개', path: '/class' },
            ]
        },
        {
            title: '고객지원',
            key: 'support',
            items: [
                { label: '건의 및 제보', path: '/story' },
                { label: '다운로드', path: '/region' },
                { label: '운영정책', path: '/characters' },
            ]
        }
    ];

    return (
        <header className="gnb_box">
            <div className="hd_top">
                <div className="top_wrap ct1 af">
                    <ul className="hd_left af">
                        <li className="my1">
                            <b>내정보</b>
                            {isLoggedIn && (
                                <div className="box0 box1">
                                    <ul>
                                        <li><Link to="/MyInfoEdit">내 정보 수정</Link></li>
                                        <li><a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>로그아웃</a></li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className="my2"><b><span>0</span>알림</b></li>
                    </ul>
                    {isLoggedIn && (
                        <div className="hd_right">
                            <p><span>{username}</span>님 반갑습니다.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="h_nav ct1 af">
                <div className="logo">
                    <Link to="/">
                        <img src={require("../img/layout/logo.png")} alt="logo" />
                    </Link>
                </div>

                <nav className="gnb gnb_admin">
                    <ul className="af">
                        {menuItems.map(menu => (
                            <li
                                key={menu.key}
                                className="menulist"
                                onMouseEnter={() => setActiveMenu(menu.key)}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <Link to="#">{menu.title}</Link>
                                {activeMenu === menu.key && (
                                    <div className="dropdown-wrapper">
                                        <ul>
                                            {menu.items.map((item, idx) => (
                                                <li key={idx}><Link to={item.path}>{item.label}</Link></li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}

                        {!isLoggedIn && (
                            <>
                                <li
                                    className="menulist dropdown"
                                    onMouseEnter={() => setHoverMenu('register')}
                                    onMouseLeave={() => setHoverMenu(null)}
                                >
                                    <Link to="/LoginForm">로그인</Link>

                                    {/* 회원가입만 드롭다운 */}
                                    {hoverMenu === 'register' && (
                                        <div className="dropdown-wrapper">
                                            <ul>
                                                <li><Link to="/Register">회원가입</Link></li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            </>
                        )}
                        {isLoggedIn && (
                            <li><a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>로그아웃</a></li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;