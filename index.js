const requestsCount = 5;

const search = document.querySelector('.search__input');
search.addEventListener('change', () => {
  let currTimeout;
  let repos;
  clearTimeout(currTimeout);
  currTimeout = setTimeout(() => {
    if (search.value[0] !== ' ' && search.value.length !== 0) {
      const api = fetch(`https://api.github.com/search/repositories?q=${search.value}&per_page=${requestsCount}`)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (searchList.innerHTML.length > 0) {
            searchList.innerHTML = '';
          }
          repos = response.items;
          console.log(repos);
          repos.forEach(obj => {
            createSearchItem(obj)
          })
        })
    }
  }, 0);
})

const searchList = document.querySelector('.search__list');

function createSearchItem(obj) {
  let fragment = new DocumentFragment();
  let searchListItem = document.createElement('li');
  searchListItem.innerText = `${obj.name}`
  searchListItem.classList.add('search__list-item');
  searchListItem.append();
  fragment.append(searchListItem);
  searchList.append(fragment);
}