function validation(form) {
  clearInvalid();
  const errors = [];

  function check(ok, message, element) {
    if (!ok) {
      errors.push(message);
      element.classList.add("invalid");
    }
  }

  const titleEl = form.elements["title"];
  const abstractEl = form.elements["abstract"];
  const keywordsEl = form.elements["keywords"];
  const fileEl = form.elements["paper"];
  const file = fileEl.files[0];

  const title = titleEl.value.trim();
  const abstract = abstractEl.value.trim();

  check(title.length >= 5 && title.length <= 150,
        "Title must have 5 to 150 characters.", titleEl);
  check(abstract.length >= 50 && abstract.length <= 2000,
        "Abstract must have 50 to 2000 characters.", abstractEl);
  check(hasAtLeastOneKeyword(keywordsEl.value),
        "Please provide at least one keyword.", keywordsEl);

  document.querySelectorAll("#authors .author-row").forEach((row, index) => {
    const n = index + 1;
    const nameEl = row.querySelector('[name="author"]');
    const affEl = row.querySelector('[name="affiliation"]');
    const mailEl = row.querySelector('[name="email"]');
    const aff = affEl.value.trim();

    check(nameEl.value.trim().length >= 2,
          "Author " + n + ": name is required.", nameEl);
    check(aff.length >= 10 && aff.length <= 100,
          "Author " + n + ": affiliation must have 10 to 100 characters.", affEl);
    check(isValidEmail(mailEl.value.trim()),
          "Author " + n + ": invalid email address.", mailEl);
  });

  check(file !== undefined && file.type === "application/pdf",
        "Please select a PDF file.", fileEl);

  showErrors(errors);
  return errors.length === 0;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function hasAtLeastOneKeyword(value) {
  return value.split(",").map(k => k.trim()).filter(k => k.length > 0).length >= 1;
}

function clearInvalid() {
  document.querySelectorAll(".invalid")
          .forEach(el => el.classList.remove("invalid"));
}

function showErrors(errors) {
  const output = document.getElementById("output");
  output.innerHTML = "";
  output.className = "";
  if (errors.length === 0) {
    return;
  }
  output.className = "error-box";
  const heading = document.createElement("strong");
  heading.textContent = "Please correct the fields marked in red:";
  const list = document.createElement("ul");
  for (const message of errors) {
    const item = document.createElement("li");
    item.textContent = message;
    list.appendChild(item);
  }
  output.appendChild(heading);
  output.appendChild(list);
  output.scrollIntoView({ behavior: "smooth" });
}

const authorsContainer = document.getElementById("authors");

function addAuthorRow() {
  const clone = authorsContainer.querySelector(".author-row").cloneNode(true);
  clone.querySelectorAll("input").forEach(input => {
    input.value = "";
    input.classList.remove("invalid");
  });
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

document.getElementById("submissionForm").addEventListener("input", (event) => {
  event.target.classList.remove("invalid");
});

document.getElementById("submissionForm").addEventListener("reset", () => {
  clearInvalid();
  showErrors([]);
});

refreshRows();