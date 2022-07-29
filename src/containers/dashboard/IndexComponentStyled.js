

import styled from "styled-components";

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }

  const images = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/));


export default styled.div`





/*dashboard CSS*/

.white-curve-box {
	border-radius: 20px;
	background: #FFFFFF;
	min-height: 380px;
	box-sizing: border-box;
	padding: 20px;
	box-shadow: -1px 4px 18px -8px rgba(0,0,0,0.5);
	margin-bottom:10px;
}

.dash-title {
	font-size: 34px;
	color: #333333;
	line-height: 1;
	margin: 20px 0;
}

.white-curve-box #collapseExample {
  display: block;
  height: 196px;
  overflow: hidden;
  transition: all 0.5s ease;
  
}

.white-curve-box #collapseExample.show {
  height: 500px;
}

.white-curve-box .collapse ~ a.collapsed::after {
	content: '';
	background: url(${images['load-more.png']}) no-repeat;
	width: 38px;
	height: 38px;
	display: block;
	margin: 19px auto 0;
}
.white-curve-box .collapse.show ~ .collapsed::after {

	content: '';
	background: url(${images['load-less.png']}) no-repeat;
	width: 38px;
	height: 38px;
	display: block;
	margin: 0 auto;
}


.select-list-head {
	border-bottom: 2px solid #EBF2F7;
	padding: 0 0 5px;
	display: flex;
	width: 100%;
	margin: 0 0 20px;
}



.i-con {
	margin-left: auto;
}


.white-curve-box .select-list {
	display: flex;
	padding: 0 0 37px;
}

.white-curve-box .select-list input {
    margin: 3px 24px 0 0;
}

.white-curve-box .select-list p {
    line-height: 1;
    margin: 0;
    font-size: 19px;
    width: 90%;
}

.white-curve-box .select-list p s {
	color: #B3B8BD;
}

.survey-wrapper {
	background: #FFFFFF;
	border-radius: 4px;
	padding: 20px;
	margin: 0 0 20px;
	box-shadow: -1px 4px 18px -8px rgba(0,0,0,0.5);
}

.survey-wrapper .table thead th {
	background: #f1f4f7;
	border: none !important;
	font-size: 16px;
	color: #B3B8BD;
}

.survey-wrapper .table thead th:first-child {
	border-radius: 10px 0 0 10px;
}

.survey-wrapper .table thead th:last-child {
	border-radius:  0 10px 10px 0;
	text-align: right;
}

.survey-wrapper .table td:last-child {
	text-align: right;
}



.survey-wrapper .table td {
	font-size: 18px;
	line-height: 1;
	color: #52575D;
	border-top: none;
	border-bottom: 1px solid #E4E9EE;
	padding: 12px 5px;
}

.flag-icon {
	margin: -2px 10px 0 0;
	width:50px !important;
}

/*dashboard CSS*/


.chartjs-render-monitor {
    margin: -34px 0 0 0;
}

.graph-title {
	font-size: 38px;
	color: #333333;
}

.graph-title span {
	font-size: 16px;
	color: #B3B8BD;
	width: 100%;
	display: block;
}


.bg-danger {
    background-color: #DE2A8B !important;
}

.bg-warning {
    background-color: #FA9A26 !important;
}

.bg-success {
    background-color: #50B79D !important;
}

.progress-title {
	font-size: 20px;
	color: #333333;
}

.progress-title span {
	font-size: 16px;
	color: #B3B8BD;
}

.progress-items {
	margin: 0 0 30px;
}

.progress-items .progress {
	height: 8px;
	background: #edf3f9;
}


#main {
	height: 100%;
    background: #F5F6FA;
}
.top-table .progress {
	height: 8px;
	background: #edf3f9;
}

.top-table .progress-bar {
	background: #2862FF;
}

.progress-percentage span {
    width: 100%;
    display: block;
    text-align: right;
    margin: 0 0 4px;
	font-weight: bold;
}





ul.pagination  {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
}

.pagination li:last-child,
.pagination li:first-child {
	display: none;
}






.pagination li:nth-child(2) a {
	content:"";
	width: 13px;
	height: 21px;
	background: url(${images["pagination-left-arrow.png"]}) no-repeat;
	font-size: 0 !important;
}

.pagination li:nth-child(2) a:hover {
	content:"";
	width: 13px;
	height: 21px;
	background: url(${images["pagination-left-arrow.png"]}) no-repeat;
	font-size: 0 !important;
	padding: 0;
}


.pagination li:nth-last-child(2) a {
	content:"";
	width: 13px;
	height: 21px;
	background: url(${images["pagination-right-arrow.png"]}) no-repeat;
	font-size: 0 !important;
	padding: 0;
}

.pagination li:nth-last-child(2) a:hover {
	content:"";
	width: 13px;
	height: 21px;
	background: url(${images["pagination-right-arrow.png"]}) no-repeat;
	font-size: 0 !important;
}

.pagination li a {
	color: #000;
	text-decoration: none;
	font-size: 17px;
	font-weight: bold;
	padding: 10px 15px;
	border-radius: 15px;
	width: 40px;
	display: block;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 10px;
}

.pagination li a:hover {
	background: #508FF4;
	color: #FFFFFF;
}

.page-content-wrapper {
	padding: 70px 3px 0 260px;
}

@media screen and (max-width: 1240px) {
  .page-content-wrapper {
	  padding: 100px 10px 0 !important;
  }
}


@media screen and (max-width: 991px) {
	.white-curve-box {
		margin: 0 0 20px;
	}
}

@media screen and (max-width: 767px) {
	
	.top-table {
		width: 800px;
	}
	.pagination li a {
		font-size: 14px;
		padding: 6px 10px;
		border-radius: 15px;
		width: 32px;
		margin: 0 5px;
	}
}



`;