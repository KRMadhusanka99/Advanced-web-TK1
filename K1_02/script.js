function validation(form) {
  const errors = [];

  const title = form.elements["title"].value.trim();
  const abstract = form.elements["abstract"].value.trim();
  const author = form.elements["author"].value.trim();
  const affiliation = form.elements["affiliation"].value.trim();
  const file = form.elements["paper"].files[0];

  if (title.length < 5 || title.length > 150) {
    errors.push("Title must have 5 to 150 characters.");
  }
  if (abstract.length < 50 || abstract.length > 2000) {
    errors.push("Abstract must have 50 to 2000 characters.");
  }
  if (author.length < 2) {
    errors.push("Author name is required.");
  }
  if (affiliation.length < 10 || affiliation.length > 100) {
    errors.push("Affiliation must have 10 to 100 characters.");
  }
  if (!file) {
    errors.push("Please select a PDF file.");
  } else if (file.type !== "application/pdf") {
    errors.push("The file must be a PDF.");
  }

  const output = document.getElementById("output");
  if (errors.length > 0) {
    output.innerHTML = errors.join("<br>");
    console.log("Validation failed:", errors);
    return false;                      
  }

  output.innerHTML = "Submission accepted.";
  console.log("Validation succeeded");
  return true;                         
}