import styled from "styled-components";

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
	font-family: "ProximaSoft-Medium", sans-serif;
	text-transform: uppercase;
  }
  
  h1 {
	  font-size: 35px;
	  line-height: 1.2;
	  color: #9062B1;
  }
  
  h2 {
	  font-size: 28px;
	  line-height: 1.2;
	  color: #9062B1;
  }
  
  p {
	  font-family: 'ProximaSoft';
	  font-size: 20px;
	  line-height: 1.2;
	  color: #9062B1;
  }
  
  img {
	  max-width: 100%;
  }
  
  #header {
	  padding: 20px 0 30px;
  }
  
  .btn.btn-primary {
	  font-size: 22px;
	  padding: 6px 10px;
	  background:#9062B1;
	  border-radius: 39px;
	  border-color: #9062B1;
	  max-width: 264px;
	  width: 100%;
	  color: #ffffff;
	  margin: 0 6px 0 0;
  }
  
  .btn-primary.green-bg {
	  background: #50B79D;
	  border-color: #50B79D;
  }
  
  .graphic-right {
	  margin: -70px 0 0;
  }
  
  .reaction-div {
	  display: flex;
	  flex-direction: column;
	  margin: 0 0 60px;
  }
  
  .reaction-div .btn.btn-primary {
	  background: #D7F5FB;
	  border-color: #D7F5FB; 
	  border-radius: 20px;
	  max-width: 391px;
	  width: 100%;
	  color: #9062B1;
	  margin: 0 0 10px;
	  text-align: left;
	  padding: 8px 17px;
  }
  
  .reaction-div .btn.btn-primary img {
	  max-width: 40px;
	  margin: 0 10px 0 0;
  }
  
  .radius-bg {
	  background: #D7F5FB;
	  border-radius: 20px;
	  box-sizing: border-box;
	  padding: 10px;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  width: 100%;
	  height: 130px;
  }
  
  .radius-bg .btn.btn-primary {
	  margin: 0 12px;
  }
  
  .pagination {
	  color: #9062B1;
	  font-size: 18px;
	  line-height: 1;
	  margin: 0 10px 0 0;
  }
  
  .curve-box {
	  background: #D7F5FB;
	  border-radius: 20px;
	  box-sizing: border-box;
	  padding: 20px;
	  text-align: center;
	  width: 100%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  min-height: 211px;
	  justify-content: space-around;
	  margin: 0 0 20px;
  }
  
  .progress {
	  background-color: #BDBDBD;;
	  border-radius: 20px;
	  position: relative;
	  margin: 15px 0;
	  height: 22px;
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
  
  .top-progressbar {
	  width: 100%;
	  height: 26px;
	  background: #BDBDBD;
	  position: relative;
	  border-radius: 20px;
	  overflow: hidden;
  }
  
  .top-progressbar:after {
	  content: "";
	  width: 200px;
	  height: 26px;
	  position: absolute;
	  left: 0;
	  top: 0;
	  background: #50B79D;
  }
  
  .progress-coin-main {
	  display: flex;
  }
  
  .coin-icon-container {
	  display: flex;
	  flex-direction: column;
  }
  
  
  /*Footer Css*/
  
  
  footer {
	  background: #D7F5FB;
	  margin-top: 150px;
  }
  
  .footer-content {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  min-height: 127px;
	  justify-content: space-between;
  }
  
  .footer-content p {
	  margin: 0;
	  font-family: 'ProximaSoft-Bold';
	  font-size: 22px;
	  line-height: 1;
	  margin: 0 50px;
  }

  
  @media (min-width: 1500px) {
	  .container, .container-lg, .container-md, .container-sm, .container-xl {
		  max-width: 1400px;
	  }
  }
  
  .reaction-div ul img {
	max-width: 40px;
    margin: 0 10px 0 0;
}

.reaction-div ul {
  list-style-type: none;
  margin: 25px 0 0 0;
  padding: 0;
}

.reaction-div ul li {
  float: left;
  margin: 0 5px 0 0;
  max-width: 391px;
  width: 100%;
  height: 63px;
  position: relative;
}

.reaction-div ul label,
.reaction-div ul input {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.reaction-div ul input[type="radio"] {
  opacity: 0.01;
  z-index: 100;
}

.reaction-div ul li.active label,
.reaction-div ul input[type="radio"]:checked+label,
.reaction-div .Checked+label {
  background: #b7e7f1;
  border-color: #b7e7f1; 
}

.reaction-div ul li.disabled label {
    cursor: default;
    background: #D7F5FB !important;
    border-color: #D7F5FB !important;
}

.reaction-div ul label {
  padding: 5px;
  font-family: 'ProximaSoft-Medium';
  font-size: 22px;
  background: #D7F5FB;
  border-color: #D7F5FB; 
  border-radius: 20px;
  max-width: 391px;
  width: 100%;
  color: #9062B1;
  margin: 0 0 10px;
  text-align: left;
  padding: 8px 17px;
  cursor: pointer;
  z-index: 90;
}

.reaction-div ul label:hover {
  background: #b7e7f1;
  border-color: #b7e7f1; 
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
	width: 100%;
    height: 15px;
    background: #BDBDBD;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
}

.progress-items .bg-success {
    background-color: #50B79D!important;
}

.exit-btn {
	margin-left: auto !important;
}

@media (min-width: 1500px) {
	.container, .container-lg, .container-md, .container-sm, .container-xl {
		max-width: 1400px;
	}
}

@media screen and (max-width: 1199px) {
	#login .btn.btn-primary {
		max-width: 189px;
	}
}

@media (max-width: 767px) {
	#login .btn.btn-primary {
		max-width: 150px;
	}

	#header .row {
		display: flex;
		align-items: center;
	}
	

	#header .col-md-6 {
		width: 50%;
		display: flex;
		align-items: center;
	}
	#header .btn.btn-primary {	
		font-size: 16px;
    	padding: 4px 10px;
	}
	.btn.btn-primary {
		font-size: 17px;
	}
	.mt-5 {
		margin-top: 10px !important;
	}
	h1 {
		font-size: 29px;
	}
	#header {
		padding: 20px 0 10px;
	}
	.graphic-right {
		display: none;
	}
}


