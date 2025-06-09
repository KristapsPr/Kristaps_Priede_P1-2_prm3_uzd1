<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Random Group Splitter</title>
</head>
<body>
  <h3>Enter student names (comma or new line separated):</h3>
  <textarea id="studentsInput" rows="6" cols="30"></textarea><br />

  <label for="maxGroupSize">Max group size:</label>
  <input type="number" id="maxGroupSize" value="3" /><br /><br />

  <button id="splitGroups">Split Groups</button>

  <h3>Groups:</h3>
  <pre id="groupOutput"></pre>

  <h3>Search for name:</h3>
  <input type="text" id="searchInput" />
  <button id="searchBtn">Search</button>
  <pre id="searchOutput"></pre>

  <script>
    let groups = [];

    // Fisher-Yates shuffle
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    document.getElementById('splitGroups').addEventListener('click', () => {
      const namesInput = document.getElementById('studentsInput').value;
      const names = namesInput.split(/,|\n|\r/).map(n => n.trim()).filter(n => n !== '');
      const maxSize = parseInt(document.getElementById('maxGroupSize').value);

      if (!maxSize || maxSize <= 0 || names.length === 0) {
        alert('Lūdzu, ievadi pareizus datus!');
        return;
      }

      shuffle(names);

      groups = [];
      let currentGroup = [];
      names.forEach((name, idx) => {
        currentGroup.push(name);
        if (currentGroup.length === maxSize || idx === names.length - 1) {
          groups.push(currentGroup);
          currentGroup = [];
        }
      });

      const output = document.getElementById('groupOutput');
      output.textContent = groups.map((g, i) => `Grupa ${i + 1}: ${g.join(', ')}`).join('\n');
      document.getElementById('searchOutput').textContent = '';
    });

    document.getElementById('searchBtn').addEventListener('click', () => {
      const searchName = document.getElementById('searchInput').value.trim().toLowerCase();
      const output = document.getElementById('searchOutput');

      if (searchName === '' || groups.length === 0) {
        output.textContent = 'Lūdzu, ievadi vārdu un pārliecinies, ka grupas ir izveidotas!';
        return;
      }

      let found = false;
      groups.forEach((group, idx) => {
        if (group.some(n => n.toLowerCase() === searchName)) {
          output.textContent = `"${searchName}" ir ${idx + 1}. grupā: ${group.join(', ')}`;
          found = true;
        }
      });

      if (!found) {
        output.textContent = `"${searchName}" nav atrasts nevienā grupā.`;
      }
    });
  </script>
</body>
</html>
