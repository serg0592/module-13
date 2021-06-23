const personGenerator = { //объект-генератор
    //список фамилий
    surNameJson: `{
        "count": 16,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,

    //список мужских имен
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,

    //список женских имен
    firstNameFemaleJson: `{
        "count": 14,
        "list": {     
            "id_1": "Александра",
            "id_2": "Елена",
            "id_3": "Ольга",
            "id_4": "Анна",
            "id_5": "Екатерина",
            "id_6": "Инна",
            "id_7": "Евгения",
            "id_8": "Анастасия",
            "id_9": "Валентина",
            "id_10": "Тамара",
            "id_11": "Варвара",
            "id_12": "Василиса",
            "id_13": "Олеся",
            "id_14": "Софья"
        }
    }`,

    maleProfJson: `{
        "count": 15,
        "list": {
            "id_1": "инженер",
            "id_2": "водитель",
            "id_3": "менеджер",
            "id_4": "архитектор",
            "id_5": "краевед",
            "id_6": "почтальон",
            "id_7": "продавец",
            "id_8": "бурильщик",
            "id_9": "горнодобывающий",
            "id_10": "взрывник",
            "id_11": "сталевар",
            "id_12": "кузнец",
            "id_13": "тракторист",
            "id_14": "моряк",
            "id_15": "нефтяник"
        }
    }`,

    femaleProfJson: `{
        "count": 15,
        "list": {
            "id_1": "инженер",
            "id_2": "водитель",
            "id_3": "менеджер",
            "id_4": "архитектор",
            "id_5": "краевед",
            "id_6": "почтальон",
            "id_7": "продавец",
            "id_8": "делопроизводитель",
            "id_9": "секретарша",
            "id_10": "стюардесса",
            "id_11": "медсестра",
            "id_12": "воспитатель",
            "id_13": "доярка",
            "id_14": "сваха",
            "id_15": "ткачиха"
        }
    }`,

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    //генератор случайных чисел в заданном диапазоне
    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    //выбор значений из списков фамилий и имён согласно сгенерированному числу
    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },

    //случайная генерация пола
    randomGender: function() {
        if (this.randomIntNumber() === 0) {
            return this.GENDER_MALE;
        } else {
            return this.GENDER_FEMALE;
        }
    },

    //генерация имени согласно полу
    randomFirstName: function(gender) {
        if (gender === 'Мужчина') {            
            return this.randomValue(this.firstNameMaleJson);
        } else {
            return this.randomValue(this.firstNameFemaleJson);
        }
    },

    //генерация фамилии согласно полу
    randomSurName: function(gender) {
        if (gender === 'Мужчина') {
            return this.randomValue(this.surNameJson);
        } else {
            return this.randomValue(this.surNameJson) + 'a';
        }
    },

    //генерация отчества согласно полу
    randomPatronymic: function(gender) {
        let father = this.randomValue(this.firstNameMaleJson); //выбор случайного мужского имени
        let patronymic;

        //генерация мужского отчества с учетом особенностей русского языка
        if (gender === 'Мужчина') {
            switch (father) {
                case 'Андрей': patronymic = 'Андреевич';
                break;
                case 'Дмитрий': patronymic = 'Дмитриевич';
                break;
                case 'Никита': patronymic = 'Никитич';
                break;
                case 'Михаил': patronymic = 'Михайлович';
                break;

                default: patronymic = father + 'ович';
                break;
            }
            return patronymic;
        } else {
            //генерация женского отчества с учетом особенностей русского языка
            switch (father) {
                case 'Андрей': patronymic = 'Андреевна';
                break;
                case 'Дмитрий': patronymic = 'Дмитриевна';
                break;
                case 'Никита': patronymic = 'Никитична';
                break;
                case 'Михаил': patronymic = 'Михайловна';
                break;

                default: patronymic = father + 'овна';
                break;
            }
            return patronymic;
        }
    },

    //генерация даты рождения (нашей эры)
    randomBirthday: function() {
        let year = this.randomIntNumber(1930, 2003) + ' года'; //год рождения 
        let month, monthNum;
        let day, days_31;

        switch ( monthNum = this.randomIntNumber(1, 12) ) { //месяц рождения словами
            case 1: month = 'января';
                    days_31 = true;
            break;
            case 2: month = 'февраля';
                    days_31 = false;
            break;
            case 3: month = 'марта';
                    days_31 = true;
            break;
            case 4: month = 'апреля';
                    days_31 = false;
            break;
            case 5: month = 'мая';
                    days_31 = true;
            break;
            case 6: month = 'июня';
                    days_31 = false;
            break;
            case 7: month = 'июля';
                    days_31 = true;
            break;
            case 8: month = 'августа';
                    days_31 = true;
            break;
            case 9: month = 'сентября';
                    days_31 = false;
            break;
            case 10: month = 'октября';
                    days_31 = true;
            break;
            case 11: month = 'ноября';
                    days_31 = false;
            break;
            case 12: month = 'декабря';
                    days_31 = true;
            break;
        }

        if (days_31) { //день рождения с учетом кол-ва дней в месяцах
            day = this.randomIntNumber(1, 31);
        } else if (monthNum == 2) {
            day = this.randomIntNumber(1, 28);
        } else{
            day = this.randomIntNumber(1, 30);
        }

        return {year: year, month: month, day: day};
    },

    randomProf: function(gender) {
        //debugger;
        if (gender === 'Мужчина') {
            return this.randomValue(this.maleProfJson);
        } else {
            return this.randomValue(this.femaleProfJson);
        }
    },

    getPerson: function () {
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.firstName = this.randomFirstName(this.person.gender);
        this.person.surName = this.randomSurName(this.person.gender);
        this.person.patronymic = this.randomPatronymic(this.person.gender);
        this.person.birthday = this.randomBirthday();
        this.person.profession = this.randomProf(this.person.gender);
        return this.person;
    }
};
