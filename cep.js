document.getElementById('cep-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    document.getElementById('resultado').innerHTML = `<p>CEP não encontrado.</p>`;
                } else {
                    document.getElementById('resultado').innerHTML = `
                        <h3>Informações do Endereço</h3>
                        <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                        <p><strong>Bairro:</strong> ${data.bairro}</p>
                        <p><strong>Cidade:</strong> ${data.localidade}</p>
                        <p><strong>Estado:</strong> ${data.uf}</p>
                    `;
                }
            })
            .catch(error => {
                document.getElementById('resultado').innerHTML = `<p>Erro ao consultar o CEP.</p>`;
            });
    } else {
        document.getElementById('resultado').innerHTML = `<p>CEP inválido. Deve ter 8 dígitos.</p>`;
    }
});
