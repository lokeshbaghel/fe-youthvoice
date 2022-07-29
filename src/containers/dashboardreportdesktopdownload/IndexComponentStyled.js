

import styled from "styled-components";

export default styled.div`
.page-content-wrapper {
	padding: 0 !important;
}


/* Dashboard Report Desktop */
.dashboard-report .dash-title {
	margin: 0 0 40px;
	font-size: 28px;
}

.left-links a {
	color: #333333;
	font-size: 27px;
	text-decoration: none;
	border-bottom: 1px solid transparent; 
	margin-right: 18px;
}




.links-container {
	margin: 0 0 30px;
}




.reading-report-links {
	font-size: 24px;
	line-height: 1;
	color: #9062B1;
	display: flex;
    align-items: center;
	flex-wrap: wrap;
	margin: 0 0 20px;
}

.reading-report-links li {
	margin: 0 12px 0 0;
}

.reading-report-links a {
	margin: 0 10px 0 0;
	align-items: center;
	display: flex;
	font-size: 20px;
	color: #52575D;
	text-decoration: none;
}

.reading-report-links a span {
	width: 15px;
	height: 15px;
	display: inline-block;
	border-radius: 50%;
	margin: 0 10px 0 0;
}


.reading-report-links a span.red-circle {
	background: #F2323F;
}

.links-container .dropdown-toggle span,
.css-yk16xz-control {
	width: 100% !important;
}

.main-dropdown {
	width: 100%;
	max-width: 300px;
	margin: 10px 0 0;
}

.main-dropdown .css-12jo7m5 {
	font-size: 12px;
	width: 41px;
}




.reading-report-links a span.yellow-circle {
	background: #FFD93B;
}

.reading-report-links a span.light-green-circle {
	background: #BBE445;
}

.reading-report-links a span.orange-circle {
	background: #FA9A26;
}

.reading-report-links a span.green-circle {
	background: #00BC5A;
}

/* Dashboard Report Desktop */

.dashboard-report .btn-primary {
    border-radius: 10px !important;
    font-size: 18px;
    line-height: 1;
    padding: 10px 30px !important;
    flex: none !important;
    margin: 0 20px;
    background: #508FF4 !important;
    border-color: #508FF4 !important;
}

.dashboard-report .btn-outline-primary {
    font-size: 16px !important;
    color: #508FF4 !important;
    text-decoration: none !important;
    border: 1px solid #508FF4 !important;
    border-radius: 10px !important ;
    padding: 6px 20px !important;
	margin: 0 5px;
}

.dashboard-report .btn-outline-primary:hover {
	color: #FFFFFF !important;
}

.green-btn {
	background: #6EC3AE !important;
	border-color: #6EC3AE !important;
}



.btn-group {
	display: flex;
	justify-content: flex-end;
	flex-wrap: wrap;
	width: 100%;
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
    width: 350px;
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

.white-curve-box {
	background: #FFFFFF;
	min-height: 430px;
	box-sizing: border-box;
	padding: 20px;
	margin: 0 0 20px;
    display: flex;
    justify-content: center;
	width: 100%;
	
}

.white-curve-box > div {
	width: 100%;
}

.dash-title {
	font-size: 34px;
	color: #333333;
	line-height: 1;
	margin: 20px 0;
}

.bottom-links {
    flex-direction: column;
    justify-content: flex-start;
}

.bottom-links h3 {
	font-size: 24px;
	color: #333333;
	border-bottom: 3px solid #EBF2F7;
	padding: 0 0 10px;
}

.bottom-links ul li {
	font-size: 16px;
	color: #52575D;
	padding: 10px 0;
	border-bottom: 1px solid #E4E9EE;
}


#main {
	height: 100%;
    background: #F5F6FA;
}

.white-curve-box .sc-pVTma,
.white-curve-box .sc-furvIG,
.white-curve-box .sc-iCfLBT {
    width: 100% !important;
	
}

.white-curve-box > div {
	width: 100% !important;
}

.sc-furvIG,
.sc-iCfLBT {
    width: 100% !important;
	display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.mixed-chart {
	width: 100%;
}

.sc-furvIG {
	width: 100%;
}

.btn-primary.green-btn {
    background: #69c3af !important;
    font-size: 17px;
    border: none !important;
    box-shadow: none !important;
    padding: 10px 70px !important;
    border-radius: 10px !important;
    margin: 40px 0 0 0;
}
.textdata {
	width: 100%;
	height: 120px;
	border: 3px solid #cccccc;
	padding: 5px;
	font-family: Tahoma, sans-serif;
	background-image: url(bg.gif);
	background-position: bottom right;
	background-repeat: no-repeat;
}

.btn.btn-outline-primary.active {
	color: #FFFFFF !important;
}


.report-graph > div {
    display: flex;
    flex-wrap: wrap;
}
.printme { display: none;}
@media print { 
    .no-printme  { display: none;}
    .printme  { display: block;}
	
}
`;