import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Cards({
  image,
  rating,
  title,
  paragraph,
  price,
  renderratingIcons,
  handleAddToCart,
}) {
  return (
    <Col sm={6} lg={4} xl={3} className="mb-4">
      <Card className="overflow-hidden">
        <div className="overflow-hidden">
          <Card.Img variant="top" src={image} />
        </div>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            <div className="item_rating">{renderratingIcons(rating)}</div>
            <div className="wishlist">
              <i className="bi bi-heart"></i>
            </div>
          </div>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{paragraph}</Card.Text>
          <div className="d-flex align-items-center justify-content-between">
            <div className="menu_price">
              <h5 className="mb-0">${price}</h5>
            </div>
            <div className="add_to_cart">
              <Link
                className="btn_cart"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart();
                }}
                
              >
                <i className="bi bi-bag em-2"></i>
                Add To Cart
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

Cards.propTypes = {
  image: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  renderratingIcons: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};
