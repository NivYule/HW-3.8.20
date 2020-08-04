async function init() {
  try {
    const response = await getUsersFromServer({
      url: `https://randomuser.me/api/?results=50`,
    });
    const { results } = response;
    console.log(results);
  } catch (err) {
    console.log(err);
    alert(`message: ${err.statusText} , status: ${err.status}`);
  }
}
