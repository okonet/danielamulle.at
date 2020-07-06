---
title: Your URL is the perfect state container
date: 2020-07-03T10:54:15.925Z
coverImage: ../assets/20200516-DSC02779.jpg
tags:
  - value: vegetarisch
    label: vegetarisch
  - value: zum Mitnehmen
    label: zum Mitnehmen
---

Oftentimes, React developers treat application state as something private. Putting state into redux or using the `useState` hooks.

For example, while implementing a filter most would probably do

```jsx
const [query, setQuery] = React.useState('');
const results = findResults(query);
...
<input type="search" value={query} onChange={e => setQuery(e.target.value)} />
<ul>
  {results.map(result => <li key={result.id}>{result.name}</li>
</ul>
```

This does the job and gives you a filter UI but the state is now not accessible by the user. What it means is: you can't share the URL with another person and they won't be able to see what you saw. So it probably will be the next feature request in your app to add the query to the URL so it can be shared.

```jsx
import qs from 'query-string'
const queryString = qs.parse(window.location.search) // get query string from the location
const [query, setQuery] = React.useState(queryString.query); // set the initial state to it
const results = findResults(query); // do something with the state
const handleChange = e => setQuery(e.target.value); // update the state based on the new value
...
<input type="search" value={query} onChange={handleChange} />
<ul>
  {results.map(result => <li key={result.id}>{result.name}</li>
</ul>
```

This is better since it can parse the URL and set the application state to reflect it but it actually doesn't update the URL as you change the input's value while typing. Let's fix it.

```jsx
import history from 'history/browser';
import qs from 'query-string'
const queryString = qs.parse(history.location.search) // get query string from the location
const [query, setQuery] = React.useState(queryString.query); // set the initial state to it
const handleChange = e => setQuery(e.target.value); // update the state based on the new value
// Now that we have the new state, let's sync it with location
React.useEffect(() => {
  // Calculate new URL based on the state
  const newURL = queryString.stringifyUrl(history.location.pathName, { query });
  // Update the URL in the location
  history.push(newURL, {})
}, [query]);

const results = findResults(query); // do something with the state
...
<input type="search" value={query} onChange={handleChange} />
<ul>
  {results.map(result => <li key={result.id}>{result.name}</li>
</ul>
```

It works but look at all those extra lines of code to do something so simple! Maybe we could do a bit better? If you think about what we're doing here:

1. We derive the state from the URL string
2. We set it to the internal state container `React.useState` (allocating some extra memory for it)
3. We change the internal state in the `onChange` event handler
4. In the `useEffect` we derive the new URL from the internal state and put it to the location

But if we would treat the URL as _the state container_ we could remove the local state completely:

1. Derive the state from the URL
2. Change the state in `onChange` and sync it with URL

```jsx
import history from 'history/browser';
import qs from 'query-string'
const { query } = qs.parse(history.location.search) // get our filter query string from the location
// This time, instead of only setting the internal state, we'll put it to location
const handleChange = e => {
  // Calculate new URL based on the state
  const newURL = queryString.stringifyUrl(history.location.pathName, { query });
  // Update the URL in the location
  history.push(newURL)
}
const results = findResults(query); // do something with the state
...
<input type="search" value={query} onChange={handleChange} />
<ul>
  {results.map(result => <li key={result.id}>{result.name}</li>
</ul>
```

Much simpler!

## Conclusion

Make state public and put it into URL from the start. It will make your app more accessible and easy to use and it will simplify the code a lot. Win-win!
