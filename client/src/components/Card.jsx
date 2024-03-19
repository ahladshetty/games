import React from 'react';

const Card = ({ games }) => {
  if (!games || games.length === 0) {
    return <div>No games found</div>;
  }

  return (
    <div className="container">
      {/* <h1>Games Catalogue</h1> */}
      <div className="row">
        {games.map((game) => (
          <div key={game.id} className="col-md-4 mb-3">
            <div className="card">
              <img src={game.background_image} className="card-img-top" alt={game.name} />
              <div className="card-body">
                <h5 className="card-title">{game.name}</h5>
                <p className="card-text">Release Year: {new Date(game.released).getFullYear()}</p>
                <p className="card-text">Genres: {game.genres.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
