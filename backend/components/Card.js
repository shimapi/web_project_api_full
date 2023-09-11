import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {
	const currentUser = useContext(CurrentUserContext);
	const isOwn = props.owner._id === currentUser._id;
	const cardDeleteButtonClassName = isOwn ? "button-delete" : "";
	const isLiked = props.likes.some((card) => card._id === currentUser._id);
	const cardLikeButtonClassName = `button-like 
		${isLiked ? "button-like-active" : ""}`;

	function handleCardPhotoClick() {
		props.onOpenImage(props);
	}

	function handleCardLike() {
		props.onCardLike(props.card);
	}

	function handleCardDelete() {
		props.onCardDelete(props.card);
	}

	return (
		<article className="card" id={props.id}>
			<section className="card__photo">
				<button
					className={cardDeleteButtonClassName}
					onClick={handleCardDelete}
				></button>
				<img
					src={props.link}
					alt={props.name}
					onClick={handleCardPhotoClick}
					className="card__image"
					data-target="#photoPopUp"
				/>
			</section>
			<section className="card__name">
				<h3 className="card__title">{props.name}</h3>
				<section className="card__like">
					<button
						className={cardLikeButtonClassName}
						onClick={handleCardLike}
					></button>
					<span className="count-likes">{props.likes.length}</span>
				</section>
			</section>
		</article>
	);
};

export default Card;
