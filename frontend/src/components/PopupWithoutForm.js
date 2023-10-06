import React from "react";

const PopupWithoutForm = (props) => {
	return (
		<div className={`modal ${props.isOpen ? "modal_active" : ""}`}>
			<div className="modal__container modal__without-form">
				<button className="close button-close" onClick={props.onClose}></button>
				{props.children}
			</div>
		</div>
	);
};

export default PopupWithoutForm;
