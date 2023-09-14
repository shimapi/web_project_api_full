Constructor (constructor()): Inicializa las propiedades authorization y originURL.

Método useFetch(url, method, body): Este método privado se encarga de realizar las solicitudes a la API utilizando la función fetch. Agrega las cabeceras necesarias, realiza la solicitud y maneja las respuestas.

Método getProfileInitialInfo(): Obtiene la información inicial del perfil del usuario.

Método getCards(): Obtiene las tarjetas disponibles.

Método editProfileInfo(name, about): Permite editar la información del perfil, como el nombre y la descripción.

Método editProfileAvatar(avatar): Permite editar el avatar del perfil.

Método addNewCard(name, link): Agrega una nueva tarjeta con un nombre y un enlace.

Método deleteCard(cardId): Elimina una tarjeta existente según su ID.

Método likeCard(cardId): Indica que le gusta una tarjeta específica.

Método dislikeCard(cardId): Cancela el "me gusta" de una tarjeta específica.

Método changeLikeCardStatus(cardId, isLiked): Cambia el estado de "me gusta" de una tarjeta.

Método registerUser(email, password): Registra un nuevo usuario en la plataforma.

Método authorizeUser(email, password): Autoriza a un usuario en la plataforma.

Método checkUserToken(token): Verifica un token de usuario.

Exportación de la instancia api: Se crea una instancia de la clase Api y se exporta para su uso en otras partes de la aplicación.
