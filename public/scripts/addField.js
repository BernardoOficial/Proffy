// Procurar o botão
// Quando clicar no botão
document.querySelector('#add-time').addEventListener('click', cloneField);

// Executar uma ação
function cloneField() {
    // Duplicar os campos
    const newFieldsContainer = document.querySelector('.schedule-item').cloneNode(true)
    
    // limpar os campos
    const fields = newFieldsContainer.querySelectorAll('input')
    
    // para cada campo, limpar
    fields.forEach(field => {
        field.value = "";
    });
    
    // Colocar na página
    document.querySelector('#schedule-items').appendChild(newFieldsContainer)
}

