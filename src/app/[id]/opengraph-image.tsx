import { createClient } from '@supabase/supabase-js';
import { ImageResponse } from 'next/server';

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'


export const contentType = 'image/png'


const supabase = createClient(
  'https://otqpalppwyvrtfrfcyxh.supabase.co',
  process.env.SUPABASE_KEY!)

// Image generation
export default async function Image({params: {id}}: {params:{id:string}}) {

  const question = await supabase
    .from("questions")
    .select("*")
    .eq("id",id)
    .single()
    .then(({ data }) => data as { id: string, text: string })

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 64,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',

        }}
      >
        <div style={{
          background: 'linear-gradient(90deg, #f69813 0%, #cb7525 35%, rgba(255,80,0,1) 100%)',
          color:'white',
          padding:'35px 15px',
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}>
          QuestKeys
        </div>
        <div
          style={{
            flex:'1',
            padding:'35px 15px',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
          }}
        >
          {question.text}
        </div>
      </div>
    ),
    // ImageResponse options
    {
      width: 1200,
      height: 630,
    }
  )
}
