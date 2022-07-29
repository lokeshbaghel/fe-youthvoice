import styled from "styled-components";
function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }

  const images = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/));
export default styled.div`

/* header */
#header {
	padding: 40px 0 70px;
	box-sizing: border-box;
}

#header.second-header {
	padding: 8px 0 8px 317px;
    box-sizing: border-box;
    position: fixed;
	top: 0;
	width: 100%;
	background: #FFFFFF;
	z-index: 1;
	-webkit-box-shadow: -1px 3px 28px -7px rgba(0,0,0,0.48);
	-moz-box-shadow: -1px 3px 28px -7px rgba(0,0,0,0.48);
	box-shadow: -1px 3px 28px -7px rgba(0,0,0,0.48);
	-webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
}

.header-right {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

img.notification-icon {
	margin: 0 30px;
}

img.logo-small {
	margin: 20px 30px !important;
	max-width: 139px !important;
}

.user-icon {
    width: 50px;
    height: 50px;
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.header-right .dropdown-toggle {
	color: #508ff4;
	font-weight: bold;
	font-size: 16px;
	display: flex;
	align-items: center;
}

.header-right .dropdown-toggle:after {
	color: #508ff4;
}

.header-right .dropdown-toggle:hover,
.header-right .dropdown-toggle:focus {
	box-shadow: none;
}


.header-right .dropdown-toggle::after {
	color: #4b4b4b;
}



#searchform {
	transition:all 0.5s;
	position: relative;
 }
 
   #searchform .input-group {
	 justify-content:flex-end;
   }
 
   #searchform .search-form-control {
	 transition: all 0.5s;
	 width: 0;
	 background-color: transparent;
	 border: none;
	 border-bottom: 1px solid ransparent;
	 overflow: hidden;
	 color: #333333;
	 border-radius: 0;
	 position: absolute;
	 right: 100%;
	 bottom: 0;
	 background: #FFFFFF;
   }
   
   #searchform .search-form-control:focus {
	   box-shadow: none;
   }
 
   #searchform .input-group-append .btn {
	 background: transparent;
	 border:0;
	 box-shadow:none;
	 margin: 0;
	 padding: 0 !important;
   }
	 #searchform .input-group-append .btn:hover,
	 #searchform .input-group-append .btn:focus,
	 #searchform .input-group-append .btn:active {
	   background:transparent;
	   border:0;
	   outline:none;
	 }
 
	 #searchform:hover .form-control {
		 width:100px;
		 border-bottom:1px solid #333333;
	 }
	 
	 #searchform .form-control:focus {
		 width:100px;	
		 border-bottom:1px solid #333333;
	 }

	 div#sadFace {
		top: 74px !important;
        left: 258px !important;
		right: 0px;
		bottom: 0 !important;
		position: fixed;
		z-index: 9999;
		opacity: 1 !important;
		background: #FFFFFF !important;
	}
.flag-icon {
	margin: -2px 10px 0 0;
	width:50px !important;
}
	.young-people-wrapper thead {
		color: #FFFFFF;
	}
	span.nodata {
		color: #000;
		text-align: center;
		display: block;
		font-size: 19px;
	}
	.young-people-wrapper td {
		color: #000000;
		border-color: rgba(0,0,0,0.2) !important;
	}

	.young-people-wrapper .table-responsive {
		overflow: auto;
    	max-height: 435px;
	}

	
	.young-people-wrapper td a {
		color: #0056b3;
		text-decoration: none;
		font-size: 16px;
		font-weight: 800;
	}

	.close-tooltip.btn-primary {
		background:none;
		border-color: #007bff;
		color: #007bff;
		padding: 5px 30px;
	}

	.__react_component_tooltip:before,
	.__react_component_tooltip:after {
		display: none !important;
	}

	.young-people-wrapper .table thead th {
		color: #000000;
	}

	

	.young-people-wrapper .table thead th {
		vertical-align: bottom;
		border-bottom: 2px solid #000;
	}

	.young-people-wrapper .table thead th {
		border: none !important;
	}

	
	
	

	/* header */
	#header {
		padding: 40px 0 70px;
		box-sizing: border-box;
	}
	
	#header.second-header {
		padding: 8px 0 8px 60px;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		width: 100%;
		background: #FFFFFF;
		z-index: 9999;
		-webkit-box-shadow: -1px 3px 28px -7px rgba(0,0,0,0.48);
		-moz-box-shadow: -1px 3px 28px -7px rgba(0,0,0,0.48);
		box-shadow: -1px 3px 28px -7px rgba(0,0,0,0.48);
		-webkit-transition: all 0.5s ease;
		-moz-transition: all 0.5s ease;
		-o-transition: all 0.5s ease;
		transition: all 0.5s ease;
	}
	
	.header-right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	
	
	img.notification-icon {
		margin: 0 30px;
	}
	

	.card-link .content .image {
		display: none;
	}

	/* Notification Style*/

	.notifications .icon .count {
		background-color: #32c166;
	}

	.notifications .loader {
		display: none !important
	}
	
	#searchform .search-form-control {
		padding: 0 !important;
		top: -8px !important;
	}
	
	.notifications {
		margin: 0 14px;
	}
	
	#searchform .search-form-control:focus, .gnliEL #searchform .search-form-control:hover {
		padding: 5px 10px!important;
		width: 142px !important;
	}

	.second-header {
		background-color: #fff;
		box-shadow: rgb(0 0 0 / 50%) -1px 4px 18px -8px;
	}

	
	
	/* header */
	@media screen and (max-width: 1240px) {
		#header.second-header {
			padding: 8px 0 8px 40px;
		}

		div#sadFace {
			left: 0 !important;
			right: 0 !important;
		}
		
	}
	
	@media screen and (min-width: 768px) {
		.header-right .dropdown-toggle span {
			padding: 0 23px 0 0;
		}
		.header-right .dropdown-toggle::after {
			color: #508ff4;
			position: relative;
			right: 70px;
			top: 2px;
		}
	}
	
	@media screen and (max-width: 767px) {
		#header.second-header {
			padding: 8px 0 8px 32px;
		}

		.header-right .dropdown-toggle span {
			display: none;
		}
		
		.header-right {
			margin: -66px 0 0;
		}
		img.notification-icon {
			margin: 0 18px;
		}

		.header-right .dropdown-toggle {
			padding: 0;
		}

		.user-icon {
			width: 35px;
			height: 35px;
		}
	
		img.logo-small {
			margin: 20px 0 !important;
			max-width: 139px !important;
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
	/*Dropdown Notification*/
.notification_wrapper.dropdown button {
	width: 28px;
    height: 28px;
    padding: 0 !important;
    background: none !important;
    border: none !important;
	box-shadow: none !important;
	outline: none;
	margin: 0 0 0 15px;
	position: relative;
}

.notification_wrapper.dropdown button .notification-count {
	position: absolute;
    right: -7px;
    top: -7px;
    background: #32c166;
    width: 21px;
    height: 21px;
    font-size: 10px;
    color: #FFFFFF;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    line-height: 1;
    padding: 0;
}

.notification_wrapper.dropdown button:after {
	display: none;
}

.notification_wrapper .dropdown-menu {
	top: 32px !important;
    width: 507px !important;
    height: 477px !important;
    right: 0 !important;
    left: auto !important;
    transform: none !important;
	box-sizing: border-box;
	padding: 5px 17px;
	border: 1px solid #c1c1c1;
    border-radius: 0;
}

.notification_wrapper .item-wrap {
    width: 100%;
    height: 423px;
    overflow: auto;
}

.notification_wrapper .notification-header {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 10px;
}

.notification_wrapper .noti-heading {
	font-size: 18px;
	font-weight: bold;
	color: #1d2129;
}

.notification_wrapper .noti-view-all a {
	font-size: 15px;
	text-decoration: none;
	color: #3658a6;
}
.notification_wrapper .unread.dropdown-item {
    background: #d4dff0;
}
.notification_wrapper .dropdown-item {
	box-sizing: border-box;
	padding: 17px;
	text-decoration: none;
	width: 100%;
	color: #3658a6;
	border-radius: 5px;
	border: 1px solid #d0d4db;
	min-height: 65px;
	background: #edf2fa;
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
		.notification_wrapper.dropdown {
			margin: 0 14px 0 0;
		}
		#header {
			padding: 11px 0 25px;
			box-sizing: border-box;
			text-align: center;
		}
		#searchform {
			margin: 0 11px 0 0;
		}
		.header-left {
			text-align: left;
		}
	}
	
	
	
`;