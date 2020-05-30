import "regenerator-runtime/runtime";
import "../styles/main.scss";

const apiKey = process.env.API_KEY;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const spinner = document.querySelector(".spinner");
    document.querySelector(".submition1").disabled = true;
    document.querySelector(".submition2").disabled = true;
    spinner.classList.remove("notActive");
    spinner.classList.add("active");

    const name = form.elements.rname.value;
    const description = form.elements.description.value;
    const privacyType = form.elements.repoType.value;
    const readme = form.elements.readme.checked;

    const baseURL = "https://api.github.com/user/repos";

    fetch(baseURL, {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        private: privacyType === "privat",
        auto_init: readme
      }),
      headers: {
        Authorization: `token ${apiKey}`,
        "content-type": "application/json",
        accept: "application/json",
        "Access-Control-Request-Method": "POST"
      },
      mode: "cors"
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        document.querySelector(".submition1").disabled = false;
        document.querySelector(".submition2").disabled = false;
        spinner.classList.remove("active");
        spinner.classList.add("notActive");
        form.reset();
      })
      .catch(error => {
        console.error(error);
      });
  });
});
