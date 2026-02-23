// noteTitle noteText

let zagolovok = document.getElementById("noteTitle");
let textе = document.getElementById("noteText");
let btn = document.getElementById("saveNoteBtn")
let err = document.getElementById("error");
let clear = document.getElementById("clearBtn");


clear.addEventListener("click", function() {
    zagolovok.value = "";
    textе.value = "";

});
btn.addEventListener("click", function() {

    zagolovok.classList.remove("error-color-inp");
    textе.classList.remove("error-color-inp");
    err.classList.remove("error-color");
    err.textContent = "";
    let calc = 0

    let d1 = zagolovok.value;
    let d2 = textе.value;
    if (d1 == "" ) {
        calc+=1
        zagolovok.classList.add("error-color-inp");
        err.textContent = "Заполните пустые поля";
        err.classList.add("error-color");
    }
    if (d2 == "") {
        calc+=1
        textе.classList.add("error-color-inp");
        err.textContent = "Заполните пустые поля";
        err.classList.add("error-color");
    }
    if (calc != 0) {
        return;
    }
    zagolovok.value = "";
    textе.value = "";

    addShab(d1, d2)

});



function addShab(d1, d2) {
    let empty = document.getElementById("emptyState");
    if (empty) { // Добавил проверку, существует ли элемент
        empty.style.display = 'none';
    }

    let shab = document.getElementById("noteTemplate");
    let zona = document.getElementById("notesContainer");

    let now = new Date();


    let clone = shab.content.cloneNode(true);


    let con = clone.querySelector(".note-title");
    con.textContent = d1;


    let con2 = clone.querySelector(".note-content");
    con2.textContent = d2;


    let con3 = clone.querySelector(".da");
    con3.textContent = now.toLocaleDateString("ru-RU");


    zona.appendChild(clone);
}

// Сохранить заметки в sessionStorage (не в localStorage!)
function saveNotesToSession() {
    let noteElements = document.querySelectorAll('#notesContainer .note');
    let notes = [];

    noteElements.forEach(note => {
        notes.push({
            title: note.querySelector('.note-title').textContent,
            text: note.querySelector('.note-content').textContent,
            date: note.querySelector('.da').textContent
        });
    });

    // Используем sessionStorage вместо localStorage
    sessionStorage.setItem('tempNotes', JSON.stringify(notes));
}

// Загрузить заметки из sessionStorage
function loadNotesFromSession() {
    let savedNotes = sessionStorage.getItem('tempNotes');
    if (!savedNotes) return;

    let notes = JSON.parse(savedNotes);

    // Очищаем контейнер перед загрузкой
    let container = document.getElementById('notesContainer');
    container.innerHTML = '';

    notes.forEach(note => {
        let shab = document.getElementById("noteTemplate");
        let clone = shab.content.cloneNode(true);

        clone.querySelector(".note-title").textContent = note.title;
        clone.querySelector(".note-content").textContent = note.text;
        clone.querySelector(".da").textContent = note.date;

        container.appendChild(clone);
    });

    // Скрываем пустое состояние
    let empty = document.getElementById("emptyState");
    if (empty) empty.style.display = 'none';
}

// Загружаем при старте страницы
loadNotesFromSession();

// В вашей функции addShab добавляем сохранение
function addShab(d1, d2) {
    let empty = document.getElementById("emptyState");
    if (empty) empty.style.display = 'none';

    let shab = document.getElementById("noteTemplate");
    let zona = document.getElementById("notesContainer");

    let clone = shab.content.cloneNode(true);

    clone.querySelector(".note-title").textContent = d1;
    clone.querySelector(".note-content").textContent = d2;
    clone.querySelector(".da").textContent = new Date().toLocaleDateString("ru-RU");

    zona.appendChild(clone);

    // Сохраняем в sessionStorage
    saveNotesToSession();
}

// При удалении тоже сохраняем
document.getElementById('notesContainer').addEventListener('click', function(event) {
    let deleteButton = event.target.closest('.delete-btn');

    if (deleteButton) {
        let noteElement = deleteButton.closest('.note');

        if (confirm('Удалить эту заметку?')) {
            noteElement.remove();
            saveNotesToSession(); // Сохраняем изменения
        }
    }
});

document.getElementById('notesContainer').addEventListener('click', function(event) {
    let deleteBtn = event.target.closest('.icon-btn'); // Ищем по классу, а не по ID
    // Проверяем, что это действительно кнопка удаления (можно по иконке)
    if (deleteBtn.querySelector('.fa-trash-alt')) {
        // Ищем заметку с классом 'note', а не 'note-template'!
        let note = deleteBtn.closest('.note');
        if (note) {
            note.remove();
        }
    }
});

document.addEventListener('mouseover', function(event) {
    let deleteBtn = event.target.closest('.icon-btn');
    if (deleteBtn.querySelector('.fa-trash-alt')) {
        let note = deleteBtn.closest('.note');
        if (note) {
            note.classList.add("note-close")
        }
    }
});
document.addEventListener('mouseout', function(event) {
    let deleteBtn = event.target.closest('.icon-btn');
    if (deleteBtn.querySelector('.fa-trash-alt')) {
        let note = deleteBtn.closest('.note');
        if (note) {
            note.classList.remove("note-close")
        }
    }
});
document.getElementById('notesContainer').addEventListener('click', function(event) {
    let deleteBtn = event.target.closest('.icon-btn1');
    let ne = document.querySelector('.note-content');
    let ne2 = document.querySelector('.note-title');

    if (deleteBtn.querySelector('.fa-edit')) {
        console.log(ne2.textContent, ne.textContent);
    }
});
// document.getElementById('notesContainer').addEventListener('click', function(event) {
//     let pinBtn = event.target.closest('.pin-btn');
//
//     if (pinBtn) {
//         let note = pinBtn.closest('.note');
//         let container = document.getElementById('notesContainer');
//
//         // Переключаем класс pinned
//         note.classList.toggle('pinned');
//
//         // Если заметка закреплена - перемещаем её в начало
//         if (note.classList.contains('pinned')) {
//             container.prepend(note);
//         }
//
//         // Меняем иконку
//         let icon = pinBtn.querySelector('i');
//         if (note.classList.contains('pinned')) {
//             icon.className = 'fas fa-thumbtack';
//             icon.style.transform = 'rotate(45deg)';
//         } else {
//             icon.className = 'fas fa-thumbtack';
//             icon.style.transform = '';
//         }
//     }
// });