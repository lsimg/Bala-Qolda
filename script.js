/* BalaQoldau demo data is intentionally fictional and kept device-local. */
const {t, setLocale, translateDocument, normalizeLocale} = window.BalaI18n;
const cities = ["Алматы","Астана","Шымкент","Талдыкорган","Караганда","Тараз","Туркестан","Костанай","Павлодар","Усть-Каменогорск"];
const cityIds = ["almaty","astana","shymkent","taldykorgan","karaganda","taraz","turkistan","kostanay","pavlodar","oskemen"];
const specialtyIds = ["speech_therapist","defectologist","special_educator","child_psychologist","occupational_therapist","behavioral_specialist","rehabilitation_specialist","tutor","neurologist","pediatrician","psychiatrist"];
const specialtyMeta = [
  ["Логопед","Речь, звукопроизношение и понимание языка","💬","#cdeee6"],
  ["Дефектолог","Комплексная поддержка обучения и коммуникации","🧩","#fff0b9"],
  ["Специальный педагог","Навыки обучения в подходящем темпе","✏️","#dcecff"],
  ["Детский психолог","Эмоции, отношения и бережная адаптация","🌤️","#eadfff"],
  ["Эрготерапевт","Бытовые, сенсорные и двигательные навыки","🖐️","#dff0d6"],
  ["Поведенческий специалист","Понятные стратегии для ежедневных ситуаций","🧭","#ffe0d8"],
  ["Реабилитолог","Движение и восстановление функций","🌱","#d7efea"],
  ["Тьютор","Сопровождение обучения и самостоятельности","🎒","#ffe8bc"],
  ["Невролог","Медицинская оценка нервной системы","🧠","#e4e0ff"],
  ["Педиатр","Общий взгляд на здоровье и развитие","🩺","#dcefff"],
  ["Психиатр","Бережная медицинская оценка состояния","🤝","#f3e1ee"]
];

const specialists = [
  ["Дана Нурланова","Логопед","Алматы",9,["Русский","Қазақша"],["Онлайн","Очно"],["речь","коммуникация"],16000,4.9,42,1],
  ["Айгерим Садыкова","Дефектолог","Астана",11,["Қазақша","Русский"],["Онлайн","Очно"],["коммуникация","обучение"],18000,5.0,37,2],
  ["Мадина Ермекова","Детский психолог","Шымкент",7,["Русский","Қазақша"],["Онлайн"],["эмоции","поведение"],15000,4.8,28,3],
  ["Руслан Абдрахманов","Эрготерапевт","Алматы",8,["Русский"],["Очно"],["сенсорика","бытовые навыки"],21000,4.9,31,4],
  ["Алуа Жумабаева","Специальный педагог","Талдыкорган",6,["Қазақша","Русский"],["Онлайн","Очно"],["обучение","коммуникация"],13000,4.7,19,2],
  ["Самат Беков","Поведенческий специалист","Караганда",10,["Русский","Қазақша"],["Онлайн"],["поведение","социализация"],22000,4.9,44,5],
  ["Лаура Искакова","Реабилитолог","Тараз",12,["Русский","Қазақша"],["Очно"],["движение","самообслуживание"],19000,4.8,23,6],
  ["Индира Касымова","Тьютор","Туркестан",5,["Қазақша"],["Онлайн","Очно"],["обучение","самостоятельность"],11000,4.7,16,2],
  ["Марат Сулейменов","Невролог","Астана",14,["Русский","Қазақша"],["Очно"],["медицинская оценка"],26000,4.9,51,7],
  ["Жанна Тлеубаева","Педиатр","Костанай",13,["Русский"],["Онлайн","Очно"],["здоровье","развитие"],17000,4.8,36,1],
  ["Камила Омарова","Логопед","Павлодар",6,["Русский"],["Онлайн"],["речь","звукопроизношение"],12000,4.7,18,3],
  ["Асель Рахимова","Дефектолог","Усть-Каменогорск",9,["Русский","Қазақша"],["Онлайн"],["коммуникация","обучение"],14500,4.9,27,2],
  ["Ержан Калиев","Психиатр","Алматы",15,["Русский","Қазақша"],["Очно"],["эмоции","медицинская оценка"],28000,4.9,33,8],
  ["Сауле Ахметова","Детский психолог","Караганда",8,["Қазақша","Русский"],["Онлайн","Очно"],["эмоции","социализация"],15500,4.8,29,1]
].map((s,i)=>({
  id:i+1,name:s[0],specialty:s[1],specialtyId:specialtyIds[specialtyMeta.findIndex(meta=>meta[0]===s[1])],
  city:s[2],cityId:cityIds[cities.indexOf(s[2])],experience:s[3],
  languages:s[4],languageIds:s[4].map(value=>value==="Русский"?"ru":"kk"),
  formats:s[5],formatIds:s[5].map(value=>value==="Онлайн"?"online":"in_person"),
  focus:s[6],price:s[7],rating:s[8],reviews:s[9],available:s[10],
  initials:s[0].split(" ").map(x=>x[0]).join(""),color:["#dcefff","#fff0bd","#e6defe","#dff4eb","#ffe2db"][i%5]
}));

const children = [
  {id:1,name:"Айару",age:5,goals:"Коммуникация, просьбы",activity:"сегодня, 09:40",completion:72,mood:"Спокойно"},
  {id:2,name:"Мирас",age:7,goals:"Инструкции, совместная игра",activity:"вчера, 18:10",completion:64,mood:"Радостно"},
  {id:3,name:"Алан",age:4,goals:"Первые слова, внимание",activity:"18 июля",completion:48,mood:"Устал"},
  {id:4,name:"Сафия",age:8,goals:"Эмоции, школьные навыки",activity:"17 июля",completion:81,mood:"Спокойно"}
];
const goals = [
  {id:1,title:"Самостоятельно попросить воду",description:"Использовать слово или коммуникационную карточку в подходящей ситуации.",deadline:"4 августа",specialist:"Дана Нурланова",status:"Заметный прогресс",progress:72,note:"Вчера — с небольшой подсказкой",color:"#35b8a0"},
  {id:2,title:"Использовать пять карточек",description:"Выбирать знакомые карточки для просьб и ответов.",deadline:"11 августа",specialist:"Дана Нурланова",status:"В процессе",progress:58,note:"Сегодня — 4 карточки",color:"#69b7f5"},
  {id:3,title:"Две последовательные инструкции",description:"Выполнить два знакомых действия одно за другим.",deadline:"18 августа",specialist:"Алуа Жумабаева",status:"В процессе",progress:43,note:"16 июля — с подсказкой",color:"#ffd66b"},
  {id:4,title:"Распознавать базовые эмоции",description:"Выбирать карточку радости, грусти, страха и усталости.",deadline:"24 августа",specialist:"Дана Нурланова",status:"Новая цель",progress:22,note:"Добавлена 18 июля",color:"#b9a7f8"},
  {id:5,title:"Совместная игра пять минут",description:"Оставаться в общей игре с близким взрослым.",deadline:"30 августа",specialist:"Мадина Ермекова",status:"В процессе",progress:51,note:"17 июля — 4 минуты",color:"#ff8e7a"}
];
const tasks = [
  {id:1,title:"Попросить воду с помощью карточки",goal:"Самостоятельно попросить воду",instruction:"Положите карточку рядом со стаканом и дайте время на самостоятельный выбор.",duration:"5 минут",frequency:"2 раза в день",date:"Сегодня",specialist:"Дана Нурланова",done:false},
  {id:2,title:"Игра на распознавание эмоций",goal:"Распознавать базовые эмоции",instruction:"Покажите две карточки и спокойно назовите каждую эмоцию.",duration:"7 минут",frequency:"1 раз в день",date:"Сегодня",specialist:"Дана Нурланова",done:true},
  {id:3,title:"Две последовательные инструкции",goal:"Выполнять простую инструкцию",instruction:"Используйте два знакомых действия: возьми кубик и положи в коробку.",duration:"5 минут",frequency:"4 раза в неделю",date:"Завтра",specialist:"Алуа Жумабаева",done:false},
  {id:4,title:"Пять минут совместной игры",goal:"Совместная игра",instruction:"Выберите любимую игру и следуйте за интересом ребёнка.",duration:"5 минут",frequency:"ежедневно",date:"21 июля",specialist:"Мадина Ермекова",done:false},
  {id:5,title:"Выбрать карточку настроения",goal:"Распознавать базовые эмоции",instruction:"Предложите выбрать карточку без требования объяснять ответ.",duration:"3 минуты",frequency:"вечером",date:"Сегодня",specialist:"Дана Нурланова",done:false}
];
const progressEntries = [
  {date:"Сегодня, 09:40",title:"Родитель отметил выполнение",text:"Карточка «хочу пить» выбрана с небольшой подсказкой."},
  {date:"Вчера, 18:25",title:"Специалист оставил комментарий",text:"Дайте Айару 5–7 секунд для самостоятельного ответа."},
  {date:"17 июля",title:"Достигнут новый навык",text:"Айару самостоятельно выбрала три знакомые карточки."},
  {date:"15 июля",title:"Добавлено новое задание",text:"Игра на распознавание эмоций."},
  {date:"12 июля",title:"План обновлён",text:"Фокус недели — просьбы и самостоятельный выбор."}
];

const faqItems = [
  ["Что делать, если ребёнок пока не говорит?","Спокойно наблюдайте за доступными способами общения — жестами, взглядом, карточками. Обсудить индивидуальную ситуацию лучше с квалифицированным специалистом."],
  ["Когда стоит обратиться к логопеду?","Если вас тревожит развитие речи, понимание обращённой речи или понятность слов, консультация поможет определить подходящие цели поддержки."],
  ["Чем логопед отличается от дефектолога?","Логопед чаще фокусируется на речи и коммуникации, дефектолог — на более широком наборе познавательных и учебных навыков. Нередко они работают командой."],
  ["В каких случаях может понадобиться детский психолог?","Психолог может поддержать ребёнка и семью в вопросах эмоций, отношений, адаптации и поведения. Это не означает автоматической постановки диагноза."],
  ["Что такое альтернативная коммуникация?","Это способы выражать мысли и потребности дополнительно к речи или вместо неё: жесты, символы, карточки и устройства."],
  ["Как выполнять задания специалиста дома?","Коротко, регулярно и без давления. Следуйте инструкции специалиста и отмечайте, какая поддержка понадобилась ребёнку."],
  ["Как понять, что есть прогресс?","Смотрите на конкретный навык во времени: стало ли действие чаще, самостоятельнее или доступно в новых ситуациях."],
  ["Можно пользоваться без подтверждённого диагноза?","Да. Для поиска поддержки диагноз не обязателен. Платформа не определяет его по анкете."],
  ["Как выбрать подходящего специалиста?","Обратите внимание на образование, опыт с похожими целями, язык, формат и готовность понятно объяснять план работы."],
  ["Безопасно ли хранить информацию о ребёнке?","В полноценном сервисе нужны разграничение доступа и защищённое хранение. Эта демо-версия сохраняет настройки только на вашем устройстве."]
];
const expertArticles = [
  {id:1,category:"Речь",title:"Как поддержать просьбу без давления",description:"Три спокойных принципа, которые помогают дать ребёнку время и понятный выбор.",author:"Демо-эксперт Дана Н.",specialty:"Логопед",time:"5 мин",color:"#dff4ed"},
  {id:2,category:"Эмоции",title:"Сначала назвать, потом объяснять",description:"Как карточки эмоций становятся опорой в насыщенный день.",author:"Демо-эксперт Мадина Е.",specialty:"Детский психолог",time:"6 мин",color:"#ffe2dc"},
  {id:3,category:"Сенсорика",title:"Когда вокруг слишком много звуков",description:"Наблюдения, которые полезно обсудить со специалистом.",author:"На основе доказательных подходов",specialty:"Образовательный материал",time:"4 мин",color:"#e6e1ff"},
  {id:4,category:"Занятия дома",title:"Первое домашнее задание: с чего начать",description:"Как встроить короткую практику в привычный распорядок.",author:"Демо-эксперт Алуа Ж.",specialty:"Специальный педагог",time:"7 мин",color:"#fff0ba"},
  {id:5,category:"Коммуникация",title:"Выбор тоже является сообщением",description:"Почему важно замечать взгляд, жест и отказ ребёнка.",author:"На основе доказательных подходов",specialty:"Образовательный материал",time:"5 мин",color:"#dcefff"},
  {id:6,category:"Поддержка родителей",title:"Не нужно успевать всё",description:"Как выбрать одну реалистичную цель на неделю.",author:"Демо-эксперт Сауле А.",specialty:"Детский психолог",time:"6 мин",color:"#e4f3dc"},
  {id:7,category:"Обучение",title:"Инструкция из двух действий",description:"Понятная структура упражнения и признаки, которые стоит записать.",author:"Демо-эксперт Алуа Ж.",specialty:"Специальный педагог",time:"8 мин",color:"#ffead0"},
  {id:8,category:"Работа со специалистом",title:"Как подготовиться к первой встрече",description:"Какие вопросы помогут сформировать общий и прозрачный план.",author:"Команда BalaQoldau",specialty:"Демо-материал",time:"5 мин",color:"#dcf1ee"}
];
const reviews = [
  {role:"Родитель",name:"Мама Айару",text:"Теперь задания не теряются в чатах, а маленькие изменения легко заметить. Это демонстрационная история."},
  {role:"Логопед",name:"Дана Н., демо-профиль",text:"Вижу отметки семьи между встречами и могу точнее объяснить следующий шаг. Это демонстрационный отзыв."},
  {role:"Реабилитационный центр",name:"Команда «Қадам», демо",text:"Единый план помогает специалистам говорить с семьёй на одном понятном языке. Данные вымышлены."}
];
const communicationCards = [
  ["want-drink","хочу пить","су ішкім келеді","Основные просьбы","🥤","#dcefff"],["want-eat","хочу есть","тамақ жегім келеді","Основные просьбы","🍎","#fff0bd"],
  ["more","ещё","тағы","Основные просьбы","＋","#e5dcff"],["enough","достаточно","жеткілікті","Основные просьбы","✋","#ffe1da"],["wait","подожди","күте тұр","Основные просьбы","⏳","#dff3eb"],
  ["yes","да","иә","Да и нет","👍","#dff3d8"],["no","нет","жоқ","Да и нет","👎","#ffe0dc"],["dont-want","не хочу","қаламаймын","Да и нет","🙅","#f2e4ff"],
  ["water","вода","су","Напитки","💧","#dcefff"],["juice","сок","шырын","Напитки","🧃","#fff0bd"],["tea","чай","шай","Напитки","🍵","#dff3d8"],
  ["apple","яблоко","алма","Еда","🍎","#ffe0dc"],["banana","банан","банан","Еда","🍌","#fff0bd"],["soup","суп","сорпа","Еда","🥣","#ffead2"],
  ["happy","я рад","мен қуаныштымын","Эмоции","😊","#fff0bd"],["sad","мне грустно","мен мұңайдым","Эмоции","😢","#dcefff"],["scared","мне страшно","мен қорқамын","Эмоции","😟","#e5dcff"],["angry","я злюсь","мен ашулымын","Эмоции","😠","#ffe0dc"],["calm","мне спокойно","мен тынышпын","Эмоции","😌","#dff3d8"],
  ["pain","мне больно","менің ауырып тұр","Боль и самочувствие","🩹","#ffe0dc"],["tired","я устал","мен шаршадым","Боль и самочувствие","🥱","#e5dcff"],["noisy","мне шумно","маған шу болып тұр","Боль и самочувствие","🔊","#fff0bd"],["hot","мне жарко","маған ыстық","Боль и самочувствие","☀️","#ffead2"],["cold","мне холодно","маған суық","Боль и самочувствие","❄️","#dcefff"],
  ["help","мне нужна помощь","маған көмек керек","Помощь","🫶","#dff3eb"],["hug","обними меня","мені құшақта","Помощь","🤗","#ffe0dc"],["alone","хочу быть один","жалғыз болғым келеді","Помощь","🌙","#e5dcff"],["toilet","хочу в туалет","дәретханаға барғым келеді","Помощь","🚻","#dcefff"],
  ["play","хочу играть","ойнағым келеді","Действия","🧸","#fff0bd"],["walk","хочу гулять","серуендегім келеді","Действия","🌳","#dff3d8"],["music","хочу музыку","музыка тыңдағым келеді","Действия","🎵","#e5dcff"],["sleep","хочу спать","ұйықтағым келеді","Отдых","🛏️","#dcefff"],["rest","хочу отдохнуть","демалғым келеді","Отдых","🧘","#dff3eb"],
  ["mom","мама","ана","Семья","👩","#ffe0dc"],["dad","папа","әке","Семья","👨","#dcefff"],["grandma","бабушка","әже","Семья","👵","#e5dcff"],["teacher","учитель","мұғалім","Школа","🧑‍🏫","#fff0bd"],
  ["ball","мяч","доп","Игрушки","⚽","#dff3d8"],["blocks","кубики","текшелер","Игрушки","🧱","#ffead2"],["book","книга","кітап","Игрушки","📖","#dcefff"],
  ["home","хочу домой","үйге барғым келеді","Места","🏠","#dff3d8"],["school","школа","мектеп","Места","🏫","#fff0bd"],["outside","улица","дала","Места","🌤️","#dcefff"],
  ["cat","кошка","мысық","Животные","🐱","#ffe0dc"],["dog","собака","ит","Животные","🐶","#ffead2"],["giraffe","жираф","керік","Животные","🦒","#fff0bd"],["bird","птица","құс","Животные","🐦","#dcefff"]
].map((c,i)=>({id:c[0],ru:c[1],kk:c[2],category:c[3],emoji:c[4],color:c[5],order:i}));

