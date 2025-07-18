// Global variables
let allResults = [];
let currentPage = 1;
const resultsPerPage = 5;
let searchHistory = [];  // Stores search history
const maxHistorySize = 5; // Maximum search history size

// Calculator variables
let currentInput = '0';
let operator = null;
let previousInput = '';
let resetDisplay = false;

// DOM element references
const searchInput = document.getElementById('searchInput');
const searchResultsContainer = document.getElementById('searchResults');
const loadingIndicator = document.getElementById('loadingIndicator');
const paginationContainer = document.getElementById('pagination');
const noResultsContainer = document.getElementById('noResults');
const recommendedLinks = document.getElementById("recommendedLinks");
const autocompleteList = document.getElementById('autocompleteList');
const searchHistoryList = document.getElementById('searchHistoryList');
const clearSearchButton = document.getElementById('clearSearchButton');
const customAlertDialog = document.getElementById('customAlertDialog');
const customAlertMessage = document.getElementById('customAlertMessage');
const mainContainer = document.querySelector('.container'); // Get the main container
const clockElement = document.getElementById('clock'); // Get the clock element

// Calculator DOM elements
const calculatorButton = document.getElementById('calculatorButton');
const calculatorModal = document.getElementById('calculatorModal');
const closeCalculatorButton = document.getElementById('closeCalculatorButton');
const calculatorDisplay = document.getElementById('calculatorDisplay');
const calculatorButtons = document.querySelector('.calculator-buttons');


// Initialize loading search history
loadSearchHistory();
// Initialize dynamic placeholder
initDynamicPlaceholder();
// Initialize and update clock
updateClock();
setInterval(updateClock, 1000); // Update clock every second

// Function to update the clock
function updateClock() {
  const now = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // Use 24-hour format
  };
  const timeString = now.toLocaleTimeString('en-US', options); // Format time in English (US)
  const dateString = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }); // Format date in English (US)

  clockElement.textContent = `${dateString} ${timeString}`;
}

// Search suggestions
function suggest() {
  const searchTerm = searchInput.value.toLowerCase();
  autocompleteList.innerHTML = ''; // Clear previous suggestions
  autocompleteList.style.display = 'none'; // Hide by default

  if (searchTerm.length === 0) {
    clearSearchButton.style.display = 'none'; // Hide clear button when no input
    return;
  } else {
    clearSearchButton.style.display = 'block'; // Show clear button when there's input
  }

  const matchingSuggestions = [];
  // Iterate through pageList to find matching keywords
  if (typeof pageList !== 'undefined') {
    pageList.forEach(page => {
      // Check title
      if (page.title.toLowerCase().includes(searchTerm) && !matchingSuggestions.includes(page.title)) {
        matchingSuggestions.push(page.title);
      }
      // Check description
      if (page.description.toLowerCase().includes(searchTerm) && !matchingSuggestions.includes(page.description.substring(0, 50) + '...')) {
        matchingSuggestions.push(page.description.substring(0, 50) + '...'); // Truncate description for suggestion
      }
      // Check keywords
      if (page.keywords) {
        page.keywords.forEach(keyword => {
          if (keyword.toLowerCase().includes(searchTerm) && !matchingSuggestions.includes(keyword)) {
            matchingSuggestions.push(keyword);
          }
        });
      }
    });
  }

  // Display top 5 suggestions
  matchingSuggestions.slice(0, 5).forEach(suggestion => {
    const listItem = document.createElement('li');
    listItem.textContent = suggestion;
    listItem.onclick = function() {
      searchInput.value = suggestion.replace(/\.\.\.$/, ''); // Fill input on click, remove truncation
      search();
      autocompleteList.style.display = 'none';
    };
    autocompleteList.appendChild(listItem);
  });

  if (matchingSuggestions.length > 0) {
    autocompleteList.style.display = 'block';
  }
}

