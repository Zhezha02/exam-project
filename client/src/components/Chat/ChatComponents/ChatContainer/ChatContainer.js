import React from "react";
import { connect } from "react-redux";
import Chat from "../Chat/Chat";

const ChatContainer = (props) => {
  const { user } = props;
  return user && <Chat />;
};

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return { user };
};

export default connect(mapStateToProps, null)(ChatContainer);