const surveyOptions = {
  diagnosisStatus:["yes","no","screening","prefer_not"],
  diagnoses:["autism","speech_delay","adhd","cerebral_palsy","down_syndrome","speech_disorder","hearing","intellectual","other"],
  needs:["requests","no_speech","unclear_speech","attention","instructions","sensory","behavior","emotions","anxiety","socialization","learning","motor","self_care","recovery","other"],
  goals:["consultation","assessment","speech","communication","behavior","emotions","daily_living","motor_rehab","learning","long_term","other"]
};
const initialSurveyData = {
  childName:"", age:"", cityId:"", primaryLanguageId:"", secondaryLanguageId:"",
  consultationFormatId:"", diagnosisStatusId:"", diagnosisIds:[], needIds:[],
  goalIds:[], recommendedSpecialtyIds:[], specialistAccess:false
};
const demoData = {
  childProfile:{
    childName:"Айару",age:"5",cityId:"almaty",primaryLanguageId:"kk",secondaryLanguageId:"ru",
    consultationFormatId:"online",needIds:["requests","no_speech"],goalIds:["communication"],
    recommendedSpecialtyIds:["speech_therapist","defectologist"],updatedAt:"2026-07-18T09:40:00.000Z",specialistAccess:true
  }
};
const loadJSON = (key,fallback) => {
  try { return JSON.parse(localStorage.getItem(`bq.${key}`) || JSON.stringify(fallback)); }
  catch { return fallback; }
};
const sanitizeProfileData = data => Object.fromEntries(Object.entries(data).filter(([,value]) => {
  if(value===null||value===undefined) return false;
  if(typeof value==="string"&&value.trim()==="") return false;
  if(Array.isArray(value)&&value.length===0) return false;
  return true;
}));
const legacyChildProfile = loadJSON("childProfile",null);
const legacyLooksLikeDemo = legacyChildProfile?.name==="Айару" && String(legacyChildProfile?.age)==="5" && legacyChildProfile?.city==="Алматы";
const migratedLegacyProfile = legacyChildProfile && !legacyLooksLikeDemo ? {
  childProfile:sanitizeProfileData({
    childName:legacyChildProfile.name||"",
    age:legacyChildProfile.age||"",
    cityId:cityIds[cities.indexOf(legacyChildProfile.city)]||"",
    updatedAt:new Date().toISOString()
  }),
  preferences:{language:normalizeLocale(localStorage.getItem("bq.lang")||"ru")}
} : null;
const storedUserProfile = loadJSON("userProfile",null) || migratedLegacyProfile;
if(migratedLegacyProfile){
  localStorage.setItem("bq.userProfile",JSON.stringify(migratedLegacyProfile));
  localStorage.removeItem("bq.childProfile");
}
const storedLanguage = normalizeLocale(storedUserProfile?.preferences?.language || localStorage.getItem("bq.lang") || "ru");
const storedSpeechLanguage = normalizeLocale(localStorage.getItem("bq.speechLang") || "ru");
const storedSurveyDraft = loadJSON("surveyDraft",initialSurveyData);
const initialAIContext = {
  age:"",focusAreas:[],strengths:[],challenges:[],interests:[],communicationLevel:"",
  instructionLevel:"",motorFeatures:"",sensoryFeatures:"",behavioralResponses:"",
  attentionFeatures:"",independenceLevel:"",motivators:[],effectivePrompts:[],
  ineffectiveMethods:[],triggers:[],fatigueSigns:[],calmingMethods:[],restrictions:[],
  contraindications:[],stopConditions:[],familyGoals:[],specialistPriorities:[],
  specialistGoals:[],allowedFrequency:"",originalLanguage:"ru",specialistNotes:[],
  aggregatedProgress:{periodDays:14,attempts:0,independent:0,visualPrompt:0,partialHelp:0,fullHelp:0,missed:0,contexts:{},confirmedObservations:[]}
};
const initialAIState = {
  childProfileId:"child_primary",context:{...initialAIContext},contextSaved:false,plan:null,
  explanationDraft:null,approvedExplanations:{ru:null,kk:null},analysis:null,adjustmentDraft:null,
  explanationStatuses:{ru:null,kk:null},observationDraft:null,observations:[],versions:[],metrics:null,health:null,isLoading:false,lastError:null
};
const storedAIState = loadJSON("aiState",initialAIState);
const aiFocusIds = ["communication","receptive_language","social_interaction","gross_motor","fine_motor","independence","sensory_regulation","attention","daily_living","aac"];
const aiListFields = new Set(["strengths","challenges","interests","motivators","effectivePrompts","ineffectiveMethods","triggers","fatigueSigns","calmingMethods","restrictions","contraindications","stopConditions","familyGoals","specialistPriorities","specialistGoals"]);
const demoAIContext = {
  ...initialAIContext,age:"5",focusAreas:["communication","attention"],strengths:["Хорошо реагирует на визуальные подсказки","Любит совместные игры с водой"],
  challenges:["Трудно выбрать из большого количества предметов"],interests:["Игры с водой","Карточки с животными"],
  communicationLevel:"Использует знакомые жесты и несколько AAC-карточек",instructionLevel:"Выполняет короткую одноэтапную инструкцию с визуальной подсказкой",
  attentionFeatures:"Сосредотачивается около трёх минут при небольшом количестве стимулов",motivators:["Любимая игрушка","Совместная игра"],
  effectivePrompts:["Показ на карточку","Короткая спокойная инструкция"],triggers:["Громкие неожиданные звуки"],
  fatigueSigns:["Отворачивается","Убирает карточки"],calmingMethods:["Тихое место","Знакомый предмет"],
  restrictions:["Не продолжать при выраженной усталости"],stopConditions:["Плач или явный отказ","Усиление сенсорного дискомфорта"],
  familyGoals:["Просить воду в повседневной ситуации"],specialistPriorities:["Функциональная коммуникация"],
  specialistGoals:["Самостоятельно использовать карточку «пить» для просьбы в знакомой бытовой ситуации"],
  allowedFrequency:"До 5 минут ежедневно, не более 5 повторений",
  specialistNotes:[{id:"demo_note",originalText:"Ребёнок выполняет одноэтапные инструкции с визуальной подсказкой, но теряет внимание при большом количестве стимулов.",originalLanguage:"ru"}],
  aggregatedProgress:{periodDays:14,attempts:18,independent:6,visualPrompt:8,partialHelp:3,fullHelp:1,missed:2,contexts:{home:14,outside:4},confirmedObservations:["Лучший результат во время знакомых бытовых ситуаций","Сложнее выбрать при количестве вариантов больше двух"]}
};
const makeDemoAIPlan = lang => ({
  summary:lang==="kk"?"Төрт аптаға арналған коммуникация мен зейінді қолдау жобасы. Барлық тапсырманы маман тексеруі керек.":"Черновик поддержки коммуникации и внимания на четыре недели. Все задания требуют проверки специалиста.",
  periodWeeks:4,
  focusAreas:[
    {id:"communication",title:lang==="kk"?"Коммуникация":"Коммуникация",reason:lang==="kk"?"Күнделікті өтінішті түсінікті ету":"Сделать повседневную просьбу понятной"},
    {id:"attention",title:lang==="kk"?"Зейін":"Внимание",reason:lang==="kk"?"Қысқа тапсырмада тұрақты қатысуды қолдау":"Поддержать устойчивое участие в коротком задании"}
  ],
  goals:[{
    id:"request_water",title:lang==="kk"?"Суды карточкамен сұрау":"Попросить воду карточкой",
    measurableOutcome:lang==="kk"?"Бала таныс жағдайда бес мүмкіндіктің кемінде үшеуінде «ішу» карточкасын бір визуалды нұсқаумен немесе өздігінен қолданады.":"Ребёнок использует карточку «пить» самостоятельно или с одной визуальной подсказкой минимум в трёх из пяти возможностей в знакомой ситуации.",
    steps:[
      {order:1,description:lang==="kk"?"Екі карточкадан керегін таңдау":"Выбрать нужную карточку из двух"},
      {order:2,description:lang==="kk"?"Карточканы бір визуалды нұсқаумен беру":"Передать карточку с одной визуальной подсказкой"},
      {order:3,description:lang==="kk"?"Таныс жағдайда карточканы өздігінен қолдану":"Самостоятельно использовать карточку в знакомой ситуации"}
    ],
    activities:[{
      title:lang==="kk"?"Күнделікті су сұрау":"Просьба о воде в быту",purpose:lang==="kk"?"Функционалды өтінішті бекіту":"Закрепить функциональную просьбу",
      materials:[lang==="kk"?"«Ішу» карточкасы, стақан":"Карточка «пить», стакан"],
      instructions:lang==="kk"?["Карточканы стақанның жанына қойыңыз","5 секунд күтіңіз","Қажет болса карточкаға бір рет көрсетіңіз","Өтініштен кейін бірден су беріңіз"]:["Положите карточку рядом со стаканом","Подождите 5 секунд","При необходимости один раз покажите на карточку","Сразу дайте воду после просьбы"],
      durationMinutes:5,frequency:lang==="kk"?"Күніне бір рет, бес қайталаудан артық емес":"Один раз в день, не более пяти повторений",
      allowedSupport:[lang==="kk"?"Визуалды нұсқау":"Визуальная подсказка"],successCriteria:lang==="kk"?"Бес мүмкіндіктің үшеуінде физикалық көмексіз":"В трёх из пяти возможностей без физической помощи",
      stopConditions:lang==="kk"?["Айқын бас тарту","Шаршау немесе сенсорлық жайсыздық"]:["Явный отказ","Усталость или сенсорный дискомфорт"],specialistComment:null
    }]
  }],
  progressScale:lang==="kk"?["Орындамайды","Толық көмекпен","Ішінара көмекпен","Нұсқаумен","Өздігінен","Өздігінен және тұрақты"]:["Не выполняет","С полной помощью","С частичной помощью","С подсказкой","Самостоятельно","Самостоятельно и стабильно"],
  reviewRecommendation:lang==="kk"?"Төрт аптадан кейін маманмен қайта қарау.":"Пересмотреть со специалистом через четыре недели.",
  missingInformation:[],safetyWarnings:lang==="kk"?["Бұл медициналық тағайындау емес. Шаршау белгілерінде жаттығуды тоқтатыңыз."]:["Это не медицинское назначение. Остановите упражнение при признаках усталости."],requiresProfessionalReview:true
});
const legacyTaskResultIds = {
  "Получилось самостоятельно":"independent","Получилось с небольшой подсказкой":"small_prompt",
  "Получилось с полной помощью":"full_help","Выполнено частично":"partial",
  "Сегодня не получилось":"not_today","Задание не выполнялось":"skipped"
};

const appState = {
  route:"home", lang:storedLanguage, role:localStorage.getItem("bq.role")||"parent",
  demoMode:localStorage.getItem("bq.demoMode")!=="false",
  userProfile:storedUserProfile,
  surveyData:{...initialSurveyData,...storedSurveyDraft},
  surveyTouched:new Set(Object.entries(storedSurveyDraft).filter(([,value])=>Array.isArray(value)?value.length:Boolean(value)).map(([key])=>key)),
  favorites:loadJSON("favorites",[]),
  cardFavorites:loadJSON("cardFavorites",[]),
  recentCards:loadJSON("recentCards",[]),
  phrase:[], speechLang:storedSpeechLanguage,
  surveyStep:Math.min(5,Math.max(1,Number(localStorage.getItem("bq.surveyStep")||1))),
  soyleCategory:"Основные просьбы", articleCategory:"Все",
  completedTasks:loadJSON("completedTasks",[]),
  customEntries:loadJSON("customEntries",[]).map(entry=>legacyTaskResultIds[entry.text]?{...entry,resultId:legacyTaskResultIds[entry.text],text:"",dateKey:entry.date==="Только что"?"now":undefined,titleKey:entry.title==="Родитель отметил выполнение"?"parentMarked":undefined}:entry),
  ai:{...initialAIState,...storedAIState,context:{...initialAIContext,...(storedAIState.context||{})}},
  demoAI:{...initialAIState,context:{...demoAIContext}}
};

const $ = (selector,root=document)=>root.querySelector(selector);
const $$ = (selector,root=document)=>[...root.querySelectorAll(selector)];
const escapeHTML = value => String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
const persist = (key,value)=>localStorage.setItem(`bq.${key}`,typeof value==="string"?value:JSON.stringify(value));
const money = value=>`${new Intl.NumberFormat(appState.lang==="kk"?"kk-KZ":"ru-RU").format(value)} ₸`;
const specialtyLabel = id => t(`specialties.${id}`);
const cityLabel = id => t(`cities.${id}`);
const languageLabel = id => id ? t(`languages.${id}`) : t("common.notSpecified");
const formatLabel = id => id ? t(`formats.${id}`) : t("common.notSpecified");
const profileValue = (value,key) => value ? t(`${key}.${value}`) : t("common.notSpecified");
const displayDate = value => {
  if(!value)return t("common.notSpecified");
  const date=new Date(value);
  if(Number.isNaN(date.getTime()))return t("common.notSpecified");
  const months=appState.lang==="kk"
    ?["қаңтар","ақпан","наурыз","сәуір","мамыр","маусым","шілде","тамыз","қыркүйек","қазан","қараша","желтоқсан"]
    :["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
  const hours=String(date.getHours()).padStart(2,"0");
  const minutes=String(date.getMinutes()).padStart(2,"0");
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} · ${hours}:${minutes}`;
};

function saveSurveyDraft(){
  persist("surveyDraft",appState.surveyData);
  persist("surveyStep",String(appState.surveyStep));
}
function syncSurveyDataFromDom(markTouched=false,eventTarget=null){
  const form=$("#surveyForm"); if(!form) return appState.surveyData;
  const fieldMap={childName:"childName",age:"age",city:"cityId",mainLanguage:"primaryLanguageId",secondLanguage:"secondaryLanguageId",format:"consultationFormatId",diagnosisStatus:"diagnosisStatusId"};
  Object.entries(fieldMap).forEach(([name,key])=>{
    const field=$(`[name="${name}"]`,form);
    if(!field)return;
    const value=(field.type==="radio"?$(`[name="${name}"]:checked`,form)?.value:field.value)||"";
    appState.surveyData[key]=typeof value==="string"?value.trim():value;
    if(markTouched&&eventTarget?.name===name)appState.surveyTouched.add(key);
  });
  [["diagnosis","diagnosisIds"],["difficulty","needIds"],["surveyGoal","goalIds"]].forEach(([name,key])=>{
    appState.surveyData[key]=$$(`[name="${name}"]:checked`,form).map(input=>input.value);
    if(markTouched&&eventTarget?.name===name)appState.surveyTouched.add(key);
  });
  saveSurveyDraft();
  return appState.surveyData;
}
function hydrateSurveyForm(){
  const form=$("#surveyForm"); if(!form)return;
  const values={childName:appState.surveyData.childName,age:appState.surveyData.age,city:appState.surveyData.cityId,mainLanguage:appState.surveyData.primaryLanguageId,secondLanguage:appState.surveyData.secondaryLanguageId};
  Object.entries(values).forEach(([name,value])=>{const field=$(`[name="${name}"]`,form);if(field)field.value=value||""});
  [["format",appState.surveyData.consultationFormatId],["diagnosisStatus",appState.surveyData.diagnosisStatusId]].forEach(([name,value])=>{
    $$(`[name="${name}"]`,form).forEach(input=>input.checked=input.value===value);
  });
  [["diagnosis",appState.surveyData.diagnosisIds],["difficulty",appState.surveyData.needIds],["surveyGoal",appState.surveyData.goalIds]].forEach(([name,valuesList])=>{
    $$(`[name="${name}"]`,form).forEach(input=>input.checked=(valuesList||[]).includes(input.value));
  });
  $("#diagnosisOptions").classList.toggle("hidden",appState.surveyData.diagnosisStatusId!=="yes");
}

function navigate(route,push=true){
  if(route==="ai-plan"&&!["specialist","admin"].includes(appState.role))route="parent";
  if(!document.querySelector(`[data-view="${route}"]`)) route="home";
  appState.route=route;
  $$(".view").forEach(v=>v.classList.toggle("active",v.dataset.view===route));
  $$(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.route===route));
  $("#mainNav").classList.remove("open"); $("#menuToggle").setAttribute("aria-expanded","false");
  document.body.classList.remove("child-mode");
  if(push) history.replaceState(null,"",`#${route}`);
  window.scrollTo({top:0,behavior:"smooth"});
  $("#app").focus({preventScroll:true});
  if(route==="specialists") renderSpecialists();
  if(route==="soyle") renderCommunication();
  if(route==="parent"){renderChildProfile();loadRemoteAIPlan()}
  if(route==="ai-plan"){renderAIPage();checkAIHealth();loadRemoteAIPlan();loadAIMetrics()}
}

