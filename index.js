"use strict";
// practicing type scripts
// let dave:string;
const counter = {
    value: 20,
    increament: function () {
        this.value++;
    },
    decreament: function () {
        this.value--;
    },
};
counter.increament();
console.log(counter.value);
counter.decreament();
console.log(counter.value);
