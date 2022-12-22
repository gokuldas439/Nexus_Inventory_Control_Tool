import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import PreLoader from '../../components/PreLoader/PreLoader';
import { selectUserAuth } from '../../redux/reducers/api/authSlice';
import './LandingPage.css'

function LandingPage() {

    const [isLoading,setIsLoading]=useState(false)

   const { token } = useSelector(selectUserAuth);
   





   if(isLoading)
   return <PreLoader/>   

  return (
    <div className='landingPage'>
    <header className="header">
  <div className="container header__container">
<div className="header__logo">
    {/* <img className="header__img" src="https://image.ibb.co/kcVou6/path3000.png" />  */}
<h1 className="header__title"><span className="header__light">NEXUS</span></h1></div> 
    
  
  <div className="header__menu">
    <nav id="navbar" className="header__nav collapse">
      <ul className="header__elenco">
        <li className="header__el"><a href="#" className="header__link">Home</a></li>
        <li className="header__el"><a href="#" className="header__link">Pricing</a></li>
        <li className="header__el"><a href="#" className="header__link">Contact us</a></li>
        <li className="header__el header__el--blue"><Link to={'/login'} className="btn btn--white">Sign In →</Link></li>
      </ul>
    </nav>
  </div>
    </div>
</header>

<div className="sect sect--padding-top">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
    <div className="site">
      <h1 className="site__title">Best way to Manage your Inventory</h1>
      <h2 className="site__subtitle">Do analytics like a boss</h2>
      <div className="site__box-link">
        <a className="btn btn--width" href="#priceDiv">Pricing</a>
        <a className="btn btn--revert btn--width" href="">Contact</a>
      </div>
      <img className="site__img" src="https://image.ibb.co/c7grYb/image3015.png" />
    </div>
    </div>
    </div>
  </div>
</div>

<div className="sect sect--padding-bottom">
<div className="container">
<div className="row row--center">
  <h1 className="row__title" id="priceDiv">
    Pricing
  </h1>
  <h2 className="row__sub">What fits your business the best?</h2>
</div>
<div className="row row--center row--margin">
  <div className="col-md-6 col-sm-4 price-box price-box--purple">
    <div className="price-box__wrap">
      <div className="price-box__img"></div>
      <h1 className="price-box__title">
        Free
      </h1>
      <p className="price-box__people">
        1 Account
      </p>
      <h2 className="price-box__discount">
        <span className="price-box__dollar">₹</span>0<span className="price-box__discount--light">/ 15 Days</span>
      </h2>
      <h3 className="price-box__price">
        ₹ 4500/mo
      </h3>
      <p className="price-box__feat">
        Features
      </p>
      <ul className="price-box__list">
        <li className="price-box__list-el">Tool Management Panel</li>
        <li className="price-box__list-el">24*7 Support</li>
        <li className="price-box__list-el">No tasks limit</li>
        <li className="price-box__list-el">No contractors limit </li>
      </ul>
       <div className="price-box__btn">
      <a className="btn btn--purple btn--width">Start now</a>
    </div>
  </div>
  </div>
  <div className="col-md-6 col-sm-4 price-box price-box--violet">
  <div className="price-box__wrap">
      <div className="price-box__img"></div>
      <h1 className="price-box__title">
        Business
      </h1>
      <p className="price-box__people">
       1 Account
      </p>
      <h2 className="price-box__discount">
      <span className="price-box__dollar">₹</span>4000<span className="price-box__discount--light">/mo</span>
      </h2>
      <h3 className="price-box__price">
        ₹ 9000 /mo
      </h3>
      <p className="price-box__feat">
        Features
      </p>
      <ul className="price-box__list">
        <li className="price-box__list-el">Tool Management Panel</li>
        <li className="price-box__list-el">24*7 Support</li>
        <li className="price-box__list-el">No tasks limit</li>
        <li className="price-box__list-el">No contractors limit </li>
      </ul>
      <div className="price-box__btn">
      <a className="btn btn--violet btn--width startButton">Buy now</a>
    </div>
  </div>
  </div>



</div>
</div>
</div>
<footer className="footer">
  <div className="container">
    <div className="row">
      <div className="col-md-2 col-xs-6">
      </div>
  </div>
  </div>
</footer>
    </div>
  )
}

export default LandingPage