function showToast(title,text=t("common.savedOnDevice"),type="success"){
  const toast=document.createElement("div"); toast.className=`toast ${type}`; toast.innerHTML=`<b>${title}</b><small>${text}</small>`;
  $("#toastRegion").append(toast); setTimeout(()=>toast.remove(),4000);
}
function openModal(html){
  $("#modalContent").innerHTML=html; $("#modalBackdrop").classList.remove("hidden"); document.body.style.overflow="hidden";
  translateDocument($("#modalContent"));
  setTimeout(()=>$(".modal-close").focus(),30);
}
function closeModal(){ $("#modalBackdrop").classList.add("hidden"); document.body.style.overflow=""; $("#modalContent").innerHTML=""; }

function renderHome(){
  const steps=[
    ["1","Расскажите об особенностях","Короткая бережная анкета без лишних данных.","#ffd66b"],
    ["2","Найдите специалиста","Фильтры по направлению, языку и формату.","#69b7f5"],
    ["3","Получите план","Специалист формирует понятные цели.","#b9a7f8"],
    ["4","Практикуйтесь дома","Короткие задания и спокойные отметки.","#ff8e7a"],
    ["5","Замечайте динамику","История шагов остаётся у семьи.","#a8d98d"]
  ];
  $("#stepsRoad").innerHTML=steps.map(s=>`<article class="step-card" style="--step-color:${s[3]}"><span class="step-number">${s[0]}</span><div><h3>${s[1]}</h3><p>${s[2]}</p></div></article>`).join("");
  $("#specialtyCards").innerHTML=specialtyMeta.slice(0,8).map((s,index)=>`<button class="specialty-card" style="--card-color:${s[3]}" data-specialty="${specialtyIds[index]}"><span class="arrow">↗</span><span class="icon">${s[2]}</span><h3>${specialtyLabel(specialtyIds[index])}</h3><p>${window.BalaI18n.translateText(s[1])}</p></button>`).join("");
  $("#homeArticles").innerHTML=expertArticles.slice(0,3).map(articleCard).join("");
  $("#faqList").innerHTML=faqItems.map((f,i)=>`<article class="faq-item"><button class="faq-question" aria-expanded="false"><b>${f[0]}</b><span>＋</span></button><div class="faq-answer">${f[1]}</div></article>`).join("");
  $("#reviewGrid").innerHTML=reviews.map(r=>`<article class="review-card"><span class="demo-badge">Демонстрационный отзыв</span><blockquote>“${r.text}”</blockquote><div class="person-line"><span class="avatar">${r.name.slice(0,2)}</span><span><b>${r.name}</b><small>${r.role}</small></span></div></article>`).join("");
}
function articleCard(a){return `<article class="article-card" style="--tag-color:${a.color}"><div class="article-meta"><span class="category-label">${a.category}</span><span>${a.time}</span></div><h3>${a.title}</h3><p>${a.description}</p><div class="person-line"><span class="avatar">${a.author.slice(0,2)}</span><span><b>${a.author}</b><small>${a.specialty}</small></span></div><button class="text-btn article-open" data-article="${a.id}">Читать →</button></article>`}

function populateControls(){
  const selected={specialty:$("#filterSpecialty").value,city:$("#filterCity").value};
  $("#filterSpecialty").innerHTML=`<option value="">${t("catalog.allDirections")}</option>${specialtyIds.map(id=>`<option value="${id}">${specialtyLabel(id)}</option>`).join("")}`;
  $("#filterCity").innerHTML=`<option value="">${t("catalog.allKazakhstan")}</option>${cityIds.map(id=>`<option value="${id}">${cityLabel(id)}</option>`).join("")}`;
  $("#surveyCity").innerHTML=`<option value="">${t("survey.chooseCity")}</option>${cityIds.map(id=>`<option value="${id}">${cityLabel(id)}</option>`).join("")}`;
  $("#filterSpecialty").value=selected.specialty;
  $("#filterCity").value=selected.city;
  $("#diagnosisStatus").innerHTML=surveyOptions.diagnosisStatus.map(id=>`<label class="choice"><input type="radio" name="diagnosisStatus" value="${id}"><span>${t(`diagnosisStatus.${id}`)}</span></label>`).join("");
  $("#diagnosisTags").innerHTML=surveyOptions.diagnoses.map(id=>`<label class="tag-choice"><input type="checkbox" name="diagnosis" value="${id}"><span>${t(`diagnoses.${id}`)}</span></label>`).join("");
  $("#difficultyChoices").innerHTML=surveyOptions.needs.map(id=>`<label class="tile-choice"><input type="checkbox" name="difficulty" value="${id}"><span>${t(`needs.${id}`)}</span></label>`).join("");
  $("#goalChoices").innerHTML=surveyOptions.goals.map(id=>`<label class="tile-choice"><input type="checkbox" name="surveyGoal" value="${id}"><span>${t(`assessmentGoals.${id}`)}</span></label>`).join("");
  hydrateSurveyForm();
}

function renderSpecialists(){
  const query=$("#specialistSearch").value.toLowerCase().trim(), specialty=$("#filterSpecialty").value, city=$("#filterCity").value;
  const format=$("#filterFormat").value, lang=$("#filterLanguage").value, price=Number($("#filterPrice").value), rating=Number($("#filterRating").value), soon=$("#filterSoon").checked;
  let result=specialists.filter(s=>{
    const hay=[s.name,specialtyLabel(s.specialtyId),cityLabel(s.cityId),...s.focus.map(value=>window.BalaI18n.translateText(value))].join(" ").toLowerCase();
    return (!query||hay.includes(query))&&(!specialty||s.specialtyId===specialty)&&(!city||s.cityId===city)&&(!format||s.formatIds.includes(format))&&(!lang||s.languageIds.includes(lang))&&s.price<=price&&s.rating>=rating&&(!soon||s.available<=3);
  });
  const sort=$("#sortSpecialists").value;
  result.sort((a,b)=>sort==="rating"?b.rating-a.rating:sort==="price"?a.price-b.price:sort==="soon"?a.available-b.available:(b.rating*10-b.available)-(a.rating*10-a.available));
  $("#resultCount").textContent=t("catalog.found",{count:result.length});
  $("#priceOutput").textContent=money(price);
  $("#specialistsGrid").innerHTML=result.length?result.map(specialistCard).join(""):`<div class="empty-state"><span>🦒</span><h2>${t("catalog.emptyTitle")}</h2><p>${t("catalog.emptyText")}</p><button class="btn btn-primary" id="emptyReset">${t("catalog.resetFilters")}</button></div>`;
}
function specialistCard(s){
  const fav=appState.favorites.includes(s.id);
  return `<article class="specialist-card"><span class="rating">★ ${s.rating}</span><div class="specialist-top"><div class="specialist-avatar" style="--avatar-bg:${s.color}">${s.initials}</div><div><span class="verified">${t("catalog.verified")}</span><h3 class="user-content">${s.name}</h3><p>${specialtyLabel(s.specialtyId)} · ${s.experience} ${t("common.yearsExperience")}</p></div></div><div class="specialist-tags">${s.focus.map(value=>`<span>${window.BalaI18n.translateText(value)}</span>`).join("")}</div><div class="specialist-data"><span>${t("catalog.cityFormat")}<b>${cityLabel(s.cityId)} · ${s.formatIds.map(formatLabel).join(" / ")}</b></span><span>${t("catalog.languages")}<b>${s.languageIds.map(languageLabel).join(", ")}</b></span><span>${t("catalog.nearestTime")}<b>${appState.lang==="kk"?`${s.available} күннен кейін`:`Через ${s.available} дн.`}</b></span><span>${t("catalog.placeholderPrice")}<b>${money(s.price)}</b></span></div><div class="card-actions"><button class="btn btn-primary profile-btn" data-id="${s.id}">${t("catalog.openProfile")}</button><button class="favorite-btn ${fav?"active":""}" data-favorite="${s.id}" aria-label="${t("catalog.favorite")}">${fav?"♥":"♡"}</button></div><small class="demo-badge">${t("catalog.demoProfile")} · ${s.reviews} ${appState.lang==="kk"?"демо-пікір":"демо-отзывов"}</small></article>`;
}
function resetFilters(){
  ["filterSpecialty","filterCity","filterFormat","filterLanguage"].forEach(id=>$("#"+id).value="");
  $("#filterPrice").value=30000;$("#filterRating").value="0";$("#filterSoon").checked=false;$("#specialistSearch").value="";$("#sortSpecialists").value="recommended";renderSpecialists();
}

function showSpecialistProfile(id){
  const s=specialists.find(x=>x.id===id);
  openModal(`<div class="profile-header"><div class="specialist-avatar" style="--avatar-bg:${s.color}">${s.initials}</div><div><span class="verified">${t("catalog.verified")}</span><h2 id="modalTitle" class="user-content">${s.name}</h2><p>${specialtyLabel(s.specialtyId)} · ${cityLabel(s.cityId)} · ★ ${s.rating}</p></div></div>
    <p>${t("catalog.approach")}</p>
    <div class="profile-details"><div><small>${t("catalog.experience")}</small><b>${s.experience} ${t("common.yearsExperience")}</b></div><div><small>${t("catalog.ageRange")}</small><b>${t("catalog.ageRangeValue")}</b></div><div><small>${t("catalog.format")}</small><b>${s.formatIds.map(formatLabel).join(", ")}</b></div><div><small>${t("catalog.languages")}</small><b>${s.languageIds.map(languageLabel).join(", ")}</b></div><div><small>${t("catalog.education")}</small><b>${t("catalog.demoDiploma")}</b></div><div><small>${t("catalog.certificates")}</small><b>${t("catalog.documentsPlaceholder")}</b></div></div>
    <h3>${t("catalog.nearestTime")}</h3><div class="choice-row"><span class="soft-label">22 июля · 15:30</span><span class="soft-label">23 июля · 10:00</span><span class="soft-label">25 июля · 17:00</span></div>
    <div class="button-row" style="margin-top:24px"><button class="btn btn-primary booking-btn" data-id="${s.id}">${t("catalog.book")}</button><button class="btn btn-soft modal-favorite" data-favorite="${s.id}">${appState.favorites.includes(s.id)?t("catalog.inFavorite"):t("catalog.toFavorite")}</button><button class="btn btn-soft" data-action="question">${t("catalog.question")}</button></div>
    <div class="warning-card">${t("catalog.profileDemoWarning")}</div>`);
}
function showBooking(id){
  const s=specialists.find(x=>x.id===id);
  const child=appState.demoMode?demoData.childProfile:appState.userProfile?.childProfile;
  const childOption=child?.childName
    ?`<option value="current">${escapeHTML(child.childName)}, ${escapeHTML(child.age||t("common.notSpecified"))} ${child.age?t("common.years"):""}</option>`
    :`<option value="" selected disabled>${t("catalog.chooseChild")}</option>`;
  openModal(`<span class="eyebrow">${t("catalog.bookingEyebrow")}</span><h2 id="modalTitle">${t("catalog.bookingTitle")}</h2><p><span class="user-content">${s.name}</span> · ${specialtyLabel(s.specialtyId)}</p><form class="modal-form" id="bookingForm">
    <label>${t("catalog.child")}<select name="child" required>${childOption}<option value="other">${t("catalog.otherProfile")}</option></select></label>
    <label>${t("catalog.date")}<input type="date" name="date" value="2026-07-22" required></label><label>${t("catalog.time")}<select><option>15:30</option><option>17:00</option></select></label>
    <label>${t("catalog.format")}<select><option>${formatLabel("online")}</option><option>${formatLabel("in_person")}</option></select></label><label class="full">${t("catalog.reason")}<textarea rows="3" required placeholder="${t("catalog.reasonPlaceholder")}"></textarea></label>
    <div class="warning-card full">${t("catalog.bookingWarning")}</div>
    <button class="btn btn-primary full" type="submit">${t("catalog.sendDemoRequest")}</button></form>`);
}

function updateSurvey(clearError=true){
  $$(".survey-step").forEach(s=>s.classList.toggle("active",Number(s.dataset.step)===appState.surveyStep));
  $("#surveyProgress").style.width=`${appState.surveyStep*20}%`;$("#surveyStepLabel").textContent=t("survey.stepOf",{step:appState.surveyStep});
  $("#surveyPrev").style.visibility=appState.surveyStep===1?"hidden":"visible";
  $("#surveyNext").classList.toggle("hidden",appState.surveyStep===5);$("#saveChildProfile").classList.toggle("hidden",appState.surveyStep!==5);
  if(clearError)$("#surveyError").textContent="";
  saveSurveyDraft();
}
function clearSurveyErrors(){
  $$(".field-error",$("#surveyForm")).forEach(error=>error.remove());
  $$("[aria-invalid]",$("#surveyForm")).forEach(field=>{field.removeAttribute("aria-invalid");field.removeAttribute("aria-describedby")});
  $("#surveyError").textContent="";
}
function setFieldError(name,key){
  const field=$(`[name="${name}"]`,$("#surveyForm")); if(!field)return;
  const id=`${name}Error`;
  const error=document.createElement("small");error.className="field-error";error.id=id;error.textContent=t(key);
  const label=field.closest("label");
  if(label)label.append(error);else field.closest("fieldset")?.append(error);
  field.setAttribute("aria-invalid","true");field.setAttribute("aria-describedby",id);
}
function validateSurveyStep(){
  clearSurveyErrors();
  if(appState.surveyStep===1){
    syncSurveyDataFromDom();
    const checks=[
      ["childName",appState.surveyData.childName,"survey.validation.childName"],
      ["age",appState.surveyData.age,"survey.validation.age"],
      ["city",appState.surveyData.cityId,"survey.validation.city"],
      ["mainLanguage",appState.surveyData.primaryLanguageId,"survey.validation.primaryLanguage"],
      ["format",appState.surveyData.consultationFormatId,"survey.validation.format"]
    ];
    checks.filter(([,value])=>!value).forEach(([name,,key])=>setFieldError(name,key));
    if(checks.some(([,value])=>!value)){checks.find(([,value])=>!value)&&$(`[name="${checks.find(([,value])=>!value)[0]}"]`)?.focus();return false}
  }
  if(appState.surveyStep===3&&!appState.surveyData.needIds.length){$("#surveyError").textContent=t("survey.validation.needs");return false}
  if(appState.surveyStep===4&&!appState.surveyData.goalIds.length){$("#surveyError").textContent=t("survey.validation.goals");return false}
  return true;
}
function buildSurveyResults(){
  const data=syncSurveyDataFromDom();
  const dirs=new Set();
  const selected=new Set([...data.needIds,...data.goalIds]);
  if(["requests","no_speech","unclear_speech","speech","communication"].some(id=>selected.has(id))){dirs.add("speech_therapist");dirs.add("defectologist")}
  if(["communication","socialization","instructions","learning"].some(id=>selected.has(id))){dirs.add("special_educator");dirs.add("behavioral_specialist")}
  if(["sensory","daily_living","self_care"].some(id=>selected.has(id)))dirs.add("occupational_therapist");
  if(["emotions","anxiety","behavior"].some(id=>selected.has(id)))dirs.add("child_psychologist");
  if(["motor","motor_rehab","recovery"].some(id=>selected.has(id)))dirs.add("rehabilitation_specialist");
  if(selected.has("assessment")){dirs.add("pediatrician");dirs.add("neurologist")}
  if(!dirs.size){dirs.add("special_educator");dirs.add("pediatrician")}
  const directions=[...dirs];
  appState.surveyData.recommendedSpecialtyIds=directions;saveSurveyDraft();
  $("#surveySummary").innerHTML=`<dl><div><dt>${t("survey.summary.profile")}</dt><dd><span class="user-content">${escapeHTML(data.childName)}</span>, ${escapeHTML(data.age)} ${t("common.years")}</dd></div><div><dt>${t("survey.summary.city")}</dt><dd>${cityLabel(data.cityId)}</dd></div><div><dt>${t("survey.summary.needs")}</dt><dd>${data.needIds.length} ${t("common.selected")}</dd></div><div><dt>${t("survey.summary.goals")}</dt><dd>${data.goalIds.length} ${t("common.selected")}</dd></div></dl>`;
  $("#recommendationTags").innerHTML=directions.map(id=>`<span>${specialtyLabel(id)}</span>`).join("");
  const matches=specialists.filter(s=>directions.includes(s.specialtyId)).slice(0,4);
  $("#surveyMatches").innerHTML=matches.map(s=>`<article class="mini-specialist"><span class="verified">${t("catalog.verified")}</span><h3 class="user-content">${s.name}</h3><p>${specialtyLabel(s.specialtyId)} · ${cityLabel(s.cityId)} · ★ ${s.rating}</p><button type="button" class="text-btn profile-btn" data-id="${s.id}">${t("common.profile")} →</button></article>`).join("");
}

