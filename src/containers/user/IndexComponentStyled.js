import styled from "styled-components";
function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }
const images = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/));
export default styled.div`

.h1style{
	margin: 325px;
}



/*User Management CSS*/
.right-container {
	border-radius: 4px;
	background: #FFFFFF;
	padding: 15px;
}

.user-management .search-user-head .search-div {
	max-width: 278px;
	position: relative;
	width: 100%;
	height: 31px;
	margin-left: auto;
}


.user-management .search-user-head .search-div input {
	height: 31px;
	border-radius: 8px;
	box-shadow: -1px 5px 27px -5px rgb(0 0 0 / 10%);
}



.user-management .search-user-head .search-div .search-btn {
	background: url(../img/search.svg) no-repeat;
    border: none;
    text-indent: -9999px;
    width: 16px;
    height: 16px;
    position: absolute;
    right: 9px;
    top: 8px;
    background-size: contain;
}

.user-management h2 {
	font-size: 24px;
	color: #333333;
	line-height: 1;
	margin: 20px 0;
}

.user-management h2 span {
	font-family: 'ProximaSoft-Medium';
}

.user-management .table thead th {
	background: #f1f4f7;
	border: none !important;
	font-size: 16px;
	color: #a9a9a9;
    padding: 10px;
    font-weight: normal;
}

.user-management .table thead th:first-child {
	border-radius: 10px 0 0 10px;
}

.user-management .table thead th:last-child {
	border-radius:  0 10px 10px 0;
}


.user-management .table td {
	font-size: 16px;
	line-height: 1;
	color: #52575D;
	border-top: none;
	border-bottom: 1px solid #E4E9EE;
	padding: 25px 5px;
}

.user-management-modal form .form-group {
	width: 47%;
	margin: 10px;
}

.user-management-modal form .disable-user {
	position: relative;
}

.user-management-modal form .disable-user .switch {
	position: absolute;
    right: 0;
	top: 10px;
}


.user-management-modal form {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}

.user-management-modal form .disable-user input {
	border-bottom: 1px solid #DADADA;
	background: none;
	border-radius: 0;
}


.user-management-modal .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 28px;
}

.user-management-modal .switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.user-management-modal .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #CBCBCB;
  background: #F5F6FA;
  -webkit-transition: .4s;
  transition: .4s;
}

.user-management-modal .slider:before {
  position: absolute;
  content: "";
  height: 19px;
  width: 19px;
  left: 4px;
  bottom: 4px;
  box-shadow: 0px 3px 6px #00000029;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

.user-management-modal input:checked + .slider {
  background-color: #508FF4;
}

.user-management-modal input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

.user-management-modal input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.user-management-modal .slider.round {
  border-radius: 15px;
}

.user-management-modal .slider.round:before {
  border-radius: 50%;
}

.user-management-modal .switch {
	width: 60px !important;
}

.user-management-modal .user-management-modal h1 {
	text-align: center;
}
.page-content-wrapper {
	padding: 70px 61px 0 320px;
	box-sizing: border-box;
	transition: all 0.5s ease;
	-webkit-transition: all 0.5s ease !important;
    -moz-transition: all 0.5s ease !important;
    -o-transition: all 0.5s ease !important;
    transition: all 0.5s ease !important;
}


@media screen and (max-width: 1240px) {
	.page-content-wrapper {
	padding: 100px 10px 0 0;
	}
}

@media screen and (max-width: 767px) {
	.user-management .table .table {
		width: 1209px;
	}
	.user-management .search-user-head .search-div {
		max-width: 100%;
		position: relative;
		width: 100%;
		height: 31px;
		margin-left: auto;
		margin: 0 0 24px;
	}
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
}


.pagination li:nth-last-child(2) a {
	content:"";
	width: 13px;
	height: 21px;
	background: url(${images["pagination-right-arrow.png"]}) no-repeat;
	font-size: 0 !important;
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

@media screen and (max-width: 1450px) {
	.user-management .table {
		width: 1209px;
	}
}

`;