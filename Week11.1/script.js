// Generate a maze using the depth-first search algorithm
function generateMaze(width, height) {
    // Create a 2D array to represent the maze
    const maze = Array(height).fill().map(() => Array(width).fill(true));
  
    // Helper function to check if a cell is valid
    function isValidCell(row, col) {
      return row >= 0 && row < height && col >= 0 && col < width;
    }
  
    // Helper function to shuffle an array randomly
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    // Recursive depth-first search function
    function dfs(row, col) {
      maze[row][col] = false; // Mark the current cell as visited
  
      // Define the possible directions
      const directions = [
        { row: -2, col: 0 }, // Up
        { row: 2, col: 0 }, // Down
        { row: 0, col: -2 }, // Left
        { row: 0, col: 2 } // Right
      ];
  
      // Shuffle the directions randomly
      shuffleArray(directions);
  
      // Visit the neighbors
      for (const direction of directions) {
        const newRow = row + direction.row;
        const newCol = col + direction.col;
  
        if (isValidCell(newRow, newCol) && maze[newRow][newCol]) {
          // Remove the wall between the current cell and the neighbor
          const wallRow = row + direction.row / 2;
          const wallCol = col + direction.col / 2;
          maze[wallRow][wallCol] = false;
  
          // Recursively visit the neighbor
          dfs(newRow, newCol);
        }
      }
    }
  
    // Start the depth-first search from a random cell
    const startRow = Math.floor(Math.random() * height);
    const startCol = Math.floor(Math.random() * width);
    dfs(startRow, startCol);
  
    return maze;
  }
  
  // Function to render the maze on the HTML page
function renderMaze(maze, width, height) {
    const container = document.querySelector('.maze-svg');
    container.innerHTML = '';
  
    const cellSize = Math.min(600 / width, 600 / height); // Adjust the maximum size (600) based on your needs
  
    // Set the viewBox attribute based on the maze size
    const viewBoxWidth = width * cellSize;
    const viewBoxHeight = height * cellSize;
    container.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
  
    // Render the walls as rectangles
    for (let row = 0; row < maze.length; row++) {
      for (let col = 0; col < maze[row].length; col++) {
        if (maze[row][col]) {
          const x = col * cellSize;
          const y = row * cellSize;
  
          const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', x);
          rect.setAttribute('y', y);
          rect.setAttribute('width', cellSize);
          rect.setAttribute('height', cellSize);
          rect.setAttribute('fill', 'black');
          container.appendChild(rect);
        }
      }
    }
  }
  
  
  // Generate and render the maze when the button is clicked
  const button = document.querySelector('input[type="button"]');
  button.addEventListener('click', () => {
    const width = 50;
    const height = 50;
    const maze = generateMaze(width, height);
    renderMaze(maze, width, height);
  });
  