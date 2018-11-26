/**
 * Recebe uma string e retorna a mesma string com primeira
 * letra em maiúscula
 */
    
let maiuscula = function(text) {
  return text.charAt(0).toUpperCase()+text.slice(1);
}

export default maiuscula