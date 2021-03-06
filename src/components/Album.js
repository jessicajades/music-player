import React, { Component } from "react";
import albumData from "./../data/albums";
import PlayerBar from "./PlayerBar";
import "./style.css";

class Album extends Component {
    constructor(props) {
        super(props);

        const album = albumData.find((album) => {
            return album.slug === this.props.match.params.slug;
        });

        this.state = {
            album: album,
            currentSong: album.songs[0],
            currentTime: 0,
            duration: album.songs[0].duration,
            volume: 0.75,
            isPlaying: false,
        };

        this.audioElement = document.createElement("audio");
        this.audioElement.src = album.songs[0].audioSrc;
    }

    componentDidMount() {
        this.eventListeners = {
            timeupdate: (e) => {
                this.setState({ currentTime: this.audioElement.currentTime });
            },
            durationchange: (e) => {
                this.setState({ duration: this.audioElement.duration });
            },
            volumechange: (e) => {
                this.setState({ volume: this.audioElement.volume });
            },
        };
        this.audioElement.addEventListener(
            "timeupdate",
            this.eventListeners.timeupdate
        );
        this.audioElement.addEventListener(
            "durationchange",
            this.eventListeners.durationchange
        );
        this.audioElement.addEventListener(
            "volumechange",
            this.eventListeners.volumechange
        );
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener(
            "timeupdate",
            this.eventListeners.timeupdate
        );
        this.audioElement.removeEventListener(
            "durationchange",
            this.eventListeners.durationchange
        );
        this.audioElement.removeEventListener(
            "volumechange",
            this.eventListeners.volumechange
        );
    }

    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true });
    }

    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false });
    }

    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
    }

    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;

        if (this.state.isPlaying === true && isSameSong === true) {
            this.pause();
        } else {
            if (!isSameSong) {
                this.setSong(song);
            }
            this.play();
        }
    }

    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(
            (song) => this.state.currentSong === song
        );
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex(
            (song) => this.state.currentSong === song
        );
        const newIndex = Math.min(
            currentIndex + 1,
            this.state.album.songs.length - 1
        );
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({ currentTime: newTime });
    }

    handleVolumeChange(e) {
        const newVolume = e.target.value;
        this.audioElement.volume = newVolume;
        this.setState({ volume: newVolume });
    }

    displayIndex(song, index) {
        const isSameSong = this.state.currentSong === song;

        if (this.state.isPlaying === true && isSameSong === false) {
            return <span>{index + 1}</span>;
        } else if (this.state.isPlaying === true && isSameSong === true) {
            return <span className="ion-pause"></span>;
        } else if (this.state.isPlaying === false && isSameSong === true) {
            return <span className="ion-play"></span>;
        } else {
            return <span>{index + 1}</span>;
        }
    }

    formatTime(secs) {
        let mins = Math.floor(secs / 60);
        let seconds = Math.floor(secs - mins * 60);

        let timeString =
            mins.toString().padStart(2, "0") +
            ":" +
            seconds.toString().padStart(2, "0");

        return timeString ? timeString : "0:00";
    }

    render() {
        return (
            <section className="album">
                <div id="album-organize">
                    <section id="album-image">
                        <img
                            id="album-cover-art"
                            src={this.state.album.albumCover}
                            alt="album cover art"
                        />
                    </section>
                    <div id="right-side">
                        <div className="album-details">
                            <h1 id="album-title">{this.state.album.title}</h1>
                            <h2 className="artist">
                                {this.state.album.artist}
                            </h2>
                            <div id="release-info">
                                {this.state.album.releaseInfo}
                            </div>
                        </div>

                        <table id="song-list">
                            <colgroup>
                                <col id="song-number-column" />
                                <col id="song-title-column" />
                                <col id="song-duration-column" />
                            </colgroup>
                            <tbody>
                                {this.state.album.songs.map((song, index) => (
                                    <tr
                                        key={index}
                                        className="song"
                                        onClick={() =>
                                            this.handleSongClick(song)
                                        }
                                    >
                                        <td>
                                            {this.displayIndex(song, index)}
                                        </td>
                                        <td id="song-title" colSpan="3">
                                            {song.title}
                                        </td>
                                        <td>
                                            {this.formatTime(song.duration)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <PlayerBar
                    isPlaying={this.state.isPlaying}
                    currentSong={this.state.currentSong}
                    currentTime={this.state.currentTime}
                    duration={this.state.duration}
                    volume={this.state.volume}
                    handleSongClick={() =>
                        this.handleSongClick(this.state.currentSong)
                    }
                    handlePrevClick={() => this.handlePrevClick()}
                    handleNextClick={() => this.handleNextClick()}
                    handleTimeChange={(e) => this.handleTimeChange(e)}
                    handleVolumeChange={(e) => this.handleVolumeChange(e)}
                    formatTime={(e) => this.formatTime(e)}
                />
            </section>
        );
    }
}

export default Album;
