import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
//定义数据类
export async function parser(filePath: string): Promise<{ edges: number[][], nodes: number[][] }> {
  const edges: number[][] = Array.from({ length: 12 }, () => Array(12).fill(0)); //指定了数组规模
  const nodes: number[][] = [];
  const absolutePath = path.resolve(process.cwd(), filePath);
  console.log("读取文件路径:", absolutePath);
  // 检查文件是否存在
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`文件不存在: ${absolutePath}`);
  }
  try {
    const fileStream = fs.createReadStream(absolutePath);
    
    // 监听文件流错误
    fileStream.on("error", (err) => {
      console.error("文件流错误:", err);
    });

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const numbers = line.trim().split(/\s+/).map(Number).filter(n => !isNaN(n));
      if (numbers.length >= 3) {
        const [from, to, weight] = numbers;
        const maxNode = Math.max(from, to);
        //动态扩展 edges
        // while (edges.length <= maxNode) {
        //   edges.push([]);
        // }
        // while (edges[from].length <= maxNode) {
        //   edges[from].push(0);
        // }
        edges[from][to] = weight;
        edges[to][from] = weight;

        // 动态扩展 nodes
        while (nodes.length <= maxNode) {
          nodes.push([]);
        }
        if (!nodes[from].includes(to)) nodes[from].push(to);
        if (!nodes[to].includes(from)) nodes[to].push(from);
      }
    }
    return { edges, nodes };//promise对象读取完成后的返回

  } catch (err) {
    console.error("解析失败:", err);
    throw err;
  }
}