function saveChildProfile(){
  syncSurveyDataFromDom();
  const source={...appState.surveyData,updatedAt:new Date().toISOString()};
  const childProfile=sanitizeProfileData(source);
  appState.userProfile={...(appState.userProfile||{}),childProfile,preferences:{...(appState.userProfile?.preferences||{}),language:appState.lang},updatedAt:source.updatedAt};
  appState.demoMode=false;
  persist("userProfile",appState.userProfile);persist("demoMode","false");
  updateDemoModeUI();renderDashboards();
  showToast(t("survey.profileSaved"),t("survey.profileSavedText"));
  navigate("parent");
}

function renderChildProfile(){
  const panel=$("#childProfilePanel");if(!panel)return;
  const profile=appState.demoMode?demoData.childProfile:appState.userProfile?.childProfile;
  if(!profile){
    panel.innerHTML=`<div class="panel-heading"><div><span class="eyebrow">${t("profile.subtitle")}</span><h2>${t("profile.title")}</h2></div></div><div class="profile-empty"><span aria-hidden="true">🦒</span><p>${t("profile.empty")}</p><button class="btn btn-primary" data-profile-action="rerun">${t("common.specify")}</button></div>`;
    return;
  }
  const editable=!appState.demoMode;
  const valueRow=(label,value,field)=>`<div class="profile-value"><small>${label}</small><b class="${field==="childName"?"user-content":""}">${field==="childName"?escapeHTML(value||t("common.notSpecified")):(value||t("common.notSpecified"))}</b>${editable&&value?`<button type="button" data-remove-profile-field="${field}" aria-label="${t("common.remove")} ${label}">×</button>`:""}</div>`;
  const removableTags=(values,key,arrayField)=>values?.length?values.map(value=>`<span>${t(`${key}.${value}`)}${editable?`<button type="button" data-remove-profile-array="${arrayField}" data-value="${value}" aria-label="${t("common.remove")}">×</button>`:""}</span>`).join(""):`<em>${t("common.notSpecified")}</em>`;
  panel.innerHTML=`<div class="panel-heading"><div><span class="eyebrow">${t("profile.subtitle")}</span><h2>${t("profile.title")} ${appState.demoMode?`<small class="demo-badge">${t("catalog.demoProfile")}</small>`:""}</h2></div><span class="local-data-note">${appState.demoMode?t("demo.banner"):t("profile.localOnly")}</span></div>
    <div class="child-profile-grid">
      ${valueRow(t("profile.name"),profile.childName,"childName")}
      ${valueRow(t("profile.age"),profile.age?`${profile.age} ${t("common.years")}`:"","age")}
      ${valueRow(t("profile.city"),profile.cityId?cityLabel(profile.cityId):"","cityId")}
      ${valueRow(t("profile.primaryLanguage"),profile.primaryLanguageId?languageLabel(profile.primaryLanguageId):"","primaryLanguageId")}
      ${valueRow(t("profile.secondaryLanguage"),profile.secondaryLanguageId?languageLabel(profile.secondaryLanguageId):"","secondaryLanguageId")}
      ${valueRow(t("profile.format"),profile.consultationFormatId?formatLabel(profile.consultationFormatId):"","consultationFormatId")}
      ${valueRow(t("profile.diagnosisStatus"),profile.diagnosisStatusId?profileValue(profile.diagnosisStatusId,"diagnosisStatus"):"","diagnosisStatusId")}
      <div class="profile-value profile-value-wide"><small>${t("profile.needs")}</small><div class="profile-tags">${removableTags(profile.needIds,"needs","needIds")}</div></div>
      <div class="profile-value profile-value-wide"><small>${t("profile.diagnoses")}</small><div class="profile-tags">${removableTags(profile.diagnosisIds,"diagnoses","diagnosisIds")}</div></div>
      <div class="profile-value profile-value-wide"><small>${t("profile.goals")}</small><div class="profile-tags">${removableTags(profile.goalIds,"assessmentGoals","goalIds")}</div></div>
      <div class="profile-value profile-value-wide"><small>${t("profile.directions")}</small><div class="profile-tags">${removableTags(profile.recommendedSpecialtyIds,"specialties","recommendedSpecialtyIds")}</div></div>
      <div class="profile-value"><small>${t("profile.updatedAt")}</small><b>${displayDate(profile.updatedAt)}</b></div>
      <label class="profile-access"><input type="checkbox" id="profileAccessToggle" ${profile.specialistAccess?"checked":""} ${editable?"":"disabled"}><span><b>${t("profile.access")}: ${profile.specialistAccess?t("profile.accessOn"):t("profile.accessOff")}</b><small>${t("profile.accessHint")}</small></span></label>
    </div>
    <div class="button-row wrap profile-actions">${editable?`<button class="btn btn-primary" data-profile-action="edit">${t("profile.edit")}</button><button class="btn btn-soft" data-profile-action="change">${t("profile.changeAnswers")}</button><button class="btn btn-soft" data-profile-action="rerun">${t("profile.rerun")}</button>`:`<button class="btn btn-primary" data-route="survey">${t("survey.eyebrow")}</button>`}</div>`;
}

const currentAIState = () => appState.demoMode ? appState.demoAI : appState.ai;
const persistAIState = () => {
  if(!appState.demoMode)persist("aiState",appState.ai);
};
const splitAIList = value => String(value||"").split(/\r?\n/).map(item=>item.trim()).filter(Boolean);
const joinAIList = value => Array.isArray(value)?value.join("\n"):"";
const aiStatusLabel = status => t(`ai.status_${status||"ai_draft"}`);
const aiFocusLabel = id => t(`ai.${id==="communication"?"communication_area":id==="independence"?"independence_area":id==="attention"?"attention_area":id}`);
const formatAIValue = value => Array.isArray(value)?value.filter(Boolean).join(", "):(value??"");
const aiErrorMessage = code => {
  const configuredCodes=new Set(["AI_NOT_CONFIGURED","MODEL_NOT_AVAILABLE","AI_CONTEXT_NOT_FOUND","PERSISTENCE_UNAVAILABLE"]);
  return configuredCodes.has(code)?`${t("ai.errorText")} ${t("ai.noKeyHelp")}`:t("ai.errorText");
};

async function aiRequest(path,{method="GET",body,role=appState.role}={}){
  const response=await fetch(path,{
    method,credentials:"same-origin",
    headers:{"content-type":"application/json","x-bq-role":role},
    body:body?JSON.stringify(body):undefined
  });
  let data={};try{data=await response.json()}catch{}
  if(!response.ok){
    const error=new Error(data.message||data.code||"AI_REQUEST_FAILED");
    error.code=data.code||"AI_REQUEST_FAILED";error.status=response.status;error.payload=data;throw error;
  }
  return data;
}

function aiContextFromForm(){
  const form=$("#aiContextForm");if(!form)return currentAIState().context;
  const noteForm=$("#aiNoteForm");
  const context={...currentAIState().context};
  const profile=appState.demoMode?demoData.childProfile:appState.userProfile?.childProfile;
  context.age=form.elements.age?.value||profile?.age||"";
  context.focusAreas=$$('[name="aiFocus"]:checked',form).map(input=>input.value);
  Object.keys(initialAIContext).forEach(key=>{
    if(["age","focusAreas","specialistNotes","aggregatedProgress"].includes(key))return;
    const control=form.elements[key];if(!control)return;
    context[key]=aiListFields.has(key)?splitAIList(control.value):control.value.trim();
  });
  const note=noteForm?.elements.specialistNote?.value.trim()||"";
  const originalLanguage=noteForm?.elements.originalLanguage?.value==="kk"?"kk":"ru";
  context.originalLanguage=originalLanguage;
  context.specialistNotes=note?[{id:"primary_note",originalText:note,originalLanguage}]:[];
  return context;
}

function renderAIContextFields(){
  const state=currentAIState(),context=state.context;
  const listFields=[
    ["strengths",3],["challenges",3],["interests",2],["motivators",2],["effectivePrompts",2],
    ["ineffectiveMethods",2],["triggers",2],["fatigueSigns",2],["calmingMethods",2],
    ["restrictions",2],["contraindications",2],["stopConditions",2],["familyGoals",2],
    ["specialistPriorities",2],["specialistGoals",3]
  ];
  const textFields=[["communicationLevel",2],["instructionLevel",2],["motorFeatures",2],["sensoryFeatures",2],["behavioralResponses",2],["attentionFeatures",2],["independenceLevel",2]];
  return `<label>${t("ai.ageGroup")}<select name="age"><option value="">${t("ai.chooseAgeGroup")}</option>${["2","5","8","11","14"].map(age=>`<option value="${age}" ${String(context.age)===age?"selected":""}>${age==="2"?"0–3":age==="5"?"4–6":age==="8"?"7–9":age==="11"?"10–12":"13+"}</option>`).join("")}</select></label>
    <fieldset class="ai-fieldset"><legend>${t("ai.focusAreas")}</legend><div class="ai-focus-grid">${aiFocusIds.map(id=>`<label class="ai-focus-option"><input type="checkbox" name="aiFocus" value="${id}" ${(context.focusAreas||[]).includes(id)?"checked":""}><span>${aiFocusLabel(id)}</span></label>`).join("")}</div></fieldset>
    ${listFields.slice(0,3).map(([key,rows])=>`<label>${t(`ai.${key}`)}<textarea name="${key}" rows="${rows}" placeholder="${t("ai.listHint")}">${escapeHTML(joinAIList(context[key]))}</textarea></label>`).join("")}
    ${textFields.map(([key,rows])=>`<label>${t(`ai.${key.replace("Level","").replace("Features","").replace("Responses","")}`)}<textarea name="${key}" rows="${rows}" placeholder="${t("ai.freeTextHint")}">${escapeHTML(context[key]||"")}</textarea></label>`).join("")}
    ${listFields.slice(3).map(([key,rows])=>`<label>${t(`ai.${key}`)}<textarea name="${key}" rows="${rows}" placeholder="${t("ai.listHint")}">${escapeHTML(joinAIList(context[key]))}</textarea></label>`).join("")}
    <label>${t("ai.allowedFrequency")}<textarea name="allowedFrequency" rows="2" placeholder="${t("ai.freeTextHint")}">${escapeHTML(context.allowedFrequency||"")}</textarea></label>`;
}

function renderAIPage(){
  const page=$("#aiPlanView");if(!page)return;
  const state=currentAIState();
  $("#aiPageEyebrow").textContent=t("ai.eyebrow");$("#aiPageTitle").textContent=t("ai.title");$("#aiPageDescription").textContent=t("ai.description");
  $("#aiContextEyebrow").textContent=t("ai.contextEyebrow");$("#aiContextTitle").textContent=t("ai.contextTitle");$("#aiContextHelp").textContent=t("ai.contextHelp");
  $("#aiContextStatus").textContent=state.contextSaved?t("ai.contextSaved"):t("ai.contextDraft");
  $("#saveAIContextBtn").textContent=t("ai.saveContext");$("#generateAIPlanBtn").textContent=t("ai.createDraft");
  $("#aiDemoBanner").textContent=t("ai.demoBanner");$("#aiDemoBanner").classList.toggle("hidden",!appState.demoMode);
  $("#aiContextFields").innerHTML=renderAIContextFields();
  renderAIHealth();renderAISafety();renderAINote();renderAIPlan();renderAIAnalysis();renderAIHistory();
}

function renderAIHealth(){
  const health=currentAIState().health;
  const label=!health?t("ai.healthChecking"):health.status==="available"||health.status==="configured"?t("ai.healthAvailable"):health.status==="not_configured"?t("ai.healthMissing"):t("ai.healthUnavailable");
  $("#aiHealthCard").className=`ai-health-card ${health&&(health.status==="available"||health.status==="configured")?"available":health?"unavailable":""}`;
  $("#aiHealthCard").innerHTML=`<i aria-hidden="true"></i><div><b>${label}</b>${health?.model?`<small>${escapeHTML(health.model)}</small>`:""}</div>`;
}
async function checkAIHealth(){
  try{currentAIState().health=await aiRequest("/api/health/ai?check=1");}catch{currentAIState().health={status:"temporarily_unavailable"}}
  renderAIHealth();
}
async function loadRemoteAIPlan(){
  if(appState.demoMode)return;
  const state=appState.ai;
  try{
    const response=await aiRequest(`/api/plans?childProfileId=${encodeURIComponent(state.childProfileId)}`,{role:appState.role});
    state.plan={...(state.plan||{}),...response.plan,draftLanguage:state.plan?.draftLanguage||appState.lang,translationDrafts:state.plan?.translationDrafts||{}};
    if(response.versions?.length)state.versions=response.versions;
  }catch(error){
    if(error.status===404)state.plan=null;
    else if(error.status!==401)showAIError(error);
  }
  try{
    const explanationResponse=await aiRequest(`/api/explanations?childProfileId=${encodeURIComponent(state.childProfileId)}&language=${appState.lang}`,{role:appState.role});
    const explanation=explanationResponse.explanation;
    const parentVisible=explanation?.approved||explanation?.shared;
    if(parentVisible)state.approvedExplanations[appState.lang]=parentVisible;
    state.explanationStatuses[appState.lang]=explanation?.status||null;
    if(explanation?.draft&&appState.role!=="parent"){
      state.explanationDraft=explanation.draft;
      state.explanationId=explanation.id;
    }
  }catch(error){
    if(error.status===404){
      state.approvedExplanations[appState.lang]=null;
      state.explanationStatuses[appState.lang]=null;
    }else if(error.status!==401)showAIError(error);
  }
  persistAIState();renderAIPlan();renderAIHistory();renderParentAIPlan();renderAINote();
}
async function loadAIMetrics(){
  const state=currentAIState();
  if(appState.demoMode){
    state.metrics={testData:true,generations:{success:8,edited:5,rejected:1},tasks:{development_plan:3,parent_explanation:4,progress_analysis:1},plans:{published:2,ai_draft:1}};
    renderAIHistory();return;
  }
  try{state.metrics=await aiRequest("/api/ai/metrics",{role:appState.role});renderAIHistory()}catch{}
}
function renderAISafety(){
  $("#aiSafetyCard").innerHTML=`<h2>${t("ai.safetyTitle")}</h2><p>${t("ai.safetyText")}</p>`;
}
function renderAINote(){
  const panel=$("#aiNotePanel");if(!panel)return;
  const state=currentAIState(),note=state.context.specialistNotes?.[0];
  const draft=state.explanationDraft;
  panel.innerHTML=`<h2>${t("ai.noteTitle")}</h2><p>${t("ai.noteHelp")}</p>
    <form class="ai-note-form" id="aiNoteForm">
      <label class="wide">${t("ai.noteLabel")}<textarea name="specialistNote" rows="4" maxlength="5000">${escapeHTML(note?.originalText||"")}</textarea></label>
      <label>${t("ai.originalLanguage")}<select name="originalLanguage"><option value="ru" ${(note?.originalLanguage||state.context.originalLanguage)==="ru"?"selected":""}>Русский</option><option value="kk" ${(note?.originalLanguage||state.context.originalLanguage)==="kk"?"selected":""}>Қазақша</option></select></label>
      <div class="button-row ai-note-actions"><button class="btn btn-soft" type="button" id="explainAINoteBtn">${t("ai.explainNote")}</button>${draft?`<button class="btn btn-primary" type="button" id="approveAIExplanationBtn">${t("ai.approveExplanation")}</button>`:""}</div>
    </form>
    ${draft?renderAIExplanation(draft):""}`;
}
function renderAIExplanation(draft){
  const status=currentAIState().explanationStatuses?.[appState.lang];
  return `<div class="ai-explanation"><h3>${status==="approved"?t("ai.explanationVerified"):t("ai.explanationSharedDraft")}</h3><dl>
    <dt>${t("ai.noteLabel")}</dt><dd>${escapeHTML(draft.observation||"")}</dd>
    <dt>${appState.lang==="kk"?"Күнделікті мағынасы":"В повседневной жизни"}</dt><dd>${escapeHTML(draft.everydayMeaning||"")}</dd>
    <dt>${appState.lang==="kk"?"Ата-ана қалай көмектесе алады":"Как помочь"}</dt><dd>${escapeHTML(formatAIValue(draft.parentSupport))}</dd>
    <dt>${appState.lang==="kk"?"Неден аулақ болған дұрыс":"Чего избегать"}</dt><dd>${escapeHTML(formatAIValue(draft.avoid))}</dd>
    <dt>${appState.lang==="kk"?"Маманмен нені талқылау керек":"Что обсудить со специалистом"}</dt><dd>${escapeHTML(formatAIValue(draft.discussWithSpecialist))}</dd>
    ${draft.warning?`<dt>${t("ai.warnings")}</dt><dd>${escapeHTML(draft.warning)}</dd>`:""}
  </dl></div>`;
}

