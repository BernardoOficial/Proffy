const Database = require('./db');
const createProffy = require('./createProffy')

Database.then(async (db) => {
  proffyValue = {
    name: "Bernardo Pereira Oliveira",
    avatar: "https://avatars0.githubusercontent.com/u/44386495?s=460&u=8e2fc66f9c179912e729b35e079ad38557edd63d&v=4", 
    whatsapp: "11960156432", 
    bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.00 pessoas já passaram por uma das minhas explosões.", 
  }

  classValue = {
    subject: 1, 
    cost: "20", 
  }

  classScheduleValues = [
    {
      weekday: 1,
      time_from: 720,
      time_to: 1220
    },
    {
      weekday: 0,
      time_from: 520,
      time_to: 1220
    },
    {
      weekday: 2,
      time_from: 520,
      time_to: 1220
    }
  ]

  // await createProffy(db, { proffyValue, classValue, classScheduleValues})


    // Consultar os dados inseridos
    // Todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)


    // Consultar as classes de um determinado professor
    // e trazer juntos os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1
  `)  
    // console.log(selectClassesAndProffys)

    // o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    // Então o horário soliticado pelo cliente deve estar entre esse horário para que o professor apareça como opção.
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `) 

    // console.log(selectClassesSchedules)
})