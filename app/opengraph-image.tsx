import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'سایکو - سایتساز حرفهای ایرانی'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '30px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: 'white',
              margin: '0',
              textAlign: 'center',
            }}
          >
            سایکو
          </h1>
          <p
            style={{
              fontSize: '40px',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: '20px 0 0 0',
              textAlign: 'center',
            }}
          >
            ساخت وبسایت حرفهای در 5 دقیقه
          </p>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '40px',
            }}
          >
            <div
              style={{
                background: 'white',
                color: '#667eea',
                padding: '15px 30px',
                borderRadius: '50px',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              بدون کدنویسی
            </div>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '50px',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              +10,000 کاربر
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
