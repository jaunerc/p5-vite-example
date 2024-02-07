import p5 from "p5";
import {Cell} from "./cell.ts";

export const sketch = (p: p5) => {

    const cellSize: number = 10
    let grid: Cell[] = []
    let stack: Cell[] = []
    let current: Cell
    let cols: number
    let rows: number

    p.setup = () => {
        p.createCanvas(600, 600)

        cols = p.width / cellSize
        rows = p.height / cellSize

        for (let j = 0; j < rows; j++) {
            for (let i = 0; i < cols; i++) {
                let cell: Cell = { i, j, visited: false, walls: [true, true, true, true]}
                grid.push(cell)
            }
        }

        current = grid[0]
    }

    p.draw = () => {
        p.background(220)
        p.stroke(10)
        grid.forEach(cell => drawCell(cell))
        current.visited = true

        let next: Cell | undefined = checkNeighbors(current)
        if (next) {
            next.visited = true
            stack.push(current)
            removeWalls(current, next)
            current = next
        } else if (stack.length > 0) {
            current = stack.pop()!
        }
    }

    function drawCell(cell: Cell): void {
        const x = cell.i * cellSize
        const y = cell.j * cellSize
        p.stroke(10)
        if (cell.walls[0]) {
            p.line(x, y, x + cellSize, y);
        }
        if (cell.walls[1]) {
            p.line(x + cellSize, y, x + cellSize, y + cellSize);
        }
        if (cell.walls[2]) {
            p.line(x + cellSize, y + cellSize, x, y + cellSize);
        }
        if (cell.walls[3]) {
            p.line(x, y + cellSize, x, y);
        }
        if (cell.visited) {
            p.fill(0, 200, 128, 100);
            p.noStroke();
            p.rect(x, y, cellSize, cellSize);
        }
    }

    function removeWalls(a: Cell, b: Cell): void {
        const x = a.i - b.i;
        if (x === 1) {
            a.walls[3] = false;
            b.walls[1] = false;
        } else if (x === -1) {
            a.walls[1] = false;
            b.walls[3] = false;
        }
        const y = a.j - b.j;
        if (y === 1) {
            a.walls[0] = false;
            b.walls[2] = false;
        } else if (y === -1) {
            a.walls[2] = false;
            b.walls[0] = false;
        }
    }

    function checkNeighbors(cell: Cell): Cell | undefined{
        const neighbors: Cell[] = [];

        const top = grid[index(cell.i, cell.j - 1)];
        const right = grid[index(cell.i + 1, cell.j)];
        const bottom = grid[index(cell.i, cell.j + 1)];
        const left = grid[index(cell.i - 1, cell.j)];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            const r = p.floor(p.random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    function index(i: number, j: number): number {
        if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
            return -1;
        }
        return i + j * cols;
    }
}