// Main search function
function search() {
  const searchTerm = searchInput.value.toLowerCase();

  if (!searchTerm) {
    showCustomAlert("Please enter a search term!"); // Changed alert message to English
    return;
  }

  // Add class to move container to top
  mainContainer.classList.add('container-top');
  document.body.style.justifyContent = 'flex-start'; // Align body content to top

  searchResultsContainer.innerHTML = '';
  paginationContainer.innerHTML = '';
  noResultsContainer.style.display = 'none';
  loadingIndicator.style.display = 'block';
  autocompleteList.style.display = "none";
  searchHistoryList.style.display = "none";
  recommendedLinks.classList.add("hidden"); // Hide recommended links
  clearSearchButton.style.display = 'none'; // Hide clear button during search

  saveSearchHistory(searchTerm);

  // Simulate search time (1 second)
  setTimeout(() => {
    loadingIndicator.style.display = 'none';

    allResults = generateSearchResults(searchTerm);
    currentPage = 1; // Reset to first page

    if (allResults.length === 0) {
      noResultsContainer.style.display = 'block';
    } else {
      displayResults(currentPage);
      generatePaginationButtons();
    }
  }, 1000);
}

// Generate mock search results
function generateSearchResults(searchTerm) {
  let results = [];
  if (typeof pageList !== 'undefined') {
    pageList.forEach(page => {
      if (
        page.title.toLowerCase().includes(searchTerm) ||
        page.description.toLowerCase().includes(searchTerm) ||
        (page.keywords && page.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)))
      ) {
        results.push({
          title: page.title,
          link: "https://liferlighdow.github.io/" + page.url,
          description: page.description,
          snippet: `${page.description.substring(0, 150)}...`,
          date: new Date().toLocaleDateString('en-US'), // Changed date format to English
          source: page.title
        });
      }
    });
  } else {
    console.error("pageList.js not loaded!");
    results.push({
      title: "Error: Page list not loaded", // Changed error message to English
      link: "#",
      description: "Could not load the website page list. Please check if pageList.js is correctly linked.", // Changed error message to English
      snippet: "No search results can be displayed.", // Changed error message to English
      date: new Date().toLocaleDateString('en-US'),
      source: "System"
    });
  }
  return results;
}

// Display search results for a specific page
function displayResults(page) {
  searchResultsContainer.innerHTML = '';

  const startIndex = (page - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const pageResults = allResults.slice(startIndex, endIndex);

  pageResults.forEach((result, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('search-result');
    // Set animation delay for staggered fade-in
    listItem.style.animationDelay = `${index * 0.1}s`;

    const highlightedTitle = highlightSearchTerm(result.title, searchInput.value);
    const highlightedDescription = highlightSearchTerm(result.description, searchInput.value);

    listItem.innerHTML = `
      <h2 class="result-title">${highlightedTitle}</h2>
      <a href="${result.link}" class="result-link" target="_blank" rel="noopener noreferrer">${result.link}</a>
      <p class="result-description">${highlightedDescription}</p>
      <p>Source: ${result.source} - Date: ${result.date}</p> <!-- Changed text to English -->
    `;
    searchResultsContainer.appendChild(listItem);
  });
  updateActivePageButton(); // Update pagination button style
}

// Highlight search term
function highlightSearchTerm(text, searchTerm) {
  if (!searchTerm) {
    return text;
  }
  const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'); // Handle special characters
  const highlightedText = text.replace(regex, match => `<span class="highlight">${match}</span>`);
  return highlightedText;
}

// Generate pagination buttons
function generatePaginationButtons() {
  paginationContainer.innerHTML = '';
  const totalPages = Math.ceil(allResults.length / resultsPerPage);

  if (totalPages <= 1) return; // Don't show pagination if only one page or no results

  // Previous page button
  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous'; // Changed text to English
  prevButton.classList.add('pagination-button');
  prevButton.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      displayResults(currentPage);
    }
  };
  paginationContainer.appendChild(prevButton);

  // Page number buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.add('pagination-button');
    if (i === currentPage) {
      pageButton.classList.add('active');
    }
    pageButton.onclick = () => {
      currentPage = i;
      displayResults(currentPage);
    };
    paginationContainer.appendChild(pageButton);
  }

  // Next page button
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next'; // Changed text to English
  nextButton.classList.add('pagination-button');
  nextButton.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayResults(currentPage);
    }
  };
  paginationContainer.appendChild(nextButton);
}

