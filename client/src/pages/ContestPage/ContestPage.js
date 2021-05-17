import React from "react";
import { connect } from "react-redux";
import "react-image-lightbox/style.css";
import LightBox from "react-image-lightbox";
import {
  getContestById,
  setOfferStatus,
  clearSetOfferStatusError,
  goToExpandedDialog,
  changeEditContest,
  changeShowImage,
} from "../../actions/actionCreator";
import Header from "../../components/Header/Header";
import ContestSideBar from "../../components/ContestSideBar/ContestSideBar";
import CONSTANTS from "../../constants";
import Spinner from "../../components/Spinner/Spinner";
import TryAgain from "../../components/TryAgain/TryAgain";
import ContestsInfoContainer from "../../components/ContestInfoContainer/ContestInfoContainer";
import styles from "./ContestPage.module.sass";

class ContestPage extends React.Component {
  componentWillUnmount() {
    this.props.changeEditContest(false);
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { params } = this.props.match;
    this.props.getData({ contestId: params.id });
  };

  render() {
    const { contestByIdStore, changeShowImage, getData } = this.props;
    const { isShowOnFull, imagePath, error, isFetching, contestData, offers } =
      contestByIdStore;

    return (
      <div>
        {/*<Chat/>*/}
        {isShowOnFull && (
          <LightBox
            mainSrc={`${CONSTANTS.publicURL}${imagePath}`}
            onCloseRequest={() =>
              changeShowImage({ isShowOnFull: false, imagePath: null })
            }
          />
        )}
        <Header />
        {error ? (
          <div className={styles.tryContainer}>
            <TryAgain getData={getData} />
          </div>
        ) : isFetching ? (
          <div className={styles.containerSpinner}>
            <Spinner />
          </div>
        ) : (
          <div className={styles.mainInfoContainer}>
            <ContestsInfoContainer {...this.props} />
            <ContestSideBar
              contestData={contestData}
              totalEntries={offers.length}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { contestByIdStore, auth, chatStore } = state;
  return { contestByIdStore, auth, chatStore };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (data) => dispatch(getContestById(data)),
    setOfferStatus: (data) => dispatch(setOfferStatus(data)),
    clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
    goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
    changeEditContest: (data) => dispatch(changeEditContest(data)),
    changeShowImage: (data) => dispatch(changeShowImage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);