@media (max-width: 767px) {
	.progress-items {
		margin: 0;
	}
	footer {
		margin-top: 0;
	}
	.logo img {
		max-width: 161px;
	}
	
	#header .row {
		display: flex;
		align-items: center;
	}
	

	#header .col-md-6 {
		width: 50%;
		display: flex;
		align-items: center;
	}
	#header .btn.btn-primary {	
		font-size: 16px;
    	padding: 4px 10px;
	}
	.btn.btn-primary {
		font-size: 17px;
	}
	.mt-5 {
		margin-top: 10px !important;
	}
	h1 {
		font-size: 24px;
	}
	#header {
		padding: 20px 0 10px;
	}
	.graphic-right {
		display: none;
	}

	.reaction-div ul label {
		font-size: 20px;
	}
	p {
		font-family: 'ProximaSoft';
		font-size: 18px;
		line-height: 1.2;
		color: #9062B1;
	}
	.reaction-div ul {
		margin: 0;
	}
	.reaction-div {
		margin: 0 0 15px;
	}
	.footer-content .btn-primary {
		width:100% !important;
		max-width: 100%;
	}
	.footer-content .btn-primary {
		width:100% !important;
		max-width: 100%;
		margin: 10px auto;
	}
	.reaction-div ul label {
		font-size: 20px;
	}
	.mt-3 {
		margin: 0 !important; 
	}
	p:empty {
		display: none !important;
	}
	.reaction-div {
		margin: 0 !important;
	}
	.reaction-div ul {
		margin: 0 !important;
	}
  }

`;