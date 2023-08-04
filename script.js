const form=document.querySelector('form');
const resultDiv=document.querySelector('.result');

form.addEventListener('submit',(e)=>{
    e.preventDefault();     //dont want my page to reload
getWordInfo(form.elements[0].value);  //input
    
 } );

 const getWordInfo= async (word)=>{
try{

    resultDiv.innerHTML="Fetching Data...";

    const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data=await response.json();

    let definitions=data[0].meanings[0].definitions[0];

    

    resultDiv.innerHTML=`
    <h2><strong>Word:</strong> ${data[0].word}</h2>
    <p class="partOfSpeech"> ${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning:</strong>${definitions.definition === undefined ? 'Not Found'  : definitions.definition}</p>
    <p><strong>Example:</strong>${definitions.example === undefined ? 'Not Found'  : definitions.example}</p>
    <p><strong>Antonyms:</strong></p>
    
    `;
//for antonyms

if(definitions.antonyms.length === 0){
    resultDiv.innerHTML += `<span>Not Found</span>`;
}
else{
for(let i=0;i<definitions.antonyms.length;i++){
    resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
}
}

//for synonyms
resultDiv.innerHTML +=`<p><strong>Synonyms:</strong></p>`;
if(definitions.synonyms.length === 0){
    resultDiv.innerHTML += `<span>Not Found</span>`;
}
else{
for(let i=0;i<definitions.synonyms.length;i++){
    resultDiv.innerHTML += `<li>${definitions.synonyms[i]}</li>`
}
}


    // Check if phonetics data exists and if audio is available
    resultDiv.innerHTML +=`<p><strong>Audio:</strong></p>`;
    if (data[0].phonetics && data[0].phonetics.length > 0) {
        const audioUrl = data[0].phonetics[0].audio;
        const audio = new Audio(audioUrl);
        audio.controls = true;
        resultDiv.appendChild(audio);
      }
  

//adding read more option

resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`
}


catch(error){
    resultDiv.innerHTML = `<p>Sorry,the word could not be found</p>`;
}


 }