function planContentForLanguage(plan){
  if(!plan)return null;
  if(plan.status==="published"){
    return appState.lang==="kk"?(plan.approvedKk||plan.approved_kk_json):(plan.approvedRu||plan.approved_ru_json);
  }
  if((plan.draftLanguage||"ru")===appState.lang)return plan.draft;
  return plan.translationDrafts?.[appState.lang]||null;
}
function renderAIPlan(){
  const state=currentAIState(),plan=state.plan,workspace=$("#aiPlanWorkspace");if(!workspace)return;
  if(!plan){
    workspace.innerHTML=`<div class="ai-empty"><span aria-hidden="true">✦</span><h2>${t("ai.emptyPlanTitle")}</h2><p>${t("ai.emptyPlanText")}</p></div>`;return;
  }
  const content=planContentForLanguage(plan);
  if(!content){
    workspace.innerHTML=`<div class="ai-empty"><span aria-hidden="true">🌐</span><h2>${t("ai.translationPending")}</h2><button class="btn btn-primary" id="createAITranslationBtn">${t("ai.createOtherLanguage")}</button></div>`;return;
  }
  const editable=["ai_draft","review"].includes(plan.status);
  workspace.innerHTML=`<div class="ai-plan-header"><div><span class="eyebrow">${plan.isDemo?t("ai.demoDraft"):t("ai.eyebrow")}</span><h2>${t("ai.title")}</h2></div><div class="ai-plan-meta"><span class="ai-status ${plan.status}">${aiStatusLabel(plan.status)}</span><span>${t("ai.period")}: ${t("ai.weeks",{count:content.periodWeeks||plan.periodWeeks||4})}</span>${plan.reviewDate?`<span>${t("ai.reviewAt")}: ${displayDate(plan.reviewDate)}</span>`:""}</div></div>
    ${editable?`<textarea class="ai-edit-input ai-plan-summary" data-ai-edit="summary" rows="3">${escapeHTML(content.summary||"")}</textarea>`:`<p class="ai-plan-summary">${escapeHTML(content.summary||"")}</p>`}
    <section class="ai-plan-section"><h3>${t("ai.focus")}</h3><div class="ai-focus-tags">${(content.focusAreas||[]).map(area=>`<span>${escapeHTML(area.title||aiFocusLabel(area.id))}</span>`).join("")}</div></section>
    <section class="ai-plan-section"><h3>${t("ai.goals")}</h3>${(content.goals||[]).map((goal,gIndex)=>renderAIGoal(goal,gIndex,editable)).join("")}</section>
    ${(content.progressScale||[]).length?`<section class="ai-plan-section"><h3>${t("ai.progressScale")}</h3><div class="ai-focus-tags">${content.progressScale.map(item=>`<span>${escapeHTML(item)}</span>`).join("")}</div></section>`:""}
    ${(content.missingInformation||[]).length?`<section class="ai-plan-section"><h3>${t("ai.missing")}</h3><ul>${content.missingInformation.map(x=>`<li>${escapeHTML(x)}</li>`).join("")}</ul></section>`:""}
    ${(content.safetyWarnings||[]).length?`<section class="ai-plan-section"><h3>${t("ai.warnings")}</h3><div class="warning-card">${content.safetyWarnings.map(escapeHTML).join("<br>")}</div></section>`:""}
    <label class="ai-review-confirm"><input type="checkbox" id="aiSafetyConfirmed" ${plan.safetyConfirmed?"checked":""}><span>${t("ai.safetyConfirm")}</span></label>
    <div class="button-row wrap">${renderAIPlanActions(plan.status)}</div>
    <small>${plan.status==="published"?t("ai.published"):t("ai.notPublished")}</small>`;
}
function renderAIGoal(goal,gIndex,editable){
  return `<article class="ai-goal">
    ${editable?`<input class="ai-edit-input" data-ai-goal="${gIndex}" data-ai-field="title" value="${escapeHTML(goal.title||"")}">`:`<h3>${escapeHTML(goal.title||"")}</h3>`}
    ${editable?`<textarea class="ai-edit-input" data-ai-goal="${gIndex}" data-ai-field="measurableOutcome" rows="2">${escapeHTML(goal.measurableOutcome||"")}</textarea>`:`<p class="ai-goal-outcome">${escapeHTML(goal.measurableOutcome||"")}</p>`}
    <h4>${t("ai.steps")}</h4><ol class="ai-step-list">${(goal.steps||[]).map(step=>`<li>${escapeHTML(step.description||"")}</li>`).join("")}</ol>
    <h4>${t("ai.activities")}</h4>${(goal.activities||[]).map((activity,aIndex)=>renderAIActivity(activity,gIndex,aIndex)).join("")}
  </article>`;
}
function renderAIActivity(activity,gIndex,aIndex){
  const originalKey=`${appState.lang}:${gIndex}:${aIndex}`,hasOriginal=Boolean(currentAIState().taskOriginals?.[originalKey]);
  const detail=(key,value,wide=false)=>`<div class="ai-detail ${wide?"wide":""}"><b>${t(`ai.${key}`)}</b>${Array.isArray(value)?`<ul>${value.map(x=>`<li>${escapeHTML(x)}</li>`).join("")}</ul>`:`<span>${escapeHTML(value??t("common.notSpecified"))}</span>`}</div>`;
  return `<div class="ai-activity"><h4>${escapeHTML(activity.title||"")}</h4><div class="ai-activity-grid">
    ${detail("materials",activity.materials)}${detail("instructionsLabel",activity.instructions,true)}
    ${detail("duration",activity.durationMinutes?`${activity.durationMinutes} ${appState.lang==="kk"?"минут":"минут"}`:t("common.notSpecified"))}
    ${detail("frequency",activity.frequency)}${detail("support",activity.allowedSupport)}
    ${detail("success",activity.successCriteria)}${detail("stop",activity.stopConditions,true)}
  </div><div class="ai-task-tools">${["simplify","explain_parent","split_steps","add_success_criteria","add_stop_conditions","adapt_home"].map(action=>`<button class="btn btn-soft" data-ai-task-action="${action}" data-goal-index="${gIndex}" data-activity-index="${aIndex}">${aiTaskActionLabel(action)}</button>`).join("")}${hasOriginal?`<button class="btn btn-soft" data-ai-restore-task data-goal-index="${gIndex}" data-activity-index="${aIndex}">${t("ai.restore")}</button>`:""}</div></div>`;
}
function aiTaskActionLabel(action){
  const labels={
    simplify:["Упростить формулировку","Тұжырымды жеңілдету"],explain_parent:["Объяснить родителю","Ата-анаға түсіндіру"],
    split_steps:["Разбить на шаги","Қадамдарға бөлу"],add_success_criteria:["Добавить критерий успеха","Жетістік өлшемін қосу"],
    add_stop_conditions:["Добавить условия остановки","Тоқтату шарттарын қосу"],adapt_home:["Адаптировать для дома","Үйге бейімдеу"]
  };return labels[action]?.[appState.lang==="kk"?1:0]||action;
}
function renderAIPlanActions(status){
  if(status==="ai_draft")return `<button class="btn btn-primary" data-ai-plan-status="review">${t("ai.review")}</button>`;
  if(status==="review")return `<button class="btn btn-primary" data-ai-plan-status="approved">${t("ai.approve")}</button>`;
  if(status==="approved")return `<button class="btn btn-primary" data-ai-plan-status="published">${t("ai.publish")}</button>`;
  if(status==="published")return `<button class="btn btn-soft" data-ai-plan-status="needs_review">${t("ai.adjustment")}</button><button class="btn btn-soft" data-ai-plan-status="completed">${t("ai.complete")}</button>`;
  if(status==="needs_review")return `<button class="btn btn-primary" data-ai-plan-status="review">${t("ai.review")}</button><button class="btn btn-soft" data-ai-plan-status="completed">${t("ai.complete")}</button>`;
  return "";
}

function renderAIAnalysis(){
  const state=currentAIState(),analysis=state.analysis,adjustment=state.adjustmentDraft;
  $("#aiAnalysisPanel").innerHTML=`<div class="panel-heading"><div><span class="eyebrow">${t("ai.analysisTitle")}</span><h2>${t("ai.analysisTitle")}</h2></div><div class="button-row"><button class="btn btn-soft" id="analyzeAIProgressBtn">${t("ai.analyze")}</button>${analysis?`<button class="btn btn-primary" id="suggestAIAdjustmentBtn">${t("ai.adjustment")}</button>`:""}</div></div><p>${t("ai.analysisHelp")}</p>
    ${analysis?`<div class="ai-analysis-grid">${renderAIAnalysisCard("improvements",analysis.improvements)}${renderAIAnalysisCard("helpful",analysis.helpfulConditions)}${renderAIAnalysisCard("difficulties",analysis.difficulties)}${renderAIAnalysisCard("questions",analysis.questionsForSpecialist)}${adjustment?renderAIAnalysisCard("suggestions",adjustment.suggestedAdjustments||adjustment.adjustments):""}</div>`:`<div class="ai-empty"><p>${t("ai.noAnalysis")}</p></div>`}`;
}
function renderAIAnalysisCard(key,items){
  return `<div class="ai-analysis-card"><h3>${t(`ai.${key}`)}</h3><ul>${(items||[]).map(item=>`<li>${escapeHTML(typeof item==="string"?item:item.description||JSON.stringify(item))}</li>`).join("")}</ul></div>`;
}
function renderAIHistory(){
  const panel=$("#aiHistoryPanel");if(!panel)return;
  const state=currentAIState(),versions=state.versions||[],metrics=state.metrics;
  const metricCards=metrics?`<div class="ai-metric-strip"><span>${t("ai.metricDrafts")} <b>${Object.values(metrics.tasks||{}).reduce((sum,value)=>sum+Number(value||0),0)}</b></span><span>${t("ai.metricSuccess")} <b>${metrics.generations?.success||0}</b></span><span>${t("ai.metricPublished")} <b>${metrics.plans?.published||0}</b></span>${metrics.testData?`<small>${t("ai.testMetrics")}</small>`:""}</div>`:"";
  panel.innerHTML=`<div class="panel-heading"><h2>${t("ai.historyTitle")}</h2></div>${metricCards}<div class="ai-history-list">${versions.length?versions.slice().reverse().map(item=>`<div class="ai-history-item"><span class="ai-version-dot">${item.version}</span><div><b>${t("ai.version",{number:item.version})}</b><small>${item.source==="ai_suggestion"?t("ai.sourceAI"):t("ai.sourceSpecialist")}</small></div><small>${displayDate(item.createdAt)}</small></div>`).join(""):`<p>${t("ai.historyEmpty")}</p>`}</div>`;
}

function renderParentAIPlan(){
  const panel=$("#parentAIPlanPanel"),observation=$("#parentAIObservationPanel");if(!panel||!observation)return;
  const state=currentAIState(),plan=state.plan;
  const explanation=state.approvedExplanations?.[appState.lang];
  const explanationStatus=state.explanationStatuses?.[appState.lang];
  const explanationMarkup=renderParentAIExplanation(explanation,explanationStatus);
  if(!plan||plan.status!=="published"){
    panel.innerHTML=`<div class="ai-parent-plan-empty"><h2>${t("ai.parentNoPlan")}</h2><p>${t("ai.parentNoPlanText")}</p></div>${explanationMarkup}`;
  }else{
    const content=planContentForLanguage(plan);
    panel.innerHTML=content?`<div class="panel-heading"><div><span class="ai-parent-verified">✓ ${t("ai.verified")}</span><h2>${t("ai.parentPlanTitle")}</h2></div><span class="soft-label">${t("ai.reviewAt")}: ${displayDate(plan.reviewDate)}</span></div><p>${escapeHTML(content.summary||"")}</p>${explanationMarkup}<div class="ai-parent-goals">${(content.goals||[]).map(goal=>`<article class="ai-parent-goal"><h3>${escapeHTML(goal.title||"")}</h3><p>${escapeHTML(goal.measurableOutcome||"")}</p>${(goal.activities||[]).slice(0,1).map(a=>`<b>${escapeHTML(a.title||"")}</b><p>${escapeHTML((a.instructions||[]).join(" "))}</p>`).join("")}</article>`).join("")}</div><button class="btn btn-soft" data-action="question">${t("ai.askSpecialist")}</button>`:`<div class="ai-parent-plan-empty"><h2>${t("ai.translationPending")}</h2></div>${explanationMarkup}`;
  }
  const draft=state.observationDraft;
  observation.innerHTML=`<div class="panel-heading"><div><span class="eyebrow">${t("ai.observationTitle")}</span><h2>${t("ai.observationTitle")}</h2></div></div><p>${t("ai.observationHelp")}</p><textarea id="parentAIObservation" rows="4" maxlength="3000" placeholder="${t("ai.observationPlaceholder")}"></textarea><div class="button-row" style="margin-top:12px"><button class="btn btn-primary" id="structureAIObservationBtn">${t("ai.structureObservation")}</button></div>${draft?renderAIObservationDraft(draft):""}`;
}
function renderParentAIExplanation(explanation,status){
  if(!explanation)return "";
  const verified=status==="approved";
  return `<section class="ai-explanation ai-parent-explanation">
    <div class="${verified?"ai-parent-verified":"ai-parent-pending"}">${verified?"✓": "AI"} ${verified?t("ai.explanationVerified"):t("ai.explanationPendingReview")}</div>
    <h3>${t("ai.noteTitle")}</h3>
    <dl>
      <dt>${t("ai.observationForParent")}</dt><dd>${escapeHTML(explanation.observation||"")}</dd>
      <dt>${t("ai.everydayMeaning")}</dt><dd>${escapeHTML(explanation.everydayMeaning||"")}</dd>
      <dt>${t("ai.parentSupportTitle")}</dt><dd>${escapeHTML(formatAIValue(explanation.parentSupport))}</dd>
      <dt>${t("ai.avoidTitle")}</dt><dd>${escapeHTML(formatAIValue(explanation.avoid))}</dd>
      <dt>${t("ai.discussTitle")}</dt><dd>${escapeHTML(formatAIValue(explanation.discussWithSpecialist))}</dd>
      ${explanation.warning?`<dt>${t("ai.warnings")}</dt><dd>${escapeHTML(explanation.warning)}</dd>`:""}
    </dl>
    ${verified?"":`<p class="ai-parent-disclaimer">${t("ai.explanationDisclaimer")}</p>`}
  </section>`;
}
function renderAIObservationDraft(draft){
  const rows=[["skillArea",draft.skillArea],["activity",draft.activity],["result",draft.result],["supportLevel",draft.supportLevel],["context",draft.context],["confidence",draft.confidence]];
  return `<div class="ai-observation-result"><h3>${t("ai.understoodAs")}</h3>${draft.safetyFlag?`<div class="ai-safety-flag">${t("ai.reviewRequired")}</div>`:""}<dl>${rows.map(([key,value])=>`<dt>${t(`ai.${key}`)}</dt><dd>${escapeHTML(value||t("common.notSpecified"))}</dd>`).join("")}</dl><div class="button-row"><button class="btn btn-primary" data-ai-observation-save="structured">${t("ai.confirmObservation")}</button><button class="btn btn-soft" data-ai-observation-save="original">${t("ai.originalOnly")}</button></div></div>`;
}

function setAILoading(active,step=0){
  currentAIState().isLoading=active;
  const loading=$("#aiLoading");loading?.classList.toggle("hidden",!active);
  if(active)loading.innerHTML=`<div class="ai-spinner"></div><div class="ai-loading-steps">${[1,2,3,4].map((n,index)=>`<span class="${index===step?"active":""}">${t(`ai.loading${n}`)}</span>`).join("")}</div>`;
  ["generateAIPlanBtn","explainAINoteBtn","analyzeAIProgressBtn","suggestAIAdjustmentBtn"].forEach(id=>{const button=$("#"+id);if(button)button.disabled=active});
}
function showAIError(error){
  const box=$("#aiError");if(!box)return;
  box.classList.remove("hidden");box.innerHTML=`<h2>${error?.payload?.requiresProfessionalReview?t("ai.reviewRequired"):t("ai.errorTitle")}</h2><p>${error?.payload?.requiresProfessionalReview?t("ai.reviewRequired"):aiErrorMessage(error?.code)}</p><button class="btn btn-soft" id="retryAIButton">${t("ai.retry")}</button>`;
}
function clearAIError(){const box=$("#aiError");if(box){box.classList.add("hidden");box.innerHTML=""}}

