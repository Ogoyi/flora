import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header className="header">

    <div className="header-content">
      <div className="header-box">
        <ul className="header-nav">
          <li><a href="/" >Home</a></li>
          <li><a href="/shop">shop</a></li>
          <li><a href="/myflowers">My Flowers</a></li>
          {/* <li><a href="categories.html">Categories</a></li>
          <li><a href="blog.html">blog</a></li>
          <li><a href="contacts.html">contact</a></li> */}
        </ul>
        <ul className="header-options">
          
          <li><a href=""><span>{props.cUSDBalance}</span>cUSD</a></li>
        </ul>
      </div>
      <div className="btn-menu js-btn-menu"><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span></div>
    </div>
  </header>
  
  );
};

export default Header;
