export interface PlaylistItemsResponse {
  href: string
  items: Song[]
  limit: number
  next: string
  offset: number
  previous: null
  total: number
}

export interface Song {
  added_at: string
  added_by: AddedBy
  is_local: boolean
  primary_color: null
  track: Track
  video_thumbnail: VideoThumbnail
}

export interface AddedBy {
  external_urls: ExternalUrls
  href: string
  id: string
  type: string
  uri: string
  name?: string
}

export interface Artist {
  external_urls: ExternalUrls
  href: string
  id: string
  type: string
  uri: string
  name?: string
}

export interface ExternalUrls {
  spotify: string
}

export interface Track {
  preview_url: null
  available_markets: string[]
  explicit: boolean
  type: string
  episode: boolean
  track: boolean
  album: Album
  artists: Artist[]
  disc_number: number
  track_number: number
  duration_ms: number
  external_ids: ExternalIDS
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  popularity: number
  uri: string
  is_local: boolean
}

export interface Album {
  available_markets: string[]
  type: string
  album_type: string
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  uri: string
  artists: AddedBy[]
  external_urls: ExternalUrls
  total_tracks: number
}

export interface Image {
  height: number
  url: string
  width: number
}

export interface ExternalIDS {
  isrc: string
}

export interface VideoThumbnail {
  url: null
}
