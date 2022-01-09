# GTA:O Discounts API
NodeJS API to query the latest discounts and events of GTA Online. App live [here](https://gtao-discounts-api.herokuapp.com).

## Justification
While GTAV counts with an ["official" API](https://github.com/gta5-map/Social-Club-API-cheat-sheet) for player statistics, there's currently no systematic way of retrieving
information about the current events and discounts for the online part of the game. The most reliable way is to scrape the [Online Events Newswire](https://socialclub.rockstargames.com/events), taking
into account that updates roll out every Thursday at 9 a.m. GMT.

## Install

1. Clone the repo:

    ```sh
    gh repo clone POWRFULCOW89/gtao-discounts-api
    ```

    or [download](https://github.com/POWRFULCOW89/gtao-discounts-api/archive/refs/heads/master.zip) as ZIP. 

2. Install the dependencies:

    ```sh
    npm i 
    ```

3. And run the app:

    ```sh
    npm start
    ```

## Sample response

```json
{
    "week": "JANUARY 6, 2022 - JANUARY 12, 2022\n",
    "events": [
        "2x Gta$ And Rp On The Nightlife Leak Finale",
        "2x Gta$ And Rp On Specialist+ Security Contracts",
        "Collect The Rockstar Studio Colors Sweater By Visiting The Music Studio",
        "3x Gta$ And Rp On Power Play",
        "This Week’s Car Meet Prize Ride: The Annis Euros",
        "Try Out The Vapid Dominator Asp, Dinka Rt3000, And Übermacht Cypher On The Test Track",
        "This Week On The Podium: The Coil Raiden"
    ],
    "discounts": [
        "25% off Enus Deity",
        "50% off HVY Insurgent",
        "25% off TM-02 Khanjali",
        "40% off Rhino Tank",
        "40% off Anti-Aircraft Trailer",
        "30% off Överflöd Imorgon",
        "40% off Pfister Neon"
    ],
    "date": "2022-01-09T03:18:05.100Z"
}
```
