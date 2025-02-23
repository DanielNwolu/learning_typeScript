// practicing type scripts
// let dave:string;

// dave="david"

// interface IProps {

// }


// type Props = {
//     name:string;
// }

// const daniel: Props ={name:"daniel"}


// counter function

type CounterProps ={
    value:number;
    increament: ()=> void;
    decreament:()=> void;
}

const counter:CounterProps={
    value:20,
    increament:function (){
        this.value++
    },
    decreament:function (){
        this.value--
    },
}

counter.increament()
console.log(counter.value)

counter.decreament()
console.log(counter.value)