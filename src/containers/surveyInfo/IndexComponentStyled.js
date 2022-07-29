import styled from "styled-components";
import searchicon from '../../assets/img/search-icon.png';
import backgimg from '../../assets/img/bg-graphic.png';
import ProximaSoft2 from '../../assets/fonts/ProximaSoft-Bold.woff2';
import ProximaSoft from '../../assets/fonts/ProximaSoft-Bold.woff';

import ProximaSoft2Medium from '../../assets/fonts/ProximaSoft-Medium.woff2';

import ProximaSoft2Regular from '../../assets/fonts/ProximaSoft-Regular.woff2';

import webfont2 from '../../assets/fonts/good_life-webfont.woff2';
import webfont from '../../assets/fonts/good_life-webfont.woff';

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }

  const images = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/));


export default styled.div`




/*--------------------------------------------------------------
# General
--------------------------------------------------------------*/

@font-face {
    font-family: 'ProximaSoft-Bold';
    src: url(${ProximaSoft2}) format('woff2'),
         url(${ProximaSoft}) format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'ProximaSoft-Medium';
    src: url(${ProximaSoft2Medium}) format('woff2'),
         url(${ProximaSoft}) format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'ProximaSoft';
    src: url(${ProximaSoft2Regular}) format('woff2'),
         url(${ProximaSoft}) format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family:'Goodlife';
    src: url(${webfont2}) format('woff2'),
         url(${webfont}) format('woff');
    font-weight: normal;
    font-style: normal;
}







.spanda{margin-right: 30px;}


#maindiv {
	font-family: 'ProximaSoft-Medium', sans-serif;
	color: #333333;
	font-size: 16px;
	overflow-x: hidden;
	background: url(${backgimg}) no-repeat !important;
	background-size: cover;
	height: 100vh;
  }
  
  body {
	font-family: "ProximaSoft-Medium", sans-serif;
	color: #333333;
	font-size: 16px;
	overflow-x: hidden;
	background: url(${images['bg-graphic.png']}) no-repeat;
	background-size: cover;
  }




  
  body.white-bg {
	  background: #FFFFFF;
  }
  
  a {
	color: #e03a3c;
  }
  
  a:hover {
	color: #e76668;
	text-decoration: none;
  }
  
  h1, h2, h3, h4, h5, h6 {
	font-family: "ProximaSoft-Medium", sans-serif;
	text-transform: uppercase;
  }
  
  h1 {
	  font-size: 35px;
	  line-height: 1.2;
	  color: #9062B1;
  }
  
  h2 {
	  font-size: 28px;
	  line-height: 1.2;
	  color: #9062B1;
  }
  
  p {
	  font-family: 'ProximaSoft';
	  font-size: 20px;
	  line-height: 1.2;
	  color: #9062B1;
  }
  
  img {
	  max-width: 100%;
  }
  
  #header {
	  padding: 20px 0 30px;
  }
  
  .btn.btn-primary {
	  font-size: 22px;
	  padding: 6px 10px;
	  background:#9062B1;
	  border-radius: 39px;
	  border-color: #9062B1;
	  max-width: 264px;
	  width: 100%;
	  color: #ffffff;
  }
  
  .btn-primary.green-bg {
	  background: #50B79D;
	  border-color: #50B79D;
  }
  
  .graphic-right {
	  margin: -70px 0 0;
  }
  
  .reaction-div {
	  display: flex;
	  flex-direction: column;
	  margin: 0 0 60px;
  }
  
  .reaction-div .btn.btn-primary {
	  background: #D7F5FB;
	  border-color: #D7F5FB; 
	  border-radius: 20px;
	  max-width: 391px;
	  width: 100%;
	  color: #9062B1;
	  margin: 0 0 10px;
	  text-align: left;
	  padding: 8px 17px;
  }
  
  .reaction-div .btn.btn-primary img {
	  max-width: 40px;
	  margin: 0 10px 0 0;
  }
  
  .radius-bg {
	  background: #D7F5FB;
	  border-radius: 20px;
	  box-sizing: border-box;
	  padding: 10px;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  width: 100%;
	  height: 130px;
  }
  
  .radius-bg .btn.btn-primary {
	  margin: 0 12px;
  }
  
  .pagination {
	  color: #9062B1;
	  font-size: 18px;
	  line-height: 1;
	  margin: 0 10px 0 0;
  }
  
  .curve-box {
	  background: #D7F5FB;
	  border-radius: 20px;
	  box-sizing: border-box;
	  padding: 20px;
	  text-align: center;
	  width: 100%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  min-height: 211px;
	  justify-content: space-around;
	  margin: 0 0 20px;
  }
  
  .progress {
	  background-color: #BDBDBD;;
	  border-radius: 20px;
	  position: relative;
	  margin: 15px 0;
	  height: 22px;
	  width: 361px;
	  position: relative;
  }
  
  .progress-done {
	  background: #50B79D;
	  border-radius: 20px;
	  color: #fff;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  height: 100%;
	  width: 0;
	  opacity: 0;
	  transition: 1s ease 0.3s;
	  color: #EFD29C;
	  font-size: 14px;
  }
  
  .count {
	  position: absolute;
	  right: 20px;
	  top: 50%;
	  transform: translateY(-50%);
	  color: #EFD29C;
	  font-size: 14px;
  }
  
  .top-progressbar {
	  width: 100%;
	  height: 26px;
	  background: #BDBDBD;
	  position: relative;
	  border-radius: 20px;
	  overflow: hidden;
  }
  
  .top-progressbar:after {
	  content: "";
	  width: 200px;
	  height: 26px;
	  position: absolute;
	  left: 0;
	  top: 0;
	  background: #50B79D;
  }
  
  .progress-coin-main {
	  display: flex;
  }
  
  .coin-icon-container {
	  display: flex;
	  flex-direction: column;
  }
  
  
  /*Footer Css*/
  
  
  footer {
	  background: #D7F5FB;
	  margin-top: 150px;
  }
  
  .footer-content {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  min-height: 127px;
	  justify-content: space-between;
  }
  
  .footer-content p {
	  margin: 0;
	  font-family: 'ProximaSoft-Bold';
	  font-size: 22px;
	  line-height: 1;
	  margin: 0 50px;
  }
  
  
  @media (max-width: 767px) {
	
	
	#header .row {
		display: flex;
		align-items: center;
	}
	

	#header .col-md-6 {
		width: 50%;
		display: flex;
		align-items: center;
	}
	#header .btn.btn-primary {	
		font-size: 16px;
    	padding: 4px 10px;
	}
	.btn.btn-primary {
		font-size: 17px;
	}
	.mt-5 {
		margin-top: 10px !important;
	}
	h1 {
		font-size: 24px !important;
	}

	.reaction-div ul label {
		font-size: 20px;
	}

	#header {
		padding: 20px 0 10px;
	}
	.graphic-right {
		display: none;
	}

	.reaction-div ul label {
		font-size: 20px;
	}
	p {
		font-family: 'ProximaSoft';
		font-size: 18px;
		line-height: 1.2;
		color: #9062B1;
	}
	#login .btn.btn-primary {
		max-width: 150px !important;
	}
	.footer-content .btn-primary {
		width:100% !important;
		max-width: 100%;
		margin: 10px auto;
	}

	p:empty {
		display: none !important;
	}

	.reaction-div ul label {
		font-size: 19px;
	}
	.mt-3 {
		margin: 0 !important; 
	}
	.reaction-div {
		margin: 0 !important;
	}
	p:empty {
		display: none !important;
	}
	.reaction-div ul {
		margin: 0 !important;
	}
	footer {
		margin-top: 0;
	}
	.progress-items {
		margin: 0;
	}
	
  }
  
  @media (min-width: 1500px) {
	  .container, .container-lg, .container-md, .container-sm, .container-xl {
		  max-width: 1400px;
	  }
  }
  
  
  


`;