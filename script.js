const button = document.getElementById('generateArray');

const bubbleSortButton = document.getElementById('bubbleSort');
const selectionSortButton = document.getElementById('selectionSort');
const insertionSortButton = document.getElementById('insertionSort');
const quickSortButton = document.getElementById('quickSort');

const algorithmNotesDiv = document.getElementById('algorithmNotes');

let arr = [];
const delayDuration = 100; // Set the delay duration (milliseconds)

// Add event listener for the 'click' event
button.addEventListener('click', generateArray);

button.addEventListener('click', generateArray);
bubbleSortButton.addEventListener('click', () => {
    bubbleSort(arr);
    showAlgorithmNotes('Bubble Sort');
});

selectionSortButton.addEventListener('click', () => {
    selectionSort(arr);
    showAlgorithmNotes('Selection Sort');
});

insertionSortButton.addEventListener('click', () => {
    insertionSort(arr);
    showAlgorithmNotes('Insertion Sort');
});

quickSortButton.addEventListener('click', () => {
    quickSort(arr);
    showAlgorithmNotes('Quicksort');
});

function showAlgorithmNotes(algorithmName) {
    const notes = getAlgorithmNotes(algorithmName);
    algorithmNotesDiv.innerHTML = notes;
}

function getAlgorithmNotes(algorithmName) {
    switch (algorithmName) {
        case 'Bubble Sort':
            return "<h2>Bubble Sort Notes</h2><p>Observe how larger elements 'bubble' to the top with each iteration.</p>";
        case 'Selection Sort':
            return "<h2>Selection Sort Notes</h2><p>Notice how the smallest element gets selected and placed at the beginning in each iteration.</p>";
        case 'Insertion Sort':
            return "<h2>Insertion Sort Notes</h2><p>Pay attention to how elements are inserted into their correct positions one by one.</p>";
        case 'Quicksort':
            return "<h2>Quicksort Notes</h2><p>Watch how the pivot element is chosen and how partitioning works to sort the array.</p>";
        default:
            return "";
    }
}

function getRandomHexColor() {
    const randomColor = Math.floor(Math.random() * 16777215);
    return `#${randomColor.toString(16).padStart(6, '0')}`;
}

function play() {
    var audio = document.getElementById("audio");
    audio.play();
}

function generateArray() {
    let n = 50;
    arr = [];
    for (let i = 0; i < n; i++) {
        arr[i] = Math.random();
    }
    let container = document.getElementsByClassName("container")[0];

    // Clear the container before creating new bars
    container.innerHTML = '';

    for (let i = 0; i < arr.length; i++) {
        let bar = document.createElement('div');
        container.appendChild(bar);
        bar.style.height = arr[i] * 100 + "%";
        bar.style.backgroundColor = getRandomHexColor();
        bar.classList.add("bar");
    }
}

async function bubbleSort(arr) {
    const len = arr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                const temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
                await updateVisualization(arr, i, i + 1);
                await delay(delayDuration); // Introduce a delay
            }
        }
    } while (swapped);
    console.log("Sorting complete!");
    return arr;
}

async function selectionSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
            await updateVisualization(arr, i, minIndex);
            await delay(delayDuration); // Introduce a delay
        }
    }
    console.log("Sorting complete!");
    play();
    return arr;
}

async function insertionSort(arr) {
    const len = arr.length;
    for (let i = 1; i < len; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            await updateVisualization(arr, j, j + 1);
            j--;
        }
        arr[j + 1] = key;
        await updateVisualization(arr, j + 1, i);
    }
    console.log("Sorting complete!");
    play();
    return arr;
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            await updateVisualization(arr, i, j);
            await delay(delayDuration); // Delay for visualization
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    await updateVisualization(arr, i + 1, high);
    await delay(delayDuration); // Delay for visualization
    return i + 1;
}

async function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = await partition(arr, low, high);
        await quickSort(arr, low, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, high);
    }
    if (low === 0 && high === arr.length - 1) {
        console.log("Sorting complete!");
        play();
    }
    return arr;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateVisualization(arr, index1, index2) {
    const bars = document.querySelectorAll(".bar");
    const tempHeight = bars[index1].style.height;
    bars[index1].style.height = bars[index2].style.height;
    bars[index2].style.height = tempHeight;

    const tempCol = bars[index1].style.backgroundColor;
    bars[index1].style.backgroundColor = bars[index2].style.backgroundColor;
    bars[index2].style.backgroundColor = tempCol;

    await delay(delayDuration); // Delay for visualization
}
