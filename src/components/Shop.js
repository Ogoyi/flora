import React, { useState } from "react";

const Shop = (props) => {
  const buyFlower = (index) => {
    props.buyFlower(index);
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [forSale, setForSale] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    props.createFlower(name, description, image, price, forSale);
  };

  const boolConverter = (string) => {
    if (string === "true") {
      return true;
    } else if (string === "false") {
      return false;
    } else {
      return;
    }
  };

  return (
    <main className="content">
      <div className="detail-block detail-block_margin">
        <div className="wrapper">
          <div className="detail-block__content">
            <h1>Shop</h1>
            <ul className="bread-crumbs">
              <li className="bread-crumbs__item">
                <a href="/" className="bread-crumbs__link">
                  Home
                </a>
              </li>
              <li className="bread-crumbs__item">Shop</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="shop">
        <div className="wrapper">
          <div className="shop-content">
            <div className="shop-main">
              <div className="shop-main__items">
                {props.flowers.map((flower) => (
                  <a href="#" className="products-item">
                    <div className="products-item__type">
                      {flower.forSale && (
                        <span className="products-item__sale">Sale</span>
                      )}
                    </div>
                    <div className="products-item__img">
                      <img src={flower.image} className="js-img" alt="" />
                      <div className="products-item__hover">
                        {/* <i className="icon-close" /> */}
                        <div className="products-item__hover-options">
                          
                          {flower.forSale && (
                            <i
                              onClick={() => {
                                buyFlower(flower.index);
                              }}
                              className="icon-cart"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="products-item__info">
                      <span className="products-item__name">{flower.name}</span>
                      <span className="products-item__cost">
                        ${flower.price}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <img
          className="promo-video__decor js-img"
          data-src="http://my-templates.online/beshop/img/promo-video__decor.jpg"
          src="http://my-templates.online/beshop/img/promo-video__decor.jpg"
          alt=""
        />
      </div>
      <div className="subscribe">
        <div className="wrapper">
          <div className="subscribe-form">
            <form onSubmit={submitHandler}>
              <h3>Create your own Flower</h3>
              <p>Join the flora community by building your own NFT</p>
              <div className="box-field__row">
                <div className="box-field">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name of Flower"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Summary"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Image Link"
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                  <select
                    className="form-control"
                    onChange={(e) => setForSale(boolConverter(e.target.value))}
                  >
                    <option disabled selected>
                      For Sale
                    </option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                  <button type="submit" className="btn">
                    CREATE
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shop;
