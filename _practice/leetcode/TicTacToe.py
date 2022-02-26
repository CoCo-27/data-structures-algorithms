class TicTacToe:
    def __init__(self, n: int):
        self.board = []
        for x in range(n):
            rows = []
            for x in range(n):
                rows.append(None)
            self.board.append(rows)

    def move(self, row: int, col: int, player: int) -> int:
        self.board[row][col] = player
        return self.check_winner(row, col, player)

    def check_winner(self, row, col, player):
        def check_horizontal():
            is_winner = True
            for mark in self.board[row]:
                if mark != player or mark == None:
                    is_winner = False
            return is_winner

        def check_vertical():
            is_winner = True
            for row in self.board:
                if row[col] != player or row[col] == None:
                    is_winner = False
            return is_winner

        def check_diagonal():
            size = len(self.board[0])

            indices = []
            for x in range(0, size):
                indices.append(x)

            def check_left():
                is_winner = True
                for index in indices:
                    left = self.board[index][index]
                    if left != player or left == None:
                        is_winner = False
                return is_winner

            def check_right():
                is_winner = True
                indices.reverse()
                for (index, i) in enumerate(indices):
                    right = self.board[i][index]
                    if right != player or right == None:
                        is_winner = False
                return is_winner

            return check_right() or check_left()

        if check_horizontal():
            return player
        elif check_vertical():
            return player
        elif check_diagonal():
            return player

        return 0
