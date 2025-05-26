import { threadId } from "worker_threads";

export class PriorityQueue<T> {
    private heap: { item: T, priority: number }[] = []; //其实就是一个数组
    private IndexMap = new Map<T, number>();  
    private parentIndex(i: number): number {
        return Math.floor((i - 1) / 2);
    }
    private leftChildIndex(i: number): number | undefined {
    const index = 2 * i + 1;
    return index < this.heap.length ? index : undefined;
   }

    private rightChildIndex(i: number): number | undefined {
        const index = 2 * i + 2;
        return index < this.heap.length ? index : undefined;
    }

    length() : number {
        return this.heap.length;
    }
    
    value(item:T): number | undefined {
        //console.log(item);
        const index = this.IndexMap.get(item);
        //console.log(index);
        if(index === undefined){
            return undefined;
        }
        return this.heap[index].priority;
    }
    push (item: T, priority: number){
        const index = this.IndexMap.get(item);
        if(index !== undefined){
            this.update_priority(item,priority);
        }
        else{
            this.heap.push({ item, priority });
            this.IndexMap.set(item, this.heap.length - 1); //按插入顺序决定器唯一位置
            this.up(this.heap.length - 1);
        }
    }

    //弹出队首元素的item
    pop(): { item: T, priority: number } | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    this.IndexMap.delete(min.item);
    if (this.heap.length > 1) {
        this.heap[0] = this.heap.pop()!;
        this.IndexMap.set(this.heap[0].item, 0);
        this.down(0);
    } else {
        this.heap.pop();
    }
    return min; // 返回 item 和 priority
}


    front(): T | undefined {
    if (this.heap.length === 0) {
        return undefined;
    }
    return this.heap[0].item;
}


    update_priority (item:T, priority:number){
         const index = this.IndexMap.get(item);
         if(index === undefined)
            return;
         this.heap[index].priority = priority;
         //dijstra 只变小
         this.up(index);
    }

    swap(i:number,j:number){ //根据索引交换两个元素
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
        this.IndexMap.set(this.heap[i].item, i); //同时更新索引
        this.IndexMap.set(this.heap[j].item, j);
    }

    up(index:number){
       while(index > 0){
          const f_index = this.parentIndex(index);
          if(this.heap[index].priority < this.heap[f_index].priority){
            this.swap(index,f_index);
            index = f_index;
          }
          else{
            break;//不交换
          }
       }
    }

    down(index: number) {
    while (true) {
        const left = this.leftChildIndex(index);
        const right = this.rightChildIndex(index);
        let smallest = index;

        if (left !== undefined && this.heap[left].priority < this.heap[smallest].priority) {
            smallest = left;
        }
        if (right !== undefined && this.heap[right].priority < this.heap[smallest].priority) {
            smallest = right;
        }

        if (smallest === index) {
            break; // 当前节点已经最小，无需下沉
        }
        this.swap(index, smallest);
        index = smallest;
    }
}

}
