import React, { useState } from "react";
import { useParams } from "react-router";

const Gift = (props) => {
  const params = useParams();

  const [address, setAddress] = useState();
  const giftHandler = (e) => {
    e.preventDefault();
    props.giftFlower(address, params.id);
    setAddress("");
  };

  return (
    <main className="content">
      <div className="detail-block detail-block_margin">
        <div className="wrapper">
          <div className="detail-block__content">
            <h1>Gift Flower </h1>
            <p style={{ color: "black" }}>flower:{params.id}</p>
            <div className="subscribe-form">
              <form onSubmit={giftHandler}>
                <div className="box-field__row">
                  <div className="box-field">
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder="Celo Address"
                      onChange={(e) => setAddress(e.target.value)}
                    />

                    <button type="submit" className="btn">
                      Gift
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Gift;
