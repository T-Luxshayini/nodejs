const fs = require('fs');
const http = require('http');
const path = require('path');
const axios = require('axios');

// 1. 
function readFileAndLog() {
  fs.readFile('hello.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    console.log('File contents:', data);
  });
}

// 2. 
function createDirectoryAndLog() {
  const dirPath = path.join(__dirname, 'node');
  const filePath = path.join(dirPath, 'node.txt');
  const message = 'Hello, this is a message inside node.txt';

  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating directory:', err);
      return;
    }
    console.log('Directory created successfully');

    fs.writeFile(filePath, message, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return;
      }
      console.log('Message written to node.txt');
    });
  });
}

// 3. 
function getRandomNumberAfterDelay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomNumber = Math.random();
      resolve(randomNumber);
    }, 2000);
  });
}

// 4. 
function getErrorAfterDelay() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Something went wrong!'));
    }, 1500);
  });
}

// 5. 
function sumArray(numbers) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(numbers)) {
      return reject(new Error('Input must be an array'));
    }
    if (!numbers.every(num => typeof num === 'number')) {
      return reject(new Error('Array must contain only numbers'));
    }
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    resolve(sum);
  });
}

// 6. 
function resolveAll(promises) {
  return Promise.all(promises);
}

// 7.
function fetchData() {
  const url = 'https://random-data-api.com/api/v2/addresses';
  return axios.get(url)
    .then(response => response.data)
    .catch(error => Promise.reject(new Error('Failed to fetch data: ' + error.message)));
}

// Example usage of each function:

// Read file and log contents
readFileAndLog();

// Create directory and log message
createDirectoryAndLog();

// Get a random number after delay
getRandomNumberAfterDelay()
  .then(number => console.log('Random number:', number))
  .catch(error => console.error('Error:', error.message));

// Get an error after delay
getErrorAfterDelay()
  .catch(error => console.error('Error:', error.message));

// Sum of array of numbers
sumArray([1, 2, 3, 4, 5])
  .then(sum => console.log('Sum:', sum))
  .catch(error => console.error('Error:', error.message));

// Resolve all Promises
resolveAll([
  Promise.resolve(1),
  new Promise((resolve) => setTimeout(() => resolve(2), 1000)),
  new Promise((resolve) => setTimeout(() => resolve(3), 500))
])
  .then(values => console.log('Resolved values:', values))
  .catch(error => console.error('Error:', error.message));

// Fetch data from API
fetchData()
  .then(data => console.log('Data fetched:', data))
  .catch(error => console.error('Error:', error.message));
