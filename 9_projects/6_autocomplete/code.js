window.onload = () => {
  autocomplete.init();
};

const companies = [
  { id: 1, name: "TechCorp", country: "USA" },
  { id: 2, name: "InnoVentures", country: "Canada" },
  { id: 3, name: "GlobalTech", country: "UK" },
  { id: 4, name: "NextGen Solutions", country: "Germany" },
  { id: 5, name: "SoftWorks", country: "France" },
  { id: 6, name: "Alpha Innovations", country: "Australia" },
  { id: 7, name: "Creative Minds", country: "India" },
  { id: 8, name: "Techies United", country: "Netherlands" },
  { id: 9, name: "FutureTech", country: "Singapore" },
  { id: 10, name: "Smart Solutions", country: "Brazil" },
  { id: 11, name: "Visionary Labs", country: "Sweden" },
  { id: 12, name: "TechWave", country: "Japan" },
  { id: 13, name: "InnovaTech", country: "South Korea" },
  { id: 14, name: "Bright Innovations", country: "South Africa" },
  { id: 15, name: "TechPioneers", country: "Italy" },
  { id: 16, name: "Ingenious Minds", country: "Spain" },
  { id: 17, name: "InnovateX", country: "Mexico" },
  { id: 18, name: "TechMasters", country: "Russia" },
  { id: 19, name: "Future Solutions", country: "China" },
  { id: 20, name: "Global Innovators", country: "UAE" },
];

function addListElement(data) {
  return `
         <li id=${data.id}
              class="hover:bg-gray-200 duration-200 rounded-md gap-1 min-w-[300px]"
            >
              <div><span>Id: </span>${data.id}</div>
              <div><span>Name: </span>${data.name}</div>
              <div><span>Country: </span>${data.country}</div>
            </li>
  `;
}

class Autocomplete {
  constructor() {}
  inputEl = null;
  autocompleteEl = null;

  init = () => {
    console.log(`app started`);
    this.autocompleteEl = document.querySelector(`input#search`);
    this.autocompleteEl = document.querySelector(`.autocomplete-list`);

    this.fillList();
    this.inputEl.addEventListener("input", () => {
      this.filterData(this.inputEl.value);
    });
  };

  fillList = () => {
    for (let i = 0; i < companies.length; i++) {
      const item = companies[i];
      const newLi = document.createElement(`li`);
      newLi.innerHTML = addListElement(item);
      this.autocompleteEl.appendChild(newLi);
    }
  };

  filterData = (val) => {
    const valLowerC = val.toLowerCase();
    let included = [];
    let notIncluded = [];
    companies.filter((company) => {
      if (
        !company.name.toLowerCase().includes(valLowerC) &&
        !company.country.toLowerCase().includes(valLowerC)
      ) {
        notIncluded.push(company);
      } else {
        included.push(company);
      }
    });
    const filtered = {
      included,
      notIncluded,
    };

    this.toggleElementsOpacity(filtered);
  };

  toggleElementsOpacity = (filtered) => {
    const itemsToHide = filtered.notIncluded;
    const itemsToShow = filtered.included;

    for (let i = 0; i < itemsToHide.length; i++) {
      const li = document.getElementById(itemsToHide[i].id);
      li.style.opacity = "10%";
    }

    for (let i = 0; i < itemsToShow.length; i++) {
      const li = document.getElementById(itemsToShow[i].id);
      li.style.opacity = "100%";
    }
  };
}

const autocomplete = new Autocomplete();
