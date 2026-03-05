const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all') // promise of response
    .then(res => res.json()) // promise of json data
    .then(json => displayLesson(json.data));
}

const removeActiveClass = () => {
    const lessonAllBtn = document.querySelectorAll(".lesson-btn");
    // console.log(lessonAllBtn); 
    lessonAllBtn.forEach(btn => {
        btn.classList.remove("active");
    });
}

const loadLevelWord = (id) => {
    
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();  // remove active class from all buttons
        const clickBtn =document.getElementById(`lesson-btn-${id}`);
        // console.log(clickBtn);
        clickBtn.classList.add("active");
        displayLevelWord(data.data);
    });
}

const displayLevelWord =(words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    if (words.length == 0){
        wordContainer.innerHTML = `
        <div
        class="text-center bg-sky-100 col-span-full rounded-sm py-10 space-y-10"
      >
        <img class="inline-block" src="assets/alert-error.png" alt="" />
        <p class="text-xl font-medium text-gray-500">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="text-5xl font-semibold">নেক্সট Lesson এ যান</h2>
      </div>
        `;
        return;
    }

//     {
//     "id": 82,
//     "level": 1,
//     "word": "Car",
//     "meaning": "গাড়ি",
//     "pronunciation": "কার"
// }

    words.forEach(word => {
        // console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
         <div
        class="bg-blue-50 px-2 py-10 text-center rounded-xl shadow-sm space-y-3"
      >
        <h2 class="text-3xl font-bold">${word.word ? word.word : "Word is not found"}</h2>
        <p class="text-lg">Meaning /Pronunciation</p>
        <p class="text-2xl font-semibold">
        "${word.meaning ? word.meaning : "Meaning is not found"}/
         ${word.pronunciation ? word.pronunciation : 
            "Pronunciation is not found"}"</p>
        <div onclick="my_modal_5.showModal()" class="flex justify-between items-center px-10">
          <button class="btn btn-outline btn-primary">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn btn-outline btn-primary">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
        `;
        wordContainer.append(card);
    });
}

const displayLesson = (lessons) => {
    // 1. get the container & empty
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    // 2. get into every lessons
    for(let lesson of lessons) {

        // 3. create Element
        // console.log(lesson)
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML =`
        <button id="lesson-btn-${lesson.level_no}"
        onclick="loadLevelWord(${lesson.level_no})"
        class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i>
            Lesson - ${lesson.level_no}
          </button>
        `;

        // 4. append into container

        levelContainer.append(btnDiv);

    }
    
    
};

loadLessons();