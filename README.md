
# QuantumTube

QuantumTube is a [Youtube](https://youtube.com) frontend that focuses on privacy, it has a modern interface (which kinda looks better than normal youtube), and all data (subscriptions, liked videos, etc) is stored locally in localStorage and not sent of to some random server like google's, there are no ads and gives you a nice experience

[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)

## Screenshots

Getting Started:

![Getting Started](https://raw.githubusercontent.com/JuviGamez/quantumtube/refs/heads/main/241231_18h45m38s_screenshot.png)

Home Page:

![Home Page](https://raw.githubusercontent.com/JuviGamez/quantumtube/refs/heads/main/241231_18h51m45s_screenshot.png)


## Documentation

The documentation is avaliable at https://quantumtube-docs.vercel.app

## FAQ

#### Are there any ads?

No, but your adblocker might block some ads that are not visible, all the ads are either hidden or not visible, this is because we fetch the videos directly from Youtube, because we can't afford the servers to host the videos, but don't worry, till this project completely finishes, there will be 0 ads that your adblocker will see

#### Do you have Shorts?

Yes, infact we do have Youtube Shorts, but it's very much in beta and thats why its locked behind a screen that says its in beta

#### Why do I see the Youtube Video Player appear sometimes when i'm watching videos?

Basically, the problem is that we use the official youtube embed for showing you a video, and that's why, don't worry though, no ad's or cookies are being taken by google, we are blocking all of them, and soon, you will not be able to see the Youtube Video Player

#### Why can't I write any comments?

This is because we haven't added functionality to write comments, and there's a reason, basically, the comments are being fetched from youtube itself, but if we made functionality to add comments, there would be no way that we could add those comments to youtube, so it technically makes it useless, we may add our own comment section, where QuantumTube users could type their comments, and that would be displayed only on QuantumTube

#### Why did my home page on QuantumTube suddenly disappear?

This is because to show you our videos, we use the Youtube Data API v3, which has a quota, which is 10,000 requests per day, which may run out, if we get enough users though, we may add functionality to switch between different api's if one api's quota has been reached
## Related

Here are some related projects

 - [PokeTube](https://poketube.fun/)
 - [Invidious](https://github.com/iv-org/invidious)


## Tech Stack

**Client:** Vite + React


## Downloads

#### Linux (Arch or Arch-based linux distros): [download .pacman file from releases](https://github.com/JuviGamez/quantumtube/releases/), then cd into your downloads folder and run the following command:
```bash
sudo pacman -U quantum-tube-desktop-X.X.X.pacman
```
*"X.X.X" is the version number, please change it to the latest version*

#### Linux (other distros): [download .appimage from releases](https://github.com/JuviGamez/quantumtube/releases/)

> [!TIP] 
> Use [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher) to integrate the AppImage with your application launcher

#### Windows: [download exe from releases](https://github.com/JuviGamez/quantumtube/releases/) or [download setup from releases](https://github.com/JuviGamez/quantumtube/releases/) 

#### MacOS: coming soon

## Web Version

The Website Version is avaliable at https://quantumtube.vercel.app/

## Build desktop version from source

*building from source is temporarily not available, there's also a new repository called "quantumtube-desktop" that will eventually have all code for desktop versions (electron) which will let you build the desktop version from source*

Clone the project

```bash
  git clone https://github.com/JuviGamez/quantumtube
```

Go to the project directory

```bash
  cd quantumtube
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run electron:build
```
## Run web version locally

Clone the project

```bash
  git clone https://github.com/JuviGamez/quantumtube
```

Go to the project directory

```bash
  cd quantumtube
```

Install dependencies

```bash
  npm install
```

Run server

```bash
  npm run dev
```
## License

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://github.com/JuviGamez/quantumtube?tab=GPL-3.0-1-ov-file)


## Contributing

*`contributing.md` is still not developed, but feel free to contribute! there are no rules/limits for now*

Contributions are always welcome!

See `contributing.md` for ways to get started.

