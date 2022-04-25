const queryString = "q=location:cameroun+followers:>0";
const perPage = 100;
const baseUrl = "https://api.github.com";
const headers = new Headers({
  "Content-Type": "application/json",
  Accept: "application/vnd.github.v3+json",
});

const getUsers = async (pageNbr = 1) => {
  let cameroonUserBaseUri = `${baseUrl}/search/users?per_page=${perPage}&${queryString}&page=${pageNbr}`;
  let getResponse = await fetch(cameroonUserBaseUri, {
    method: "GET",
    headers: headers,
  });

  const apiResults = await getResponse.json();
  return apiResults;
};

const getEntireUserList = async (pageNbr = 1) => {
  const results = await getUsers(pageNbr);
  if (results.items.length > 0) {
    return results.items.concat(await getEntireUserList(pageNbr + 1));
  } else {
    return results;
  }
};

(async () => {
  const entireList = await getEntireUserList();
  console.log(entireList);
})();
