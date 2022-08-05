import { ref, Ref } from "vue";
export interface Style {
  current: null | number;
  queue: null | number;
  endAnimation: boolean;
}

function swap(arr: Ref<number[]>, a: number, b: number, style: Style) {
  style.queue = b;
  const temp = arr.value[a];
  arr.value[a] = arr.value[b];
  arr.value[b] = temp;
}

async function bubbleSort(
    array: Ref<number[]>,
    style: Style,
    timeDelay: Ref<number>
  ) {
  const size = array.value.length;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size - 1 - i; j++) {
      if (array.value[j] > array.value[j + 1]) {
        swap(array, j, j + 1, style);
        await delay(timeDelay.value);
      }
    }
  }
}

async function selectionSort(
  array: Ref<number[]>,
  style: Style,
  timeDelay: Ref<number>
) {
  const size = array.value.length;
  let minIndex: number = 0;
  for (let i = 0; i < size - 1; i++) {
    style.current = i + 1;
    minIndex = i;
    for (let j = i; j < size; j++) {
      style.queue = j;
      if (array.value[minIndex] > array.value[j]) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      swap(array, i, minIndex, style);
      await delay(timeDelay.value);
    }
  }
}
async function insertionSort(
  array: Ref<number[]>,
  style: Style,
  timeDelay: Ref<number>
) {
  const size = array.value.length;
  let temp;
  for (let i = 1; i < size; i++) {
    let j = i;
    style.current = i;
    temp = array.value[i];
    while (j > 0 && array.value[j - 1] > temp) {
      style.queue = j;
      array.value[j] = array.value[--j];
      await delay(timeDelay.value);
    }
    array.value[j] = temp;
  }
}

function delay(timeDelay: number) {
  return new Promise((resolve) => setTimeout(resolve, timeDelay));
}


export default {
  bubbleSort,
  selectionSort,
  insertionSort,
}
