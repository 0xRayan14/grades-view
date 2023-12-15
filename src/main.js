// -------------------------- RELOAD BUTTON --------------------------
const reloadButton = document.querySelector('#reload')

reloadButton.addEventListener("click", () => {
    window.location.reload()
})

// -------------------------- ADD COLORS SVG --------------------------

const redCircleSVG = document.querySelector('#red').content.querySelector("svg");
const orangeCircleSVG = document.querySelector('#orange').content.querySelector("svg");
const greenCircleSVG = document.querySelector('#green').content.querySelector("svg");


// -------------------------- ADD SEMESTERS --------------------------

const addSemesterButton = document.querySelector('#add-semester');
let currentSemesterNumber = 1;

addSemesterButton.addEventListener('click', () => {
    let semesterGrades = [];
    let semesterAverages = [];

    const newSemesterTemplate = document.querySelector('#semester-template').content.cloneNode(true);
    const allSemesters = document.querySelector('#all-semesters');
    allSemesters.appendChild(newSemesterTemplate);

    const newSemesterElement = allSemesters.lastElementChild;

    newSemesterElement.querySelector("dt").textContent = "Semester " + currentSemesterNumber;

    if (currentSemesterNumber <= 7) {
        currentSemesterNumber++;
    } else {
        addSemesterButton.remove();
    }

    const addButton = newSemesterElement.querySelector('button');
    const inputGrade = newSemesterElement.querySelector('input');
    const gradesListContainer = newSemesterElement.querySelector('dd').querySelector("div");

    addButton.addEventListener('click', () => {
        if (inputGrade.value <= 6 && inputGrade.value % 0.5 === 0 && inputGrade.value > 0.5) {
            const newGradeElement = createGradeElement(inputGrade.value);
            semesterGrades.push(parseFloat(inputGrade.value));

            if (gradesListContainer) {
                gradesListContainer.appendChild(newGradeElement);
            }
        }
    });

    addButton.addEventListener('click', () => showSemesterAverage(semesterGrades, semesterAverages, newSemesterElement));

    const buttonBorder = newSemesterElement.querySelector('#button-border');
    const newSVG = newSemesterElement.querySelector('svg');

    inputGrade.addEventListener("focus", () => applyFocusStyles(newSVG, buttonBorder, true));
    inputGrade.addEventListener("blur", () => applyFocusStyles(newSVG, buttonBorder, false));
});

// -------------------------- ADD GRADES --------------------------

let allSemestersGrades = [];

function createGradeElement(gradeValue) {
    const newGradeElement = document.createElement("span");
    newGradeElement.className = "inline-flex items-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-200";

    let gradeCircleSVG = document.createElement("svg");

    if (gradeValue > 4) {
        gradeCircleSVG = greenCircleSVG.cloneNode(true);
    } else if (gradeValue < 4) {
        gradeCircleSVG = redCircleSVG.cloneNode(true);
    } else {
        gradeCircleSVG = orangeCircleSVG.cloneNode(true);
    }

    newGradeElement.appendChild(gradeCircleSVG);
    newGradeElement.appendChild(document.createTextNode(gradeValue));

    return newGradeElement;
}

function showSemesterAverage(grades, averages, semesterElement) {
    const averageElement = semesterElement.querySelector('.averageCase');
    const semesterAverage = calculateAverage(grades);

    averageElement.innerHTML = '';

    if (semesterAverage >= 0) {
        const semesterAverageSVG = createAverageSVG(semesterAverage);
        averages.pop([0]);
        averages.push(semesterAverage);
        allSemestersGrades.push(averages);
        averageElement.appendChild(semesterAverageSVG);
    }

    averageElement.appendChild(document.createTextNode(semesterAverage));

    showOverallAverage();
}

function calculateAverage(grades) {
    let sum = 0;
    for (const grade of grades) {
        sum += grade;
    }
    return Math.round((sum / grades.length) * 2) / 2;
}

function createAverageSVG(average) {
    let averageSVG = document.createElement('svg');

    if (average > 4) {
        averageSVG = greenCircleSVG.cloneNode(true);
    } else if (average < 4) {
        averageSVG = redCircleSVG.cloneNode(true);
    } else if (average === 4) {
        averageSVG = orangeCircleSVG.cloneNode(true);
    }

    return averageSVG;
}

function showOverallAverage() {
    const averageOfAveragesElement = document.querySelector('.averageOfAverage');
    let sumOfAverages = 0;

    for (let i = 0; i < allSemestersGrades.length; i++) {
        let currentSemesterAverages = allSemestersGrades[i];

        for (let j = 0; j < currentSemesterAverages.length; j++) {
            sumOfAverages += currentSemesterAverages[j];
        }
    }

    const overallAverage = Math.round((sumOfAverages / allSemestersGrades.length) * 2) / 2;
    let overallAverageSVG = createAverageSVG(overallAverage);

    averageOfAveragesElement.innerHTML = '';
    averageOfAveragesElement.appendChild(overallAverageSVG);
    averageOfAveragesElement.appendChild(document.createTextNode(overallAverage));


    const mathAverage = document.querySelector(".mathAverage")

    mathAverage.innerHTML = overallAverage
}


// -------------------------- FOCUS COLORS --------------------------


function applyFocusStyles(newSVG, buttonBorder, isFocus) {
    if (isFocus) {
        newSVG.classList.remove("text-gray-400");
        newSVG.classList.add("text-blue-400");

        buttonBorder.classList.remove("ring-gray-300");
        buttonBorder.classList.add("ring-blue-300");
    } else {
        newSVG.classList.remove("text-blue-400");
        newSVG.classList.add("text-gray-400");

        buttonBorder.classList.remove("ring-blue-300");
        buttonBorder.classList.add("ring-gray-300");
    }
}