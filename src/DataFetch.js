import { useEffect, useContext } from "react";
import AuthContext from "./store/AuthContext";

const DataFetch = ({ onDataFetched, numSessions }) => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getSessions = async () => {
      try {
        const response = await fetch(
          "https://kite-session-tracker-default-rtdb.europe-west1.firebasedatabase.app/Sessions.json"
        );
        const responseData = await response.json();
        const sessionsByUser = {};
        const userSessionCount = {};
        const loadedSessions = Object.entries(responseData)
          .map(([key, value]) => {
            return {
              id: key,
              date: value.date,
              name: value.name,
              height: value.height,
              size: value.size,
              spot: value.spot,
              likes: value.likes,
            };
          })
          .sort((a, b) => b.id.localeCompare(a.id))
          .slice(0, numSessions)
          .reverse();

        loadedSessions.forEach((session) => {
          const { name, height } = session;
          const parsedHeight = parseFloat(height);

          if (
            !(name in sessionsByUser) ||
            parsedHeight > sessionsByUser[name]
          ) {
            sessionsByUser[name] = parsedHeight;
          }
          if (name in userSessionCount) {
            userSessionCount[name]++;
          } else {
            userSessionCount[name] = 1;
          }
        });

        const uniqueNames = [
          ...new Set(loadedSessions.map((session) => session.name)),
        ];

        let highestJump = 0;
        let mostVisitedSpot = "-";
        let totalJumps = 0;
        const spotCounts = {};

        for (const key in responseData) {
          if (responseData[key].name === authCtx.nameInput) {
            const height = parseFloat(responseData[key].height);
            const spot = responseData[key].spot;

            if (height > highestJump) {
              highestJump = height;
            }

            if (spot in spotCounts) {
              spotCounts[spot]++;
            } else {
              spotCounts[spot] = 1;
            }

            let maxCount = 0;

            for (const spotKey in spotCounts) {
              if (spotCounts[spotKey] > maxCount) {
                maxCount = spotCounts[spotKey];
                mostVisitedSpot = spotKey;
              }
            }
            totalJumps++;
          }
        }

        uniqueNames.forEach((name) => {
          sessionsByUser[name] = {
            height: sessionsByUser[name],
            sessions: userSessionCount[name],
          };
        });
        authCtx.updateUserData(highestJump, mostVisitedSpot, totalJumps);

        onDataFetched(
          loadedSessions,
          sessionsByUser,
          uniqueNames,
          totalJumps,
          highestJump,
          mostVisitedSpot
        );
      } catch (error) {
        console.error("Error fetching sessions:", error.message);
      }
    };

    getSessions();
  }, [onDataFetched, authCtx, numSessions]);

  return null;
};

export default DataFetch;
