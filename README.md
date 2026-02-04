# D3 Labs 📊

Repository for exercises and projects from the **Graphic Simulation** course using the [D3.js](https://d3js.org/) library for data visualization.

## 📋 Requirements

- Web browser with developer tools (Chrome recommended)
- Text editor (VS Code, Sublime Text, Atom, etc.)
- Python 3.6+

## 🚀 How to Run

1. Navigate to the folder of the exercise you want to run:
   ```bash
   cd D3_Fundamentals
   ```

2. Start the Python HTTP server:
   ```bash
   python -m http.server
   ```

3. Open your browser and go to:
   ```
   http://localhost:8000/
   ```

4. To stop the server, press `Ctrl+C` in the terminal.

## 📁 Repository Structure

```
D3LAB-MASTER/
├── Template/               # Base template for new exercises
│   ├── css/
│   │   └── bootstrap.min.css
│   ├── js/
│   │   ├── d3.min.js
│   │   └── main.js
│   └── index.html
│
├── D3_Fundamentals/        # Exercise 1: Adding SVG elements
├── Select_Data_Binding/    # Exercise 2: Select and data binding
├── Loading_Data/           # Exercise 3: Loading data from files
├── Scales/                 # Exercise 4: D3 scales
├── Margins_Axes_Labels/    # Exercise 5: Margins, groups, axes and labels
├── Update_Events/          # Exercise 6: Simulating update events
├── Transitions/            # Exercise 7: Playing with transitions
├── Event_Handling/         # Exercise 8: Event handling
│
├── charts/                 # Chart exercises
│   ├── line_chart/         # Exercise 9: Line chart
│   ├── area_chart/         # Exercise 10: Area chart
│   ├── stacked_chart/      # Exercise 11: Stacked area chart
│   └── pie_arc_chart/      # Exercise 12: Pie/Donut chart
│
├── projects/               # Course projects
│   ├── brewery/            # Project I: Star Brewery
│   └── leaf_project/       # Project II: Project Leaf
│
├── resources/              # Shared resources
│   ├── css/
│   ├── data/
│   └── js/
│
└── README.md
```

## 📂 Exercise Folder Structure

Each exercise folder follows this structure:

```
Exercise_Name/
├── css/
│   ├── bootstrap.min.css
│   └── style.css
├── js/
│   ├── d3.min.js
│   └── main.js
├── IMG/
│   └── Exercise_Name.png   # Screenshot of the final result
├── index.html
└── Development_log.txt     # Development notes and observations
```

## 📚 Course Exercises

| # | Exercise | Description | Status |
|---|----------|-------------|--------|
| 1 | D3 Fundamentals | Adding SVG elements (circles, rectangles) to the page | ✅ |
| 2 | Select and Data Binding | Using `.select()`, `.selectAll()`, and `.data()` | ✅ |
| 3 | Loading Data from File | Reading JSON and CSV files with D3 | ✅ |
| - | *Challenge I: Buildings of the World* | *Practice loading external data* | ✅ |
| 4 | Scales | Linear, band, and ordinal scales | ✅ |
| 5 | Margins, Groups, Axes and Labels | Proper chart structure with margins | ✅ |
| - | *Project I: Star Brewery* | *Complete visualization project* | ✅ |
| 6 | Simulating Update Events | Dynamic data updates | ✅ |
| 7 | Playing with Transitions | Animated transitions | ✅ |
| - | *Project II: Project Leaf* | *Complete visualization project* | ✅ |
| 8 | Event Handling | Mouse and click events | ✅ |
| 9 | Line Chart | Creating line charts | ✅ |
| 10 | Area Chart | Creating area charts | ✅ |
| 11 | Stacked Area Chart | Creating stacked area charts | ⬜ |
| 12 | Pie/Donut Chart | Creating pie and donut charts | ⬜ |

## 🛠️ Technologies

- **D3.js v5** - Data visualization library
- **Bootstrap** - CSS framework for styling
- **Python HTTP Server** - Local development server

## 📖 Resources

- [D3.js Official Documentation](https://d3js.org/)
- [D3 Labs Course Website](https://sites.google.com/up.edu.mx/d3-labs/home)

## 👤 Author

Carlos - Universidad Panamericana

---

*Course: Graphic Simulation - Spring 2026*