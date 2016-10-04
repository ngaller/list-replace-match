# list-replace-match

Replace or append a matching value in an array

## Install

`npm i list-replace-match --save`

## Usage

import replaceMatch from 'list-replace-match'

```
var a = [
    { id: '1', val: '...' },
    { id: '123', val: '...' },
    { id: '1', val: '...' }
];
var n = { id: '123', val: 'new value' }
replaceMatch(a, a => a.id == n.id, n)
// var a = [
//     { id: '1', val: '...' },
//     { id: '123', val: 'new value' },
//     { id: '1', val: '...' }
// ];
```