async function saveAIContext({silent=false}={}){
  const state=currentAIState();state.context=aiContextFromForm();state.contextSaved=true;
  if(!appState.demoMode){
    persistAIState();
    await aiRequest("/api/ai/profile-context",{method:"POST",role:appState.role,body:{childProfileId:state.childProfileId,context:state.context}});
  }
  $("#aiContextStatus").textContent=t("ai.contextSaved");
  if(!silent)showToast(t("ai.contextSaved"));
  return state.context;
}
async function generateAIPlan(){
  clearAIError();const state=currentAIState();
  try{
    const context=await saveAIContext({silent:true});
    if(!context.age||!context.focusAreas.length||!context.specialistGoals.length)throw Object.assign(new Error("required"),{code:"REQUIRED_DATA"});
    setAILoading(true,0);
    let plan;
    if(appState.demoMode){
      await new Promise(resolve=>setTimeout(resolve,450));setAILoading(true,1);
      await new Promise(resolve=>setTimeout(resolve,350));setAILoading(true,2);
      const nowValue=new Date().toISOString(),otherLanguage=appState.lang==="kk"?"ru":"kk";plan={id:"demo_plan",status:"ai_draft",periodWeeks:4,draft:makeDemoAIPlan(appState.lang),draftLanguage:appState.lang,translationDrafts:{[otherLanguage]:makeDemoAIPlan(otherLanguage)},createdAt:nowValue,updatedAt:nowValue,reviewDate:new Date(Date.now()+28*86400000).toISOString(),isDemo:true};
    }else{
      const response=await aiRequest("/api/ai/development-plan",{method:"POST",role:appState.role,body:{childProfileId:state.childProfileId,periodWeeks:4,targetLanguage:appState.lang}});
      plan={...response.plan,draftLanguage:appState.lang,translationDrafts:{}};
    }
    state.plan=plan;state.versions=[{version:1,createdAt:plan.createdAt||new Date().toISOString(),source:"ai_suggestion"}];persistAIState();
    setAILoading(true,3);await new Promise(resolve=>setTimeout(resolve,180));renderAIPlan();renderAIHistory();
  }catch(error){
    if(error.code==="REQUIRED_DATA")showToast(t("ai.requiredData"),"", "error");else showAIError(error);
  }finally{setAILoading(false)}
}
async function explainAINote(){
  clearAIError();const state=currentAIState();
  try{
    state.context=aiContextFromForm();const note=state.context.specialistNotes?.[0];
    if(!note)throw Object.assign(new Error("note"),{code:"NOTE_REQUIRED"});
    await saveAIContext({silent:true});setAILoading(true,0);
    if(appState.demoMode){
      state.explanationDraft=appState.lang==="kk"?{
        observation:"Бала визуалды нұсқаумен бір қадамдық тапсырманы орындайды, бірақ стимул көп болса зейіні төмендейді.",
        everydayMeaning:"Қысқа өтініш суретпен немесе ишарамен бірге берілсе, балаға орындау оңайырақ.",
        parentSupport:["Артық ойыншықтарды алып қойыңыз","Қысқа әрі тыныш нұсқау беріңіз"],avoid:["Бір уақытта бірнеше нұсқау беру"],discussWithSpecialist:["Нұсқауды біртіндеп қалай күрделендіру керек"],warning:"Бұл медициналық тағайындау емес.",requiresProfessionalReview:true
      }:{
        observation:"Ребёнок выполняет одноэтапную инструкцию с визуальной подсказкой, но отвлекается при большом количестве стимулов.",
        everydayMeaning:"Ребёнку легче выполнить короткую просьбу, если она сопровождается картинкой или жестом.",
        parentSupport:["Уберите лишние игрушки","Дайте короткую спокойную инструкцию"],avoid:["Не давайте несколько инструкций одновременно"],discussWithSpecialist:["Как постепенно усложнять инструкцию"],warning:"Это не медицинское назначение.",requiresProfessionalReview:true
      };
    }else{
      const response=await aiRequest("/api/ai/explain-specialist-note",{method:"POST",role:appState.role,body:{childProfileId:state.childProfileId,specialistNoteId:note.id,targetLanguage:appState.lang}});
      state.explanationDraft=response.draft;state.explanationId=response.explanationId;
      state.explanationStatuses[appState.lang]=response.status||"shared_ai";
    }
    state.approvedExplanations[appState.lang]=structuredClone(state.explanationDraft);
    state.explanationStatuses[appState.lang]=state.explanationStatuses[appState.lang]||"shared_ai";
    persistAIState();renderAINote();renderParentAIPlan();showToast(t("ai.explanationShared"));
  }catch(error){if(error.code==="NOTE_REQUIRED")showToast(t("ai.noteRequired"),"","error");else showAIError(error)}
  finally{setAILoading(false)}
}
async function approveAIExplanation(){
  const state=currentAIState();if(!state.explanationDraft)return;
  try{
    if(!appState.demoMode&&state.explanationId)await aiRequest(`/api/explanations/${encodeURIComponent(state.explanationId)}/approve`,{method:"POST",role:appState.role,body:{approved:state.explanationDraft}});
    state.approvedExplanations[appState.lang]=structuredClone(state.explanationDraft);state.explanationStatuses[appState.lang]="approved";persistAIState();renderAINote();renderParentAIPlan();showToast(t("ai.approveExplanation"));
  }catch(error){showAIError(error)}
}
async function createAITranslation(){
  clearAIError();const state=currentAIState(),plan=state.plan;if(!plan)return;
  try{
    setAILoading(true,2);
    const translation=appState.demoMode
      ?makeDemoAIPlan(appState.lang)
      :(await aiRequest("/api/ai/translate-approved-content",{method:"POST",role:appState.role,body:{childProfileId:state.childProfileId,planId:plan.id,targetLanguage:appState.lang}})).translationDraft;
    plan.translationDrafts={...(plan.translationDrafts||{}),[appState.lang]:translation};
    state.versions.push({version:state.versions.length+1,createdAt:new Date().toISOString(),source:"ai_suggestion",status:"ai_translation_draft"});
    persistAIState();renderAIPlan();renderAIHistory();
  }catch(error){showAIError(error)}finally{setAILoading(false)}
}
async function updateAIPlanStatus(nextStatus){
  const state=currentAIState(),plan=state.plan;if(!plan)return;
  const safetyConfirmed=$("#aiSafetyConfirmed")?.checked;
  if(["approved","published"].includes(nextStatus)&&!safetyConfirmed){showToast(t("ai.approveFirst"),"","error");return}
  try{
    if(!appState.demoMode&&plan.id){
      if(nextStatus==="review")await aiRequest(`/api/plans/${encodeURIComponent(plan.id)}/draft`,{method:"POST",role:appState.role,body:{draft:plan.draft}});
      const primaryLanguage=plan.draftLanguage||"ru";
      const ruContent=primaryLanguage==="ru"?plan.draft:plan.translationDrafts?.ru;
      const kkContent=primaryLanguage==="kk"?plan.draft:plan.translationDrafts?.kk;
      const body={status:nextStatus,safetyConfirmed,reviewDate:plan.reviewDate};
      if(nextStatus==="approved"||nextStatus==="published"){if(ruContent)body.approvedRu=ruContent;if(kkContent)body.approvedKk=kkContent}
      const response=await aiRequest(`/api/plans/${encodeURIComponent(plan.id)}/status`,{method:"POST",role:appState.role,body});
      plan.status=response.plan.status;
    }else plan.status=nextStatus;
    plan.safetyConfirmed=Boolean(safetyConfirmed);
    if(nextStatus==="approved"||nextStatus==="published"){
      const primaryLanguage=plan.draftLanguage||"ru";
      if(primaryLanguage==="ru")plan.approvedRu=structuredClone(plan.draft);else plan.approvedKk=structuredClone(plan.draft);
      if(plan.translationDrafts?.ru)plan.approvedRu=structuredClone(plan.translationDrafts.ru);
      if(plan.translationDrafts?.kk)plan.approvedKk=structuredClone(plan.translationDrafts.kk);
    }
    state.versions.push({version:state.versions.length+1,createdAt:new Date().toISOString(),source:"specialist",status:nextStatus});
    persistAIState();renderAIPlan();renderAIHistory();renderParentAIPlan();
    showToast(nextStatus==="published"?t("ai.published"):aiStatusLabel(nextStatus));
  }catch(error){showAIError(error)}
}
async function analyzeAIProgress(){
  clearAIError();const state=currentAIState();
  try{
    await saveAIContext({silent:true});setAILoading(true,0);
    if(appState.demoMode)state.analysis=appState.lang==="kk"?{
      improvements:["«Ішу» карточкасын физикалық көмексіз жиі қолданады"],stableAreas:["Таныс үй жағдайында нәтиже тұрақты"],difficulties:["Жаңа жерде қосымша визуалды нұсқау қажет"],helpfulConditions:["Екі нұсқа және қысқа нұсқау"],questionsForSpecialist:["Дағдыны басқа күнделікті жағдайға ауыстыруға бола ма?"],suggestedAdjustments:["Екі нұсқамен бекітуді жалғастыру"],insufficientData:false,requiresProfessionalReview:true
    }:{improvements:["Карточка «пить» чаще используется без физической помощи"],stableAreas:["Результат устойчив в знакомой домашней обстановке"],difficulties:["В новом месте чаще нужна визуальная подсказка"],helpfulConditions:["Два варианта и короткая инструкция"],questionsForSpecialist:["Стоит ли переносить навык в другую бытовую ситуацию?"],suggestedAdjustments:["Продолжить закрепление с двумя вариантами"],insufficientData:false,requiresProfessionalReview:true};
    else state.analysis=(await aiRequest("/api/ai/analyze-progress",{method:"POST",role:appState.role,body:{childProfileId:state.childProfileId,targetLanguage:appState.lang}})).analysis;
    persistAIState();renderAIAnalysis();
  }catch(error){showAIError(error)}finally{setAILoading(false)}
}
async function suggestAIAdjustment(){
  clearAIError();const state=currentAIState();
  try{
    setAILoading(true,1);
    if(appState.demoMode)state.adjustmentDraft={suggestedAdjustments:appState.lang==="kk"?["Нұсқа санын уақытша екеуінде қалдыру","Дағдыны тамақтану кезінде қайталау","Жаңа жерде визуалды нұсқауды сақтау"]:["Временно оставить два варианта","Повторить навык во время приёма пищи","Сохранить визуальную подсказку в новом месте"],requiresProfessionalReview:true};
    else state.adjustmentDraft=(await aiRequest("/api/ai/suggest-plan-adjustment",{method:"POST",role:appState.role,body:{childProfileId:state.childProfileId,targetLanguage:appState.lang}})).adjustmentDraft;
    persistAIState();renderAIAnalysis();
  }catch(error){showAIError(error)}finally{setAILoading(false)}
}
async function structureAIObservation(){
  const state=currentAIState(),originalText=$("#parentAIObservation")?.value.trim();
  if(!originalText)return showToast(t("ai.noteRequired"),"","error");
  try{
    if(appState.demoMode)state.observationDraft={
      originalText,skillArea:appState.lang==="kk"?"Өтініш":"Просьба",activity:appState.lang==="kk"?"Су сұрау":"Просьба о воде",result:appState.lang==="kk"?"Орындалды":"Выполнено",supportLevel:appState.lang==="kk"?"Визуалды нұсқау":"Визуальная подсказка",context:appState.lang==="kk"?"Үйде":"Дома",possibleTrigger:null,calmingMethod:null,safetyFlag:/потер|судорог|құрыс|жоғалт/iu.test(originalText),confidence:"medium"
    };else state.observationDraft=(await aiRequest("/api/ai/structure-observation",{method:"POST",role:appState.role,body:{childProfileId:state.childProfileId,originalText,targetLanguage:appState.lang}})).draft;
  }catch(error){
    if(error.payload?.draft)state.observationDraft=error.payload.draft;else return showAIError(error);
  }
  persistAIState();renderParentAIPlan();
}
function saveAIObservation(mode){
  const state=currentAIState(),draft=state.observationDraft;if(!draft)return;
  state.observations.push(mode==="structured"?{...draft,confirmedByParent:true,confirmedAt:new Date().toISOString()}:{originalText:draft.originalText,confirmedByParent:true,structured:false,confirmedAt:new Date().toISOString()});
  state.observationDraft=null;persistAIState();renderParentAIPlan();showToast(t("ai.observationSaved"));
}
async function runAITaskAssistant(button){
  const state=currentAIState(),content=planContentForLanguage(state.plan),goal=content?.goals?.[Number(button.dataset.goalIndex)],activity=goal?.activities?.[Number(button.dataset.activityIndex)];if(!activity)return;
  const originalText=[activity.title,...(activity.instructions||[])].join("\n");
  try{
    let draft;
    if(appState.demoMode)draft={originalText,revisedText:appState.lang==="kk"?"Карточканы стақанның жанына қойып, тыныш күтіңіз. Қажет болса бір рет көрсетіңіз.":"Положите карточку рядом со стаканом и спокойно подождите. Если нужно, один раз покажите на неё.",steps:activity.instructions||[],successCriteria:activity.successCriteria||null,stopConditions:activity.stopConditions||[],notes:["AI-жоба; маман тексеруі қажет"]};
    else draft=(await aiRequest("/api/ai/task-assistant",{method:"POST",role:appState.role,body:{childProfileId:state.childProfileId,action:button.dataset.aiTaskAction,originalText,targetLanguage:appState.lang}})).draft;
    state.pendingTaskSuggestion={goalIndex:Number(button.dataset.goalIndex),activityIndex:Number(button.dataset.activityIndex),draft};
    openModal(`<span class="eyebrow">${t("ai.explanationDraft")}</span><h2 id="modalTitle">${aiTaskActionLabel(button.dataset.aiTaskAction)}</h2><div class="ai-task-compare"><div><small>${t("ai.originalNote")}</small><p>${escapeHTML(originalText)}</p></div><div><small>${t("ai.explanationDraft")}</small><p>${escapeHTML(draft.revisedText||formatAIValue(draft.steps))}</p></div></div><div class="button-row" style="margin-top:16px"><button class="btn btn-primary" id="applyAITaskDraft">${t("common.save")}</button><button class="btn btn-soft" id="modalOk">${t("common.cancel")}</button></div>`);
  }catch(error){showAIError(error)}
}
function applyAITaskDraft(){
  const state=currentAIState(),suggestion=state.pendingTaskSuggestion;
  const activity=planContentForLanguage(state.plan)?.goals?.[suggestion?.goalIndex]?.activities?.[suggestion?.activityIndex];
  if(!activity||!suggestion)return;
  const originalKey=`${appState.lang}:${suggestion.goalIndex}:${suggestion.activityIndex}`;
  state.taskOriginals=state.taskOriginals||{};
  if(!state.taskOriginals[originalKey])state.taskOriginals[originalKey]=structuredClone(activity.instructions||[]);
  const revised=suggestion.draft.steps?.length?suggestion.draft.steps:splitAIList(suggestion.draft.revisedText);
  if(revised.length)activity.instructions=revised;
  if(suggestion.draft.successCriteria)activity.successCriteria=suggestion.draft.successCriteria;
  if(suggestion.draft.stopConditions?.length)activity.stopConditions=suggestion.draft.stopConditions;
  state.pendingTaskSuggestion=null;persistAIState();closeModal();renderAIPlan();showToast(t("common.savedOnDevice"));
}
function restoreAITask(button){
  const state=currentAIState(),activity=planContentForLanguage(state.plan)?.goals?.[Number(button.dataset.goalIndex)]?.activities?.[Number(button.dataset.activityIndex)];
  const originalKey=`${appState.lang}:${button.dataset.goalIndex}:${button.dataset.activityIndex}`,original=state.taskOriginals?.[originalKey];
  if(!activity||!original)return;
  activity.instructions=structuredClone(original);delete state.taskOriginals[originalKey];persistAIState();renderAIPlan();
}

