import { useNavigate } from "react-router-dom";

const MyFlowers = (props) => {
  const navigate = useNavigate();
  const replyClick = (index) => {
    navigate(`/gift/${index}`);
  };
  const setForSale = (index)=>{
      props.setForSale(index);
  }
  return (
    <main className="content">
      {/* BEGIN DETAIL MAIN BLOCK */}
      <div className="detail-block detail-block_margin">
        <div className="wrapper">
          <div className="detail-block__content">
            <h1>My Flowers</h1>
          </div>
        </div>
      </div>
      {/* DETAIL MAIN BLOCK EOF   */}
      {/* BEGIN SHOP */}
      <div className="shop">
        <div className="wrapper">
          <div className="shop-content">
            <div className="shop-main">
              <div className="shop-main__items">
                {props.myFlowers.map((flower) => (
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
                          <i
                            className="icon-heart"
                            onClick={() => {
                              replyClick(flower.index);
                            }}
                          />
                          <i className="icon-reply" onClick={() => {
                              setForSale(flower.index);
                          }} />
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
    </main>
  );
};

export default MyFlowers;
