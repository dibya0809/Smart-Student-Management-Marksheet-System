// ============================================================
// PART 1: CONNECT JAVASCRIPT WITH HTML
// ============================================================

const form = document.getElementById("studentForm");
const editIndex = document.getElementById("editIndex");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");
const searchInput = document.getElementById("search");
const studentBody = document.getElementById("studentBody");
const studentTable = document.getElementById("studentTable");
const emptyState = document.getElementById("emptyState");


// ============================================================
// PART 2: SETTINGS AND SUBJECT LIST
// ============================================================

const STORAGE_KEY = "studentManagementSystem_one_page_v5";

const subjects = [
    "english",
    "mathematics",
    "science",
    "socialScience",
    "computer"
];

let students = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

let sortDescending = true;


// ============================================================
// PART 3: SAVE STUDENT DATA
// ============================================================

function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(students)
    );

}


// ============================================================
// PART 4: CALCULATE TOTAL MARKS
// ============================================================

function getTotal(student) {

    return subjects.reduce(
        (sum, subject) => sum + Number(student[subject]),
        0
    );

}


// ============================================================
// PART 5: CALCULATE PERCENTAGE
// ============================================================

function getPercentage(student) {

    return getTotal(student) / 5;

}


// ============================================================
// PART 6: CALCULATE GRADE
// ============================================================

function getGrade(percentage) {

    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";

    return "F";

}


// ============================================================
// PART 7: CALCULATE PASS / FAIL
// ============================================================

function getResult(percentage) {

    if (percentage >= 33) {
        return "PASS";
    }

    return "FAIL";

}


// ============================================================
// PART 8: SECURITY / HTML SAFETY FUNCTION
// ============================================================

function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// ============================================================
// PART 9: DISPLAY STUDENTS IN TABLE
// ============================================================

function renderStudents() {

    // Get search text
    const query = searchInput.value
        .toLowerCase()
        .trim();


    // Filter students
    const filtered = students
        .map((student, index) => ({
            student,
            index
        }))
        .filter(({ student }) =>
            student.registrationNumber
                .toLowerCase()
                .includes(query) ||

            student.name
                .toLowerCase()
                .includes(query)
        );


    // Clear old table data
    studentBody.innerHTML = "";


    // Show / hide table
    studentTable.classList.toggle(
        "hidden",
        filtered.length === 0
    );

    emptyState.classList.toggle(
        "hidden",
        filtered.length !== 0
    );


    // Add students to table
    filtered.forEach(
        ({ student, index }, displayIndex) => {

            const total = getTotal(student);
            const percentage = getPercentage(student);


            const row = document.createElement("tr");


            row.innerHTML = `

                <td>${displayIndex + 1}</td>

                <td>
                    <strong>
                        ${escapeHtml(student.registrationNumber)}
                    </strong>
                </td>

                <td>
                    ${escapeHtml(student.name)}
                </td>

                <td>
                    ${escapeHtml(student.examName)}
                </td>

                <td>${student.english}</td>

                <td>${student.mathematics}</td>

                <td>${student.science}</td>

                <td>${student.socialScience}</td>

                <td>${student.computer}</td>

                <td>${total.toFixed(2)}</td>

                <td>${percentage.toFixed(2)}%</td>

                <td>
                    <strong>
                        ${getGrade(percentage)}
                    </strong>
                </td>

                <td>

                    <button
                        class="print"
                        onclick="printMarksheet(${index})">
                        ▣ Marksheet
                    </button>

                    <button
                        class="edit"
                        onclick="editStudent(${index})">
                        ✎ Edit
                    </button>

                    <button
                        class="delete"
                        onclick="deleteStudent(${index})">
                        ⌫ Delete
                    </button>

                </td>

            `;


            studentBody.appendChild(row);

        }
    );


    // Update dashboard
    updateStatistics();

}


// ============================================================
// PART 10: UPDATE DASHBOARD STATISTICS
// ============================================================

