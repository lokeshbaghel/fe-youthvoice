import styled from "styled-components";
export default styled.div`
#sidebar-wrapper {
    z-index: 1000;
    left: 260px;
    width: 0;
    height: 100%;
    margin-left: -260px;
    overflow-y: auto;
    overflow-x: hidden;
    background: #508FF4;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
	-webkit-box-shadow: 6px 3px 15px -8px rgba(0,0,0,0.48);
	-moz-box-shadow: 6px 3px 15px -8px rgba(0,0,0,0.48);
	box-shadow: 6px 3px 15px -8px rgba(0,0,0,0.48);
}
.fixed-top {
	top: 68px;
}
#sidebar-wrapper {
    width: 260px;
}

button.hamburger.animated.fadeInLeft.is-closed {
	/*display: none;*/
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
.sidebar-logo {
    width: 100%;
    text-align: center;
    margin: 32px 0;
}
.navbar {
  padding: 0;
}
.sidebar-nav {
    top: 0;
    width: 310px;
    margin: 0 0 230px 0;
    list-style: none;
	bottom: 0;
	display: block;
	position: absolute;
    top: 100px;
}
.sidebar-nav li {
    position: relative; 
    line-height: 20px;
    display: inline-block;
    width: 100%;
}
.sidebar-nav img {
	max-width: 55px;
    margin: 0 11px 0 0;
    max-height: 55px;
}
.sidebar-nav li a {
    display: block;
    color: #FFFFFF;
    text-decoration: none;
    padding: 10px 15px 10px 30px; 
	font-family: "ProximaSoft";
	font-weight: 400;
	font-size: 22px;
	line-height: 1;
	letter-spacing: -1px;
	padding: 15px 25px;
	border-left: 3px solid transparent;
}
.sidebar-nav li a:hover,
.sidebar-nav li a.active,
.sidebar-nav li a:focus,
.sidebar-nav li.open a:hover,
.sidebar-nav li.open a:active,
.sidebar-nav li.open a:focus{
    color: #FFFFFF;
    text-decoration: none;
    border-color: #FFFFFF;
}
.sidebar-nav li a.active {
	color: #FFFFFF;
}
.sidebar-header {
    text-align: center;
    font-size: 20px;
    position: relative;
    width: 100%;
    display: inline-block;
}
.sidebar-brand {
    height: 65px;
    position: relative;
    background:#212531;
    background: linear-gradient(to right bottom, #2f3441 50%, #212531 50%);
   padding-top: 1em;
}
.sidebar-brand a {
    color: #ddd;
}
.sidebar-brand a:hover {
    color: #fff;
    text-decoration: none;
}
.dropdown-header {
    text-align: center;
    font-size: 1em;
    color: #ddd;
    background:#212531;
    background: linear-gradient(to right bottom, #2f3441 50%, #212531 50%);
}
.sidebar-nav .dropdown-menu {
    position: relative;
    width: 100%;
    padding: 0;
    margin: 0;
    border-radius: 0;
    border: none;
    background-color: #222;
    box-shadow: none;
}
.dropdown-menu.show {
    top: 0;
}

/*My Profile*/
.sidebar-bottom-content span {
	font-family: "ProximaSoft";
	font-weight: normal;
	color: #FFFFFF;
}
.sidebar-bottom-content .username {
	font-size: 16px;
	line-height: 1;
	margin: 0;
}
.sidebar-bottom-content .profile {
	font-size: 16px;
	line-height: 1;
}
.sidebar-bottom-content {
	
	position: fixed;
    bottom: 50px;
    left: 0;
    flex-wrap: wrap;
    align-items: center;
	width: 100%;
    max-width: 310px;
	justify-content: center;
	right: 0;
	display: flex;
	
}

@media screen and (max-width: 1240px) {
	.sidebar-bottom-content {
		overflow: hidden;
		display: none;
	}
}



.right-content {
	display: flex;
    flex-wrap: wrap;
	flex-direction: column;
}
.menu-title {
	font-size: 16px;
	margin: 0;
	color: #FFFFFF;
	text-transform: uppercase;
	font-family: 'ProximaSoft';
	letter-spacing: 1.5px;
	position: absolute;
	top: 80px;
    left: 26px;
}
.flag-iconimg {
    width: 260px !important;
}
.sidebar-nav .flag-iconimg img {
    width: auto;
    max-width: 196px!important;
	max-height: 100px;
}
@media screen and (max-width: 1240px) {
	
	#sidebar-wrapper {
		width: 0;
		opacity: 0;
	}
	
	.toggled #sidebar-wrapper {
		width: 260px;
		opacity: 1 !important;
	}

	.page-content-wrapper {
		padding: 100px 10px 0;
	}

	
	.hamburger {
	  position: fixed;
	  top: 27px;  
	  z-index: 9999;
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
	  height: 2px;
	  width: 100%;
	}
	.hamburger.is-closed .hamb-top,
	.hamburger.is-closed .hamb-middle,
	.hamburger.is-closed .hamb-bottom {
	  background-color: #007bff;
	}
	.hamburger.is-closed .hamb-top { 
	  top: 6px; 
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

	
	

	.hamburger.is-open .hamb-top, 
	.hamburger.is-open .hamb-middle, 
	.hamburger.is-open .hamb-bottom {
		background-color:  #007bff;
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
}

`;