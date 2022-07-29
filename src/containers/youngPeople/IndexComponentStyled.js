

import styled from "styled-components";

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }

  const images = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/));


export default styled.div`



/* Young people list */



.young-people-list .young-people-wrapper {
    background: #FFFFFF;
    padding: 20px;
	margin: 20px 0;
	box-shadow: -1px 4px 18px -8px rgba(0,0,0,0.5);
}

.young-people-list .young-people-wrapper .table thead th {
	background: #f1f4f7;
	border: none !important;
	font-size: 14px;
	color: #a9a9a9;
	padding: 10px;
	font-weight: normal;
}

.young-people-list .young-people-wrapper .table thead th:first-child {
	border-radius: 10px 0 0 10px;
}

.young-people-list .young-people-wrapper .table thead th:last-child {
	border-radius:  0 10px 10px 0;
}




.young-people-list .young-people-wrapper .table td {
	font-size: 16px;
	line-height: 1;
	color: #52575D;
	border-top: none;
	border-bottom: 1px solid #E4E9EE;
	padding: 25px 10px;
	font-weight: 500;
	vertical-align: middle;
	max-width: 156px;
}


.young-people-list .circle-div {
    width: 43px;
    height: 43px;
    display: flex;
    border-radius: 50%;
    border: 4px solid #E3E9EF;
    justify-content: center;
    align-items: center;
    margin: -12px 0 0 50px;
}

.young-people-list .circle {
	width: 15px;
    height: 15px;
    display: inline-block;
    border-radius: 50%;
    margin: 0 10px 0 0;
	position: relative;
	top: 2px;
}

.young-people-list .red-circle {
	background: #F2323F;
}

.young-people-list .orange-circle {
	background: #FA9A26;
}

.young-people-list .green-circle {
    background: #50B79D;
}

.my-profile-second .green-circle {
	background: #50B79D;
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
	padding: 0;
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



.i-con {
	margin-left: auto;
}

.select-list-head {
	border-bottom: 2px solid #EBF2F7;
	padding: 0 0 5px;
	display: flex;
	width: 100%;
	margin: 0 0 20px;
}

.btn-group {
	display: flex;
	justify-content: flex-end;
	flex-wrap: wrap;
	width: 100%;
}

.btn-primary {
	border-radius: 10px !important;
	font-size: 18px;
	line-height: 1;
	padding: 10px 30px !important;
	flex: none !important;
	margin: 0 20px;
	background: #508FF4;
	border-color: #508FF4;
}

@media screen and (max-width: 1450px) {
	
	
	.young-people-list .young-people-wrapper .table {
		width: 1209px;
	}
}

table.table img {
    width: 40px;
    height: 30px;
}


/* Young people list */


`;