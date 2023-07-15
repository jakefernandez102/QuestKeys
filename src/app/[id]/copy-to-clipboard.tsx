"use client"
const CopyQuestionToClipboard = () => {

  async function handleClick(){
    const image = await fetch(`${location.pathname}/opengraph-image`)
                      .then(res => res.blob())
    await navigator.clipboard.write([
      new ClipboardItem({
        [image.type]: image,
      })
    ]);

    alert('Imagen copiada en el portapapeles')
  }

  return (
    <button
      type="button"
      className="bg-orange-700 text-white rounded-lg p-4 text-lg font-bold uppercase hover:bg-lime-700 transition-colors  w-full"
      onClick={()=>handleClick()}
    >
        Copiar al portapapeles
    </button>
  )
}

export default CopyQuestionToClipboard
