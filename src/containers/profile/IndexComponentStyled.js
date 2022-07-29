import styled from "styled-components";

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
}

const images = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/));


export default styled.div`


.custom-message {
    display: block;
    text-align: center;
}

#maindiv {
  font-family: 'ProximaSoft-Medium', sans-serif;
  color: #333333;
  font-size: 16px;
  overflow-x: hidden;
  background: #F5F6FA;
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
/* profile */
.my-profile .search-user-head .search-div {
	max-width: 278px;
	position: relative;
	width: 100%;
	height: 31px;
	margin-left: auto;
}


.my-profile .search-user-head .search-div input {
	height: 31px;
	border-radius: 8px;
	box-shadow: -1px 5px 27px -5px rgb(0 0 0 / 10%);
}



.my-profile .search-user-head .search-div .search-btn {
	background: url(${images['search.svg']}) no-repeat;
    border: none;
    text-indent: -9999px;
    width: 16px;
    height: 16px;
    position: absolute;
    right: 9px;
    top: 8px;
    background-size: contain;
}

.my-profile h2 {
	font-size: 24px;
	color: #333333;
	line-height: 1;
	margin: 20px 0;
}

.my-profile h2 span {
	font-family: 'ProximaSoft-Medium';
}

.my-profile .table thead th {
	background: #f1f4f7;
	border: none !important;
	font-size: 16px;
	color: #B3B8BD;
}

.my-profile .table thead th:first-child {
	border-radius: 10px 0 0 10px;
}

.my-profile .table thead th:last-child {
	border-radius:  0 10px 10px 0;
}


.my-profile .table td {
	font-size: 18px;
	line-height: 1;
	color: #52575D;
	border-top: none;
	border-bottom: 1px solid #E4E9EE;
	padding: 25px 5px;
}

.my-profile .popup-btn {
	color: #007bff;
    text-decoration: underline;
	cursor: pointer
}


.my-profile .dash-title {
	font-size: 34px;
	color: #333333;
	line-height: 1;
	margin: 20px 0;
}

.my-profile .right-container {
	border-radius: 4px;
	background: #FFFFFF;
	padding: 15px;
}

.my-profile h2 span {
    font-family: 'ProximaSoft-Medium';
}
@media screen and (max-width: 767px) {
    .my-profile .search-user-head .search-div {
        max-width: 100%;
        margin: 0 0 12px;
	}
	.my-profile .right-container {
		padding: 0;
	}
	.my-profile .table {
		width: 767px;
	}
	
}


/* Profile */









`;