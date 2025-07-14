function knightMoves(square1, square2) {
    let visitedSquares = []
    let parentMap = new Map(); 
    visitedSquares.push(square1);
    let queue = []; 
    queue.push(square1);
    if (square1 == square2) {
        return 0;
    }
    let moves = 0; 
    while (queue.length > 0) {
        let len = queue.length; 
        moves += 1; 
        for (let i = 0; i < len; i++) {
            let square = queue.shift(); 
            let children = getPossibleMoves(square); 
            let keyFormParent = square[0] + "," + square[1];
            for (let child of children) {
                if (!hasVisited(visitedSquares, child)) {
                    visitedSquares.push(child); 
                    queue.push(child);
                    let keyForm = child[0] + "," + child[1];  
                    parentMap.set(keyForm, keyFormParent);
                    if (child[0] == square2[0] && child[1] == square2[1]) {
                        reconstructPath(square1[0] + "," + square1[1], square2[0] + "," + square2[1], parentMap); 
                        return moves;
                    }
                }
                
            }
        }
    }

}

function getPossibleMoves(square) {
    let output = [];

    // 1, 2
    if (square[0] < 7 && square[1] < 6) {
        output.push([square[0] + 1, square[1] + 2]);
    }

    // -1, 2
    if (square[0] > 0 && square[1] < 6) {
        output.push([square[0] - 1, square[1] + 2]);
    } 

    // 1, -2
    if (square[0] < 7 && square[1] > 1) {
        output.push([square[0] + 1, square[1] - 2]);
    }

    // -1, -2
    if (square[0] > 0 && square[1] > 1) {
        output.push([square[0] - 1, square[1] - 2]);
    }

    // 2, 1
    if (square[0] < 6 && square[1] < 7) {
        output.push([square[0] + 2, square[1] + 1]);
    }

    // -2, 1
    if (square[0] > 1 && square[1] < 7) {
        output.push([square[0] - 2, square[1] + 1]);
    }

    // 2, -1
    if (square[0] < 6 && square[1] > 0) {
        output.push([square[0] + 2, square[1] - 1]);
    }

    // -2, -1
    if (square[0] > 1 && square[1] > 0) {
        output.push([square[0] - 2, square[1] - 1]);
    }

    return output; 

}

function hasVisited(visitedSquares, square) {
    for (let space of visitedSquares) {
        if (square[0] == space[0] && square[1] == space[1]) {
            return true; 
        }
    }
    return false; 
}

function reconstructPath(start, end, map) {
    let path = [];
    path.push(end);
    let square = end; 
    while (true) {
        let parent = map.get(square); 
        path.push(parent);
        square = parent; 
        if (parent == start) {
            break;
        }
    }
    for (let i = path.length - 1; i >= 0; i--) {
        let num = path[i];
        console.log(num);
    }
}

console.log(knightMoves([7, 7], [0, 0]));