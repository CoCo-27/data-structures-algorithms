class FileSystem:
    def __init__(self):
        self.files = {}
        self.cache = {}

    @staticmethod
    def is_root_path(segments):
        return len(segments) == 1

    @staticmethod
    def is_last_segment(index, segments_len):
        return index == segments_len - 1

    @staticmethod
    def TrieNode(value):
        return {
            'value': value
        }

    def createPath(self, path: str, value: int) -> bool:
        if len(path) == 0 or path == '/' or path[0] != '/' or self.cache.get(path):
            return False

        segments = path.split('/')
        segments.pop(0)
        segments_len = len(segments)

        first_segment = segments[0]
        if self.is_root_path(segments):
            if self.files.get(first_segment):
                return False
            else:
                self.files[first_segment] = self.TrieNode(value)
                self.cache[path] = value
                return True

        last_block = self.files
        for (index, segment) in enumerate(segments):
            is_last = self.is_last_segment(index, segments_len)

            if not is_last and not last_block.get(segment):
                return False

            if is_last:
                if last_block.get(segment):
                    return False
                else:
                    last_block[segment] = self.TrieNode(value)
                    self.cache[path] = value
                    return True

            last_block = last_block[segment]

    def get(self, path: str) -> int:
        if self.cache.get(path):
            return self.cache[path]

        segments = path.split('/')
        segments.pop(0)
        segments_len = len(segments)

        first_segment = segments[0]
        if self.is_root_path(segments):
            if self.files.get(first_segment):
                return self.files[first_segment]['value']
            else:
                return -1

        last_block = self.files
        for (index, segment) in enumerate(segments):
            if not last_block.get(segment):
                return -1

            if self.is_last_segment(index, segments_len):
                return last_block[segment]['value']

            last_block = last_block[segment]
