const url = new URL(location)
// console.log(new URLSearchParams(url.search).get('id'));

// console.log(new URL(location).searchParams.get('id'))

const id = url.searchParams.get('id')
console.log(id);