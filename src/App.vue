<script setup lang="ts">
import { reactive, ref } from "vue";
import type { Ref } from "vue";
import { Style } from "./utils/sort";
import sort from "./utils/sort";

type Algorithm = "selectionSort" | "bubbleSort" | "insertionSort";

const array: Ref<number[]> = ref([]);
const size: Ref<number> = ref(300);
const timeDelay: Ref<number> = ref(100);
const algorithm: Ref<Algorithm> = ref("selectionSort");

const isDisabled: Ref<boolean> = ref(false);

const style: Style = reactive({
  current: null,
  queue: null,
  endAnimation: false,
});

function fillArray(): void {
  array.value = [...Array(size.value).keys()].sort(() => Math.random() - 0.5);
}

async function start() {
  isDisabled.value = true;
  await sort[algorithm.value](array, style, timeDelay);
  endSorting();
}

function endSorting() {
  style.endAnimation = true;
  isDisabled.value = false;
  setTimeout(() => (style.endAnimation = false), 1000);
  style.current = null;
  style.queue = null;
}
fillArray();
</script>

<template>
  <header>
    <div class="container">
      <div class="wrapper">
        <label>
          size
          <input
            @input="fillArray"
            v-model.number="size"
            :disabled="isDisabled"
            type="number"
        /></label>

        <label>
          delay(ms)
          <input
            v-model.number="timeDelay"
            :disabled="isDisabled"
            type="number"
          />
        </label>

        <select @change="fillArray" :disabled="isDisabled" v-model="algorithm">
          <option value="bubbleSort">bubble sort</option>
          <option value="selectionSort">selection sort</option>
          <option value="insertionSort">insertion sort</option>
        </select>

        <button :disabled="isDisabled" @click="start">Start</button>
      </div>
    </div>
  </header>

  <div class="container">
    <div
      class="visual-sorting"
      :style="{ gridTemplateColumns: `repeat(${size}, 1fr)` }"
    >
      <div
        class="sorting-item"
        v-for="(number, index) in array"
        :class="{
          active: style.current === index,
          queue: style.queue === index,
          end: style.endAnimation,
        }"
        :key="index"
        :style="{ height: ((number + 1) * 100) / size + '%' }"
      ></div>
    </div>
  </div>
</template>

<style>
body {
  background-color: #09203b;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.container {
  max-width: 1200px;
  padding: 0 15px;
  margin: 0 auto;
}
header {
  padding: 20px 15px;
  margin-bottom: 30px;
  border-bottom: 1px solid white;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  border: 2px solid #dae9fb;
  border-radius: 5px;
  padding: 8px 20px;
  background-color: transparent;
  transition: background-color 0.2s, opacity 0.2s;
  color: white;
  cursor: pointer;
}
button[disabled] {
  cursor: not-allowed;
  opacity: 0.6;
}
label {
  color: white;
}
input {
  outline: none;
  width: 60px;
  border: none;
  border-radius: 5px;
  text-align: center;
}
input[type="number"] {
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

select {
  border: none;
  outline: none;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}
select:focus {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.visual-sorting {
  display: grid;
  grid-gap: 2px;
  align-items: end;
  height: 80vh;
}
.sorting-item {
  background-color: #9cc2f1;
  width: 100%;
  border-radius: 5px;
}
.active {
  background-color: red;
}
.queue {
  background-color: black;
}
.end {
  background-color: rgb(25, 221, 25);
}
</style>
