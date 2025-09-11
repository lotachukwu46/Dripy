// lib/axios.ts - CONFIGURATION FOR REAL BACKEND
import axios from 'axios'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
})

export default API