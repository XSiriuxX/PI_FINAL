import { Link } from "react-router-dom";
import "./card.css";
import { useState, useEffect } from "react";
import { addfavorite, deletefavorite } from "../../redux/actions";
import { connect } from "react-redux";
import pcIcon from "../../resources/icons/pc-icon.png";
import psIcon from "../../resources/icons/ps-icon.png";
import xboxIcon from "../../resources/icons/xbox-icon.png";
import nintendoIcon from "../../resources/icons/nintendo-icon.png";
import androidIcon from "../../resources/icons/android-icon.png";
import defaultimage from "../../resources/no-image.jpg";

const Card = ({
  id,
  userid,
  name,
  releasedate,
  rating,
  platforms,
  image,
  addfavorite,
  deletefavorite,
  myfavorites,
}) => {
  const [isFav, setisFav] = useState(false);

  // Verificar si el videojuego es favorito
  useEffect(() => {
    myfavorites.forEach((fav) => {
      if (fav.id == id && fav.userid === userid) {
        setisFav(true);
      }
    });
  }, [myfavorites, id, userid]);

  // Renderizar las estrellas
  const renderStars = () => {
    const maxRating = 5;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      let starClass = "star";

      starClass += i <= rating ? " filled" : "";

      if (i === filledStars + 1 && hasHalfStar) {
        starClass += " half-filled";
      }

      stars.push(
        <span key={i} className={starClass}>
          ★
        </span>
      );
    }

    return stars;
  };

  // Manejar la acción de agregar/quitar favorito
  const handleFavorite = () => {
    if (isFav) {
      setisFav(false);
      deletefavorite(id);
    } else {
      setisFav(true);
      const platformsToSend = Array.isArray(platforms)
        ? platforms.join(", ")
        : platforms;
      console.log(platformsToSend);
      addfavorite({
        userid,
        id,
        name,
        releasedate,
        rating,
        platforms: platformsToSend,
        image,
      });
    }
  };

  // Renderizar iconos de plataformas
  const getPlatformIcon = (platforms) => {
    const platformsstring = Array.isArray(platforms)
      ? platforms.join(", ").toLowerCase()
      : platforms.toLowerCase();

    const platformIcons = [];

    if (platformsstring.includes("playstation")) {
      platformIcons.push(psIcon);
    }
    if (platformsstring.includes("xbox")) {
      platformIcons.push(xboxIcon);
    }
    if (platformsstring.includes("pc")) {
      platformIcons.push(pcIcon);
    }
    if (platformsstring.includes("android")) {
      platformIcons.push(androidIcon);
    }
    if (platformsstring.includes("nintendo")) {
      platformIcons.push(nintendoIcon);
    }

    return (
      <>
        {platformIcons.map((icon) => (
          <img src={icon} alt={"icon"} />
        ))}
      </>
    );
  };

  return (
    <div className="card">
      <Link to={`/detail/${id}`}>
        <div className="title">
          <h1>{name}</h1>
        </div>

        <div className="image-container">
          <img
            src={
              image
                ? image.replace("/media/", "/media/crop/600/400/")
                : defaultimage
            }
            alt={name}
          />
        </div>

        <div className="platform-icons">{getPlatformIcon(platforms)}</div>

        <div className="star-rating">{renderStars()}</div>
      </Link>
      <div>
        {isFav ? (
          <button className="favorite-button" onClick={handleFavorite}>
            ❤️
          </button>
        ) : (
          <button className="favorite-button" onClick={handleFavorite}>
            🤍
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myfavorites: state.myfavorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addfavorite: (character) => {
      dispatch(addfavorite(character));
    },
    deletefavorite: (id) => {
      dispatch(deletefavorite(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
