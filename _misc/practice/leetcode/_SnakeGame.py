class SnakeGame:
    def __init__(self, width, height, food):
        self.board = []
        self.snake_position = [0, 0]
        self.food = food
        self.score = 0

        for n in range(height):
            self.board.append([None] * width)

        self.drop_food()

    def drop_food(self):
        if len(self.food) > 0:
            row, col = self.food.pop(0)
            self.board[row][col] = '🍔'

    def move(self, direction):
        if direction == 'R':
            self.snake_position[1] += 1
        elif direction == 'L':
            self.snake_position[1] -= 1
        elif direction == 'U':
            self.snake_position[0] -= 1
        elif direction == 'D':
            self.snake_position[0] += 1

        # game over (wall collision)
        if (
            self.snake_position[0] < 0 or
            self.snake_position[0] > len(self.board) - 1 or
            self.snake_position[1] < 0 or
            self.snake_position[1] > len(self.board[0]) - 1
        ):
            return -1

        # game over (self collision)
        # score = length of snake
        for n in range(self.score):
            pass

        if self.board[self.snake_position[0]][self.snake_position[1]] == '🍔':
            self.board[self.snake_position[0]][self.snake_position[1]] = None
            self.score += 1
            self.drop_food()

        return self.score


# snakeGame = SnakeGame(3, 2, [[1, 2], [0, 1]])

# output = snakeGame.move('R')  # 0
# output = snakeGame.move('D')  # 0
# output = snakeGame.move('R')  # 1
# output = snakeGame.move('U')  # 1
# output = snakeGame.move('L')  # 2
# output = snakeGame.move('U')  # -1


# snakeGame = SnakeGame(1, 2, [[1, 0]])
# output = snakeGame.move('D')
# output = snakeGame.move('D')


snakeGame = SnakeGame(3, 3, [[2, 0], [0, 0], [0, 2], [0, 1], [2, 2], [0, 1]])

output = snakeGame.move('D')
output = snakeGame.move('D')
output = snakeGame.move('R')
output = snakeGame.move('U')
output = snakeGame.move('U')
output = snakeGame.move('L')
output = snakeGame.move('D')
output = snakeGame.move('R')
output = snakeGame.move('R')
output = snakeGame.move('U')
output = snakeGame.move('L')
output = snakeGame.move('L')
output = snakeGame.move('D')
output = snakeGame.move('R')
output = snakeGame.move('U')

print(output)
print(snakeGame.board)
