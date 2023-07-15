import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

import CopyQuestionToClipboard from './copy-to-clipboard';



const supabase = createClient(
  'https://otqpalppwyvrtfrfcyxh.supabase.co',
  process.env.SUPABASE_KEY!)


// const QUESTIONS = [
//   { id: '1', text: 'Que es la pala?' },
//   { id: '2', text: 'Cual es tu nombre real?' },
//   { id: '3', text: 'Cuantos años tienes?' },
// ]


export default async function Questions({params: {id}}: {params:{id:string}}) {

  const question = await supabase
    .from("questions")
    .select("*")
    .eq("id",id)
    .single()
    .then(({ data }) => data as { id: string, text: string })




  return (
    <article className={'grid gap-4'}>
      <Link href="/">← VolverAtras</Link>
      <section>
        <p
          className="bg-gradient-to-tr from-amber-500 to-pink-800 text-xl font-bold text-white p-4 rounded-t-lg"
          >QuestKeys</p>
        <p
          className="bg-white text-black p-4 rounded-b-lg"
          >{ question.text }</p>
      </section>
      <CopyQuestionToClipboard/>
    </article>
  );
}
