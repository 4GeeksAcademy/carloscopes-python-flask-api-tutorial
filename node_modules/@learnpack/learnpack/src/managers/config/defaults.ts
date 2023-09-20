export default {
  config: {
    port: 3000,
    editor: {
      mode: null, // [standalone, preview]
      agent: null, // [vscode, gitpod, localhost]
      version: null,
    },
    dirPath: "./.learn",
    configPath: "./learn.json",
    outputPath: "./.learn/dist",
    publicPath: "/preview",
    publicUrl: null,
    contact: "https://github.com/learnpack/learnpack/issues/new",
    language: "auto",
    autoPlay: true,
    projectType: "tutorial", // [tutorial, project]
    grading: "isolated", // [isolated, incremental]
    exercisesPath: "./", // path to the folder that contains the exercises
    webpackTemplate: null, // if you want webpack to use an HTML template
    disableGrading: false,
    disabledActions: [], // Possible: 'build', 'test' or 'reset'
    actions: [], // ⚠️ deprecated, leave empty )
    entries: {
      html: "index.html",
      vanillajs: "index.js",
      react: "app.jsx",
      node: "app.js",
      python3: "app.py",
      java: "app.java",
    },
  },
  address: "http://localhost",
  currentExercise: null,
  exercises: [],
};
