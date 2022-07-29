import styled from "styled-components";
function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }
const images = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/));
export default styled.div`

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
  font-family: "ProximaSoft-Bold", sans-serif;
}

img {
	max-width: 100%;
}

#header {
	padding: 40px 0 70px;
	box-sizing: border-box;
}

#header.second-header {
	padding: 8px 0 8px 40px;
    box-sizing: border-box;
    position: fixed;
	top: 0;
	width: 100%;
	background: #F3F3F3;
	z-index: 1;
}


#login form label {
	font-family: "ProximaSoft";
	font-style: normal;
	font-weight: normal;
	font-size: 32px;
	line-height: 32px;
	text-align: center;
	letter-spacing: -0.05em;
	color: #9062B1;
}

#login form input[type=text],
#login form input[type=email],
#login form input[type=password] {
	border: 1px solid #FA9A26;
	box-sizing: border-box;
	border-radius: 39px;
	width: 400px;
	max-width: 100%;
	font-family: "ProximaSoft";
	font-weight: 400;
	font-size: 18px;
	line-height: 1;
	height: 50px;
	outline: none;
}

#login form input[type=email]:focus,
#login form input[type=password]:focus {
	box-shadow: none;
}


#login form button[type=submit] {
	background: #9062B1;
	border-radius: 30px;
	width: 400px;
	max-width: 100%;
	height: 50px;
	font-family: "ProximaSoft";
	font-weight: normal;
	font-size: 32px;
	line-height: 1;
	text-align: center;
	letter-spacing: -0.05em;
	color: #FFFFFF;
	border: none;
	margin: 15px 0 0;
	padding: 0 !important;
}

#login form button[type=submit]:focus {
	box-shadow: none;
}

#login form p {
	font-family: "ProximaSoft";
	font-weight: normal;
	font-size: 24px;
	line-height: 1;
	letter-spacing: -0.05em;
	max-width: 400px;
    text-align: center;
}

#login form p a {
	color: #9062B1;
	position: relative;
	display: inline-block;
	margin: 15px 0;
}

#login form p a:hover {
	text-decotration: none;
}

#login form p a:after {
	content: "";
	width: 100%;
	height: 2px;
	background: #945ead;
	position: absolute;
	left: 0;
	bottom: -3px;
	width: 100%;
}

#login form h3 {
	color: #9062B1;
	font-size: 24px;
	line-height: 1;
	letter-spacing: -1px;
	max-width: 400px;
    text-align: center;
	font-family: "ProximaSoft";

}

/*Toggle*/

#wrapper {
    padding-left: 0;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
	font-family: "ProximaSoft";
}



#sidebar-wrapper {
    z-index: 1000;
    left: 310px;
    width: 0;
    height: 100%;
    margin-left: -310px;
    overflow-y: auto;
    overflow-x: hidden;
    background: #4FD5F1;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
}

.fixed-top {
	top: 73px;
}

#sidebar-wrapper::-webkit-scrollbar {
  display: none;
}

#wrapper.toggled #sidebar-wrapper {
    width: 310px;
}

#page-content-wrapper {
    width: 100%;
    padding-top: 70px;
}

#wrapper.toggled #page-content-wrapper {
    position: absolute;
    margin-right: -310px;
}

.hamburger {
  position: fixed;
  top: 20px;  
  z-index: 999;
  display: block;
  width: 20px;
  height: 29px;
  margin-left: 15px;
  background: transparent;
  border: none;
}
.hamburger:hover,
.hamburger:focus,
.hamburger:active {
  outline: none;
}
.hamburger.is-closed:before {
  content: '';
  display: block;
  width: 100px;
  font-size: 14px;
  color: #fff;
  line-height: 32px;
  text-align: center;
  opacity: 0;
  -webkit-transform: translate3d(0,0,0);
  -webkit-transition: all .35s ease-in-out;
}
.hamburger.is-closed:hover:before {
  opacity: 1;
  display: block;
  -webkit-transform: translate3d(-100px,0,0);
  -webkit-transition: all .35s ease-in-out;
}

.hamburger.is-closed .hamb-top,
.hamburger.is-closed .hamb-middle,
.hamburger.is-closed .hamb-bottom,
.hamburger.is-open .hamb-top,
.hamburger.is-open .hamb-middle,
.hamburger.is-open .hamb-bottom {
  position: absolute;
  left: 0;
  height: 1px;
  width: 100%;
}
.hamburger.is-closed .hamb-top,
.hamburger.is-closed .hamb-middle,
.hamburger.is-closed .hamb-bottom {
  background-color: #9062B1;
}
.hamburger.is-closed .hamb-top { 
  top: 5px; 
  -webkit-transition: all .35s ease-in-out;
}
.hamburger.is-closed .hamb-middle {
  top: 50%;
  margin-top: -1px;
}
.hamburger.is-closed .hamb-bottom {
  bottom: 5px;  
  -webkit-transition: all .35s ease-in-out;
}

.hamburger.is-closed:hover .hamb-top {
  top: 0;
  -webkit-transition: all .35s ease-in-out;
}
.hamburger.is-closed:hover .hamb-bottom {
  bottom: 0;
  -webkit-transition: all .35s ease-in-out;
}
.hamburger.is-open .hamb-top,
.hamburger.is-open .hamb-middle,
.hamburger.is-open .hamb-bottom {
  background-color:  #9062B1;
}
.hamburger.is-open .hamb-top,
.hamburger.is-open .hamb-bottom {
  top: 50%;
  margin-top: -2px;  
}
.hamburger.is-open .hamb-top { 
  -webkit-transform: rotate(45deg);
  -webkit-transition: -webkit-transform .2s cubic-bezier(.73,1,.28,.08);
}
.hamburger.is-open .hamb-middle { display: none; }
.hamburger.is-open .hamb-bottom {
  -webkit-transform: rotate(-45deg);
  -webkit-transition: -webkit-transform .2s cubic-bezier(.73,1,.28,.08);
}
.hamburger.is-open:before {
  content: '';
  display: block;
  width: 100px;
  font-size: 14px;
  color: #fff;
  line-height: 32px;
  text-align: center;
  opacity: 0;
  -webkit-transform: translate3d(0,0,0);
  -webkit-transition: all .35s ease-in-out;
}
.hamburger.is-open:hover:before {
  opacity: 1;
  display: block;
  -webkit-transform: translate3d(-100px,0,0);
  -webkit-transition: all .35s ease-in-out;
}

/*-------------------------------*/
/*            Overlay            */
/*-------------------------------*/

.overlay {
    position: fixed;
    display: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(250,250,250,.8);
    z-index: 1;
}

/*-------------------------------*/
/*     Sidebar nav styles        */
/*-------------------------------*/


/*My Profile*/



.header-right {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.search-box input {
	border: none;
	border-bottom: 1px solid #9062B1;
	background: url(${images['search-icon.png']}) no-repeat right;
}

.search-box input:focus {
	outline: none;
}

img.notification-icon {
	margin: 0 20px;
}

table.main-table th {
	background: #F3F3F3;
	font-family: 'ProximaSoft';
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 1;
	letter-spacing: -1px;
	color: #9062B1;
}

table th,
table td {
	font-family: 'ProximaSoft';
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 1;
	letter-spacing: -1px;
	color: #9062B1;
}

.page-content-wrapper {
	padding: 100px 61px 0;
	box-sizing: border-box;
}

.profile-title {
	font-family: 'ProximaSoft';
	font-size: 32px;
	font-style: normal;
	font-weight: 400;
	line-height: 1;
	letter-spacing: -0.05em;
	text-align: left;
	color: #9062B1;
}

.profile-title.margin-bottom {
	margin: 0 0 100px;
}


.content-title {
	font-family: 'ProximaSoft';
	font-size: 32px;
	font-style: normal;
	font-weight: 400;
	line-height: 1;
	letter-spacing: -0.05em;
	text-align: left;
	margin: 0 0 30px;
	color: #9062B1;
}

.content-title-small {
	font-family: 'ProximaSoft';
	font-size: 32px;
	color: #9062B1;
}
.content-info {
	margin: 60px 0 0;
	max-width: 800px;
}

.content-info table td a {
	color: #9062B1;
	text-decoration: underline;
}

.modal-content {
	background: #F3F3F3;
	border-radius: 20px;
}

.modal-header {
	border: none;
}

.modal form label {
	font-family: "ProximaSoft";
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 1px;
	letter-spacing: -0.05em;
	color: #9062B1;
	margin: 0 0 20px;
	width: 100%;
}


.modal form input[type=text],
.modal form input[type=email],
.modal form input[type=password] {
	border: 1px solid #9062B1;
	box-sizing: border-box;
	border-radius: 39px;
	font-family: "ProximaSoft";
	font-weight: 400;
	font-size: 18px;
	line-height: 1;
	height: 50px;
	outline: none;
	width: 400px;
	max-width: 100%;
	padding: 0 5px;
	box-sizing: border-box;
	color: #333333;
}

.modal form input[type=email]:focus,
.modal form input[type=password]:focus {
	box-shadow: none;
}


.modal form button[type=submit] {
	background: #9062B1;
	border-radius: 30px;
	font-family: "ProximaSoft";
	font-weight: normal;
	font-size: 18px;
	line-height: 1;
	text-align: center;
	letter-spacing: -1px;
	color: #FFFFFF;
	border: none;
	margin: 15px 0 0;
	padding: 10px 20px;
	box-sizing: border-box;
	display: inline-block;
}

.modal form button[type=submit]:focus {
	box-shadow: none;
}



/*New Css*/
.toggled .sidebar-bottom-content {
    
	opacity: 1;
}

 .sidebar-bottom-content {
	opacity: 0;
	overflow: hidden;
	transition: 1s ease 0.3s;
	position: fixed;
    bottom: 50px;
    left: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
	width: 100%;
    max-width: 310px;
}

.sidebar-bottom-content span {
	font-family: "ProximaSoft";
	font-weight: normal;
	text-align: center;
	color: #FFFFFF;
}

.sidebar-bottom-content .username {
	font-size: 32px;
	line-height: 1;
	margin: 20px 0 5px;
}

.sidebar-bottom-content .profile {
	font-size: 14px;
	line-height: 1;
}
	
.content-box {
	border: 1px solid #9062B1;
	box-sizing: border-box;
	border-radius: 20px;
	padding: 20px;
	max-width: 507px;
}

.task-title {
	font-family: "ProximaSoft";
	font-weight: normal;
	font-size: 18px;
	line-height: 1;
	letter-spacing: -1px;
	color: #9062B1;
	padding: 0 0 0 5px;
}

.content-box ol li {
	font-size: 18px;
	line-height: 1.2;
	color: #9062B1
}

ol {
	margin: 0;
	padding: 0 0 0 22px;
}

.content-box td {
	padding: 5px;
}

td.strike {
	position: relative;
}

td.strike:before {
	content:"";
	width: 100%;
	height: 1px;
	background: #000;
	position: absolute;
	top: 14px;
	left: 0;
}

.content-box .date  {
	font-family: "ProximaSoft";
	font-weight: normal;
	font-size: 14px;
	line-height: 1;
}

.content-box .date.red  {
	color: #F85A49;
}

.content-box .date.green  {
	color: #4FD5F1;
}

.seperate-sec {
	margin: 30px 0 40px;
}

.progressbar-list {
	border: 1px solid #F85A49;
    box-sizing: border-box;
    border-radius: 39px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
	margin: 15px 0;
}

.servey-title {
	font-weight: normal;
	font-size: 18px;
	line-height: 1;
	color: #9062B1;
}

.servey-date {
	font-weight: normal;
	font-size: 14px;
	line-height: 1;
	color: #F85A49;
}

.progress {
	background-color: #BDBDBD;;
	border-radius: 20px;
	position: relative;
	margin: 15px 0;
	height: 30px;
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

.filter-adsuperhero {
    margin: 90px 0;
    display: flex;
    justify-content: space-between;
}

.filter-adsuperhero ul {
	display: flex;
	flex-wrap: wrap;
}

.filter-adsuperhero ul  li {
	display: flex;
	font-size: 18px;
	line-height: 1;
	color: #9062B1;
}

.filter-adsuperhero ul  li span {
	margin: 0 15px 0 0;
}

.filter-adsuperhero ul  li a {
	color: #9062B1;
	border-bottom: 1px solid transparent;
	margin: 0 15px;
}


.filter-adsuperhero ul  li a:hover {
	color: #cc27b0;
	border-color: #cc27b0;
}

.btn-primary {
	border-radius: 39px !important;
	font-size: 18px;
	line-height: 1;
	padding: 15px 30px !important;
	flex: none !important;
	margin: 0 20px;
}

.purple-btn {
	background: #9062B1;
}

.green-btn {
	background: #50B79D;
}

.add-button img{
	margin: 0 10px 0 0;
}

.btn-group {
	display: flex;
	justify-content: flex-end;
	flex-wrap: wrap;
}


table { border-collapse: separate; border-spacing: 0; }

.tr-spacer {
    height: 15px;
}

table.list-border tbody td {
	border-top: 1px solid #9062B1;
	border-bottom: 1px solid #9062B1;
}

.list-border .green {
	color: #50B79D;
}

table.list-border tbody tr td:first-child { 
	border-left: 1px solid #9062B1;
	border-top-left-radius: 39px;
	border-bottom-left-radius: 39px;
}

table.list-border tbody tr td:last-child {
	border-right: 1px solid #9062B1;
	border-top-right-radius: 39px;
	border-bottom-right-radius: 39px;
}

ul {
	list-style: none;
	margin: 0;
	padding: 0;
	list-style: none;
}

.links {
	font-size: 32px;
	line-height: 1;
	display: flex;
	color: #9062B1;
}

.links a {
	color: #9062B1;
	margin: 0 20px 0 0;
}

.links a:hover,
.links a.active {
	color: #CC27B0;
	text-decoration: underline;
}

.inline-div {
	display: flex;
	align-items: center;
	margin: 50px 0;
}

.inline-div .filter-adsuperhero{
	margin: 5px 0 0 50px;
}

.small-link {
	margin-left: auto;
	font-size: 18px;
	line-height: 1;
	display: flex;
}

.small-link a {
	color: #9062B1;
	margin: 0 10px;
}

.reading-report-links {
	font-size: 24px;
	line-height: 1;
	color: #9062B1;
	display: flex;
    align-items: center;
	flex-wrap: wrap;
}

.reading-report-links li {
	margin: 0 12px 0 0;
}

.reading-report-links a {
	margin: 0 10px 0 0;
	align-items: center;
	display: flex;
	font-size: 24px;
	color: #9062B1;
}

.reading-report-links a span {
	width: 30px;
	height: 30px;
	display: inline-block;
	border-radius: 50%;
	margin: 0 10px 0 0;
}


.reading-report-links a span.red-circle {
	background: #F85A49;
}

.reading-report-links a span.orange-circle {
	background: #FA9A26;
}

.reading-report-links a span.yellow-circle {
	background: #EFD29C;
}

.reading-report-links a span.blue-circle {
	background: #4FD5F1;
}

.reading-report-links a span.green-circle {
	background: #50B79D;
}


.custom-accordion {
	margin-top: 60px;
}

.custom-accordion .btn {
	color: #9062B1;
	font-size: 18px;
	line-height: 1;
	box-shadow: none;
	text-align: left;
    padding: 16px 10px;
	width: 100%;
	text-decoration: none;
	background: url(${images['grey-up-arrow.png']} ) no-repeat right 10px top 17px;
}

.custom-accordion .btn.collapsed {
	background: url(${images['grey-down-arrow.png']}) no-repeat right 10px top 17px;
}

.custom-accordion .btn {
	background: url(${images['purple-up-arrow.png']}) no-repeat right 10px top 17px;
}

.custom-accordion .btn.collapsed {
	background: url(${images['purple-down-arrow.png']} ) no-repeat right 10px top 17px;
}




.custom-accordion .card,
.custom-accordion .card-header {
	border: none !important;
}
.custom-accordion .card {
	background: #E0E0E0;
	width: 100%;
	padding: 0;
	border-radius: 0 !important;
}

.custom-accordion .card-header {
	background: none;
	border-radius: 0 !important;
	padding: 0;
}

.custom-accordion .card-body {
	border-radius: 20px;
    background: #FFFFFF;
}

.custom-accordion .collapse {
	transition: all 0.5s ease;
    padding: 0 10px 30px;
	box-sizing: border-box;
}

.custom-accordion .card:nth-child(odd) {
	background: #F3F3F3 !important;
}




.custom-accordion-second {
	margin-top: 60px;
}

.custom-accordion-second .btn {
	color: #9062B1;
	font-size: 18px;
	line-height: 1;
	box-shadow: none;
	text-align: left;
    padding: 16px 10px;
	width: 100%;
	text-decoration: none;
	background: url(${images['purple-up-arrow.png']}) no-repeat right 10px top 17px;
}

.custom-accordion-second .btn.collapsed {
	background: url(${images['purple-down-arrow.png']}) no-repeat right 10px top 17px;
}

.custom-accordion-second .card,
.custom-accordion-second .card-header {
	border: none !important;
}
.custom-accordion-second .card {
	border: 1px solid #9062B1 !important;
    box-sizing: border-box;
    border-radius: 39px !important;
	background: none !important;
	width: 100%;
	margin: 0 0 20px;
}

.custom-accordion-second .card-header {
	background: none;
	border-radius: 0 !important;
	padding: 0;
}

.custom-accordion-second .card-body {
	border-radius: 20px;
    background: #FFFFFF;
	border: 1px solid #9062B1 !important;
}

.custom-accordion-second .collapse {
	transition: all 0.5s ease;
    padding: 0 10px 30px;
	box-sizing: border-box;
}



.search-keyword-container input {
	font-size: 18px;
	line-height: 1;
	border: 1px solid #9062B1;
	box-sizing: border-box;
	border-radius: 39px;
	color: #9062B1;
	padding: 24px 15px;
}

.search-keyword-container input:focus {
	border: 1px solid #9062B1;
	box-shadow: none;
}

img.logo-small {
	margin: 0 0 3px;
}

@media (max-width: 767px) {
	#login {
		box-sizing: border-box;
		padding: 50px 0 0;
	}
	#header.second-header {
		padding: 22px 0 24px 40px;
	}
	.page-content-wrapper {
		padding: 100px 0px 0;
	}
	.table-responsive table {
		width: 767px;
	}
	.btn-group {
		flex-direction: column;
		align-items: center;
	}
	
	.btn-group .btn {
		margin: 0 0 10px;
		max-width: 300px;
		width: 100%;
	}
	
	
	
	.filter-adsuperhero {
		flex-direction: column;
		align-items: center;
	}
	
	.filter-adsuperhero ul {
		margin: 0 0 23px;
		justify-content: center;
	}
	
}








`;