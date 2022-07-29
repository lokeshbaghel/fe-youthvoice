

import styled from "styled-components";

import ProximaSoft2 from './assets/fonts/ProximaSoft-Bold.woff2';
import ProximaSoft from './assets/fonts/ProximaSoft-Bold.woff';
import ProximaSoft2Medium from './assets/fonts/ProximaSoft-Medium.woff2';
import ProximaSoft2Regular from './assets/fonts/ProximaSoft-Regular.woff2';
import webfont2 from './assets/fonts/good_life-webfont.woff2';
import webfont from './assets/fonts/good_life-webfont.woff';
function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }

  const images = importAll(require.context('./assets/img/', false, /\.(png|jpe?g|svg)$/));


export default styled.div`



#maindiv {
    font-family: 'ProximaSoft-Medium', sans-serif;
    color: #333333;
    font-size: 16px;
    overflow-x: hidden;
    background: url(${images['bg-graphic.png']}) no-repeat !important;
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
/*--------------------------------------------------------------
# General
--------------------------------------------------------------*/

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

.toggled .sidebar-bottom-content {
	display: flex !important;
}

.page-content-wrapper {
	padding: 70px 3px 0 260px;
	box-sizing: border-box;
	transition: all 0.5s ease;
	-webkit-transition: all 0.5s ease !important;
    -moz-transition: all 0.5s ease !important;
    -o-transition: all 0.5s ease !important;
    transition: all 0.5s ease !important;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
    list-style: none;
}


.loader {
    position: fixed;
    z-index: 9999;
    background: rgba(255,255,255,0.8);
    left: 260px;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 1240px) {
      
      .loader {
        left: 0;
      }
      #sidebar-wrapper {
		width: 0;
		opacity: 0;
	}
	
	.toggled #sidebar-wrapper {
		width: 260px;
		opacity: 1 !important;
	}

	.page-content-wrapper {
		padding: 100px 10px 0 !important;
	}
  }

 
 .pagination li.active a {
    background: rgb(80, 143, 244);
    color: rgb(255, 255, 255);
}
.nodata {
  color: #000;
  text-align: center;
  display: block;
  font-size: 19px;
}
`;