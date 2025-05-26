import { dijkstra } from "./utils/dijkstra";
import { parser } from "./utils/parser";

//参数
const args = process.argv.slice(2);//提取指令
const input = args[0];
const start = parseInt(args[1]);
const end = parseInt(args[2]);
//异步函数
async function main() {
  const { edges, nodes } = await parser(input);
  //节点编号从0开始的图文件
  let result = dijkstra(nodes, edges, start, end);
  console.log("path: ", result);
}

main(); 


//test 优先队列
// import { PriorityQueue } from './utils/queue';

// const arr = [5,413,4,41,3213,313,42];
// const queue = new PriorityQueue;
// for(let i = 0 ; i < arr.length;i++){
//   queue.push(i, arr[i]);
// }

// for(let i = 0 ; i < arr.length;i++){
//     console.log(queue.front());
//     queue.pop();
// }
// console.log("==============");
// const arr2 = [12,32,4334,53,1234,1,5243,2];
// for(let i = 0 ; i < arr2.length; i++){
//     queue.push(i, arr2[i]);
// }
// for(let i = 0 ; i < arr2.length;i++){
//     console.log(queue.front(),queue.value(queue.front()));
//     queue.pop();
// }

