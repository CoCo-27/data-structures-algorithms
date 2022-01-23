import hashlib


class HashTable:
    def __init__(self):
        self.data = []

    def string_to_numer_hash(self, key):
        return int(hashlib.md5(key.encode('utf-8')).hexdigest()[:8], 16)

    def set(self, key, value):
        address = self.string_to_numer_hash(key)
        bucket = self.data[address]

        if not bucket:
            self.data[address] = []
            bucket = self.data[address]

            if len(bucket) > 0:
                # Override previous key if exists
                for item in bucket:
                    if item[0] == key:
                        item = [key, value]
                        return

        # We prevent collisions by pushing pairs to an array
        # e.g. [["grapes", 1000], ["apples", 666]]
        bucket.push([key, value])

    def get(self, key):
        address = self.string_to_numer_hash(key)
        bucket = self.data[address]

        # Non-existent key
        if not bucket:
            return None

        # In case only 1 item in bucket O(n) complexity
        # Most of the time it will be this but in our example we intentionally created a memory table with a length of "2" to trigger collisions
        # In a real life scenerio memory collisions are very rare but we must still account for them
        if len(bucket) == 1:
            return bucket[1]
        # In case of multiple items due to collision
        else:
            for item in bucket:
                if item[0] == key:
                    return item[1]

        # O(n)
        def keys(self):
            pass


hash_table = HashTable()


hash_table.set("grapes", 1000)
hash_table.set("apples", 666)
hash_table.set("apples", 9)

hash_table.get("grapes")  # 1000
hash_table.get("apples")  # 9

# hash_table.keys() # ['grapes', 'apples']
