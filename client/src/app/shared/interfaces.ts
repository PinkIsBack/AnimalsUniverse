export interface User {
  id: number
  userName: string
  pass: string
  email: string
  phone: number
  image: string
  city: string
  description: string
  whishlist: []
  posts: []
  status: Number
}

export interface Message {
  message: string
}

export interface Post {
  _id?: string
  Name: string
  User?: string
  UserName: string
  Age: number
  Gender: string
  Animal: string
  Price: number
  Description: string
  ImgSrc?: string
  City: string
  Action: string
}

export interface Product {
  _id?: string
  Animal: string
  Name: string
  Price: number
  Category: string
  Description: string
  Manufacture: string
  ImgUrl: string,
  Quantity?: number
}

export interface Service {
  _id?: string
  type: string
  img: string
  name: string
  phone: string
  web: string
  address: string
}

export interface Order {
  date?: Date
  order?: number
  user?: string
  list: any[]
  _id?: string
  price: number
}

export interface OrderProduct {
  name: string
  cost: number
  quantity: number
  _id?: string
}

export interface AnalyticsPage {
  average: number,
  chart: AnalyticsChartItem[]
}

export interface AnalyticsChartItem {
  gain: number,
  order: number,
  label: string
}
export interface Statistics {
  User: string,
  dog: number,
  cat: number,
  others: number,
  food: number,
  toys: number,
  clothes: number,
  _id?: string
}
