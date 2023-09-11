import React from "react";

const PopupWithForm = (props) => {
	return (
		<div className={`modal ${props.isOpen ? "modal_active" : ""}`}>
			<div className="modal__container">
				<button className="close button-close" onClick={props.onClose}></button>
				<form className="form" action="#" noValidate>
					<h2>{props.title}</h2>

					{props.children}

					<button
						type="submit"
						className="button button-save"
						onClick={props.onSubmit}
					>
						{props.submitText}
					</button>
				</form>
			</div>
		</div>
	);
};

export default PopupWithForm;
