import { useEffect, useState } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";

import CardRow from "../CardRow/CardRow.component";
import Spinner from "../Spinner/Spinner.component";

import { card as cardAPI } from "../../api/card";

import "./CardContainer.styles.css";

const CardContainer = () => {
  const [cardsData, setCardsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshCall, setRefreshCall] = useState(false);

  const handleRefresh = () => {
    return new Promise((res) => {
      setRefreshCall(true);
      setTimeout(() => {
        res(setRefreshCall(false));
      }, 500);
    });
  };

  useEffect(() => {
    cardAPI()
      .then((res) => {
        console.log(res.data.card_groups);
        if (res?.data?.card_groups) setCardsData(res.data.card_groups);
        else console.log("Some unknown error occurred");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
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
