let participants = JSON.parse(localStorage.getItem('participants')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateParticipantsList();
});

function addParticipant() {
    const name = document.getElementById('name').value.trim();
    const gift = document.getElementById('gift').value.trim();

    if (name && gift) {
        participants.push({ name, gift });
        localStorage.setItem('participants', JSON.stringify(participants));  // Сохраняем список участников в localStorage
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
    participants.forEach((participant, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${participant.name}`;
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
    alert('Тайный Санта успешно сгенерирован! Вы можете скачать результаты.');
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

function downloadResults() {
    const santaResults = JSON.parse(localStorage.getItem('santaResults'));
    if (!santaResults) {
        alert('Сначала нужно сгенерировать Тайного Санту!');
        return;
    }

    // Формируем текст для сохранения
    let fileContent = 'Результаты Тайного Санты:\n\n';
    santaResults.forEach(result => {
        fileContent += `${result.giver} -> ${result.receiver} (Подарок: ${result.gift})\n`;
    });

    // Создаем текстовый файл и загружаем его
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'secret_santa_results.txt';
    link.click();
}
