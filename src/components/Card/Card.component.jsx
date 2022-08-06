import { useState } from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button.component";
import CTA from "../CTA/CTA.component";

import useLongPress from "../../hooks/useLongPress";

import { formatText } from "../../utils/formatText";

import Arrow from "../../assets/icons/arrow.svg";
import Bell from "../../assets/icons/bell.svg";
import Cross from "../../assets/icons/cross.svg";

import "./Card.styles.css";

const Card = ({
  cardData,
  designType,
  maxHeight,
  remindLater,
  setRemindLater,
  dismissNow,
  setDismissNow,
}) => {
  const [inlineStyle, setInlineStyle] = useState({
    width: "100%",
    minWidth: "100%",
  });
  const [isLongPressed, setIsLongPressed] = useState(false);
  const onLongPress = () => {
    setIsLongPressed(true);
  };
  const onClick = () => {};
  const onClickRemindLater = (e) => {
    e.stopPropagation();
    setRemindLater(true);
  };
  const onClickDismissNow = (e) => {
    e.stopPropagation();
    setDismissNow(true);
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const { onMouseDown, onMouseLeave, onMouseUp, onTouchEnd, onTouchStart } =
    useLongPress(onLongPress, onClick, defaultOptions);
  const getBackground = () => {
    if (cardData?.bg_image?.image_type === "ext") {
      return {
        backgroundImage: `url(${cardData?.bg_image.image_url})`,
      };
    }
    if (cardData?.bg_gradient && cardData?.bg_color) {
      return {
        background: `linear-gradient(${
          cardData?.bg_gradient?.angle
        }, ${cardData?.bg_gradient?.colors.join()})`,
        backgroundColor: cardData?.bg_color,
      };
    }
    if (cardData?.bg_color) {
      return {
        backgroundColor: cardData?.bg_color,
      };
    }
    return {
      backgroundColor: "#ffffff",
    };
  };
  const image = new Image();
  image.src = cardData?.bg_image?.image_url;
  image.onload = () => {
    if (designType === "HC5")
      setInlineStyle({
        ...inlineStyle,
        height: maxHeight,
        minHeight: maxHeight,
      });
    else if (designType === "HC9") {
      setInlineStyle({
        ...inlineStyle,
        width: image.width,
        minWidth: image.width,
      });
    }
  };

  return (
    <div
      className={`card-wrapper card-wrapper-${designType}`}
      style={{
        ...inlineStyle,
        ...{ display: remindLater || dismissNow ? "none" : "flex" },
      }}
      role="button"
      tabIndex="0"
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
    >
      {designType === "HC3" && isLongPressed ? (
        <div className="actions">
          <Button
            icon={Bell}
            text="remind later"
            action={(e) => onClickRemindLater(e)}
          />
          <Button
            icon={Cross}
            text="dismiss now"
            action={(e) => onClickDismissNow(e)}
          />
        </div>
      ) : null}
      <a
        href={cardData?.url}
        className={`card card-${designType} isLongPressed-${isLongPressed}`}
        style={{ ...inlineStyle, ...getBackground() }}
      >
        <div className="content">
          <div className="left">
            <div className="icon">
              {cardData?.icon?.image_type === "ext" ? (
                <img src={cardData?.icon?.image_url} alt="icon" />
              ) : null}
            </div>

            <div className="details">
              <div className="title">
                {formatText(cardData.formatted_title, cardData.title)}
              </div>
              <div className="description">
                {formatText(
                  cardData.formatted_description,
                  cardData.description
                )}
              </div>
              <div className="cta-group">
                {cardData?.cta?.map((cta, index) => {
                  return (
                    <CTA
                      key={index}
                      text={cta.text}
                      textColor={cta?.text_color}
                      bgColor={cta?.bg_color}
                      url={cta?.url}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {designType === "HC6" ? (
            <div className="right arrow">
              <img src={Arrow} alt="arrow" />
            </div>
          ) : null}
        </div>
      </a>
    </div>
  );
};

export default Card;

Card.defaultProps = {
  cardData: {},
  maxHeight: null,
};
Card.propTypes = {
  cardData: PropTypes.shape({
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
  }),
  designType: PropTypes.string.isRequired,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  remindLater: PropTypes.bool.isRequired,
  setRemindLater: PropTypes.func.isRequired,
  dismissNow: PropTypes.bool.isRequired,
  setDismissNow: PropTypes.func.isRequired,
};