function updateStatistics() {

    // Total number of students
    document.getElementById("totalStudents")
        .textContent = students.length;


    // If there are no students
    if (!students.length) {

        document.getElementById("averagePercentage")
            .textContent = "0%";

        document.getElementById("topperName")
            .textContent = "—";

        return;
    }


    // Calculate class average
    const average =
        students.reduce(
            (sum, student) =>
                sum + getPercentage(student),
            0
        ) / students.length;


    // Find topper
    const topper =
        students.reduce(
            (best, current) =>
                getPercentage(current) >
                getPercentage(best)
                    ? current
                    : best
        );


    // Display statistics
    document.getElementById("averagePercentage")
        .textContent =
        average.toFixed(2) + "%";

    document.getElementById("topperName")
        .textContent =
        topper.name;

}


// ============================================================
// PART 11: ADD / UPDATE STUDENT
// ============================================================

form.addEventListener("submit", function(event) {

    // Stop page refresh
    event.preventDefault();


    // Collect student information
    const student = {

        registrationNumber:
            document
                .getElementById("registrationNumber")
                .value
                .trim(),

        name:
            document
                .getElementById("name")
                .value
                .trim(),

        examName:
            document
                .getElementById("examName")
                .value
                .trim(),

        studentClass:
            document
                .getElementById("studentClass")
                .value
                .trim(),

        english:
            Number(
                document.getElementById("english").value
            ),

        mathematics:
            Number(
                document.getElementById("mathematics").value
            ),

        science:
            Number(
                document.getElementById("science").value
            ),

        socialScience:
            Number(
                document.getElementById("socialScience").value
            ),

        computer:
            Number(
                document.getElementById("computer").value
            )
    };


    // Check required information
    if (
        !student.registrationNumber ||
        !student.name ||
        !student.examName ||
        !student.studentClass
    ) {

        alert(
            "Please fill REGD No., name, exam name and class."
        );

        return;
    }


    // Check marks
    const invalidMarks = subjects.some(subject =>

        !Number.isFinite(student[subject]) ||

        student[subject] < 0 ||

        student[subject] > 100

    );


    if (invalidMarks) {

        alert(
            "Every subject mark must be between 0 and 100."
        );

        return;
    }


    // Check edit mode
    const currentEdit = editIndex.value;


    // Check duplicate registration number
    const duplicate = students.some(
        (existing, index) =>

            existing.registrationNumber
                .toLowerCase() ===
            student.registrationNumber
                .toLowerCase()

            &&

            String(index) !== currentEdit
    );


    if (duplicate) {

        alert(
            "This REGD No. already exists."
        );

        return;
    }


    // ADD NEW STUDENT
    if (currentEdit === "") {

        students.push(student);

        alert(
            "Student added successfully!"
        );

    }

    // UPDATE EXISTING STUDENT
    else {

        students[Number(currentEdit)] = student;

        alert(
            "Student updated successfully!"
        );

    }


    // Save data
    saveData();

    // Clear form
    resetForm();

    // Refresh table
    renderStudents();

});


// ============================================================
// PART 12: EDIT STUDENT
// ============================================================

