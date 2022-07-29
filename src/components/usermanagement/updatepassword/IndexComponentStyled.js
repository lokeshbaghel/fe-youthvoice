import styled from "styled-components";
export default styled.div`
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

/*User Management CSS*/


`;