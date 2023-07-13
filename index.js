function debounce(fn, ms) {
  let currTimeout;
  return function (...args) {
    clearTimeout(currTimeout);
    currTimeout = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  }
}


const requestsCount = 5;
let repositories;
const search = document.querySelector('.search__input');


search.addEventListener('keyup', () => {
  try {
    const delayedGetRepos = debounce(getRepos, 400);
    if (search.value.length === 0) {
      searchList.innerHTML = '';
    }
    else {
      if (search.value[0] !== ' ' && search.value.length !== 0) {
        delayedGetRepos();
      }
    }
  }
  catch (error) {
    console.log(error)
  }
})

function getRepos() {
  try {
    const api = fetch(`https://api.github.com/search/repositories?q=${search.value}&per_page=${requestsCount}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (searchList.innerHTML.length > 0) {
          searchList.innerHTML = '';
        }
        repositories = response.items;
        repositories.forEach((repository, index) => {
          createSearchItem(repository, index)
        })
        return repositories;
      })
  }
  catch (error) {
    console.log(error)
  }
}

const searchList = document.querySelector('.search__list');

function createSearchItem(repository, index) {
  try {
    let fragment = new DocumentFragment();
    let searchListItem = document.createElement('li');
    searchListItem.innerText = `${repository.name}`
    searchListItem.classList.add('search__list-item');
    searchListItem.classList.add(`search__list-item${index}`);
    fragment.append(searchListItem);
    searchList.append(fragment);
  }
  catch (error) {
    console.log(error)
  }
}

searchList.addEventListener('click', (elem) => {
  try {
    target = elem.target;
    let targetIndex = target.className.match(/search__list-item[0-9]$/gmi).join('');
    targetIndex = targetIndex[targetIndex.length - 1];
    createReposItem(targetIndex);
  }
  catch (error) {
    console.log(error)
  }
})

function createElement(tag, className) {
  try {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }
  catch (error) {
    console.log(error)
  }
}

function createReposItem(targetIndex) {
  try {
    const currRepo = repositories[targetIndex];
    const fragment = new DocumentFragment();
    const reposItem = createElement('ul', 'repositories__list');

    const name = createElement('li', 'repositories__list-item');
    name.innerText = `Name: ${currRepo.name}`;
    reposItem.append(name);

    const owner = createElement('li', 'repositories__list-item');
    owner.innerText = `Owner: ${currRepo.owner.login}`;
    reposItem.append(owner);

    const stars = createElement('li', 'repositories__list-item');
    stars.innerText = `Stars: ${currRepo.stargazers_count}`;
    reposItem.append(stars);


    const repoBtn = document.createElement('button');
    repoBtn.classList.add('repositories__btn');
    repoBtn.addEventListener('click', () => {
      reposItem.remove();
    })

    reposItem.append(repoBtn);
    fragment.append(reposItem);
    const reposBox = document.querySelector('.repositories');
    reposBox.append(fragment);
    search.value = '';
    searchList.innerHTML = '';
  }
  catch (error) {
    console.log(error)
  }
}

