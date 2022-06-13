const queryString = "q=location:cameroun+followers:>0";
const perPage = 100;
const baseUrl = "https://api.github.com";
const allUsers =
  JSON.parse(localStorage.getItem("bpsmartdesign-all_kmer_contribs")) ?? [];
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
    localStorage.setItem(
      "bpsmartdesign-all_kmer_contribs",
      JSON.stringify(results)
    );
    return results;
  }
};

(async () => {
  const entireList =
    allUsers.length > 10 ? allUsers : await getEntireUserList();
  console.log(entireList);
})();
