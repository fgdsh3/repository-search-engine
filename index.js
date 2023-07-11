
function searchRepos() {
  try {
    const requestsCount = 5;
    let api;
    let repos;
    const search = document.querySelector('.search__input');

    search.addEventListener('change', () => {
      let currTimeout;
      clearTimeout(currTimeout);
      if (search.value.length === 0) {
        searchList.innerHTML = '';
      }
      else {
        currTimeout = setTimeout(() => {
          if (search.value[0] !== ' ' && search.value.length !== 0) {
            api = fetch(`https://api.github.com/search/repositories?q=${search.value}&per_page=${requestsCount}`)
              .then((response) => {
                return response.json();
              })
              .then((response) => {
                if (searchList.innerHTML.length > 0) {
                  searchList.innerHTML = '';
                }
                console.log(response);
                repos = response.items;
                console.log(repos);
                repos.forEach((obj, index) => {
                  createSearchItem(obj, index)
                })
                return repos
              })
          }
        }, 500);
      }
    })

    const searchList = document.querySelector('.search__list');

    function createSearchItem(obj, index) {
      let fragment = new DocumentFragment();
      let searchListItem = document.createElement('li');
      searchListItem.innerText = `${obj.name}`
      searchListItem.classList.add('search__list-item');
      searchListItem.classList.add(`search__list-item${index}`);
      searchListItem.append();
      fragment.append(searchListItem);
      searchList.append(fragment);
    }

    searchList.addEventListener('click', (elem) => {
      target = elem.target;
      let targetIndex = target.className.match(/search__list-item[0-9]$/gmi).join('');
      targetIndex = targetIndex[targetIndex.length - 1];
      createReposItem(targetIndex)
    })

    function createReposItem(objIndex) {
      let currObj = repos[objIndex];
      let fragment = new DocumentFragment();
      let reposItem = document.createElement('dl');
      reposItem.classList.add('repositories__dl');
      let dBox1 = document.createElement('div');
      dBox1.classList.add('repositories__decr-box');
      let name = document.createElement('dt');
      name.classList.add('repositories__dt');
      name.innerText = 'Name:';
      dBox1.append(name);
      let nameValue = document.createElement('dd');
      nameValue.classList.add('repositories__dd');
      nameValue.innerText = `${currObj.name}`;
      dBox1.append(nameValue);
      reposItem.append(dBox1);
      let dBox2 = document.createElement('div');
      dBox2.classList.add('repositories__decr-box');
      let owner = document.createElement('dt');
      owner.classList.add('repositories__dt');
      owner.innerText = 'Owner:';
      dBox2.append(owner);
      let ownerValue = document.createElement('dd');
      ownerValue.classList.add('repositories__dd');
      ownerValue.innerText = `${currObj.owner.login}`;
      dBox2.append(ownerValue);
      reposItem.append(dBox2);
      let dBox3 = document.createElement('div');
      dBox3.classList.add('repositories__decr-box');
      let stars = document.createElement('dt');
      stars.classList.add('repositories__dt');
      stars.innerText = 'Stars:';
      dBox3.append(stars);
      let starsCount = document.createElement('dd');
      starsCount.classList.add('repositories__dd');
      starsCount.innerText = `${currObj.stargazers_count}`;
      dBox3.append(starsCount);
      reposItem.append(dBox3);
      let repoBtn = document.createElement('button');
      repoBtn.classList.add('repositories__btn');
      repoBtn.addEventListener('click', () => {
        reposItem.remove();
      })
      reposItem.append(repoBtn);
      fragment.append(reposItem);
      let repositories = document.querySelector('.repositories');
      repositories.append(fragment);
      search.value = '';
      searchList.innerHTML = '';
    }
  }
  catch (error) {
    console.log(error);
  }
}

searchRepos()
