# Web Development Project 2 - *Name of App Here*

Submitted by: **Phung Tran**

This web app: **A Emoji Pictionary game which lets users play a flashcard guessing game using emoji phrases. Each card shows emojis on the front, and when flipped, reveals the phrase or movie title they represent. Users can flip cards back and forth, and click “Next” to see a new random card**

Time spent: **8** hours spent in total

## Required Features

The following **required** functionality is completed:


- [x] **The app displays the title of the card set, a short description, and the total number of cards**
  - [x] Title of card set is displayed 
  - [x] A short description of the card set is displayed 
  - [x] A list of card pairs is created
  - [x] The total number of cards in the set is displayed 
  - [x] Card set is represented as a list of card pairs (an array of dictionaries where each dictionary contains the question and answer is perfectly fine)
- [x] **A single card at a time is displayed**
  - [x] Only one half of the information pair is displayed at a time
- [x] **Clicking on the card flips the card over, showing the corresponding component of the information pair**
  - [x] Clicking on a card flips it over, showing the back with corresponding information 
  - [x] Clicking on a flipped card again flips it back, showing the front
- [x] **Clicking on the next button displays a random new card**

The following **optional** features are implemented:

- [ ] Cards contain images in addition to or in place of text
  - [ ] Some or all cards have images in place of or in addition to text
- [x] Cards have different visual styles such as random pastel background colors


The following **additional** features are implemented:

* [x] List anything else that you added to improve the site's functionality!
* [x] Accessibility: keyboard flip support (Space/Enter), ARIA labels (role="button", aria-pressed)
* [x] Motion sensitivity: respects “prefers-reduced-motion” in CSS
* [x] Gradient animated background for polish
* [x] Random pastel card front colors for variety


## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='public/EmojiPictionary.gif' title='Video Walkthrough' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with Kap  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Since this project didn’t have many complex features, the most challenging part for me was coming up with ideas to make the flashcards as appealing as possible. I decided to turn the flashcards into a mini game with a 3D flip effect, and I also added a gradient background to make the interface more engaging and visually appealing for users.

## License

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.