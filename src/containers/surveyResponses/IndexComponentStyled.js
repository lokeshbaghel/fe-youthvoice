

import styled from "styled-components";
function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }

  const images = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/));


export default styled.div`



/* Survey Responsive */

.survey-responses .dropdown {
	margin: 17px 0 0;
}

.survey-responses .white-curve-box {
	min-height: 250px;
}

.survey-responses .search-user-head {
    border-bottom: 3px solid #EBF2F7;
    margin: 0 0 20px;
}

.survey-responses h2 {
    font-size: 24px;
    color: #333333;
    line-height: 1;
    margin: 20px 0;
}

.survey-responses h2 span {
    font-family: 'ProximaSoft-Medium';
}
.dash-title {
	font-size: 34px;
	color: #333333;
	line-height: 1;
	margin: 20px 0;
}

.links-container {
    margin: 0 0 30px;
}

.left-links .btn-outline-primary {
    font-size: 16px;
    color: #508FF4;
    text-decoration: none;
    border: 1px solid #508FF4;
    border-radius: 10px;
    padding: 6px 20px;
}

.left-links .btn-outline-primary:hover {
	color: #fff;
}

.links-container .dropdown-toggle {
	background: #FFFFFF;
}

.links-container .dropdown-toggle span {
	color: #CBC9D9;
	font-size: 13px;
}

.links-container .dropdown-toggle {
    background: #FFFFFF !important;
    color: #000000 !important;
    text-decoration: none;
    border: 1px solid #e9e9ec !important;
    border-radius: 10px;
    font-size: 22px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 220px;
    height: 47px;
    padding: 5px 15px;
    line-height: 1;
	position: relative;
	margin-left: auto;
}

.links-container .dropdown-item {
	text-decoration: none;
}

.links-container .dropdown-toggle:after {
	position: absolute;
    right: 10px;
    top: 40%;
    transform: translateY(-50%);
	border: solid black;
	border-width: 0 2px 2px 0;
	display: inline-block;
	padding: 3px;
	transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
	border-color: #9c9c9c;
}
.links-container .dropdown-toggle:focus,
.links-container .dropdown-toggle:hover {
    box-shadow: none !important;
}


.left-links a {
	color: #333333;
	font-size: 27px;
	text-decoration: none;
	border-bottom: 1px solid transparent; 
	margin-right: 18px;
}


.left-links a {
	color: #333333;
	font-size: 27px;
	text-decoration: none;
	border-bottom: 1px solid transparent; 
	margin-right: 18px;
}

.left-links a:hover {
	border-bottom: 1px solid #333333; 
	font-weight: bold;
}

.links-container {
	margin: 0 0 30px;
}

#main {     height: 100%;     background: #F5F6FA; }

.white-curve-box {     background: #FFFFFF;     min-height: 430px;     box-sizing: border-box;     padding: 20px;     margin: 0 0 20px;     box-shadow: -1px 4px 18px -8px rgb(0 0 0 / 50%); }


.card-body {
    min-height: 1px;
    padding: 0 0 15px 10px;
	flex-direction: column;
}

.custom-accordion-third .btn {
	color: #52575D;
	font-size: 19px;
	font-weight: bold;
	line-height: 1;
	box-shadow: none;
	font-family: 'ProximaSoft-Medium';
	text-align: left;
    padding: 16px 10px;
	width: 100%;
	text-decoration: none;
	background: url(${images['grey-up-arrow.png']}) no-repeat right 10px top 17px;
}

.custom-accordion-third .btn.collapsed {
	background: url(${images['down-arrow.jpg']} ) no-repeat right 10px top 17px;
}

.custom-accordion-third .btn {
	background: url(${images['up-arrow.jpg']} ) no-repeat right 10px top 17px;
}

.custom-accordion-third .card,
.custom-accordion-third .card-header {
	border: none !important;
}

.custom-accordion-third .card {
	background: #FFFFFF;
	width: 100%;
	padding: 0;
	border-radius: 0 !important;
	border-bottom: 2px solid #e4e9ee !important;
}

.custom-accordion-third .card-header {
	background: none;
	border-radius: 0 !important;
	padding: 0;
}

.white-curve-box textarea {
	width: 100%;
	height: 200px;
	border: none;
	resize: none;	
}

.white-curve-box textarea:focus {
	outline-width: 0;
}


.btn-primary.green-btn {
	background: #69c3af;
    font-size: 17px;
    border: none !important;
    box-shadow: none !important;
    padding: 10px 70px;
    border-radius: 10px;
}

.text-right a {
	margin: 0 10px;
}

.text-right a:hover {
	color: #FFFFFF;
}

/* Survey Responsive */

.white-curve-box textarea:focus {
    outline-width: 0;
}
 

 
.text-right a {
    margin: 0 10px;
}
 
.text-right a:hover {
    color: #FFFFFF;
}

.card-body span.answer-wrapper span.circle {
	width: 15px;
	height: 15px;
	display: inline-block;
	border-radius: 50%;
	margin: 0 10px;
}

.card-body span.answer-wrapper span.red-circle {
	background: #F2323F;
}

.card-body span.answer-wrapper span.yellow-circle {
	background: #FFD93B;
}

.card-body span.answer-wrapper span.light-green-circle {
	background: #BBE445;
}

.card-body span.answer-wrapper span.orange-circle {
	background: #FA9A26;
}

.card-body span.answer-wrapper span.green-circle {
	background: #00BC5A;
}

.card-body .answer-text {
    display: flex;
    align-items: center;
}

.card-body .answer-text span.answer-wrapper  {
	display: inline-flex;
    align-items: center;
}


`;