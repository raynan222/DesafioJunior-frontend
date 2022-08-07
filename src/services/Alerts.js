import swal from 'sweetalert';

export const alertas = (data, message) =>{
    if(data.error){
        swal("Oops!", message, "error");
    }else{
        swal("Sucesso!", message, "success");
    }
};

export const cuidado = (data, titulo, texto) =>{
    swal({
        title: titulo,
        text: texto,
        icon: "warning",
        dangerMode: true,
        })
        .then(willDelete => {
        if (willDelete) {
            return true;
        }
        });
}