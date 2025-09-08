import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // Mock API response - replace with actual API call to your Node backend
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return NextResponse.json({
    success: true,
    user: {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
      league: 'bronze'
    },
    token: 'mock-jwt-token'
  })
}