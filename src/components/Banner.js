const Banner = (props) => {
  return (
    <main className="content">
  {/* BEGIN MAIN BLOCK */}
  <div className="main-block load-bg">
    <div className="wrapper">
      <div className="main-block__content">
        <span className="saint-text">Maestro</span>
        <h1 className="main-text">Floral NFTs</h1>
        <p>Begin your journey into the world of digital flowers
        </p>
        <a href="/shop" className="btn">Own a Flora</a>
      </div>
    </div>
  </div>
  {/* MAIN BLOCK EOF */}
  
  {/* BEGIN ADVANTAGES */}
  <div className="advantages">
    <div className="wrapper">
      <div className="advantages-items">
        <div className="advantages-item">
          <div className="advantages-item__icon">
            <i className="icon-natural" />
          </div>
          <h4>Create Flower</h4>
          <p>In this special NFT project you have the ability to create a specific flower of choices</p>
        </div>
        <div className="advantages-item">
          <div className="advantages-item__icon">
            <i className="icon-quality" />
          </div>
          <h4>Buy Flower</h4>
          <p>You have the ability to buy flowers that creators put up for sale</p>
        </div>
        <div className="advantages-item">
          <div className="advantages-item__icon">
            <i className="icon-organic" />
          </div>
          <h4>Gift Flower</h4>
          <p>In this NFT, you can gift a friend a flower by putting in their address and it would be sent automatically</p>
        </div>
      </div>
    </div>
  </div>
  {/* ADVANTAGES EOF   */}
</main>

  );
};

export default Banner;
