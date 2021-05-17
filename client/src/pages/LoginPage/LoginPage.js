import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LoginForm from "../../components/LoginForm/LoginForm";
import Logo from "../../components/Logo";
import styles from "./LoginPage.module.sass";
import { clearErrorSignUpAndLogin } from "../../actions/actionCreator";
import CONSTANTS from "../../constants";

const LoginPage = (props) => {
  const changeRoute = () => {
    props.history.replace("/");
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.headerSignUpPage}>
          <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
          <Link to="/registration" className={styles.linkLoginContainer}>
            <span>Signup</span>
          </Link>
        </div>
        <div className={styles.loginFormContainer}>
          <LoginForm changeRoute={changeRoute} />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearError: () => dispatch(clearErrorSignUpAndLogin()),
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
