# Notes on JavaScript: The Good Parts

Notes from the [Douglas Crockford book](https://www.oreilly.com/library/view/javascript-the-good/9780596517748/) published by O'Reilly

## Ch. 7 Regular Expressions

```js
const parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

const url = "http://www.ora.com:80/goodparts?q#fragment";

const result = parse_url.exec(url);
```

__Capturing group__ = value is added to results array

- `/^` + `$/`
  - Opening and closing anchors: 

- `(?:([A-Za-z]+):)?` 
  - Optional noncapturing group on outside: `(?: ___ )?`
  - Last `?` = repeat _zero or more times_
  - Capturing group on inside = any letter, `+` = _one or more times_, followed by a colon : `([A-Za-z]+):)`

- `(\/{0,3})`
  - `/` 0–3 times
  - `\` is to escape the `/` so it's not interpreted as the end of the regular expression literal

- `([0-9.\-A-Za-z]+)`
  - One or more digits, `.`, `-`, or letters
  - `\` is escaping the `-` so it's not interpreted as a range hyphen

- `(?::(\d+))?`
  - Optional noncapturing group on outside: `(?:: ___ )?`
  - The colon starts the patten, but _is not captured_ so it's not in the results array
  - What is captured is any digit one or more times: `(\d+)`
  - Could move colon inside capturing group if you wanted to capture syntax: `(?:(:\d+))?`

- `(?:\/([^?#]*))?`
  - Optional noncapturing group on outside: `(?:\/ ___ )?` excludes the `/` from capture
  - Internal capturing group has a _character class_ where `^` = all characters except ...
  - `([^?#]*)` = all characters except `?` + `#` 
  - `*` = _zero or more times_

- `(?:\?([^#]*))?`
  - Optional noncapturing group on outside: `(?:\/ ___ )?` excludes the `?` from capture
  - Internal capturing group 0+ characters that aren't `#`: `([^#]*))`

- `(?:#(.*))?`
  - Optional noncapturing group on outside: `(?:\/ ___ )?` excludes the `#` from capture
  - Internal capturing group where `.` = _any non-line-ending character_: `(.*)`