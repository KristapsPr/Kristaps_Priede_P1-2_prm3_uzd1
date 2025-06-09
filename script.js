let groups = [];

// Shuffle function stays the same
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// New parser function to handle quoted names and names with spaces
function parseNames(input) {
  const regex = /"([^"]+)"|([^,\r\n]+)/g;
  let names = [];
  let match;
  while ((match = regex.exec(input)) !== null) {
    const name = (match[1] || match[2]).trim();
    if (name) names.push(name);
  }
  return names;
}

document.getElementById('splitGroups').addEventListener('click', () => {
  const namesInput = document.getElementById('studentsInput').value;

  // Use the new parseNames function here
  let names = parseNames(namesInput);

  console.log('Parsed names:', names);

  const maxSize = parseInt(document.getElementById('maxGroupSize').value);

  if (!maxSize || maxSize <= 0 || names.length === 0) {
    alert('Lūdzu, ievadi pareizus datus!');
    return;
  }

  names = shuffle(names);
  console.log('Shuffled names:', names);

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
