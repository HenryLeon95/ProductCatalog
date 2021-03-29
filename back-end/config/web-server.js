module.exports = {
  port: process.env.HTTP_PORT || 3000
};

/*
Este es un módulo JavaScript simple que expone una sola propiedad llamada puerto.
En Node.js, el objeto de proceso tiene una propiedad env que contiene el entorno del usuario.
Lo estoy usando para establecer el valor del puerto en el valor de la variable de entorno HTTP_PORT.
Si esa variable de entorno no está definida, el valor predeterminado será 3000.
Es común derivar puertos de las variables de entorno, ya que pueden variar en diferentes entornos o asignarse aleatoriamente en tiempo
de ejecución.
*/