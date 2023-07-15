import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';



const supabase = createClient(
  'https://otqpalppwyvrtfrfcyxh.supabase.co',
  process.env.SUPABASE_KEY!)

async function getQuestions() {
  const questions = await supabase
    .from("questions")
    .select("*")

    .then(({ data }) => data as { id: string, text: string }[])
  return questions;
}
// const QUESTIONS = [
//   { id: '1', text: 'Que es la pala?' },
//   { id: '2', text: 'Cual es tu nombre real?' },
//   { id: '3', text: 'Cuantos años tienes?' },
// ]


export default async function Home() {



  const questions = await getQuestions();

  const handleSubmit = async (formData: FormData) =>{
    "use server";

    const question = formData.get('question');
    const id  = Date.now().toString()

    await supabase.from("questions").insert({text:question,id});
    revalidatePath('/');
    redirect(`/${id}`)
  }

  return (
    <div className="grid gap-8">
      <form
        className="grid gap-4"
        action={handleSubmit}
      >
        <section>
          <p
            className="bg-gradient-to-tr from-amber-500 to-pink-800 text-xl text-xl font-bold text-white p-4 rounded-t-lg"
          >
            QuestKeys
          </p>
          <input
            placeholder="Quiero saber ..."
            className="w-full bg-white text-black p-4 rounded-b-lg"
            name='question'
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
          questions.map((question) => (
            <Link
              href={`/${question.id}`}
              key={ question.id }
            >
              <p
                className="bg-gradient-to-tr from-amber-500 to-pink-800 text-xl font-bold text-white p-4 rounded-t-lg"
                >QuestKeys</p>
              <p
                className="bg-white text-black p-4 rounded-b-lg"
                >{ question.text }</p>
            </Link>
          ) )
        }
      </article>
    </div>
  );
}
