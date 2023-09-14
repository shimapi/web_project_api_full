import React from "react";

export default function ImagePopup(props) {
	return (
		<div className={`modal photo-popup ${props.isOpen ? "modal_active" : " "}`}>
			<div className="photo-popup__container">
				<button className="close button-close" onClick={props.onClose}></button>
				<img
					src={props.selectedCard.link}
					alt={props.selectedCard.name}
					className="photo-popup__image"
				/>
				<p className="photo-popup__title">{props.selectedCard.name}</p>
			</div>
		</div>
	);
}