// Update active page button style
function updateActivePageButton() {
  const buttons = paginationContainer.querySelectorAll('.pagination-button');
  buttons.forEach(button => {
    button.classList.remove('active');
    if (parseInt(button.textContent) === currentPage) {
      button.classList.add('active');
    }
  });
}

// Save search history
function saveSearchHistory(searchTerm) {
  if (searchTerm && !searchHistory.includes(searchTerm)) {
    searchHistory.unshift(searchTerm);
    if (searchHistory.length > maxHistorySize) {
      searchHistory.pop();
    }
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }
}

// Load search history
function loadSearchHistory() {
  const storedHistory = localStorage.getItem('searchHistory');
  if (storedHistory) {
    searchHistory = JSON.parse(storedHistory);
  }
}

// Show search history
function showSearchHistory() {
  searchHistoryList.innerHTML = '';
  autocompleteList.style.display = 'none'; // Hide autocomplete when showing history
  searchHistoryList.style.display = 'block';

  if (searchHistory.length === 0) {
    const listItem = document.createElement('li');
    listItem.textContent = 'No search history'; // Changed text to English
    searchHistoryList.appendChild(listItem);
  } else {
    searchHistory.forEach(term => {
      const listItem = document.createElement('li');
      listItem.textContent = term;
      listItem.onclick = function() {
        searchInput.value = term;
        search();
        searchHistoryList.style.display = 'none';
      };
      searchHistoryList.appendChild(listItem);
    });
  }
}

// Hide search history and autocomplete when clicking outside the search box
document.addEventListener('click', function(event) {
  const searchBox = document.querySelector('.search-box');
  if (!searchBox.contains(event.target)) {
    searchHistoryList.style.display = 'none';
    autocompleteList.style.display = 'none';
  }
});

// Trigger search on Enter key press
searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    search();
  }
});

// Clear search input
clearSearchButton.addEventListener('click', function() {
  searchInput.value = '';
  clearSearchButton.style.display = 'none';
  searchResultsContainer.innerHTML = '';
  paginationContainer.innerHTML = '';
  noResultsContainer.style.display = 'none';
  recommendedLinks.classList.remove("hidden"); // Show recommended links when cleared
  autocompleteList.style.display = 'none'; // Hide autocomplete when cleared
  searchHistoryList.style.display = 'none'; // Hide search history when cleared

  // Remove class to center container again
  mainContainer.classList.remove('container-top');
  document.body.style.justifyContent = 'center'; // Align body content to center again
});

// Custom alert box function
function showCustomAlert(message) {
  customAlertMessage.textContent = message;
  customAlertDialog.style.display = 'flex'; // Use flex to center content
}

// Dynamic placeholder effect
function initDynamicPlaceholder() {
  const placeholders = ["Search web...", "Explore music...", "Find games...", "Contact us..."]; // Changed placeholders to English
  let currentPlaceholderIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100; // Typing speed (milliseconds)
  const deletingSpeed = 50; // Deleting speed (milliseconds)
  const delayBetweenPhrases = 2000; // Delay between phrases (milliseconds)

  function typePlaceholder() {
    const currentPlaceholder = placeholders[currentPlaceholderIndex];
    if (isDeleting) {
      searchInput.setAttribute('placeholder', currentPlaceholder.substring(0, charIndex - 1));
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        currentPlaceholderIndex = (currentPlaceholderIndex + 1) % placeholders.length;
        setTimeout(typePlaceholder, typingSpeed);
      } else {
        setTimeout(typePlaceholder, deletingSpeed);
      }
    } else {
      searchInput.setAttribute('placeholder', currentPlaceholder.substring(0, charIndex + 1));
      charIndex++;
      if (charIndex === currentPlaceholder.length) {
        isDeleting = true;
        setTimeout(typePlaceholder, delayBetweenPhrases);
      } else {
        setTimeout(typePlaceholder, typingSpeed);
      }
    }
  }
  typePlaceholder(); // Start dynamic placeholder
}

