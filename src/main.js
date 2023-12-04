const button = document.querySelector("#button");
const input = document.querySelector(".sem1");
const semesterButton = document.querySelector("#add-semester");
let count = 2;
const divGrades = document.querySelector(".grades");

semesterButton.addEventListener("click", (event) => {
    count++;
    const allSemester = document.querySelector("#all-semester");
    const newSemestre = document
        .querySelector("#semester-template")
        .content.cloneNode(true);
    const buttonGrades = newSemestre.querySelector("button");
    const inputSemester = newSemestre.querySelector("input");
    let divGrades = newSemestre.querySelector(".grades");

    if (count <= 8) {
        allSemester.appendChild(newSemestre);
        const semester = allSemester.lastElementChild;
        semester.querySelector("dt").innerText = "Semester " + count;

        buttonGrades.addEventListener("click", () => {
            const svgOrange = document
                .getElementById("svg-orange")
                .content.querySelector("svg");
            const svgRed = document
                .getElementById("svg-red")
                .content.querySelector("svg");
            const svgGreen = document
                .getElementById("svg-green")
                .content.querySelector("svg");

            if (
                inputSemester.value <= 6 &&
                inputSemester.value % 0.5 === 0 &&
                inputSemester.value > 0.5
            ) {
                const newGrades = document.createElement("span");
                newGrades.className =
                    "inline-flex items-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-200";

                let newSvg = document.createElement("svg");

                if (inputSemester.value > 4) {
                    newSvg = svgGreen.cloneNode(true);
                } else if (inputSemester.value < 4) {
                    newSvg = svgRed.cloneNode(true);
                } else {
                    newSvg = svgOrange.cloneNode(true);
                }

                newGrades.appendChild(newSvg);
                newGrades.appendChild(document.createTextNode(inputSemester.value));

                if (divGrades) {
                    divGrades.appendChild(newGrades);
                }
            }
            inputSemester.value = "";
        });
    }
});

input.addEventListener("focus", (event) => {
    const buttonClassList = button.classList;
    const svgClassList = button.querySelector("svg");

    buttonClassList.remove("ring-gray-300");

    svgClassList.classList.remove("text-gray-400");
    svgClassList.classList.add("text-blue-400");
});

input.addEventListener("blur", (event) => {
    const buttonClass = button.classList;

    const svgClassList = button.querySelector("svg");

    buttonClass.remove("ring-blue-300");
    buttonClass.add("ring-gray-300");

    svgClassList.classList.remove("text-blue-400");
    svgClassList.classList.add("text-gray-400");
});