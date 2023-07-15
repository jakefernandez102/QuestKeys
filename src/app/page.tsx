import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://otqpalppwyvrtfrfcyxh.supabase.co',
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90cXBhbHBwd3l2cnRmcmZjeXhoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4OTI5NjEyMywiZXhwIjoyMDA0ODcyMTIzfQ.UE2eqP4K0H9ztZ-51eTXWSf-tB9QYHPgBBhSu0zXinI")

async function getQuestions() {
  const questions = await supabase
    .from("questions")
    .select("*")
    .then(({ data }) => data as { id: string, text: string }[])
 console.log('QUESTIONS array ',questions);
  return questions;
}
const QUESTIONS = [
  { id: '1', text: 'Que es la pala?' },
  { id: '2', text: 'Cual es tu nombre real?' },
  { id: '3', text: 'Cuantos años tienes?' },
]


export default async function Home() {

  const questions = await getQuestions();
console.log(questions);
  return (
    <div className="grid gap-8">
      <form className="grid gap-4">
        <section>
          <p
            className="bg-gradient-to-tr from-amber-500 to-pink-800 text-xl text-xl font-bold text-white p-4 rounded-t-lg"
          >
            QuestKeys
          </p>
          <input
            placeholder="Quiero saber ..."
            className="w-full bg-white text-black p-4 rounded-b-lg"
          >

          </input>
        </section>
        <button
          type="submit"
          className="bg-orange-700 text-white rounded-lg p-4 text-lg font-bold uppercase hover:bg-lime-700 transition-colors  w-full"
        >
            Enviar Pregunta
        </button>
      </form>
      <hr className="opacity-30"/>
      <article
        className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(230px,1fr))]"
      >
        {
          QUESTIONS.map((question) => (
            <section
              key={ question.id }
            >
              <p
                className="bg-gradient-to-tr from-amber-500 to-pink-800 text-xl font-bold text-white p-4 rounded-t-lg"
                >QuestKeys</p>
              <p
                className="bg-white text-black p-4 rounded-b-lg"
                >{ question.text }</p>
            </section>
          ) )
        }
      </article>
    </div>
  );
}
