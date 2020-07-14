
document.getElementById('cep').addEventListener('focus', () => {
    document.getElementById('cep').style.borderColor ="transparent";
});

document.getElementById('cep').addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/gi, '').replace(/(\d{5})(\d)/, '$1-$2');
});

function cepCheck() {
    const cepCheckRegex = /\d{5}-*\d{3}/;
    let cepValue = document.getElementById('cep').value;
    if(cepCheckRegex.test(cepValue)){
        return cepValue.replace(/\D/i, '');
    }else{
        document.getElementById('cep').style.borderColor="red";
        return false;
    }
};

var storedCep = new Object;
function storeCep(result){
    if(result){
        for(const campo in result){
            storedCep[campo] = result[campo];
            if(document.querySelector(`#${campo}`)){
                document.querySelector(`#${campo}`).value = result[campo];
            }
        }
    }else{
        document.querySelectorAll('input').forEach(e => {
            if(e.id !== "cep"){
                e.value = '';
            }
        })
    }
};

async function tempCep() {
    const cepChecked = cepCheck();
    if(cepChecked){
        const options ={
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }
        await fetch(`http://viacep.com.br/ws/${cepChecked}/json/`, options)
            .then(response => response.json()
            .then(data => storeCep(data)))
            .catch(e => console.log(`ERRO: ${e.message}`));
    }else{
        storeCep(null);
    }
    if(storedCep.erro === true){
        document.querySelectorAll('input').forEach(e => {
            if(e.id !== "cep"){
                e.value = '';
            }
        })
        alert("CEP inválido!");
        storedCep.erro = false;
    }
};