function renderDashboards(){
  if($("#openAIPlanBtn"))$("#openAIPlanBtn").textContent=t("ai.title");
  const profileName=!appState.demoMode&&appState.userProfile?.childProfile?.childName?appState.userProfile.childProfile.childName:"Айару";
  const safeProfileName=escapeHTML(profileName);
  $("#parentGreeting").innerHTML=appState.lang==="kk"?`Қайырлы күн, <span class="user-content">${safeProfileName}</span> баласының ата-анасы!`:`Добрый день, родитель <span class="user-content">${safeProfileName}</span>!`;
  $("#parentPlanTitle").innerHTML=appState.lang==="kk"?`<span class="user-content">${safeProfileName}</span> жоспары`:`План <span class="user-content">${safeProfileName}</span>`;
  const localProfile=appState.userProfile?.childProfile;
  const completedFields=localProfile?["childName","age","cityId","primaryLanguageId","secondaryLanguageId","consultationFormatId"].filter(key=>localProfile[key]).length:0;
  $("#parentStats").innerHTML=appState.demoMode
    ?statCards([["72%","Общий прогресс","↗","#dff4ed"],["3","Активных задания","✓","#fff0bd"],["4","Цели в работе","◎","#e6e1ff"],["7 дней","Серия практики","✦","#ffe2dc"]])
    :statCards([[`${completedFields}/6`,t("profile.completedFields"),"✓","#dff4ed"],[String(localProfile?.needIds?.length||0),t("profile.needsCount"),"◎","#fff0bd"],[String(localProfile?.recommendedSpecialtyIds?.length||0),t("profile.directionsCount"),"↗","#e6e1ff"],[localProfile?.specialistAccess?t("profile.accessOn"):t("profile.accessOff"),t("profile.access"),"◉","#ffe2dc"]]);
  ["nextMeeting","demoPlanPanel","demoGoalsPanel","demoCommentPanel"].forEach(id=>$("#"+id)?.classList.toggle("hidden",!appState.demoMode));
  $("#specialistStats").innerHTML=statCards([["12","Детей в сопровождении","☺","#dff4ed"],["4","Новые заявки","＋","#fff0bd"],["3","Отметки на проверку","✓","#e6e1ff"],["2","Встречи сегодня","◷","#ffe2dc"]]);
  $("#adminStats").innerHTML=statCards([["1 248","Семей в демо","⌂","#dff4ed"],["86","Специалистов","✓","#fff0bd"],["7","Заявок на проверке","◎","#e6e1ff"],["94%","Заданий доступны","↗","#ffe2dc"]]);
  $("#todayTasks").innerHTML=tasks.filter(t=>t.date==="Сегодня").map(taskRow).join("");
  const moods=[["😊","Радостно"],["😌","Спокойно"],["🥱","Устал"],["😟","Тревожно"],["😢","Грустно"],["😣","Раздражённо"],["❔","Сложно определить"]];
  const saved=localStorage.getItem("bq.mood");
  $("#moodGrid").innerHTML=moods.map(m=>`<button class="mood-btn ${saved===m[1]?"active":""}" data-mood="${m[1]}"><span>${m[0]}</span>${m[1]}</button>`).join("");
  $("#parentGoals").innerHTML=goals.slice(0,3).map(g=>`<div class="goal-mini"><div class="goal-mini-header"><b>${g.title}</b><span>${g.progress}%</span></div><div class="progress"><i style="width:${g.progress}%;background:${g.color}"></i></div></div>`).join("");
  $("#childrenList").innerHTML=children.map(c=>`<div class="child-row"><span class="avatar">${c.name.slice(0,2)}</span><div><b>${c.name}, ${c.age} лет</b><small>${c.goals}</small></div><div><b>${c.completion}% заданий</b><small>${c.activity}</small></div><div><b>${c.mood}</b><small>настроение сегодня</small></div><button class="btn btn-soft" data-child="${c.id}">Открыть</button></div>`).join("");
  $("#todayMeetings").innerHTML=[["10:00","Мирас · онлайн"],["15:30","Айару · онлайн"],["18:00","Проверить отметки"]].map(x=>`<div class="timeline-item"><b>${x[0]} · ${x[1]}</b><small>Демо-расписание</small></div>`).join("");
  $("#messagesList").innerHTML=[["МА","Мама Айару","Получилось выбрать карточку самой"],["АП","Папа Мираса","Отметил задание за вчера"],["МС","Мама Сафии","Можно перенести встречу?"]].map(x=>`<div class="message-item"><span class="avatar">${x[0]}</span><div><b>${x[1]}</b><small>${x[2]}</small></div></div>`).join("");
  $("#adminApplications").innerHTML=specialists.slice(0,4).map(s=>`<div class="admin-row"><div><b>${s.name}</b><small>${s.specialty}</small></div><div><b>${s.city}</b><small>${s.experience} лет опыта</small></div><div><span class="status-pill">Ожидает проверки</span></div><div class="button-row"><button class="btn btn-primary admin-approve" data-id="${s.id}">Подтвердить</button><button class="btn btn-soft admin-reject" data-id="${s.id}">Отклонить</button></div></div>`).join("");
  renderChildProfile();renderParentAIPlan();
}
function statCards(items){return items.map(s=>`<article class="stat-card"><span class="stat-icon" style="--stat-color:${s[3]}">${s[2]}</span><div><b>${s[0]}</b><small>${s[1]}</small></div></article>`).join("")}
function taskRow(t){const done=t.done||appState.completedTasks.includes(t.id);return `<div class="task-row"><button class="task-check ${done?"done":""}" data-quick-task="${t.id}" aria-label="Отметить задание">${done?"✓":""}</button><div><b>${t.title}</b><small>${t.duration} · ${t.specialist}</small></div><button class="text-btn task-result" data-task="${t.id}">${done?"Изменить":"Отметить"}</button></div>`}

function renderQadam(){
  $("#qadamMetrics").innerHTML=[["Активных целей","4"],["Серия выполнения","7 дней"],["Следующая встреча","22 июля · 15:30"],["Специалист","Дана Нурланова"]].map(x=>`<div class="qadam-metric"><span>${x[0]}</span><b>${x[1]}</b></div>`).join("");
  $("#goalsGrid").innerHTML=goals.map(g=>`<article class="goal-card" style="--goal-color:${g.color}"><span class="status-tag">${g.status}</span><h3>${g.title}</h3><p>${g.description}</p><div class="progress"><i style="width:${g.progress}%;background:${g.color}"></i></div><div class="goal-card-footer"><small>${g.progress}% · ${g.note}</small><button class="text-btn" data-goal="${g.id}">Подробнее</button></div></article>`).join("");
  $("#tasksGrid").innerHTML=tasks.map(t=>`<article class="task-card"><div class="task-card-top"><div><span class="status-tag">${t.date}</span><h3>${t.title}</h3></div><span>✓</span></div><p>${t.instruction}</p><div class="task-meta"><span>◷ ${t.duration}</span><span>↻ ${t.frequency}</span><span>Цель: ${t.goal}</span></div><div class="button-row"><button class="btn btn-soft" data-action="start-task" data-task="${t.id}">Начать</button><button class="btn btn-primary task-result" data-task="${t.id}">Отметить результат</button></div></article>`).join("");
  $("#weekChart").innerHTML=[52,70,38,84,66,91,72].map((v,i)=>`<div class="chart-day"><div class="chart-bar" style="height:${v}%"></div><span>${["Пн","Вт","Ср","Чт","Пт","Сб","Вс"][i]}</span></div>`).join("");
  $("#progressTimeline").innerHTML=[...appState.customEntries.map(entry=>({...entry,userContent:true})),...progressEntries].slice(0,7).map(e=>{
    const resultText=e.resultId?t(`taskResults.${e.resultId}`):e.text;
    const title=e.titleKey==="parentMarked"?(appState.lang==="kk"?"Ата-ана орындалғанын белгіледі":"Родитель отметил выполнение"):e.title;
    const date=e.dateKey==="now"?(appState.lang==="kk"?"Жаңа ғана":"Только что"):e.date;
    return `<div class="timeline-item"><b>${title||""}</b><small>${date||""} · ${e.userContent?`<span class="user-content">${escapeHTML(resultText||"")}${e.note?` · ${escapeHTML(e.note)}`:""}</span>`:resultText||""}</small></div>`;
  }).join("");
}

function renderCommunication(){
  const categories=["Избранное","Последние",...new Set(communicationCards.map(c=>c.category))];
  $("#soyleCategories").innerHTML=categories.map((c,i)=>`<button class="soyle-category ${appState.soyleCategory===c?"active":""}" data-category="${c}" style="--cat-color:${["#ffe0dc","#e6e1ff","#dcefff","#fff0bd","#dff3d8"][i%5]}"><span>${["★","◷","💬","🍎","🥤","😊","🩹","🫶","⚡","👨","🧸","🎒","🌙","📍","🐾","✓"][i%16]}</span>${c}</button>`).join("");
  const q=$("#soyleSearch").value.toLowerCase().trim();
  let cards=communicationCards;
  if(appState.soyleCategory==="Избранное") cards=cards.filter(c=>appState.cardFavorites.includes(c.id));
  else if(appState.soyleCategory==="Последние") cards=appState.recentCards.map(id=>cards.find(c=>c.id===id)).filter(Boolean);
  else cards=cards.filter(c=>c.category===appState.soyleCategory);
  cards=cards.filter(c=>!q||c.ru.includes(q)||c.kk.includes(q));
  $("#soyleCategoryTitle").textContent=appState.soyleCategory;
  $("#communicationGrid").innerHTML=cards.length?cards.map(c=>`<article class="comm-card" style="--card-bg:${c.color}"><button class="fav-star ${appState.cardFavorites.includes(c.id)?"active":""}" data-card-favorite="${c.id}" aria-label="${appState.lang==="kk"?"Таңдаулы":"Избранное"}">${appState.cardFavorites.includes(c.id)?"★":"☆"}</button><button class="comm-select" data-card="${c.id}" aria-label="${appState.lang==="kk"?"Қосу және дыбыстау":"Добавить и озвучить"}: ${c[appState.speechLang]}"><span class="emoji">${c.emoji}</span><span>${c[appState.speechLang]}</span></button></article>`).join(""):`<div class="empty-state"><span>⭐</span><h2>${t("states.noCards")}</h2><p>${t("states.addFavorite")}</p></div>`;
  renderPhrase();
}
function renderPhrase(){
  $("#phraseSlots").innerHTML=appState.phrase.length?appState.phrase.map(c=>`<span class="phrase-word" style="--word-color:${c.color}">${c[appState.speechLang]}</span>`).join(""):`<span class="phrase-placeholder">${appState.speechLang==="ru"?"Нажимай карточки — здесь появится фраза":"Карточкаларды бас — сөйлем осында шығады"}</span>`;
}
function speak(text){
  if(!("speechSynthesis" in window)){showToast("Озвучивание недоступно","Этот браузер не поддерживает синтез речи.","error");return}
  speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang=appState.speechLang==="kk"?"kk-KZ":"ru-RU";
  const voices=speechSynthesis.getVoices(),preferred=voices.find(v=>v.lang.toLowerCase().startsWith(appState.speechLang==="kk"?"kk":"ru"))||voices.find(v=>v.lang.toLowerCase().startsWith("ru"));
  if(preferred)utterance.voice=preferred;speechSynthesis.speak(utterance);
}

function renderMaterials(){
  const categories=["Все",...new Set(expertArticles.map(a=>a.category))];
  $("#articleFilters").innerHTML=categories.map(c=>`<button class="filter-chip ${appState.articleCategory===c?"active":""}" data-article-category="${c}">${c}</button>`).join("");
  const q=$("#articleSearch").value.toLowerCase().trim();
  const result=expertArticles.filter(a=>(appState.articleCategory==="Все"||a.category===appState.articleCategory)&&(!q||`${a.title} ${a.description}`.toLowerCase().includes(q)));
  $("#materialsGrid").innerHTML=result.length?result.map(articleCard).join(""):`<div class="empty-state"><span>📚</span><h2>Материал пока не найден</h2><p>Попробуйте другое слово или категорию.</p></div>`;
}
function openArticle(id){
  const a=expertArticles.find(x=>x.id===id);
  openModal(`<span class="category-label" style="background:${a.color}">${a.category}</span><h2 id="modalTitle">${a.title}</h2><p><b>${a.author}</b> · ${a.specialty} · ${a.time}</p><p>${a.description}</p><h3>Главная мысль</h3><p>Опирайтесь на конкретную цель и наблюдайте за доступными ребёнку способами участия. Дайте время на ответ, предлагайте понятный выбор и обсуждайте изменения с подключённым специалистом.</p><h3>Что можно записать</h3><p>В какой ситуации навык появился, какая подсказка понадобилась и что помогло сохранить спокойствие. Эти наблюдения полезнее общих оценок.</p><div class="warning-card">Материал предназначен для общего ознакомления и не заменяет индивидуальную консультацию. Он не предлагает менять лечение, препараты или диагноз.</div>`);
}

function updateDemoModeUI(){
  $("#demoBanner").classList.toggle("local-profile-mode",!appState.demoMode);
  $("#demoBannerText").textContent=appState.demoMode?t("demo.banner"):t("demo.localBanner");
  $("#loginBtn").textContent=appState.demoMode?t("header.login"):t("header.logout");
  $("#mobileLoginBtn").textContent=appState.demoMode?t("header.login"):t("header.logout");
}
function setLanguage(lang,announce=true){
  syncSurveyDataFromDom();
  appState.lang=normalizeLocale(lang);persist("lang",appState.lang);setLocale(appState.lang);
  appState.speechLang=appState.lang;persist("speechLang",appState.speechLang);
  if(appState.userProfile){
    appState.userProfile.preferences={...(appState.userProfile.preferences||{}),language:appState.lang};
    persist("userProfile",appState.userProfile);
  }
  $$(".lang-btn").forEach(button=>button.classList.toggle("active",button.dataset.lang===appState.lang));
  $$(".speech-lang").forEach(button=>button.classList.toggle("active",button.dataset.speechLang===appState.speechLang));
  $$(".nav-link").forEach(button=>button.textContent=t(`navigation.${button.dataset.route}`));
  $("#surveyTitle").innerHTML=`<span>${t("survey.title1")}</span><span>${t("survey.title2")}</span><span>${t("survey.title3")}</span>`;
  $("#surveyPrev").textContent=`← ${t("common.back")}`;
  $("#surveyNext").textContent=`${t("common.next")} →`;
  $("#saveChildProfile").textContent=t("survey.saveProfile");
  $("#roleSelect").options[0].text=t("header.parent");$("#roleSelect").options[1].text=t("header.specialist");$("#roleSelect").options[2].text=t("header.admin");
  $("#mobileRoleSelect").options[0].text=t("header.parent");$("#mobileRoleSelect").options[1].text=t("header.specialist");$("#mobileRoleSelect").options[2].text=t("header.admin");
  populateControls();hydrateSurveyForm();updateSurvey(false);
  renderHome();renderSpecialists();renderDashboards();renderQadam();renderCommunication();renderMaterials();renderAIPage();
  if(appState.surveyStep===5)buildSurveyResults();
  updateDemoModeUI();translateDocument(document);
  if(announce)showToast(appState.lang==="kk"?"Қазақша қосылды":"Русский язык включён",appState.lang==="kk"?"Интерфейс толық қазақ тіліне ауыстырылды.":"Интерфейс полностью переключён на русский.");
}
function changeRole(role){
  appState.role=role;persist("role",role);
  $("#roleSelect").value=role;$("#mobileRoleSelect").value=role;
  const target=role==="parent"?"parent":role==="specialist"?"specialist":"admin";
  navigate(target);showToast(t("demo.roleChanged"),t("demo.roleOpened",{role:$("#roleSelect").selectedOptions[0].text}));
}

function toggleProfileMode(){
  if(!appState.demoMode){
    appState.demoMode=true;appState.demoAI={...initialAIState,context:{...demoAIContext}};persist("demoMode","true");updateDemoModeUI();renderDashboards();if(appState.route==="ai-plan")renderAIPage();
    showToast(t("demo.demoEnabled"),t("demo.demoEnabledText"));return;
  }
  openModal(`<span class="eyebrow">${t("demo.modeTitle")}</span><h2 id="modalTitle">${t("demo.modeTitle")}</h2><p>${t("demo.modeText")}</p><div class="button-row wrap"><button class="btn btn-primary" data-mode="local">${t("demo.openLocal")}</button><button class="btn btn-soft" data-mode="demo">${t("demo.continueDemo")}</button></div>`);
}

