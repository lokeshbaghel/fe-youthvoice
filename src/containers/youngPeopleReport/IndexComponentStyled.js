
import styled from "styled-components";

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }

  const images = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/));

export default styled.div`

/* Profile 2 */
.btn-info.green-btn {
	padding: 7px 30px !important;
    border-radius: 10px !important;
}
.my-profile-second .search-user-head {
	border-bottom: 3px solid #EBF2F7;
	margin: 0 0 20px;
}


.my-profile-second h2 {
    font-size: 24px;
    color: #333333;
    line-height: 1;
    margin: 20px 0;
}


.my-profile-second h2 span {
	font-family: 'ProximaSoft-Medium';
}

.my-profile-second .table thead th:first-child {
	border-radius: 10px 0 0 10px;
}

.my-profile-second .table thead th:last-child {
	border-radius:  0 10px 10px 0;
}


.my-profile-second .table td {
	font-size: 18px;
	line-height: 1;
	color: #52575D;
	border-top: none;
	border-bottom: 1px solid #E4E9EE;
	padding: 25px 5px;
}

.my-profile-second .table thead th {
	background: #f1f4f7;
	border: none !important;
	font-size: 16px;
	color: #B3B8BD;
}

.my-profile-second .circle {
	width: 15px;
    height: 15px;
    display: inline-block;
    border-radius: 50%;
    margin: 0 10px 0 0;
	position: relative;
	top: 2px;
}

.my-profile-second .red-circle {
	background: #F2323F;
}

.my-profile-second .orange-circle {
	background: #FA9A26;
}

.my-profile-second .green-circle {
	background: #50B79D;
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

.btn-group {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    width: 100%;
}

.btn-primary.green-btn {
	background: #50B79D;
	border-color: #50B79D;
}

.btn-primary.green-btn:hover {
	background: #25987b;
	border-color: #25987b;
}

@media screen and (max-width: 1450px) {
	.my-profile-second .table {
		width: 1209px;
	}
}


@media screen and (max-width: 767px) {
	
	.my-profile-second .btn-primary {
		margin: 0 auto 10px !important;
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


`;