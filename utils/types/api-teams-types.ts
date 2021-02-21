
export interface Area {
  id: number
  name: string
}

export interface Competition {
  id: number
  area: Area
  name: string
  code: string
  plan: string
  lastUpdated: Date
}

export interface Season {
  id: number
  startDate: string
  endDate: string
  currentMatchday: number
  winner?: any
}

export interface Area2 {
  id: number
  name: string
}

export interface Team {
  id: number
  area: Area2
  name: string
  shortName: string
  tla: string
  crestUrl: string
  address: string
  phone: string
  website: string
  email: string
  founded?: number
  clubColors: string
  venue: string
  lastUpdated: Date
}

export interface Response {
  count: number
  filters: unknown
  competition: Competition
  season: Season
  teams: Team[]
}
