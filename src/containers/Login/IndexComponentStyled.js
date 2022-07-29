import styled from "styled-components";

export default styled.div`

a {
  color: #e03a3c;
}

a:hover {
  color: #e76668;
  text-decoration: none;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Goodlife", sans-serif;
}

img {
	max-width: 100%;
}

#header {
	padding: 40px 0 70px;
	box-sizing: border-box;
}

#login form {
	width: 100%;
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

#login form input[type=text]:focus,
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
    margin: 15px 0 0;
}

#login form p a {
	color: #9062B1;
	position: relative;
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


@media screen and (max-width: 767px) {
	
	#login form label {
		font-size: 23px;
		line-height: 1;
	}

	#login form {
		margin: 10px 0 20px;
		width: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	#login form .form-group {
		width: 100%;
		
	}

	#login form input[type=text], #login form input[type=password] {
		height: 46px;
		width: 100%;
	}
	#login form button[type=submit] {
		font-size: 21px;
		height: 46px;
		width: 100%;
	}
	#login form p {
		font-size: 14px;
		max-width: 100%;
	}
	#login form p a:after {
		height: 1px;
	}

	#login img {
		max-height: 200px;
	}
	.logo img {
		max-width: 170px !important;
	}

	#header {
		padding: 10px 0;
		box-sizing: border-box;
	}
}



`;