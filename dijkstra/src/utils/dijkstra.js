//import { Graph } from './parser';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function find_shortest_path(nodes, edges, start, end) {
    var nodes_size = nodes.length;
    var finded = new Array(nodes_size).fill(false); // 是否已找到最短路径
    finded[start] = true;
    var distance = new Array(nodes_size).fill(Infinity); // 距离数组
    distance[start] = 0;
    var path = new Array(nodes_size).fill(null).map(function () { return []; }); // 路径数组
    for (var i = 0; i < nodes_size; i++) {
        path[i] = [start]; // 初始化路径
    }
    var visting = start; // 当前访问节点
    while (!finded[end]) {
        for (var i = 0; i < nodes[visting].length; i++) {
            var neighbor = nodes[visting][i];
            if (finded[neighbor])
                continue; // 已找到最短路径的节点跳过
            if (distance[neighbor] > distance[visting] + edges[visting][neighbor]) {
                distance[neighbor] = distance[visting] + edges[visting][neighbor]; // 更新距离
                path[neighbor] = __spreadArray(__spreadArray([], path[visting], true), [neighbor], false); // 更新路径
            }
        }
        // 找到下一个访问节点
        var next_visting = -1;
        var min_distance = Infinity;
        for (var i = 0; i < nodes_size; i++) {
            if (!finded[i] && distance[i] < min_distance) {
                min_distance = distance[i];
                next_visting = i;
            }
        }
        if (next_visting === -1)
            break; // 没有可访问的节点
        finded[next_visting] = true;
        visting = next_visting;
    }
    return distance[end] === Infinity ? null : path[end]; // 如果无法到达目标节点，返回 null
}
var edges = [
    [0, 1, 1, 3],
    [1, 0, 3, 1],
    [1, 3, 0, 1],
    [3, 1, 1, 0]
];
var nodes = [
    [1, 2, 3],
    [0, 2, 3],
    [0, 1, 3],
    [0, 1, 2]
];
console.log(find_shortest_path(nodes, edges, 1, 3)); // 输出最短路径
