import { useContext, useEffect, useState } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";

import CardRow from "../CardRow/CardRow.component";
import Spinner from "../Spinner/Spinner.component";

import { MessageContext } from "../../context/Message.context";

import { card as cardAPI } from "../../api/card";

import "./CardContainer.styles.css";

const CardContainer = () => {
  const { addError } = useContext(MessageContext);

  const [cardsData, setCardsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshCall, setRefreshCall] = useState(false);

  const handleRefresh = () => {
    return new Promise((res) => {
      setRefreshCall(true);
      setTimeout(() => {
        res(setRefreshCall(false));
      }, 1000);
    });
  };

  useEffect(() => {
    cardAPI()
      .then((res) => {
        if (res?.data?.card_groups) setCardsData(res.data.card_groups);
        else {
          addError("Something went wrong!");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        addError(err.response?.statusText || "Something went wrong!");
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <Spinner />;

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="card-container">
        {cardsData.map((cardRow, index) => {
          return (
            <CardRow
              cardRowData={cardRow}
              refreshCall={refreshCall}
              key={index}
            />
          );
        })}
      </div>
    </PullToRefresh>
  );
};

export default CardContainer;
