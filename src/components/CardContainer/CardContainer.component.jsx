import { useEffect, useState } from "react";

import CardRow from "../CardRow/CardRow.component";

import { card as cardAPI } from "../../api/card";

import "./CardContainer.styles.css";

const CardContainer = () => {
  const [cardsData, setCardsData] = useState([]);
  useEffect(() => {
    cardAPI()
      .then((res) => {
        console.log(res.data.card_groups);
        if (res?.data?.card_groups) setCardsData(res.data.card_groups);
        else console.log("Some unknown error occurred");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="card-container">
      {cardsData.map((cardRow, index) => {
        return <CardRow cardRowData={cardRow} key={index} />;
      })}
    </div>
  );
};

export default CardContainer;
