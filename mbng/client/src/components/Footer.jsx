//components/Footer.jsx
import React from 'react';

function Footer({ name }) {
  return (
    <footer className="footer">
      <ul>
        <li className="priv"><a href="#n">개인정보처리방침</a></li>
        <li className="em_bt"><a href="#n">이메일주소무단수집거부</a></li>
      </ul>
      <div className="ft_p">
        <span>주소 : 대구시 </span>
        <span>Tel : 053-1234-5678</span>
      </div>
      <p>COPYRIGHT © React 200, ALL RIGHTS RESERVED.{name}</p>
    </footer>
  );
}

export default Footer;