// Calculator Logic
calculatorButton.addEventListener('click', () => {
  calculatorModal.style.display = 'flex'; // Show the calculator modal
});

closeCalculatorButton.addEventListener('click', () => {
  calculatorModal.style.display = 'none'; // Hide the calculator modal
});

calculatorModal.addEventListener('click', (event) => {
  // If clicked outside the calculator content, close the modal
  if (event.target === calculatorModal) {
    calculatorModal.style.display = 'none';
  }
});

// Add keyboard input listener for the calculator
document.addEventListener('keydown', handleCalculatorKeyboardInput);

function handleCalculatorKeyboardInput(event) {
  // Only process keyboard input if the calculator modal is visible
  if (calculatorModal.style.display !== 'flex') {
    return;
  }

  const key = event.key;

  // Prevent default browser actions for calculator keys
  if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '%', 'Enter', '=', 'Backspace', 'Escape'].includes(key)) {
    event.preventDefault();
  }

  if (key >= '0' && key <= '9') {
    inputNumber(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    inputOperator(key);
  } else if (key === '.') {
    inputDecimal();
  } else if (key === 'Enter' || key === '=') {
    calculate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'Escape' || key.toLowerCase() === 'c') { // 'c' for clear
    clearAll();
  } else if (key === '%') {
    inputOperator('%');
  }
  updateCalculatorDisplay();
}


calculatorButtons.addEventListener('click', (event) => {
  const target = event.target;
  if (!target.matches('button')) return; // Only process button clicks

  const value = target.textContent;

  if (target.classList.contains('number')) {
    inputNumber(value);
  } else if (target.classList.contains('operator')) {
    inputOperator(value);
  } else if (target.classList.contains('decimal')) {
    inputDecimal();
  } else if (target.classList.contains('equals')) {
    calculate();
  } else if (target.classList.contains('clear-all')) {
    clearAll();
  } else if (target.classList.contains('backspace')) {
    backspace();
  }
  updateCalculatorDisplay();
});

function inputNumber(num) {
  if (resetDisplay) {
    currentInput = num;
    resetDisplay = false;
  } else {
    currentInput = currentInput === '0' ? num : currentInput + num;
  }
}

function inputDecimal() {
  if (resetDisplay) {
    currentInput = '0.';
    resetDisplay = false;
    return;
  }
  if (!currentInput.includes('.')) {
    currentInput += '.';
  }
}

function inputOperator(nextOperator) {
  const inputValue = parseFloat(currentInput);

  if (operator && resetDisplay) {
    operator = nextOperator;
    return;
  }

  if (previousInput === '') {
    previousInput = inputValue;
  } else if (operator) {
    const result = performCalculation(previousInput, inputValue, operator);
    currentInput = String(result);
    previousInput = result;
  }

  resetDisplay = true;
  operator = nextOperator;
}

function performCalculation(prev, current, op) {
  switch (op) {
    case '+':
      return prev + current;
    case '-':
      return prev - current;
    case '*':
      return prev * current;
    case '/':
      return current === 0 ? 'Error' : prev / current;
    case '%':
        return prev % current; // Modulo operator
    default:
      return current;
  }
}

function calculate() {
  if (operator === null || resetDisplay) return;

  const inputValue = parseFloat(currentInput);
  const result = performCalculation(previousInput, inputValue, operator);

  currentInput = String(result);
  operator = null;
  previousInput = ''; // Clear previous input after calculation
  resetDisplay = true;
}

function clearAll() {
  currentInput = '0';
  operator = null;
  previousInput = '';
  resetDisplay = false;
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  if (currentInput === '') {
    currentInput = '0';
  }
}

function updateCalculatorDisplay() {
  calculatorDisplay.textContent = currentInput;
}
