const genderTableHeaders = [
  { value: "gender", label: "Gender" },
  { value: "amount", label: "Amount" },
];

const CountriesTableHeaders = [
  { value: "country", label: "Country" },
  { value: "amount", label: "Amount" },
];

const gTableHeaders = $("#genderTableHeaders");
const gTableBody = $("#genderTableBody");
gTableHeaders.append(getRowHeaderItem(genderTableHeaders));

$(async function init() {
  try {
    const response = await getUsersFromServer({
      url: `https://randomuser.me/api/?results=50`,
    });
    const { results } = response;
    getRowItem(results);
    // console.log(getRowItem(results));
  } catch (err) {
    console.log(err);
    alert(`message: ${err.statusText} , status: ${err.status}`);
  }
});

function getRowHeaderItem(myHeaders) {
  const ths = myHeaders
    .filter((header) => {
      return header;
    })
    .map((header) => {
      const { label } = header;
      return _getTH(label);
    });

  const tr = _getTR();
  tr.append(...ths);
  return tr;

  function _getTR() {
    return document.createElement("TR");
  }

  function _getTH(value) {
    const th = document.createElement("TH");
    th.innerText = value;
    return th;
  }
}

function getRowItem(userData) {
  let femaleAmount = 0;
  let maleAmount = 0;

  const users = userData.filter((user) => {
    return user.gender;
  });
  const tds = users.map((user) => {
    const { gender } = user;
    return gender;
  });

  for (let index = 0; index < tds.length; index++) {
    if (tds[index] == "male") {
      maleAmount++
    }
    else {
      femaleAmount++
    }
  }

  const tr = _getTR();
  return tr

  function _getTR() {
    return document.createElement("TR");
  }

  function _getTD(value) {
    const td = document.createElement("TD");
    td.innerText = value;
    return td;
  }

  // const { gender } = userData // destructuring es6
  // // return getRowItem;

  // const tr = _getTR()
  // const firstRowFromHeaders = headers[ 0 ]
  // const visibleHeaders = firstRowFromHeaders.filter((header) => { return header.isVisible })
  // const tds = visibleHeaders.map((header) => {
  //     const { value } = header
  //     const currentValue = carData[ value ]
  //     return _getTD(currentValue)
  // })

  // // const tdLP = _getTD(lp);
  // // const tdColor = _getTD(color);
  // // const tdType = _getTD(type);
  // // const tdDoors = _getTD(doors);
  // tr.append(...tds)
  // return tr
  // function _getTR () {
  //     return document.createElement("TR")
  // }

  // function _getTD (value) {
  //     const allowedTypes = [ "string", "number", "boolean" ]
  //     const theType = typeof value
  //     // if (!allowedTypes.includes(theType)) return;
  //     let currentValue = !allowedTypes.includes(theType) ? "-" : value
  //     // if (theType !== "string" && theType !== "number") return;
  //     const td = document.createElement("TD")
  //     td.innerText = currentValue
  //     return td
  // }
}