function editStudent(index) {

    const student = students[index];


    // Put student information back into form
    document.getElementById("registrationNumber")
        .value = student.registrationNumber;

    document.getElementById("name")
        .value = student.name;

    document.getElementById("examName")
        .value = student.examName;

    document.getElementById("studentClass")
        .value = student.studentClass;


    // Put subject marks into form
    subjects.forEach(subject => {

        document.getElementById(subject)
            .value = student[subject];

    });


    // Turn ON edit mode
    editIndex.value = index;

    formTitle.textContent = "Edit Student";

    saveBtn.textContent = "✓ Update Student";

    cancelBtn.classList.remove("hidden");


    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ============================================================
// PART 13: DELETE STUDENT
// ============================================================

function deleteStudent(index) {

    if (
        confirm(
            "Are you sure you want to delete this student?"
        )
    ) {

        // Remove student
        students.splice(index, 1);

        // Save changed data
        saveData();

        // Refresh table
        renderStudents();

    }

}


// ============================================================
// PART 14: RESET / CLEAR FORM
// ============================================================

function resetForm() {

    // Clear all form fields
    form.reset();


    // Exit edit mode
    editIndex.value = "";


    // Change heading
    formTitle.textContent =
        "Add New Student";


    // Change button text
    saveBtn.textContent =
        "＋ Add Student";


    // Hide cancel button
    cancelBtn.classList.add("hidden");

}


// ============================================================
// PART 15: SEARCH, CANCEL AND SORT
// ============================================================

// Cancel button
cancelBtn.addEventListener(
    "click",
    resetForm
);


// Search students
searchInput.addEventListener(
    "input",
    renderStudents
);


// Sort students by percentage
document
    .getElementById("sortBtn")
    .addEventListener(
        "click",
        function() {

            students.sort((a, b) =>

                sortDescending

                    ? getPercentage(b) -
                      getPercentage(a)

                    : getPercentage(a) -
                      getPercentage(b)

            );


            // Change sorting direction
            sortDescending =
                !sortDescending;


            // Change button text
            this.textContent =
                sortDescending
                    ? "Sort by % ↓"
                    : "Sort by % ↑";


            // Save sorted data
            saveData();


            // Display again
            renderStudents();

        }
    );


// ============================================================
// PART 16: PRINT ALL STUDENTS
// ============================================================

document
    .getElementById("printAllBtn")
    .addEventListener(
        "click",
        function() {

            // Check if students exist
            if (!students.length) {

                alert(
                    "There are no student records to print."
                );

                return;
            }


            // Print current page
            window.print();

        }
    );


// ============================================================
// PART 17: PRINT INDIVIDUAL MARKSHEET
// ============================================================

function printMarksheet(index) {

    // Get selected student
    const student = students[index];


    // Calculate marks
    const total =
        getTotal(student);

    const percentage =
        getPercentage(student);

    const finalGrade =
        getGrade(percentage);

    const result =
        getResult(percentage);


    // Open new print window
    const printWindow =
        window.open(
            "",
            "_blank",
            "width=900,height=950"
        );


    // Check popup permission
    if (!printWindow) {

        alert(
            "Please allow pop-ups for the individual marksheet."
        );

        return;
    }


    // Create marksheet
    printWindow.document.write(`

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<title>
Odisha Adarsha Vidyalaya - Marksheet -
${escapeHtml(student.registrationNumber)}
</title>


<style>

@page {
    size: A4 portrait;
    margin: 7mm;
}

* {
    box-sizing: border-box;
}

body {

    margin: 0;

    background: #fff;

    color: #102040;

    font-family:
        Georgia,
        "Times New Roman",
        serif;
}


/* MARKSHEET OUTER BOX */

.marksheet {

    width: 100%;

    max-width: 790px;

    margin: auto;

    padding: 14px;

    border: 4px double #173b91;

    background: #fff;

}


/* INNER BOX */

.inner {

    border: 1px solid #7890b5;

    padding: 14px;

}


/* SCHOOL HEADER */

.school-logo {
    width: 72px;
    height: 62px;
    object-fit: contain;
    display: block;
    margin: 0 auto 6px auto;
}

.school-header {

    text-align: center;

    border-bottom:
        2px solid #173b91;

    padding-bottom: 14px;

}


/* SCHOOL EMBLEM */

.school-emblem {

    width: 62px;

    height: 62px;

    margin:
        0 auto 8px;

    display: grid;

    place-items: center;

    border:
        2px solid #173b91;

    border-radius: 50%;

    font-size: 31px;

}


/* SCHOOL NAME */

.school-header h1 {

    margin: 0;

    color: #122e69;

    font-size: 20px;

    letter-spacing: .8px;

    text-transform: uppercase;

}


/* TAGLINE */

.school-header .tagline {

    margin-top: 4px;

    font-size: 11px;

    letter-spacing: 2px;

    color: #667796;

}


/* ADDRESS */

.school-header .address {

    margin-top: 8px;

    font-family: Arial, sans-serif;

    font-size: 10px;

    color: #47566f;

}


/* EXAM NAME */

.exam-banner {

    margin: 10px auto 8px;

    width: 68%;

    padding: 9px 10px;

    text-align: center;

    color: white;

    background: #173b91;

    font-size: 16px;

    font-weight: bold;

    letter-spacing: 1.5px;

}


/* MARKSHEET TITLE */

.marksheet-title {

    text-align: center;

    margin: -2px auto 10px;

    color: #173b91;

    font-size: 23px;

    font-weight: bold;

    letter-spacing: 2px;

}


/* STUDENT INFORMATION */

.student-meta {

    border: 1px solid #8799b5;

    padding: 9px;

    margin-bottom: 10px;

    font-family: Arial, sans-serif;

    font-size: 12px;

}


/* META ROW */

.meta-row {

    display: grid;

    grid-template-columns:
        1fr 1fr;

    gap: 20px;

    margin-bottom: 9px;

}

.meta-row:last-child {

    margin-bottom: 0;

}

.meta-row.single {

    grid-template-columns: 1fr;

}


/* META TEXT */

.meta-item strong {

    display: inline-block;

    min-width: 115px;

}


/* SUBJECT TABLE */

table {

    width: 100%;

    border-collapse: collapse;

    font-family: Arial, sans-serif;

    font-size: 12px;

}


/* TABLE CELLS */

th,
td {

    border:
        1px solid #71839f;

    padding: 7px;

    text-align: center;

}


/* TABLE HEADER */

th {

    color: #102e69;

    background: #eaf1fc;

    font-weight: bold;

}


/* TOTAL ROW */

.total-row {

    font-weight: bold;

    background: #fff6d9;

    font-size: 13px;

}


/* RESULT SECTION */

.result-grid {

    display: grid;

    grid-template-columns:
        1fr 1fr 1fr;

    gap: 10px;

    margin-top: 10px;

}


/* RESULT BOX */

.result-box {

    text-align: center;

    border:
        1px solid #71839f;

    padding: 9px;

    font-family: Arial, sans-serif;

    background: #f5f8fd;

}


/* RESULT BOX TITLE */

.result-box strong {

    display: block;

    font-family: Georgia, serif;

    color: #173b91;

    margin-bottom: 5px;

}


/* PASS / FAIL BOX */

.pass {

    margin: 13px auto 0;

    width: 32%;

    text-align: center;

    padding: 8px;

    border:
        1px solid #173b91;

    color: #173b91;

    font-weight: bold;

    font-family: Arial, sans-serif;

}


/* MOTTO */

.motto {

    text-align: center;

    margin-top: 10px;

    font-style: italic;

    color: #596b87;

    font-size: 12px;

}


/* SIGNATURE SECTION */

.signatures {

    display: flex;

    justify-content: space-between;

    align-items: end;

    margin-top: 38px;

    font-family: Arial, sans-serif;

    font-size: 11px;

}


/* SIGNATURE LINE */

.signature {

    width: 175px;

    text-align: center;

    border-top:
        1px solid #173b91;

    padding-top: 7px;

}


/* DYNAMIC PASS / FAIL SEAL */

.seal {
    width: 84px;
    height: 84px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 3px solid;
    border-radius: 50%;
    text-align: center;
    font-family: Arial, sans-serif;
    font-weight: 800;
}

.seal::before {
    content: "";
    position: absolute;
    width: 70px;
    height: 70px;
    border: 1px solid currentColor;
    border-radius: 50%;
}

.seal-school {
    width: 60px;
    font-size: 5px;
    line-height: 7px;
    z-index: 1;
}

.seal-result {
    font-size: 16px;
    letter-spacing: 1px;
    margin: 2px 0;
    z-index: 1;
}

.seal-session {
    font-size: 5px;
    z-index: 1;
}

.pass-seal {
    color: #198754;
    border-color: #198754;
}

.fail-seal {
    color: #dc3545;
    border-color: #dc3545;
}


/* FOOTER NOTE */

.note {

    text-align: center;

    margin-top: 14px;

    font-family: Arial, sans-serif;

    font-size: 9px;

    color: #7a879c;

}

</style>

</head>


<body>


<div class="marksheet">

<div class="inner">



<!-- SCHOOL HEADER -->

<div class="school-header">

    <img
        src="https://upload.wikimedia.org/wikipedia/commons/1/18/Oavsan1.png"
        class="school-logo"
        alt="Odisha Adarsha Vidyalaya Logo"
    >

    <h1>
        Odisha Adarsha Vidyalaya
    </h1>

    <div class="tagline">
        KNOWLEDGE • DISCIPLINE • EXCELLENCE
    </div>

    <div class="address">
        Official Academic Record • Educational Institution
    </div>

</div>


<!-- EXAM NAME -->

<div class="exam-banner">
    ${escapeHtml(student.examName).toUpperCase()}
</div>


<!-- MARKSHEET TITLE -->

<div class="marksheet-title">

    MARKSHEET

</div>


<!-- STUDENT INFORMATION -->

<div class="student-meta">

    <div class="meta-row">

        <div class="meta-item">
            <strong>REGD No.</strong> :
            ${escapeHtml(student.registrationNumber)}
        </div>

        <div class="meta-item">
            <strong>Name</strong> :
            ${escapeHtml(student.name)}
        </div>

    </div>

    <div class="meta-row">

        <div class="meta-item">
            <strong>Class</strong> :
            ${escapeHtml(student.studentClass)}
        </div>

        <div class="meta-item">
            <strong>Academic Session</strong> :
            2025 - 2026
        </div>

    </div>

</div>


<!-- SUBJECT MARKS TABLE -->

<table>

<thead>

<tr>

    <th>
        Subject
    </th>

    <th>
        Maximum Marks
    </th>

    <th>
        Marks Obtained
    </th>

</tr>

</thead>


<tbody>


<tr>

    <td>English</td>

    <td>100</td>

    <td>
        <strong>
            ${student.english}
        </strong>
    </td>

</tr>


<tr>

    <td>Mathematics</td>

    <td>100</td>

    <td>
        <strong>
            ${student.mathematics}
        </strong>
    </td>

</tr>


<tr>

    <td>Science</td>

    <td>100</td>

    <td>
        <strong>
            ${student.science}
        </strong>
    </td>

</tr>


<tr>

    <td>Social Science</td>

    <td>100</td>

    <td>
        <strong>
            ${student.socialScience}
        </strong>
    </td>

</tr>


<tr>

    <td>Computer</td>

    <td>100</td>

    <td>
        <strong>
            ${student.computer}
        </strong>
    </td>

</tr>


<!-- TOTAL -->

<tr class="total-row">

    <td>
        TOTAL
    </td>

    <td>
        500
    </td>

    <td>
        ${total.toFixed(2)}
    </td>

</tr>


</tbody>

</table>


<!-- RESULT SUMMARY -->

<div class="result-grid">


    <div class="result-box">

        <strong>
            Percentage
        </strong>

        ${percentage.toFixed(2)}%

    </div>


    <div class="result-box">

        <strong>
            Grade
        </strong>

        ${finalGrade}

    </div>


    <div class="result-box">

        <strong>
            Result
        </strong>

        ${result}

    </div>


</div>


<!-- MOTTO -->

<div class="motto">

    “Keep Learning, Keep Growing”

</div>


<!-- SIGNATURES -->

<div class="signatures">


    <div class="signature">

        Class Teacher

    </div>


    <div class="seal ${result === 'PASS' ? 'pass-seal' : 'fail-seal'}">

        <div class="seal-school">ODISHA ADARSHA VIDYALAYA</div>

        <div class="seal-result">${result}</div>

        <div class="seal-session">2025 - 2026</div>

    </div>


    <div class="signature">

        Principal

    </div>


</div>


<!-- FOOTER -->

<div class="note">

    This marksheet is generated from
    Odisha Adarsha Vidyalaya Student Management & Marksheet System.

</div>


</div>

</div>


<script>

window.onload = function() {

    window.print();

};

<\/script>


</body>

</html>

`);


    // Finish writing the marksheet
    printWindow.document.close();

}


// ============================================================
// START APPLICATION
// ============================================================

renderStudents();