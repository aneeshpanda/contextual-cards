import PropTypes from "prop-types";
import { useLayoutEffect, useRef, useState } from "react";

import Card from "../Card/Card.component";

import "./CardRow.styles.css";

const CardRow = ({ cardRowData }) => {
  const [maxHeight, setMaxHeight] = useState(null);
  const cardRowRef = useRef(null);
  const [clientWidth, setClientWidth] = useState(0);
  const [remindLater, setRemindLater] = useState(false);
  const [dismissNow, setDismissNow] = useState(false);
  useLayoutEffect(() => {
    setClientWidth(cardRowRef.current.offsetWidth);
  }, []);
  const addImageProcess = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img.height);
      img.onerror = reject;
      img.src = src;
    });
  };
  const getHeight = async () => {
    let heights = [];
    for (let i = 0; i < cardRowData.cards.length; i += 1) {
      heights.push(addImageProcess(cardRowData.cards[i]?.bg_image?.image_url));
    }
    heights = await Promise.all(heights);
    setMaxHeight((clientWidth / 1280) * Math.max(...heights));
  };

  if (cardRowData.design_type === "HC5") {
    getHeight();
  }

  return (
    <div
      className={`card-row card-row-${cardRowData.design_type}`}
      ref={cardRowRef}
      style={{
        width: cardRowData.is_scrollable ? "100%" : "calc(100% - 20px)",
        minWidth: cardRowData.is_scrollable ? "100%" : "calc(100% - 20px)",
        overflowX:
          cardRowData.is_scrollable || cardRowData.design_type === "H9"
            ? "scroll"
            : "hidden",
        minHeight: maxHeight,
        display:
          cardRowData.cards.length === 1 && (remindLater || dismissNow)
            ? "none"
            : "flex",
      }}
    >
      {cardRowData.cards.map((card, index) => {
        return (
          <Card
            cardData={card}
            designType={cardRowData.design_type}
            maxHeight={maxHeight}
            remindLater={remindLater}
            setRemindLater={setRemindLater}
            dismissNow={dismissNow}
            setDismissNow={setDismissNow}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default CardRow;

CardRow.defaultProps = {
  cardRowData: {},
};

CardRow.propTypes = {
  cardRowData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    design_type: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string,
        formatted_title: PropTypes.shape({
          text: PropTypes.string,
          entities: PropTypes.arrayOf(
            PropTypes.shape({
              text: PropTypes.string.isRequired,
              color: PropTypes.string,
              url: PropTypes.string,
              font_style: PropTypes.string,
            })
          ),
        }),
        description: PropTypes.string,
        formatted_description: PropTypes.shape({
          text: PropTypes.string,
          entities: PropTypes.arrayOf(
            PropTypes.shape({
              text: PropTypes.string.isRequired,
              color: PropTypes.string,
              url: PropTypes.string,
              font_style: PropTypes.string,
            })
          ),
        }),
        icon: PropTypes.shape({
          image_type: PropTypes.string.isRequired,
          asset_type: PropTypes.string,
          image_url: PropTypes.string,
        }),
        url: PropTypes.string,
        bg_color: PropTypes.string,
        bg_image: PropTypes.shape({
          image_type: PropTypes.string.isRequired,
          asset_type: PropTypes.string,
          image_url: PropTypes.string,
        }),
        bg_gradient: PropTypes.shape({
          colors: PropTypes.arrayOf(PropTypes.string).isRequired,
          angle: PropTypes.number,
        }),
        cta: PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string.isRequired,
            text_color: PropTypes.string,
            bg_color: PropTypes.string,
            url: PropTypes.string,
          })
        ),
      })
    ),
    is_scrollable: PropTypes.bool.isRequired,
    height: PropTypes.number,
  }),
};
