const genderButton = $('#genderBTN');
const countriesButton = $('#countriesBTN');
const table = $('table');
const tableHeaders = $('#tableHeaders');
const tableBody = $('#tableBody');

const genderTableHeaders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const countryTableHeaders = [
  { value: "country", label: "Country" },
  { value: "amount", label: "Amount" },
];

async function init() {
  try {
    const response = await getUsersFromServer({
      url: `https://randomuser.me/api/?results=50`,
    });
    const { results } = response;
    return results;
  } catch (err) {
    alert(`message: ${err.statusText} , status: ${err.status}`);
  }
};

genderButton.on('click', async () => {
  clearTable()
  const results = await init();
  console.log(results);
  const malesAmount = [];
  const femalesAmouunt = [];
  const genders = results.reduce((genderAmountArray, user) => {
    const { gender } = user;
    if (gender === "male") {
      malesAmount.push(gender);
    } else {
      femalesAmouunt.push(gender);
    }
  }, []);

  tableHeaders.append(getRowHeaderItem(genderTableHeaders));
  // tableBody.append(getRowItem())
  console.log(malesAmount);
  console.log(femalesAmouunt);
})

countriesButton.on('click', async () => {
  clearTable()
  const results = await init();
  const countries = results.reduce((countriesObject, user) => {
    const { country } = user.location;
    const countriesAmount = countriesObject[country] || 0;
    return {...countriesObject, [country]:countriesAmount + 1};
  }, {});
  console.log(countries);

  tableHeaders.append(getRowHeaderItem(countryTableHeaders));
  // tableBody.append(getRowItem())
})

function clearTable(){
  $("#tableHeaders").html("");
  $("#tableBody").html("");
}

function getRowHeaderItem (myHeaders) {
  const ths = myHeaders.filter((header) => { return header }).map(header => {
      const { label } = header
      return _getTH(label)
  })

  const tr = _getTR()
  tr.append(...ths)
  return tr

  function _getTR () {
      return document.createElement("TR")
  }

  function _getTH (value) {
      const th = document.createElement("TH")
      th.setAttribute('scope', 'col');
      th.innerText = value;
      return th
  }
}

