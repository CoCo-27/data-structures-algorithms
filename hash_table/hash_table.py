# a hash table is just an array in the background, the key is converted to a numeric index using a hash function (relative to the size of the array)
# this is the position where the value is stored, we also store the key in case we need to do collision resolution
# collisions happen when the same index is generated for 2 different keys, this is much more likely if the array size is small
# in this case we need to store both key and value pairs and loop through these to update only the one that changed
class HashTable:
    def __init__(self, size):
        self.data = [None] * size

    # can be any fast hash algorithm like MD5, etc.
    # the main purpose is to always return the same value given the same input
    def make_hash(self, key):
        hash = 0
        i = 0
        for char in key:
            hash = hash + ord(char) * i % len(self.data)
            i += 1
        return hash

    def set(self, key, value):
        address = self.make_hash(key)
        bucket = self.data[address]

        if not bucket:
            self.data[address] = []
            bucket = self.data[address]

        elif len(bucket) > 0:
            # override previous key with new value (if exists)
            for item in bucket:
                if item[0] == key:
                    item[1] = value
                    return self.data

        # we prevent collisions by pushing pairs to an array
        # e.g. [["grapes", 1], ["apples", 2]]
        bucket.append([key, value])
        return self.data

    def get(self, key):
        address = self.make_hash(key)
        bucket = self.data[address]

        # non existent key
        if not bucket:
            return None

        # in case of only 1 item in the bucket it's O(1) complexity which is the common case
        # most of the time it will be this but in our example we intentionally created a memory table with a length of "2" to trigger collisions
        if len(bucket) == 1:
            return bucket[0][1]
        # in case of multiple items due to collision O(n)
        else:
            for item in bucket:
                if item[0] == key:
                    return item[1]

    # O(n)
    def keys(self):
        keys = []
        for buckets in self.data:
            if buckets:
                if len(buckets) == 1:
                    keys.append(buckets[0][0])
                # collision
                else:
                    for bucket in buckets:
                        keys.append(bucket[0])
        return keys


hash_table = HashTable(2)

print(hash_table.set("grapes", 1))  # [None, [['grapes', 1]]]
print(hash_table.set("apples", 2))  # [None, [['grapes', 1], ['apples', 2]]]
print(hash_table.set("apples", 3))  # [None, [['grapes', 1], ['apples', 3]]]

print(hash_table.get("grapes"))  # 1
print(hash_table.get("apples"))  # 3

print(hash_table.keys())  # ['grapes', 'apples']
