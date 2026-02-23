document.getElementById('showDataBtn').addEventListener('click', function() {
    let allInputs = document.querySelectorAll('input');
    let dataOutput = document.getElementById('dataOutput');

    let html = '<table border="1" style="width:100%; border-collapse:collapse;">';
    html += '<tr><th>Тип</th><th>ID</th><th>Значение</th></tr>';

    for (let i = 0; i < allInputs.length; i++) {
        let input = allInputs[i];

        if (input.type === 'submit' || input.type === 'reset' || input.type === 'button') {
            continue;
        }

        html += '<tr>';
        html += '<td>' + input.type + '</td>';
        html += '<td>' + (input.id || 'нет id') + '</td>';
        html += '<td>' + input.value + '</td>';
        html += '</tr>';
    }

    html += '</table>';
    dataOutput.innerHTML = html;
});