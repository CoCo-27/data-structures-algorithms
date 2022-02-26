class UndergroundSystem:
    def __init__(self):
        self.passengers = {}
        self.rides = {}

    def checkIn(self, id: int, stationName: str, t: int) -> None:
        self.passengers[id] = {
            'station': stationName,
            'time': t
        }

    def checkOut(self, id: int, stationName: str, t: int) -> None:
        start_station = self.passengers[id]
        time_traveled = t - start_station['time']
        key = start_station['station'] + '-' + stationName

        if self.rides.get(key):
            self.rides[key]['total_time'] += time_traveled
            self.rides[key]['total_rides'] += 1
        else:
            self.rides[key] = {
                'total_time': time_traveled,
                'total_rides': 1
            }

    def getAverageTime(self, startStation: str, endStation: str) -> float:
        key = startStation + '-' + endStation
        return self.rides[key]['total_time'] / self.rides[key]['total_rides']


undergroundSystem = UndergroundSystem()

output = undergroundSystem.checkIn(45, "Leyton", 3)  # null
output = undergroundSystem.checkIn(32, "Paradise", 8)  # null
output = undergroundSystem.checkIn(27, "Leyton", 10)  # null
output = undergroundSystem.checkOut(45, "Waterloo", 15)  # null
output = undergroundSystem.checkOut(27, "Waterloo", 20)  # null
output = undergroundSystem.checkOut(32, "Cambridge", 22)  # null
output = undergroundSystem.getAverageTime("Paradise", "Cambridge")  # 14.00000
output = undergroundSystem.getAverageTime("Leyton", "Waterloo")  # 11.00000
output = undergroundSystem.checkIn(10, "Leyton", 24)  # null
output = undergroundSystem.getAverageTime("Leyton", "Waterloo")  # 11.00000
output = undergroundSystem.checkOut(10, "Waterloo", 38)  # null
output = undergroundSystem.getAverageTime("Leyton", "Waterloo")  # 12.00000


print(output)
