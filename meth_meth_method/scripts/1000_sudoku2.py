


def isFull(board):
    for x in range(0, 9):
        for y in range(0, 9):
            if board[x][y] == 0:
                return False
    return True

def findPossiblePlays(board, row, col):
    possiblePlays = {}
    for i in range(1, 10):
        possiblePlays[i] = 0 # set to no

    for y in range(0, 9):
        if not board[i]
