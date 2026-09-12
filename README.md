# Odisha Adarsha Vidyalaya – Student Management & Marksheet System

A simple, browser-based **Student Management & Marksheet System** built with **HTML, CSS and JavaScript**. The project is designed for student projects, school-level demonstrations and learning purposes.

## Project Overview

This system allows you to add, manage, search and print student academic records without requiring a database or server.

Student records are stored in the browser using **Local Storage**, so the data remains available in the same browser on the same device until it is cleared.

## Main Features

- Odisha Adarsha Vidyalaya branding and logo
- Add new student records
- Edit existing student records
- Delete student records
- Search students by REGD No. or name
- Sort students by percentage
- Enter an **Exam Name** for each student
- Five subjects with a maximum of 100 marks each:
  - English
  - Mathematics
  - Science
  - Social Science
  - Computer
- Automatic calculation of:
  - Total marks out of 500
  - Percentage
  - Grade
  - PASS / FAIL result
- Dashboard statistics:
  - Total students
  - Class average
  - Topper
- Individual printable A4 marksheet
- Exam Name displayed dynamically **above MARKSHEET**
- Academic Session displayed on the marksheet
- Dynamic PASS / FAIL seal
- Class Teacher and Principal signature areas
- No database required
- No backend/server required

## Project Files

```text
Odisha_Adarsha_Vidyalaya_Student_Management_System/
│
├── index.html      # Main webpage and form structure
├── style.css       # Website styling and layout
├── script.js       # Application logic and marksheet generation
└── README.md       # Project documentation
```

## Technologies Used

### HTML5
Used to create the page structure, student form, dashboard, table and application interface.

### CSS3
Used for the responsive layout, cards, buttons, tables, school branding and printable marksheet design.

### JavaScript
Used for student management, calculations, Local Storage, searching, sorting and dynamic marksheet generation.

### Browser Local Storage
Used to save student records locally without a database.


## How to Add a Student

Fill in the following information:

- REGD No.
- Student Name
- Exam Name
- Class
- English marks
- Mathematics marks
- Science marks
- Social Science marks
- Computer marks

Then click **Add Student**.

The system automatically calculates the total, percentage, grade and result.

## Grade System

The current JavaScript logic uses the following percentage ranges:

| Percentage | Grade |
|---:|:---:|
| 90% and above | A+ |
| 80% – 89.99% | A |
| 70% – 79.99% | B |
| 60% – 69.99% | C |
| 50% – 59.99% | D |
| Below 50% | F |

## PASS / FAIL System

The current system uses **33%** as the overall pass threshold.

- `33%` or above → **PASS**
- Below `33%` → **FAIL**

The printable marksheet also changes the central seal dynamically according to the result.

## Marksheet

Click the **Marksheet** button for a student to open an individual printable marksheet.

The marksheet contains:

```text
ODISHA ADARSHA VIDYALAYA

[EXAM NAME]

MARKSHEET

REGD No.     Name
Class        Academic Session

Subject | Maximum Marks | Marks Obtained

English
Mathematics
Science
Social Science
Computer

TOTAL
Percentage
Grade
Result

Class Teacher     [PASS/FAIL SEAL]     Principal
```

## How to Run the Project

1. Download or copy all project files into the same folder.
2. Make sure these files are present:

```text
index.html
style.css
script.js
README.md
```

3. Double-click `index.html`.
4. The project will open in your web browser.
5. Start entering student information.

No installation of Node.js, MySQL, PHP or any other server software is required for normal use.


## Author

**Odisha Adarsha Vidyalaya Student Management & Marksheet System**

Created as a student-friendly web development project using HTML, CSS and JavaScript.

## License / Usage

This README describes the project structure and usage. Add your own license file if you intend to distribute the project publicly.
