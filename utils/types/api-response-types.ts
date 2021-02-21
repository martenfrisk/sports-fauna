export interface Filters {
  dateFrom: string
  dateTo: string
  permission: string
  limit: number
}

export interface Area {
  name: string
  code: string
  ensignUrl: string
}

export interface Competition {
  id: number
  name: string
  area: Area
}

export interface Season {
  id: number
  startDate: string
  endDate: string
  currentMatchday: number
  winner?: any
}

export interface Odds {
  msg: string
}

export interface FullTime {
  homeTeam?: any
  awayTeam?: any
}

export interface HalfTime {
  homeTeam?: any
  awayTeam?: any
}

export interface ExtraTime {
  homeTeam?: any
  awayTeam?: any
}

export interface Penalties {
  homeTeam?: any
  awayTeam?: any
}

export interface Score {
  winner?: any
  duration: string
  fullTime: FullTime
  halfTime: HalfTime
  extraTime: ExtraTime
  penalties: Penalties
}

export interface HomeTeam {
  id: number
  name: string
}

export interface AwayTeam {
  id: number
  name: string
}

export interface Match {
  id: number
  competition: Competition
  season: Season
  utcDate: Date
  status: string
  matchday: number
  stage: string
  group: string
  lastUpdated: Date
  odds: Odds
  score: Score
  homeTeam: HomeTeam
  awayTeam: AwayTeam
  referees: any[]
}

export interface FootballDataMatchResponse {
  count: number
  filters: Filters
  matches: Match[]
}
