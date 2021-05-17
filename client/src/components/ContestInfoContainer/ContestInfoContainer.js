import React, { useState } from "react";
import classNames from "classnames";
import isEqual from "lodash/isEqual";
import CONSTANTS from "../../constants";
import styles from "./ContestInfoContainer.module.sass";
import Brief from "../Brief/Brief";
import Error from "../Error/Error";
import OfferBox from "../OfferBox/OfferBox";
import OfferForm from "../OfferForm/OfferForm";

const ContestsInfoContainer = (props) => {
  const { role } = props.auth.user;
  const {
    contestByIdStore: { contestData, setOfferStatusError, offers },
    clearSetOfferStatusError,
  } = props;

  const [isBrief, setIsBrief] = useState(true);

  const setOffersList = () => {
    const array = [];
    for (let i = 0; i < offers.length; i++) {
      array.push(
        <OfferBox
          data={offers[i]}
          key={offers[i].id}
          needButtons={needButtons}
          setOfferStatus={setOfferStatus}
          contestType={contestData.contestType}
          date={new Date()}
        />
      );
    }
    return array.length !== 0 ? (
      array
    ) : (
      <div className={styles.notFound}>
        There is no suggestion at this moment
      </div>
    );
  };

  const setOfferStatus = (creatorId, offerId, command) => {
    props.clearSetOfferStatusError();
    const { id, orderId, priority } = contestData;
    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    };
    props.setOfferStatus(obj);
  };

  const needButtons = (offerStatus) => {
    const contestCreatorId = contestData.User.id;
    const userId = props.auth.user.id;
    const contestStatus = contestData.status;
    return (
      contestCreatorId === userId &&
      contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE &&
      offerStatus === CONSTANTS.OFFER_STATUS_PENDING
    );
  };

  const findConversationInfo = (interlocutorId) => {
    const { messagesPreview } = props.chatStore;
    const { id } = props.auth.user;
    const participants = [id, interlocutorId];
    participants.sort(
      (participant1, participant2) => participant1 - participant2
    );
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          _id: messagesPreview[i]._id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
        };
      }
    }
    return null;
  };

  const goChat = () => {
    const { User } = props.contestByIdStore.contestData;
    props.goToExpandedDialog({
      interlocutor: User,
      conversationData: findConversationInfo(User.id),
    });
  };

  return (
    <>
      <div className={styles.infoContainer}>
        <div className={styles.buttonsContainer}>
          <span
            onClick={() => setIsBrief(true)}
            className={classNames(styles.btn, { [styles.activeBtn]: isBrief })}
          >
            Brief
          </span>
          {role === CONSTANTS.CUSTOMER &&
          !Array.isArray(setOffersList()) ? null : (
            <span
              onClick={() => setIsBrief(false)}
              className={classNames(styles.btn, {
                [styles.activeBtn]: !isBrief,
              })}
            >
              Offer
            </span>
          )}
        </div>
        {isBrief ? (
          <Brief contestData={contestData} role={role} goChat={goChat} />
        ) : (
          <div className={styles.offersContainer}>
            {role === CONSTANTS.CREATOR &&
              contestData.status === CONSTANTS.CONTEST_STATUS_ACTIVE && (
                <OfferForm
                  contestType={contestData.contestType}
                  contestId={contestData.id}
                  customerId={contestData.User.id}
                />
              )}
            {setOfferStatusError && (
              <Error
                data={setOfferStatusError.data}
                status={setOfferStatusError.status}
                clearError={clearSetOfferStatusError}
              />
            )}
            <div className={styles.offers}>{setOffersList()}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContestsInfoContainer;
