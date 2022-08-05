import PropTypes from "prop-types";

import Card from "../Card/Card.component";

import "./CardRow.styles.css";

const CardRow = ({ cardRowData }) => {
  return (
    <div className="card-row">
      {cardRowData.cards.map((card, index) => {
        return <Card cardData={card} key={index} />;
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
