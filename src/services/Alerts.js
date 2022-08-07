import swal from 'sweetalert';

export const alertas = (data, message) =>{
    if(data.error){
        swal("Oops!", message, "error");
    }else{
        swal("Sucesso!", message, "success");
    }
};

export const error_axios = (error) =>{
    if (error.response) {
      if(error.response.status === 400 && error.response.data.validation_error.body_params[0].msg !== undefined){
        alertas({"error": true}, error.response.data.validation_error.body_params[0].msg)
      }
    } else if (error.request) {
      alertas({"error": true}, "Não foi possivel conectar com o servidor!")
    } else {
      alertas({"error": true}, "Algo aconteceu!")
    }
};

export const confirmacao = async (titulo, texto, icone) =>{
  let agreement = await swal({
        title: titulo,
        text: texto,
        icon: icone,
        dangerMode: true,
        });
  
  return agreement;
};