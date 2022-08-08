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
      if(error.response.status == 400 && error.response.data.validation_error.body_params[0].msg != undefined){
        alertas({"error": true}, error.response.data.validation_error.body_params[0].msg)
      }
    } else if (error.request) {
      alertas({"error": true}, "Aconteceu algo verifique os dados e tente novamente!")
    } else {
      alertas({"error": true}, "Algo aconteceu, tente novamente!")
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