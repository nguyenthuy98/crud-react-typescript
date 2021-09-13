export interface Song {
    id: number,
    avatar: string,
    creator: string,
    music: string,
    title: string
}

export interface Props {
    currentSong: Song,
    handleClose(id: any) : void
}