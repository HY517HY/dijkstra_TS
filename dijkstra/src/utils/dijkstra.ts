import { PriorityQueue } from './queue';
export function dijkstra(
    nodes: number[][],
    edges: number[][],
    start: number,
    end: number
): number[] | null {
    const nodeCount = nodes.length;
    const INFINITY = Number.MAX_VALUE; //初始化为无穷大
    const visited: boolean[] = [];
    var short_dis:number = 0;
    const paths: number[][] = [];
    const dis = new PriorityQueue<number>();
    for (let i = 0; i < nodeCount; i++) {
        visited[i] = false;
        dis.push(i , INFINITY);
        paths[i] = [start];
    }
    dis.push(start,0);
    visited[start] = true;
    let current: number = start;
    let cur_dis = 0;
    while (current !== -1 && !visited[end]) {
        for (const neighbor of nodes[current]) {
            if (!visited[neighbor]) {
                if(edges[current][neighbor] === 0)
                {
                    continue;//距离为0的边设置为不可达边
                }
                const newdis = cur_dis + edges[current][neighbor];
                console.log(cur_dis,"+",edges[current][neighbor]);
                console.log(current,"to",neighbor," ",newdis," vs ",dis.value(neighbor));
                if (newdis < dis.value(neighbor)!) {
                    dis.push(neighbor,newdis);//更新距离
                    paths[neighbor] = [...paths[current], neighbor]; // 更新路径
                }
            }
        }
        let next = dis.pop();
        if (next) {
            current = next.item;
            cur_dis = next.priority;
            visited[current] = true;
        }
    }
    console.log(dis);
    const shortestDistance = dis.value(end);
    console.log("shortest distance: ", cur_dis);
    if (shortestDistance === INFINITY) {
        return null;
    }
    return paths[end]; 
}
