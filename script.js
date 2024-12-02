let participants = JSON.parse(localStorage.getItem('participants')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateParticipantsList();
    if (localStorage.getItem('santaResults')) {
        showResults();
    }
});

function addParticipant() {
    const name = document.getElementById('name').value.trim();
    const gift = document.getElementById('gift').value.trim();

    if (name && gift) {
        participants.push({ name, gift });
        localStorage.setItem('participants', JSON.stringify(participants));  // Сохраняем в localStorage
        updateParticipantsList();
        document.getElementById('name').value = '';
        document.getElementById('gift').value = '';
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
}

function updateParticipantsList() {
    const list = document.getElementById('participantsList');
    list.innerHTML = '';
    participants.forEach((participant) => {
        const listItem = document.createElement('li');
        listItem.textContent = participant.name;  // Показываем только имена
        list.appendChild(listItem);
    });
}

function generateSecretSanta() {
    if (participants.length < 2) {
        alert('Для игры нужно хотя бы 2 участника!');
        return;
    }

    const santaResults = assignSecretSantas(participants);
    localStorage.setItem('santaResults', JSON.stringify(santaResults));  // Сохраняем результаты в localStorage
    showResults();
}

function assignSecretSantas(participants) {
    const santas = [...participants];
    const results = [];

    // Перемешиваем участников
    for (let i = santas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [santas[i], santas[j]] = [santas[j], santas[i]]; // Меняем местами
    }

    // Назначаем тайных санта
    for (let i = 0; i < participants.length; i++) {
        results.push({
            giver: participants[i].name,
            receiver: santas[i === participants.length - 1 ? 0 : i + 1].name,
            gift: santas[i === participants.length - 1 ? 0 : i + 1].gift
        });
    }

    return results;
}

function showResults() {
    const santaResults = JSON.parse(localStorage.getItem('santaResults'));
    const participantName = participants.find(p => p.name === santaResults[0].giver).name;  // Включим фильтрацию по имени участника

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h3>Результаты Тайного Санты:</h3>';
    
    // Ищем только свою пару
    const myResult = santaResults.find(result => result.giver === participantName);

    if (myResult) {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.textContent = `${myResult.giver} подарит подарок ${myResult.receiver} — ${myResult.gift}`;
        resultDiv.appendChild(resultItem);
    }

    // Убираем кнопку после генерации результатов
    document.querySelector('button').disabled = true;
    document.querySelector('button').textContent = "Результаты сгенерированы";
}
