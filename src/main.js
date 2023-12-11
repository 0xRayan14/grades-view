const addSemesterButton = document.querySelector('#add-semester');
const allSemestersContainer = document.querySelector('#all-semester');
const semesterTemplate = document.querySelector('#semester-template');
const averageCase = semesterTemplate.querySelector('span');

let semesterCount = 0;
let gradesArray = []; // Array to store grades for each semester
let averageGrade = 0; // Variable to store the average grade

const getGradeDot = () => ({
    orange: document.getElementById('orange').content.querySelector('svg'),
    red: document.getElementById('red').content.querySelector('svg'),
    green: document.getElementById('green').content.querySelector('svg'),
});

const createGradeElement = (gradeValue, gradeDot) => {
    const newGradeElement = document.createElement('span');
    newGradeElement.className = 'inline-flex items-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-200';

    const newSvg = (gradeValue > 4) ? gradeDot.green.cloneNode(true) : (gradeValue < 4) ? gradeDot.red.cloneNode(true) : gradeDot.orange.cloneNode(true);

    newGradeElement.appendChild(newSvg);
    newGradeElement.appendChild(document.createTextNode(gradeValue));

    gradesArray.push(gradeValue);

    return newGradeElement;
};

const addSemester = () => {
    semesterCount++;

    if (semesterCount <= 8) {
        const newSemesterContainer = semesterTemplate.content.cloneNode(true);
        const gradeDot = getGradeDot();

        allSemestersContainer.appendChild(newSemesterContainer);
        const currentSemester = allSemestersContainer.lastElementChild;

        currentSemester.querySelector('dt').innerText = `Semester ${semesterCount}`;

        const gradeButton = currentSemester.querySelector('button');
        const gradeInput = currentSemester.querySelector('input');
        const gradesContainer = currentSemester.querySelector('.grades');

        gradeButton.addEventListener('click', () => {
            const inputGrade = parseFloat(gradeInput.value);

            if (inputGrade <= 6 && inputGrade % 0.5 === 0 && inputGrade > 0.5) {
                const newGradeElement = createGradeElement(inputGrade, gradeDot);

                if (gradesContainer) {
                    gradesContainer.appendChild(newGradeElement);
                }
            }

            gradeInput.value = '';
        });

        if (semesterCount === 8) {
            addSemesterButton.remove();
        }

        const handleFocus = () => {
            gradeButton.classList.remove('ring-gray-300');
            gradeButton.classList.add('ring-blue-400');
            gradeButton.querySelector('svg').classList.remove('text-gray-400');
            gradeButton.querySelector('svg').classList.add('text-blue-400');
        };

        const handleBlur = () => {
            gradeButton.classList.add('ring-gray-300');
            gradeButton.classList.remove('ring-blue-400');
            gradeButton.querySelector('svg').classList.add('text-gray-400');
            gradeButton.querySelector('svg').classList.remove('text-blue-400');
        };

        gradeInput.addEventListener('focus', handleFocus);
        gradeInput.addEventListener('blur', handleBlur);
    }
};

addSemesterButton.addEventListener('click', addSemester);
