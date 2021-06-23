
const btnGenerate = document.querySelector('#btnGenerate');
const btnClear = document.querySelector('#btnClear');

btnClear.onclick = () => {window.location.reload()};

btnGenerate.onclick = function()
{
    const initPerson = personGenerator.getPerson();
    document.getElementById('firstNameOutput').innerText = initPerson.firstName;
    document.getElementById('surNameOutput').innerText = initPerson.surName;
    document.getElementById('genderOutput').innerText = initPerson.gender;
    document.getElementById('patronymicOutput').innerText = initPerson.patronymic;
    document.getElementById('birthDayOutput').innerText = initPerson.birthday.day;
    document.getElementById('birthMonthOutput').innerText = initPerson.birthday.month;
    document.getElementById('birthYearOutput').innerText = initPerson.birthday.year;
    document.getElementById('professionOutput').innerText = initPerson.profession;
};

