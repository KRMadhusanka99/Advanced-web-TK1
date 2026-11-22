function validation(form) {
  const errors = [];

  const title = form.elements["title"].value.trim();
  const abstract = form.elements["abstract"].value.trim();
  const keywords = form.elements["keywords"].value;
  const file = form.elements["paper"].files[0];

  if (title.length < 5 || title.length > 150) {
    errors.push("Title must have 5 to 150 characters.");
  }
  if (abstract.length < 50 || abstract.length > 2000) {
    errors.push("Abstract must have 50 to 2000 characters.");
  }
  if (!hasAtLeastOneKeyword(keywords)) {
    errors.push("Please provide at least one keyword (comma-separated).");
  }

  const rows = document.querySelectorAll("#authors .author-row");
  rows.forEach((row, index) => {
    const n = index + 1;
    const name = row.querySelector('[name="author"]').value.trim();
    const affiliation = row.querySelector('[name="affiliation"]').value.trim();
    const email = row.querySelector('[name="email"]').value.trim();

    if (name.length < 2) {
      errors.push("Author " + n + ": name is required.");
    }
    if (affiliation.length < 10 || affiliation.length > 100) {
      errors.push("Author " + n + ": affiliation must have 10 to 100 characters.");
    }
    if (!isValidEmail(email)) {
      errors.push("Author " + n + ": please enter a valid email address.");
    }
  });

  if (!file) {
    errors.push("Please select a PDF file.");
  } else if (file.type !== "application/pdf") {
    errors.push("The file must be a PDF.");
  }

  showErrors(errors);
  return errors.length === 0;      
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function hasAtLeastOneKeyword(value) {
  return value.split(",").map(k => k.trim()).filter(k => k.length > 0).length >= 1;
}

function showErrors(errors) {
  const output = document.getElementById("output");
  output.innerHTML = "";                       
  if (errors.length === 0) {
    return;
  }
  const heading = document.createElement("strong");
  heading.textContent = "Please correct the following:";
  const list = document.createElement("ul");
  for (const message of errors) {
    const item = document.createElement("li");
    item.textContent = message;                
    list.appendChild(item);
  }
  output.appendChild(heading);
  output.appendChild(list);
}

const authorsContainer = document.getElementById("authors");

function addAuthorRow() {
  const firstRow = authorsContainer.querySelector(".author-row");
  const clone = firstRow.cloneNode(true);      
  clone.querySelectorAll("input").forEach(input => input.value = "");
  authorsContainer.appendChild(clone);
  refreshRows();
}

function refreshRows() {
  const rows = authorsContainer.querySelectorAll(".author-row");
  rows.forEach((row, index) => {
    row.querySelector(".author-number").textContent = "Author " + (index + 1);
    row.querySelector(".remove-author").hidden = (rows.length === 1);
  });
}

document.getElementById("add-author").addEventListener("click", addAuthorRow);

authorsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-author")) {
    event.target.closest(".author-row").remove();
    refreshRows();
  }
});

refreshRows();    