function genericAction(action){
  const forms={
    observation:["Добавить наблюдение","Что изменилось сегодня?","Наблюдение добавлено"],
    "create-goal":["Создать цель","Название функциональной цели","Цель создана"],
    "create-task":["Добавить задание","Короткое название задания","Задание добавлено"],
    comment:["Оставить комментарий","Комментарий для семьи","Комментарий сохранён"],
    "change-plan":["Изменить план","Что важно изменить?","Изменение плана сохранено"],
    "add-soyle":["Добавить карточку в Сөйле","Текст новой карточки","Карточка добавлена"]
  };
  if(forms[action]){
    const f=forms[action];openModal(`<span class="eyebrow">Демо-действие</span><h2 id="modalTitle">${f[0]}</h2><form id="genericForm"><label>${f[1]}<textarea rows="4" required placeholder="Введите короткое описание"></textarea></label><label>Заметка или рекомендация<input placeholder="Необязательно"></label><button class="btn btn-primary" type="submit" data-success="${f[2]}">Сохранить</button></form>`);return;
  }
  const info={privacy:["Конфиденциальность","Родитель управляет доступом к данным. Информация ребёнка должна быть видна только подключённым специалистам. В демо-версии данные остаются на устройстве."],terms:["Пользовательское соглашение","Это демонстрационный интерфейс. Он не оказывает медицинские услуги, не ставит диагноз и не заменяет квалифицированную помощь."],contact:["Контакты","demo@balaqoldau.kz и +7 (000) 000-00-00 — демонстрационные контакты."],question:["Задать вопрос","В демо-версии сообщение сохраняется только в интерфейсе и никуда не отправляется."],social:["Социальная сеть","Ссылка является демонстрационной и не ведёт во внешний сервис."],"start-task":["Начинаем практику","Таймер не обязателен: следуйте темпу ребёнка и остановитесь, если он устал."]}[action];
  if(info)openModal(`<h2 id="modalTitle">${info[0]}</h2><p>${info[1]}</p><button class="btn btn-primary" id="modalOk">Понятно</button>`);
}
function openTaskResult(id){
  const task=tasks.find(x=>x.id===id);
  const resultIds=["independent","small_prompt","full_help","partial","not_today","skipped"];
  openModal(`<span class="eyebrow">Отметка результата</span><h2 id="modalTitle">${task.title}</h2><form id="taskResultForm" data-task="${id}">
    <label>Как получилось?<select name="result">${resultIds.map(resultId=>`<option value="${resultId}">${t(`taskResults.${resultId}`)}</option>`).join("")}</select></label>
    <label>Заметка<textarea name="note" rows="3" placeholder="Что помогло? Что было трудно?"></textarea></label>
    <label>Настроение<select><option>Спокойно</option><option>Радостно</option><option>Устал</option><option>Тревожно</option><option>Сложно определить</option></select></label>
    <label class="check-line"><input type="checkbox"> Ребёнок устал</label><button class="btn btn-primary" type="submit">Сохранить отметку</button></form>`);
}

function bindEvents(){
  document.addEventListener("click",e=>{
    const route=e.target.closest("[data-route]");if(route){navigate(route.dataset.route);return}
    const scroll=e.target.closest("[data-scroll]");if(scroll){$("#"+scroll.dataset.scroll)?.scrollIntoView({behavior:"smooth"});return}
    const specialty=e.target.closest("[data-specialty]");if(specialty){$("#filterSpecialty").value=specialty.dataset.specialty;navigate("specialists");renderSpecialists();return}
    const profile=e.target.closest(".profile-btn");if(profile){showSpecialistProfile(Number(profile.dataset.id));return}
    const booking=e.target.closest(".booking-btn");if(booking){showBooking(Number(booking.dataset.id));return}
    const fav=e.target.closest("[data-favorite]");if(fav){const id=Number(fav.dataset.favorite);appState.favorites=appState.favorites.includes(id)?appState.favorites.filter(x=>x!==id):[...appState.favorites,id];persist("favorites",appState.favorites);renderSpecialists();if(!$("#modalBackdrop").classList.contains("hidden"))showSpecialistProfile(id);showToast("Избранное обновлено");return}
    const faq=e.target.closest(".faq-question");if(faq){const item=faq.parentElement;item.classList.toggle("open");faq.setAttribute("aria-expanded",item.classList.contains("open"));return}
    const article=e.target.closest("[data-article]");if(article){openArticle(Number(article.dataset.article));return}
    const articleCat=e.target.closest("[data-article-category]");if(articleCat){appState.articleCategory=articleCat.dataset.articleCategory;renderMaterials();return}
    const quickTask=e.target.closest("[data-quick-task]");if(quickTask){const id=Number(quickTask.dataset.quickTask);appState.completedTasks=appState.completedTasks.includes(id)?appState.completedTasks.filter(x=>x!==id):[...appState.completedTasks,id];persist("completedTasks",appState.completedTasks);renderDashboards();showToast(appState.completedTasks.includes(id)?"Задание отмечено":"Отметка снята");return}
    const taskResult=e.target.closest(".task-result");if(taskResult){openTaskResult(Number(taskResult.dataset.task));return}
    const mood=e.target.closest("[data-mood]");if(mood){persist("mood",mood.dataset.mood);$$(".mood-btn").forEach(b=>b.classList.toggle("active",b===mood));$("#moodSaved").textContent=`Сохранено: ${mood.dataset.mood.toLowerCase()}.`;showToast("Настроение сохранено");return}
    const child=e.target.closest("[data-child]");if(child){const c=children.find(x=>x.id===Number(child.dataset.child));openModal(`<span class="eyebrow">Карточка ребёнка</span><h2 id="modalTitle">${c.name}, ${c.age} лет</h2><div class="profile-details"><div><small>Основные цели</small><b>${c.goals}</b></div><div><small>Выполнение</small><b>${c.completion}%</b></div><div><small>Последняя активность</small><b>${c.activity}</b></div><div><small>Настроение</small><b>${c.mood}</b></div></div><h3>Последние карточки Сөйле</h3><div class="choice-row"><span class="soft-label">хочу пить</span><span class="soft-label">помоги</span><span class="soft-label">достаточно</span></div><div class="warning-card">Данные ребёнка доступны только подключённым специалистам. Всё на экране демонстрационное.</div>`);return}
    const admin=e.target.closest(".admin-approve,.admin-reject");if(admin){admin.closest(".admin-row").remove();showToast(admin.classList.contains("admin-approve")?"Профиль подтверждён":"Заявка отклонена","Демонстрационное решение отражено в интерфейсе.");return}
    const goal=e.target.closest("[data-goal]");if(goal){const g=goals.find(x=>x.id===Number(goal.dataset.goal));openModal(`<span class="status-tag">${g.status}</span><h2 id="modalTitle">${g.title}</h2><p>${g.description}</p><div class="progress"><i style="width:${g.progress}%;background:${g.color}"></i></div><div class="profile-details"><div><small>Срок</small><b>${g.deadline}</b></div><div><small>Специалист</small><b>${g.specialist}</b></div><div><small>Последняя отметка</small><b>${g.note}</b></div><div><small>Прогресс навыка</small><b>${g.progress}%</b></div></div>`);return}
    const cat=e.target.closest("[data-category]");if(cat){appState.soyleCategory=cat.dataset.category;renderCommunication();return}
    const cardFav=e.target.closest("[data-card-favorite]");if(cardFav){e.stopPropagation();const id=cardFav.dataset.cardFavorite;appState.cardFavorites=appState.cardFavorites.includes(id)?appState.cardFavorites.filter(x=>x!==id):[...appState.cardFavorites,id];persist("cardFavorites",appState.cardFavorites);renderCommunication();return}
    const card=e.target.closest(".comm-select");if(card){const c=communicationCards.find(x=>x.id===card.dataset.card);appState.phrase.push(c);appState.recentCards=[c.id,...appState.recentCards.filter(x=>x!==c.id)].slice(0,10);persist("recentCards",appState.recentCards);renderPhrase();speak(c[appState.speechLang]);return}
    const mode=e.target.closest("[data-mode]");if(mode){if(mode.dataset.mode==="local"){appState.demoMode=false;appState.demoAI={...initialAIState,context:{...demoAIContext}};persist("demoMode","false");closeModal();updateDemoModeUI();renderDashboards();if(appState.route==="ai-plan")renderAIPage();showToast(t("demo.localEnabled"),t("demo.localEnabledText"))}else closeModal();return}
    const profileAction=e.target.closest("[data-profile-action]");if(profileAction){
      if(appState.userProfile?.childProfile)appState.surveyData={...initialSurveyData,...appState.userProfile.childProfile};
      else appState.surveyData={...initialSurveyData};
      appState.surveyTouched=new Set(Object.entries(appState.surveyData).filter(([,value])=>Array.isArray(value)?value.length:Boolean(value)).map(([key])=>key));
      appState.surveyStep=1;saveSurveyDraft();populateControls();hydrateSurveyForm();updateSurvey();navigate("survey");return;
    }
    const removeField=e.target.closest("[data-remove-profile-field]");if(removeField){
      const field=removeField.dataset.removeProfileField;delete appState.userProfile.childProfile[field];appState.surveyData[field]=initialSurveyData[field];persist("userProfile",appState.userProfile);saveSurveyDraft();renderChildProfile();showToast(t("profile.valueRemoved"));return;
    }
    const removeArray=e.target.closest("[data-remove-profile-array]");if(removeArray){
      const field=removeArray.dataset.removeProfileArray,value=removeArray.dataset.value;
      appState.userProfile.childProfile[field]=(appState.userProfile.childProfile[field]||[]).filter(item=>item!==value);
      appState.surveyData[field]=[...(appState.userProfile.childProfile[field]||[])];persist("userProfile",appState.userProfile);saveSurveyDraft();renderChildProfile();showToast(t("profile.valueRemoved"));return;
    }
    if(e.target.id==="generateAIPlanBtn"){generateAIPlan();return}
    if(e.target.id==="createAITranslationBtn"){createAITranslation();return}
    if(e.target.id==="explainAINoteBtn"){explainAINote();return}
    if(e.target.id==="approveAIExplanationBtn"){approveAIExplanation();return}
    if(e.target.id==="analyzeAIProgressBtn"){analyzeAIProgress();return}
    if(e.target.id==="suggestAIAdjustmentBtn"){suggestAIAdjustment();return}
    if(e.target.id==="structureAIObservationBtn"){structureAIObservation();return}
    const observationSave=e.target.closest("[data-ai-observation-save]");if(observationSave){saveAIObservation(observationSave.dataset.aiObservationSave);return}
    const planStatus=e.target.closest("[data-ai-plan-status]");if(planStatus){updateAIPlanStatus(planStatus.dataset.aiPlanStatus);return}
    const taskAssistant=e.target.closest("[data-ai-task-action]");if(taskAssistant){runAITaskAssistant(taskAssistant);return}
    const restoreTask=e.target.closest("[data-ai-restore-task]");if(restoreTask){restoreAITask(restoreTask);return}
    if(e.target.id==="applyAITaskDraft"){applyAITaskDraft();return}
    if(e.target.id==="retryAIButton"){generateAIPlan();return}
    const action=e.target.closest("[data-action]");if(action){genericAction(action.dataset.action);return}
    if(e.target.id==="emptyReset"){resetFilters()}
    if(e.target.id==="modalOk"){closeModal()}
  });
  $("#menuToggle").addEventListener("click",()=>{const open=$("#mainNav").classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",open)});
  $("#loginBtn").addEventListener("click",toggleProfileMode);
  $("#mobileLoginBtn").addEventListener("click",toggleProfileMode);
  $("#roleSelect").addEventListener("change",e=>changeRole(e.target.value));
  $("#mobileRoleSelect").addEventListener("change",e=>changeRole(e.target.value));
  $$(".lang-btn").forEach(b=>b.addEventListener("click",()=>setLanguage(b.dataset.lang)));
  $("#modalClose").addEventListener("click",closeModal);$("#modalBackdrop").addEventListener("click",e=>{if(e.target===e.currentTarget)closeModal()});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#modalBackdrop").classList.contains("hidden"))closeModal()});
  ["specialistSearch","filterSpecialty","filterCity","filterFormat","filterLanguage","filterPrice","filterRating","filterSoon","sortSpecialists"].forEach(id=>$("#"+id).addEventListener(id==="specialistSearch"||id==="filterPrice"?"input":"change",renderSpecialists));
  $("#resetFilters").addEventListener("click",resetFilters);$("#openFilters").addEventListener("click",()=>$("#filtersPanel").classList.add("open"));
  $("#surveyPrev").addEventListener("click",()=>{syncSurveyDataFromDom();if(appState.surveyStep>1){appState.surveyStep--;updateSurvey()}});
  $("#surveyNext").addEventListener("click",()=>{syncSurveyDataFromDom();if(!validateSurveyStep())return;if(appState.surveyStep<5){appState.surveyStep++;if(appState.surveyStep===5)buildSurveyResults();updateSurvey()}});
  $("#saveChildProfile").addEventListener("click",saveChildProfile);
  $("#surveyForm").addEventListener("input",e=>{syncSurveyDataFromDom(true,e.target);const error=$(`#${e.target.name}Error`);if(error){error.remove();e.target.removeAttribute("aria-invalid");e.target.removeAttribute("aria-describedby")}});
  $("#surveyForm").addEventListener("change",e=>{syncSurveyDataFromDom(true,e.target);if(e.target.name==="diagnosisStatus")$("#diagnosisOptions").classList.toggle("hidden",e.target.value!=="yes")});
  $("#speakPhrase").addEventListener("click",()=>{if(appState.phrase.length)speak(appState.phrase.map(c=>c[appState.speechLang]).join(" "));else showToast("Фраза пока пустая","Добавьте одну или несколько карточек.","error")});
  $("#undoPhrase").addEventListener("click",()=>{appState.phrase.pop();renderPhrase()});$("#clearPhrase").addEventListener("click",()=>{appState.phrase=[];renderPhrase()});
  $("#savePhrase").addEventListener("click",()=>{if(!appState.phrase.length)return showToast("Фраза пока пустая","Сначала выберите карточки.","error");const saved=JSON.parse(localStorage.getItem("bq.savedPhrases")||"[]");saved.push(appState.phrase.map(c=>c.id));persist("savedPhrases",saved);showToast("Фраза сохранена")});
  $$(".speech-lang").forEach(b=>b.addEventListener("click",()=>{appState.speechLang=normalizeLocale(b.dataset.speechLang);persist("speechLang",appState.speechLang);$$(".speech-lang").forEach(x=>x.classList.toggle("active",x===b));renderCommunication()}));
  $("#soyleSearch").addEventListener("input",renderCommunication);
  $("#childModeBtn").addEventListener("click",()=>{document.body.classList.add("child-mode");$("#exitChildMode").classList.remove("hidden");try{document.documentElement.requestFullscreen?.()}catch{}});
  let holdTimer;const exit=$("#exitChildMode");const startHold=()=>{exit.textContent="Удерживайте…";holdTimer=setTimeout(()=>{document.body.classList.remove("child-mode");exit.classList.add("hidden");document.exitFullscreen?.();showToast("Детский режим завершён")},1200)};const cancelHold=()=>{clearTimeout(holdTimer);exit.textContent="Удерживайте, чтобы выйти"};exit.addEventListener("pointerdown",startHold);["pointerup","pointerleave","pointercancel"].forEach(x=>exit.addEventListener(x,cancelHold));
  $("#articleSearch").addEventListener("input",renderMaterials);
  document.addEventListener("change",e=>{if(e.target.id==="profileAccessToggle"){appState.userProfile.childProfile.specialistAccess=e.target.checked;appState.surveyData.specialistAccess=e.target.checked;persist("userProfile",appState.userProfile);saveSurveyDraft();renderChildProfile()}});
  document.addEventListener("input",e=>{
    const state=currentAIState(),plan=state.plan,content=planContentForLanguage(plan);
    if(e.target.matches("[data-ai-edit]")&&content){content[e.target.dataset.aiEdit]=e.target.value;persistAIState()}
    if(e.target.matches("[data-ai-goal]")&&content?.goals?.[Number(e.target.dataset.aiGoal)]){content.goals[Number(e.target.dataset.aiGoal)][e.target.dataset.aiField]=e.target.value;persistAIState()}
  });
  document.addEventListener("change",e=>{if(e.target.id==="aiSafetyConfirmed"&&currentAIState().plan){currentAIState().plan.safetyConfirmed=e.target.checked;persistAIState()}});
  window.addEventListener("hashchange",()=>navigate(location.hash.slice(1)||"home",false));
  document.addEventListener("submit",e=>{
    e.preventDefault();
    if(e.target.id==="bookingForm"){closeModal();showToast("Заявка отправлена","Специалист увидит её в демонстрационном кабинете.")}
    if(e.target.id==="taskResultForm"){const id=Number(e.target.dataset.task);if(!appState.completedTasks.includes(id))appState.completedTasks.push(id);persist("completedTasks",appState.completedTasks);appState.customEntries.unshift({dateKey:"now",titleKey:"parentMarked",resultId:$('[name="result"]',e.target).value,note:$('[name="note"]',e.target).value.trim()});persist("customEntries",appState.customEntries);closeModal();renderQadam();renderDashboards();showToast(appState.lang==="kk"?"Нәтиже сақталды":"Результат сохранён")}
    if(e.target.id==="genericForm"){const success=$("[data-success]",e.target).dataset.success;appState.customEntries.unshift({date:"Только что",title:success,text:$("textarea",e.target).value});persist("customEntries",appState.customEntries);closeModal();renderQadam();showToast(success)}
    if(e.target.id==="aiContextForm")saveAIContext().catch(showAIError);
  });
}

function init(){
  renderHome();populateControls();renderSpecialists();renderDashboards();renderQadam();renderMaterials();bindEvents();
  $("#roleSelect").value=appState.role;$("#mobileRoleSelect").value=appState.role;$$(".speech-lang").forEach(b=>b.classList.toggle("active",b.dataset.speechLang===appState.speechLang));
  hydrateSurveyForm();updateSurvey();
  const route=location.hash.slice(1)||"home";navigate(route,false);setLanguage(appState.lang,false);
}
document.addEventListener("DOMContentLoaded",init);
