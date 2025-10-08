# Web Development Project 3 – Emoji Pictionary

Submitted by: **Phung Tran**  
Live site: https://flashcards-emoji-part2.netlify.app  
Repo: https://github.com/PaulinePhungTran/flashcards-emoji-part2

This web app is a flashcard guessing game built with React. Each card shows emojis; you type your guess **before** flipping. The app gives instant feedback, supports fuzzy matching (ignores case/punctuation), keyboard shortcuts, and lets you mark mastered cards to remove them from the deck.

Time spent: **4** hours in total

## Required Features

The following **required** functionality is completed:

- [x] **The user can enter their guess into an input box *before* seeing the flipside of the card**
  - Application features a clearly labeled input box with a submit button where users can type in a guess
  - Clicking on the submit button with an **incorrect** answer shows visual feedback that it is wrong 
  - Clicking on the submit button with a **correct** answer shows visual feedback that it is correct
- [x] **The user can navigate through an ordered list of cards**
  - A forward/next button displayed on the card navigates to the next card in a set sequence when clicked
  - A previous/back button displayed on the card returns to the previous card in the set sequence when clicked
  - Both the next and back buttons have a visual indication when the user is at the beginning or end (buttons are disabled)

## Optional Features

- [ ] Users can use a shuffle button to randomize the order of the cards
  - Cards remain in the same sequence unless the shuffle button is clicked 
  - Cards change to a random sequence once the shuffle button is clicked
- [x] A user’s answer may be counted as correct even when it is slightly different from the target answer
  - Answers are considered correct even if they only partially match the answer on the card 
  - Examples: ignoring uppercase/lowercase discrepancies, ignoring punctuation discrepancies, matching only for a particular part of the answer rather than the whole answer
- [ ] A counter displays the user’s current and longest streak of correct responses
  - The current counter increments when a user guesses an answer correctly
  - The current counter resets to 0 when a user guesses an answer incorrectly
  - A separate counter tracks the longest streak, updating if the value of the current streak counter exceeds the value of the longest streak counter 
- [x] A user can mark a card that they have mastered and have it removed from the pool of displayed cards
  - The user can mark a card to indicate that it has been mastered
  - Mastered cards are removed from the pool of displayed cards and added to a list of mastered cards

## Additional Features

- [x] Hint appears after 2 incorrect attempts (shows first letter)
- [x] Keyboard shortcuts: **Enter** submits; **← / →** navigate cards
- [x] Accessible announcements on result feedback (`aria-live`)

## Video Walkthrough

<img src="https://i.imgur.com/kycrBJV.gif" width="700" alt="Emoji Pictionary walkthrough" />

GIF created with **Kap**.

## Notes

Some small challenges I ran into:
- Netlify showing an older build title until I pushed latest changes & redeployed.
- Managing “mastered” cards without breaking next/previous navigation (I solved this by tracking original indices and rebuilding the remaining deck on the fly).
- Implementing fuzzy matching cleanly (Unicode‐aware lowercasing + removing punctuation/spaces).

## License

Copyright 2025 Phung Tran

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
